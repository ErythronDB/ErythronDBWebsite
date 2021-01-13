import React, { useLayoutEffect } from "react";
import igv from "igv/dist/igv.esm";
import {_mm_config, _hs_config} from "../../data/igv-config";

interface IgvBrowser {
    defaultLocus: string;
    webAppUrl: string;
}

export const MouseIgvBrowser: React.FC<IgvBrowser> = ({ defaultLocus, webAppUrl }) => {
    let _options = _mm_config;
    _options.locus = defaultLocus;
    _options.search = {url: `${webAppUrl}/service/track/feature?id=$FEATURE$&genome=Mouse`};
    useLayoutEffect(() => {
        //https://github.com/igvteam/igv.js/wiki/Browser-Creation
        const igvDiv = document.getElementById(`igv-${defaultLocus}`),
            options = _options;
        
        igv.removeAllBrowsers(); // deal w/duplicate tracks from things in memory
        igv.createBrowser(igvDiv, options).then((browser: any) => {});
    }, []);

    return <div style={{ width: "100%" }} className="mt-5" id={`igv-${defaultLocus}`}></div>;
};



export const HumanIgvBrowser: React.FC<IgvBrowser> = ({ defaultLocus, webAppUrl }) => {
    let _options = _hs_config;
    _options.locus = defaultLocus;
    _options.search = {url: `${webAppUrl}/service/track/feature?id=$FEATURE$&genome=Human`}
    useLayoutEffect(() => {
        //https://github.com/igvteam/igv.js/wiki/Browser-Creation
        const igvDiv = document.getElementById("igv-div"),
            options = _options;
        igv.createBrowser(igvDiv, options).then((browser: any) => {});
    }, []);

    return <span style={{ width: "100%" }} id="igv-div" />;
};


