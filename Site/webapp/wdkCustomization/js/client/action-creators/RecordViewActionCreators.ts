
export const TABLE_STATE_UPDATED = 'eupathdb-record-view/table-state-updated';

export const updateTableState = (tableName: string, tableState: any) => ({
  type: TABLE_STATE_UPDATED,
  payload: { tableName, tableState }
});
