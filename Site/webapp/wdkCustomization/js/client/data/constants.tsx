var _ARRAY_EXPRESS_ACCESSION_URL = "https://www.ebi.ac.uk/arrayexpress/experiments/";
var _WDK_GITHUB_URL = "https://github.com/VEuPathDB/WDK";


interface DatasetSearchProps {
    title: string;
    icon: string;
    internal: string;
    url: string;
    description?: string;
}

var _SEARCH_TYPE_MAP =
{
    dexp:
    {
        title: "Differential Expression (Fold Change)",
        icon: "fa-exchange fa-rotate-90",
        internal: "dexp",
        url: "showQuestion.do?questionFullName=GeneDataset.DifferentialExpression&investigation=",
        description: "Find differentially expressed genes by fold change."
    },

    rank:
    {
        title: "Ranked mRNA Expression",
        icon:  "fa-sort-amount-desc",
        internal: "rank",
        url: "showQuestion.do?questionFullName=GeneDataset.RankedExpression&investigation=",
        description: "Find top-expressed genes within a sample (cell or treatment) or across a set of samples in the study."
    },

    pattern:
    {
        title: "Expression Signature",
        icon: "fa fa-bar-chart",
        internal: "pattern",
        url: "showQuestion.do?questionFullName=GeneDataset.Pattern&investigation=",
        description: "Find genes exhibiting similar expression signatures within an erythroid lineage."
    },

    mdexp:
    {
        title: "Differential Intensity",
        icon: "fa-exchange fa-rotate-90",
        internal: "mdexp",
        url: "showQuestion.do?questionFullName=GeneDataset.GenesByProteomicsComparison&investigation=",
        description: "Find phosphorylation target proteins by fold change."
    }
};
;


export { _ARRAY_EXPRESS_ACCESSION_URL, _WDK_GITHUB_URL, _SEARCH_TYPE_MAP, DatasetSearchProps }

