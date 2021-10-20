# expression profiles in datatables
echo "DataTable.tsx -- allow drawing of react elements inside a cell"
cp $PROJECT_HOME/ErythronDBWebsite/patches/DataTable.tsx $PROJECT_HOME/WDKClient/Client/src/Components/DataTable/DataTable.tsx

echo "configs"
cp $PROJECT_HOME/ErythronDBWebsite/patches/package.json $PROJECT_HOME/WDKClient/Client/package.json

echo "remove checkbox tree constraint on grouping when < 5 categories for searches"
cp $PROJECT_HOME/ErythronDBWebsite/patches/SearchInputSelector.tsx $PROJECT_HOME/WDKClient/Client/src/Views/Strategy/SearchInputSelector.tsx
# echo "parameterHandlers.jsx - fix radioBox depended params"
# cp $PROJECT_HOME/ErythronDBWebsite/patches/parameterHandlers.jsx $PROJECT_HOME/WDKWebsite/View/webapp/wdk/js/components/parameterHandlers.jsx

echo "user registration"
cp $PROJECT_HOME/ErythronDBWebsite/patches/UserRegistration.jsx $PROJECT_HOME/WDKClient/Client/src/Views/User/Profile/UserRegistration.jsx

echo "logout message"
cp $PROJECT_HOME/ErythronDBWebsite/patches/UserSessionStoreModule.ts $PROJECT_HOME/WDKClient/Client/src/StoreModules/UserSessionStoreModule.ts