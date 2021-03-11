import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useWdkEffect } from "wdk-client/Service/WdkService";
import { Link } from "wdk-client/Components";
import { safeHtml } from "wdk-client/Utils/ComponentUtils";
import { CompositeService as WdkService } from "wdk-client/Service/ServiceMixins";
import { SearchResult, buildRouteFromResult } from "../../Components/AutoCompleteSearch/AutoCompleteSearch";
import { chain, isEmpty, isObject, get } from "lodash";

import "./SiteSearchResultPage.scss";

interface SiteSearchResultPageNavProps {
    mm_genes: number;
    hs_genes: number;
}

const SiteSearchResultPageNav: React.FC<SiteSearchResultPageNavProps> = ({ mm_genes, hs_genes}) => {
    return (
        <div className="flex-column">
            {mm_genes > 0 && (
                <a className="nav-link" href="#mm">
                    {mm_genes} Mouse <em>(Mm)</em> Gene{mm_genes > 1 ? "s" : ""}
                </a>
            )}
            {hs_genes > 0 && (
                <a className="nav-link" href="#hs">
                    {hs_genes} Human <em>(Hs)</em> Gene{hs_genes > 1 ? "s" : ""}
                </a>
            )}
        </div>
    );
};

const SiteSearchResultPage: React.FC<RouteComponentProps<any>> = ({ location }) => {
    const [results, setResults] = useState<SearchResult[]>(),
        sendRequest = (searchTerm: string) => (service: WdkService) => {
            !!searchTerm &&
                service
                    ._fetchJson<SearchResult[]>("get", `/lookup/gene?query=${searchTerm}`)
                    .then((res) => setResults(res))
                    .catch((e) => {
                        setResults([]);
                        console.log("caught: " + e);
                    });
        };

    const searchTerm = location.search.split("=")[1];

    //for now empty results are coming back as an empty object rather than array, so cover both possibilities
    const resultsArray = isEmpty(results) ? [] : results,
        counts = chain(resultsArray)
            .groupBy("record_type")
            .mapValues((v) => v.length)
            .value();

    //search term could change in header box
    useWdkEffect(sendRequest(searchTerm), [searchTerm]);

    const nMmGenes = get(counts, "mm");
    const nHsGenes = get(counts, "hs");

    return (
        <div>
            {isObject(results) ? (
                resultsArray.length ? (
                    <React.Fragment>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-3 sticky-top h-100">
                                    <h2>Search Results</h2>
                                    <strong className="text-danger">{resultsArray.length}</strong> results were found
                                    for the search <strong className="text-danger">{searchTerm}</strong>
                                    <SiteSearchResultPageNav
                                        mm_genes={nMmGenes}
                                        hs_genes={nHsGenes}
                                    />
                                </div>
                                <div className="col-sm-8">
                                    <a id="mm" />
                                    {nMmGenes > 0 && (
                                        <h4 className="mt-5 mb-2 pb-2 site-search-result__section-title">Mouse <em>(Mm)</em> Genes</h4>
                                    )}
                                    {nMmGenes > 0 && resultsArray.map((res) => _buildSearchResult(res, "mm"))}

                                    <a id="hs" />
                                    {nHsGenes > 0 && (
                                        <h4 className="mt-5 mb-2 pb-2 site-search-result__section-title">Human <em>(Hs)</em> Genes</h4>
                                    )}
                                    {nHsGenes > 0 && resultsArray.map((res) => _buildSearchResult(res, "hs"))}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>Search Results</h2>
                                <strong className="text-danger">No</strong> results were found for the search{" "}
                                <strong className="text-danger">{searchTerm}</strong>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Search Results</h2>
                            Loading results for the search <strong className="text-danger">{searchTerm}</strong>...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const _buildSearchResult = (result: SearchResult, recordType: string) => {
    return (
        result.record_type === recordType && (
            <div key={result.primary_key} className="mb-3">
                <div>
                    <Link className="h5 wdk-Link" to={buildRouteFromResult(result)}>
                        {safeHtml(result.display)}
                    </Link>
                </div>

                <div>
                    {safeHtml(result.description)}
                </div>
            </div>
        )
    );
};

export default withRouter(SiteSearchResultPage);
