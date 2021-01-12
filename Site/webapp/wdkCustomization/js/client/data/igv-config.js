
const _mm_tracks = [
    {
        name: "GENCODE vM16 Genes",
        url: '../../../data/mm10/gencode.vM16.basic.annotation.sorted.gtf.gz',
        indexURL: '../../../data/mm10/gencode.vM16.basic.annotation.sorted.gtf.gz.tbi',
        order: 1,
        displayMode: "EXPANDED",
        format: "gtf",
        indexed: true,
        visibilityWindow: -1,
        color: "rgb(76,171,225)"
    },
   /* {
        name: "UniProt Proteome",
        url: '../../../data/mm10/UP000000589_10090_proteome.bed.gz',
        indexURL: '../../../data/mm10/UP000000589_10090_proteome.bed.gz.tbi',
        order: 2,
        format: "bed",
        type: "annotation",
        indexed: true
    } */
];

const _mm_config = {
    reference: {
        id: "Mouse (GRCm38p.5/mm10)",
        name: "Mouse (GRCm38p.5/mm10)",
        fastaURL: "../../../data/mm10/mm10.fa",
        indexURL: "../../../data/mm10/mm10.fa.fai",
        cytobandURL: "../../../data/mm10/cytoBandIdeo.txt.gz"
    },
    locus: "",
    search: {},
    //showNavigation: false,
    //flanking: 50000,
    tracks: _mm_tracks
};


const _hs_tracks = [
    {
        name: "GENCODE v27 Genes",
        url: '../../../data/hg38/gencode.v27.basic.annotation.sorted.gtf.gz',
        indexURL: '../../../data/hg38/gencode.v27.basic.annotation.sorted.gtf.gz.tbi',
        order: 1,
        displayMode: "EXPANDED",
        format: "gtf",
        indexed: true,
        maxHeight: 350,
        visibilityWindow: -1,
        color: "rgb(76,171,225)",
    },
    {
        name: "UniProt Proteome",
        url: '../../../data/hg38/UP000005640_9606_proteome.bed.gz',
        indexURL:  '../../../data/hg38/UP000005640_9606_proteome.bed.gz.tbi',
        order: 2,
        format: "bed",
        type: "annotation",
        indexed: true
    }
];

const _hs_config = {
    reference: {
        id: "hg38",
        name: "Human (GRCh38/hg38)",
        fastaURL: "../../../data/hg38/hg38.fa",
        indexURL: "../../../data/hg38/hg38.fa.fai",
        cytobandURL: "../../../data/hg38/cytoBandIdeo.txt.gz"
    },
    locus:"", 
    search: {},
    tracks: _hs_tracks
};

export { _mm_config, _hs_config };