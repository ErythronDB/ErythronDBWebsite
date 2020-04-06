(function ($) {
    'use strict';

    var heatmapConfig = {
        id: 'gene-expression-heatmap',
        useLog: false,
        logBase: 10,
        //width: 600, // outer width
       // height: 600, // outer height
        marginLeft: 20,
        marginRight: 40,
        marginTop: 30,
        marginBottom: 50,
        rowTreePanelWidth: 50,
        colTreePanelHeight: 50,
        colorScheme: "RdBu",
        cornerRadius: 2,
        columnLabelHeight: 200,
        columnLabelAngle: 60,
        columnLabelPosAdjust: 10,
        rowLabelWidth: 200,
        legendSpace: 50
    };


    // Subscribe to events published by the analysis framework.
    //
    // Each callback function is called with an analysis object.
    //
    // An analysis object has the following properties:
    //  - name: The name of the analysis instance, as defined in the model
    //  - id:   The analysis ID

    $(document).on('analysis:resultsload:gene-expression-heatmap', resultsload);
    $(document).on('analysis:remove:gene-expression-heatmap', removeEvents);

    function removeEvents(event, analysis) {
        $(window).off('resize.enrichment' + analysis.id);
      }
    
    // draw heatmap
    function resultsload(event) {

        var heatmapData;
        var resultFilePath = $("#gene-expression-heatmap").data("heatmap");
        // console.log(resultFilePath);

        $.getJSON(resultFilePath, function (data) { 
            heatmapConfig.data = data;
            // console.log(heatmapConfig);
            GTExViz.dendroHeatmap(heatmapConfig);
        })
            .error(function(jqXHR, textStatus, errorThrown) {
                        console.log("error " + textStatus);
                        console.log("incoming Text " + jqXHR.responseText);
                        alert("ERROR: Unable to load result from: " + resultFilePath);
            });
  
        

    }
}(jQuery));
