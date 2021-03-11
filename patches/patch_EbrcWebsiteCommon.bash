# eupath buttons
# echo "remove eupath buttons styling"
cp $PROJECT_HOME/ErythronDBWebsite/patches/eupathdb-Buttons.scss $PROJECT_HOME/EbrcWebsiteCommon/Site/webapp/css/eupathdb-Buttons.scss

echo "DatasetRecordClasses.DatasetRecordClass.jsx"
cp $PROJECT_HOME/ErythronDBWebsite/patches/DatasetRecordClasses.DatasetRecordClass.jsx $PROJECT_HOME/EbrcWebsiteCommon/Site/webapp/wdkCustomization/js/client/components/records/DatasetRecordClasses.DatasetRecordClass.jsx

echo "Announcements"
cp $PROJECT_HOME/ErythronDBWebsite/patches/Announcements.jsx $PROJECT_HOME/EbrcWebsiteCommon/Site/webapp/wdkCustomization/js/client/components/Announcements.jsx