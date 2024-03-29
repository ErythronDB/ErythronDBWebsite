import { empty, of, merge } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import * as RecordStoreModule from 'wdk-client/StoreModules/RecordStoreModule';
import { QuestionActions, RecordActions } from 'wdk-client/Actions';
import { difference, get } from 'lodash';
import * as tree from 'wdk-client/Utils/TreeUtils';
import * as cat from 'wdk-client/Utils/CategoryUtils';
import * as persistence from 'ebrc-client/util/persistence';
import { TABLE_STATE_UPDATED } from '../action-creators/RecordViewActionCreators';

export const key = 'record';

const storageItems = {
  tables: {
    path: 'eupathdb.tables',
    isRecordScoped: true
  },
  collapsedSections: {
    path: 'collapsedSections',
    isRecordScoped: false
  },
  expandedSections: {
    path: 'expandedSections',
    getValue: state => difference(RecordStoreModule.getAllFields(state), state.collapsedSections),
    isRecordScoped: false
  },
  navigationVisible: {
    path: 'navigationVisible',
    isRecordScoped: false
  }
};

export function reduce(state, action) {
  state = RecordStoreModule.reduce(state, action);
  if (state.questions == null) state = { ...state, questions: {} };
  // state = QuestionStoreModule.reduce(state, action);
  state = Object.assign({}, state, {
    eupathdb: handleEuPathDBAction(state.eupathdb, action)
  });
  switch (action.type) {
    case RecordActions.RECORD_RECEIVED:
      return {
        ...pruneCategories(state),
        // collapse all sections by default. later we will read state from localStorage.
        collapsedSections: RecordStoreModule.getAllFields(state)
      };
    default:
      return state;
  }
}

export function observe(action$, state$, services) {
  return merge(
    RecordStoreModule.observe(action$, state$, services),
    // QuestionStoreModule.observe(action$, state$, services),
    observeUserSettings(action$, state$, services),
  )
}


/** Handle eupathdb actions */
function handleEuPathDBAction(state = { tables: {} }, { type, payload }) {
  switch(type) {
    case TABLE_STATE_UPDATED:
      return Object.assign({}, state, {
        tables: Object.assign({}, state.tables, {
          [payload.tableName]: payload.tableState
        })
      });

    default:
      return state;
  }
}

/** prune categoryTree */
function pruneCategories(nextState) {
  let { record, categoryTree } = nextState;
  if (isGeneRecord(record)) {
    categoryTree = categoryTree; //pruneCategoryBasedOnShowStrains(pruneCategoriesByMetaTable(removeProteinCategories(categoryTree, record), record), record);
    nextState = Object.assign({}, nextState, { categoryTree });
  }
  return nextState;
}

/** Remove protein related categories from tree */
function removeProteinCategories(categoryTree, record) {
  if (record.attributes.gene_type !== 'protein coding' && record.attributes.gene_type !== 'protein coding gene')  {
    let children = categoryTree.children.filter(function(category) {
      let label = category.properties.label[0];
      return label !== 'Protein properties' && label !== 'Proteomics';
    });
    categoryTree = Object.assign({}, categoryTree, { children });
  }
  return categoryTree;
}


/** Remove Strains based on value of show_strains attribute */
function pruneCategoryBasedOnShowStrains(categoryTree, record) {
 // Keep tree as-is if record is not protein coding, or if show_strains is true
 if (
     //  record.attributes.gene_type !== 'protein coding' ||
   record.attributes.show_strains === 'Yes'
 ) return categoryTree;

 // Remove the table from the category tree
 return tree.pruneDescendantNodes(individual => {
   // keep everything that isn't the table we care about
 return (
       cat.getTargetType(individual) !== 'table' ||
       cat.getRefName(individual) !== 'Strains'
     );

 //if (cat.getTargetType(individual) !== 'table') return true;
 //if (cat.getRefName(individual) !== 'Strains') return true;
 //  return false;
 }, categoryTree);
}


