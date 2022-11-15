import { scientificCellFactory, decimalCellFactory, integerCell } from 'wdk-client/Core/MoveAfterRefactor/Components/StepAnalysis/Utils/StepAnalysisResults';
import { StepAnalysisResultPluginProps } from 'wdk-client/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisResultsPane';
import React, { useEffect, Fragment, useState } from 'react';
import { StepAnalysisButtonArray } from './StepAnalysisButtonArray';
import Button from 'react-bootstrap/Button';
import DendroHeatmap from '../../../lib/gtex-viz/src/modules/DendroHeatmap';
import DendroHeatmapConfig from '../../../lib/gtex-viz/src/modules/DendroHeatmapConfig';

import { FormParams } from 'wdk-client/Utils/StepAnalysisUtils';

interface HeatmapResult {
    colTree: any;
    heatmap: any;
    rowTree: any;
}


interface HeatmapProps {
    data: HeatmapResult;
    colorTheme: string;
    clusterSamples: Boolean;
    webAppUrl?: string;
}


function _createToolbar(dmap: any, ids: any) {
    let toolbar = dmap.createToolbar(ids.toolbar, dmap.tooltip);
    toolbar.createDownloadSvgButton(ids.buttons.save, ids.svg, `${ids.root}-save.svg`, ids.clone);
}

const Heatmap: React.SFC<HeatmapProps> = props => {
    const { data, colorTheme, clusterSamples, webAppUrl } = props;
    //const [ renderedHeatmap, setRenderedHeatmap ] = useState(0);


    useEffect(() => {
        if (data) {
            let dmap = (clusterSamples) ? new DendroHeatmap(data.colTree, data.rowTree, data.heatmap, colorTheme, undefined, undefined, undefined, false)
             : new DendroHeatmap(undefined, data.rowTree, data.heatmap, colorTheme, undefined, undefined, undefined, false)
             // false is to set useLog=false; undefined are placeholders for the optional parameters before useLog
            //let toolbar = dmap.createToolbar(toolbar, dmap.tooltip);
            dmap.render("gene-expression-heatmap", "gene-expression-heatmap-svg", true, true, "top", 8);
        }
    }, []);

    return (
        <div id="gene-expression-heatmap-result">
            <div id="gene-expression-heatmap-toolbar"></div>
            <div id="gene-expression-heatmap"></div>
        </div>

    )

}


const stepAnalysisButtonConfigFactory = (
    stepId: number,
    analysisId: number,
    expressionFile: string,
    webAppUrl: string
) => [
        {
            key: 'download',
            href: `${webAppUrl}/service/users/current/steps/${stepId}/analyses/${analysisId}/resources?path=${expressionFile}`,
            iconClassName: 'fa fa-download blue-text',
            contents: 'Download Data'
        },
        {
            key: 'download-png',
            href: `${webAppUrl}/service/users/current/steps/${stepId}/analyses/${analysisId}/resources?path=expression_heatmap.png`,
            iconClassName: 'fa fa-download blue-text',
            contents: 'Download PNG'
        },
        {
            key: 'download-svg',
            href: `${webAppUrl}/service/users/current/steps/${stepId}/analyses/${analysisId}/resources?path=expression_heatmap.svg`,
            iconClassName: 'fa fa-download blue-text',
            contents: 'Download SVG'
        }
    ];

export const StepAnalysisHeatmapResult: React.SFC<StepAnalysisResultPluginProps> = ({
    analysisResult,
    analysisConfig,
    webAppUrl
}) => (
        <Fragment>
            <StepAnalysisButtonArray configs={stepAnalysisButtonConfigFactory(
                analysisConfig.stepId,
                analysisConfig.analysisId,
                analysisResult.expressionFile,
                webAppUrl)}/>
           
            <h3>Analysis Results:   </h3>
            <Heatmap data={analysisResult.result} colorTheme={analysisResult.colorTheme} clusterSamples={analysisResult.clusterSamples === 'true'}></Heatmap>
        </Fragment>
    );
