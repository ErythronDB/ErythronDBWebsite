import React, { useLayoutEffect } from "react";
import igv from "igv/dist/igv.esm";

interface IgvBrowser {
    defaultLocus: string;
    webAppUrl: string;
}

export const MouseIgvBrowser: React.FC<IgvBrowser> = ({ defaultLocus, webAppUrl }) => {
    useLayoutEffect(() => {
        //https://github.com/igvteam/igv.js/wiki/Browser-Creation
        const igvDiv = document.getElementById("igv-div"),
            options = {
                genome: "mm10",
                name: "Mouse GRCm38 p.5",
                locus: defaultLocus,
                tracks: [
                    {
                        name: "GENCODE vM16 Genes",
                        url: webAppUrl + '/data/gencode.vM16.basic.annotation.sorted.gtf.gz',
                        indexURL: webAppUrl + '/data/gencode.vM16.basic.annotation.sorted.gtf.gz.tbi',
                        order: 1,
                        displayMode: "EXPANDED",
                        format: "gtf",
                        indexed: true,
                        visibilityWindow: -1,
                        color: "rgb(76,171,225)",
                    }]
                
            };

        igv.createBrowser(igvDiv, options).then((browser: any) => {});
    }, []);

    return <span style={{ width: "100%" }} id="igv-div" />;
};



export const HumanIgvBrowser: React.FC<IgvBrowser> = ({ defaultLocus, webAppUrl }) => {
    useLayoutEffect(() => {
        //https://github.com/igvteam/igv.js/wiki/Browser-Creation
        const igvDiv = document.getElementById("igv-div"),
            options = {
                genome: "hg38",
                name: "Human GRCh38",
                locus: defaultLocus,
                /* tracks: [
                    {
                        name: "GENCODE v25 Genes",
                        url: webAppUrl + '/data/gencode.v25.basic.annotation.sorted.gtf.gz',
                        indexURL: webAppUrl + '/data/gencode.v25.basic.annotation.sorted.gtf.gz.tbi',
                        order: 1,
                        displayMode: "EXPANDED",
                        format: "gtf",
                        indexed: true,
                        maxHeight: 350,
                        visibilityWindow: -1,
                        color: "rgb(76,171,225)",
                    }] */
                
            };

        igv.createBrowser(igvDiv, options).then((browser: any) => {});
    }, []);

    return <span style={{ width: "100%" }} id="igv-div" />;
};