/** Use MetaTable to determine if a leaf is appropriate for record instance */
function pruneCategoriesByMetaTable(categoryTree, record) {
  let metaTableIndex = record.tables.MetaTable.reduce((index, row) => {
    if (index[row.target_name + '-' + row.target_type] === undefined) {
      index[row.target_name + '-' + row.target_type] = {keep: false}; 
      }
    if (index[row.target_name + '-' + row.target_type].keep) return index;
    if (row.organisms == null || row.organisms === record.attributes.organism_full) {
       index[row.target_name + '-' + row.target_type].keep = true
       }
    return index;
  }, {});
  // show tables in individual (ontology) that in metatable apply to this organim, 
  //  and tables in individual that are not in metatable 
  //  (so exclude tables in metatable that do not apply to this organim)
  return tree.pruneDescendantNodes(
    individual => {
      if (individual.children.length > 0) return true;
      if (individual.wdkReference == null) return false;
      let key = cat.getRefName(individual) + '-' + cat.getTargetType(individual);
      if (metaTableIndex[key] === undefined) return true;
      return metaTableIndex[key].keep;
    },
    categoryTree
  )
}


// Custom observers
// ----------------
//
// An observer allows us to perform side-effects in response to actions that are
// dispatched to the store.

/**
 * When record is loaded, read state from storage and emit actions to restore state.
 * When state is changed, write state to storage.
 */
function observeUserSettings(action$, state$) {
  return action$.pipe(
    filter(action => action.type === RecordActions.RECORD_RECEIVED),
    switchMap(action => {
      let state = state$.value[key];
      
      let navigationVisible = getStateFromStorage(
        storageItems.navigationVisible,
        state,
        false //isGeneRecord(state.record)
      );

      let allFields = RecordStoreModule.getAllFields(state);

      /** merge stored visibleSections */
      let expandedSections = getStateFromStorage(
        storageItems.expandedSections,
        state,
        action.payload.recordClass.urlSegment === 'mm'
          ? ['study001_gene_profiles', 'study002_gene_profiles', 'study005_gene_profiles']
          : action.payload.recordClass.urlSegment === 'hs' 
            ? ['study003_ptm']
            : allFields
      );

      let collapsedSections = expandedSections
        ? difference(allFields, expandedSections)
        : state.collapsedSections;

      let tableStates = getStateFromStorage(
        storageItems.tables,
        state,
        {}
      );

      return merge(
        of(
          RecordActions.updateNavigationVisibility(navigationVisible),
          RecordActions.setCollapsedSections(collapsedSections),
          ...Object.entries(tableStates).map(([tableName, tableState]) => ({
            type: TABLE_STATE_UPDATED,
            payload: { tableName, tableState }
          }))
        ),
        action$.pipe(
          mergeMap(action => {
            switch (action.type) {
              case RecordActions.SECTION_VISIBILITY:
              case RecordActions.ALL_FIELD_VISIBILITY:
                setStateInStorage(storageItems.expandedSections, state$.value[key]);
                break;
              case RecordActions.NAVIGATION_VISIBILITY:
                setStateInStorage(storageItems.navigationVisible, state$.value[key]);
                break;
              case TABLE_STATE_UPDATED:
                setStateInStorage(storageItems.tables, state$.value[key]);
                break;
            }
            return empty();
          })
        )
      )
    })
  );
}



// TODO Declare type and clear value if it doesn't conform, e.g., validation

/** Read state property value from storage */
function getStateFromStorage(descriptor, state, defaultValue) {
  try {
    let key = getStorageKey(descriptor, state.record);
    return persistence.get(key, defaultValue);
  }
  catch (error) {
    console.error('Warning: Could not retrieve %s from local storage.', descriptor.path, error);
    return defaultValue;
  }
}

/** Write state property value to storage */
function setStateInStorage(descriptor, state) {
  try {
    let key = getStorageKey(descriptor, state.record);
    persistence.set(key, typeof descriptor.getValue === 'function' ? descriptor.getValue(state) : get(state, descriptor.path));
  }
  catch (error) {
    console.error('Warning: Could not set %s to local storage.', descriptor.path, error);
  }
}

/** Create storage key for property */
function getStorageKey(descriptor, record) {
  let { path, isRecordScoped } = descriptor;
  return path + '/' + record.recordClassName +
    (isRecordScoped ? '/' + record.id.map(p => p.value).join('/') : '');
}

function isGeneRecord(record) {
  return record.recordClassName != 'DatasetRecordClasses.DatasetRecordClass';
}

