# expression profiles in datatables
#echo "DataTable.tsx -- allow drawing of react elements inside a cell"
#cp $PROJECT_HOME/ErythronDBWebsite/patches/DataTable.tsx $PROJECT_HOME/WDKClient/Client/src/Components/DataTable/DataTable.tsx

#echo "StepAnalysis"
# cp $PROJECT_HOME/ErythronDBWebsite/patches/StepAnalysisHeatmapResult.tsx $PROJECT_HOME/WDKClient/Client/src/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisHeatmapResult.tsx
# cp $PROJECT_HOME/ErythronDBWebsite/patches/StepAnalysisPluginRegistry.tsx $PROJECT_HOME/WDKClient/Client/src/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisPluginRegistry.tsx
# cp $PROJECT_HOME/ErythronDBWebsite/patches/StepAnalysisGoEnrichmentResults.tsx $PROJECT_HOME/WDKClient/Client/src/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisGoEnrichmentResults.tsx
# cp $PROJECT_HOME/ErythronDBWebsite/patches/StepAnalysisButtonArray.tsx $PROJECT_HOME/WDKClient/Client/src/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisButtonArray.tsx

#echo "configs"
#cp $PROJECT_HOME/ErythronDBWebsite/patches/package.json $PROJECT_HOME/WDKClient/Client/package.json
# cp $PROJECT_HOME/ErythronDBWebsite/patches/tsconfig.json $PROJECT_HOME/WDKView/tsconfig.json

echo "parameterHandlers.jsx - fix radioBox depended params"
# cp $PROJECT_HOME/ErythronDBWebsite/patches/parameterHandlers.jsx $PROJECT_HOME/WDKWebsite/View/webapp/wdk/js/components/parameterHandlers.jsx

#echo "Page.tsx - remove padding on home page"
#cp $PROJECT_HOME/ErythronDBWebsite/patches/Page.tsx $PROJECT_HOME/WDKClient/Client/src/Components/Layout/Page.tsx