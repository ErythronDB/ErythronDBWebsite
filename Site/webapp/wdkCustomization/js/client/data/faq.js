var _faq = [
    {
        "question": "Why is my gene no longer reported as being expressed in the Ontogeny of Erythropiesis dataset?",
        "anchor": "missing-gene",
        "content": "Gene identifiers, probeset annotations, and mappings between genes and probes are updated over time.  The microarray expression data in this version of ErythronDB has been reprocessed and annotated using the most recent version of the Mouse430_2 array annotation available from Affymetrix.  As part of this process, some genes have been synonymized and or/no longer are mapped to the Affymetrix array."
    },

    {
        "question": "Why are Hbb-1 and Hbb-2 missing in the top results from searches on the top expressed, or differentially expressed, genes in the Ontogeny of Erythropoiesis dataset?",
        "anchor": "mouse-hemoglobins",
        "content": "In mouse, two major strain-specific haplotypes of the beta-globin gene cluster are found - a 'single' haplotype found in C57BL/-type strains, which includes two highly similar adult beta-globin genes, beta s and beta t, and a 'diffuse' haplotype found in strains such as BALB/c and 129Sv, which includes two somewhat diverse adult beta-globin genes, beta-major (Hbb-b1) and beta-minor (Hbb-b2). The primary chromosome 7 of the mouse reference genome assembly, which is derived from C57BL/6 strain mice is used as the reference for ErythronDB. This assembly represents the 'single' haplotype, while the 'diffuse' haplotype is represented in the reference genome collection by the BALB/c strain alternate contig, NT_095534.1. Expression data mapped to the 'diffuse' major haplotype Hbb-b1 in earlier versions of ErythronDB are now mapped to the 'single' haplotype Hbb-bs on primary chromosome 7.  Expression data mapped to the 'diffuse' minor haplotype Hbb-b2 are now mapped to the 'single' haplotype Hbb-bt."
    },

    {
        "question": "Why are comparison results (gene differential expression) reported differently for the Ontogeny of Erythropoeisis (Palis) and EPO Target (Wojchowski) murine gene expression datasets?",
        "anchor": "diff-exp-methods",
        "content": "The Ontogeny of Erythropoeisis (Palis) dataset is presented exactly as it was in ErythronDB 1.0.  Differential expression analysis for this study was performed using a non-parametric/permutation approach using the PaGE software (PMID: Manduchi et al. Bioinformatics. 2000; PMID:11099255).  The newly added EPO Target datasets (Wojchowski) were analyzed in R, using limma."
    },

    {
        "question": "How can I filter a gene result by gene function (Gene Ontology terms) or type?",
        "anchor": "go-filter",
        "content": "Click the 'Add Step' button and choose to combine your search result with a Text > Keyword Search/Filter.  Alternatively, if want to identify GO annotations enriched in your result, selet the 'Analyze Results' tab above the table of results."
    }

];

export {_faq}