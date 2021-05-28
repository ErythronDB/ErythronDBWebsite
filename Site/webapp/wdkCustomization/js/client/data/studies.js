
const _studies =
	[
		{
			name: "Investigation: Ontogeny of erythroid gene expression",
			type: "transcriptomics",
			type_display: "Transcriptomics",
			protocol: "study001-protocol",
			accession: "E-MTAB-1035",
			dataset_id: "study001",
			attribution: "Palis",
			description: "Comparison of global gene expression in primitive, fetal definitive, and adult definitive erythroid cells at morphologically equivalent stages of maturation purified from embryonic, fetal, and adult mice to delineate the gene anatomy of differentiating primary primitive and definitive red blood cells (RBCs).",
			display_name: "Ontogeny of erythroid gene expression",
			taxon_abbrev: "Mm",
			accession_ref: "ArrayExpress",
			display_summary: "Gene expression profiling of differentiating primitive, fetal definitive, and adult definitive erythrocytes.",
			short_display_name: "Erythroid Lineages",
			study_grant_number: "R01 DK 071116",
			study_funding_agency: "NIDDK",
			menu_text: "Ontogeny of erythropoiesis",

			individual_datasets: {
				comparison_tooltip: "Discover molecular signatures of erythropoeisis by comparing developmental cell stages within a specific erythroid lineage or equivalent cell stages across Primitive and Definitive lineages.",
				title: ["Primitive Erythropoiesis", "Fetal Definitive Erythropoiesis", "Adult Definitive Erythropoiesis"],
				search: ["dexp", "rank"]
			}

		},

		{
			name: "Investigation: EPO-regulated targets in E1, E2, and E3 erythroid progenitors",
			type: "transcriptomics",
			type_display: "Transcriptomics",
			accession: "E-MTAB-5373",
			dataset_id: "study002",
			attribution: "Wojchowski",
			description: "Global gene expression profiling of bone marrow-derived erythroid progenitor cells at E1 (CFU-e), E2 (proerythroblasts), and E3 (maturing erythroblast) stages of differentiation under stress erythropoiesis conditions and in response to EPO challenge. MACS-isolated E1, E2, and E3 stage EPCs were cultured in SP34ex media for 6 hrs in the absence of hematopoietic growth factors and the presence of insulin (to enforce survival and anti-apoptotic effects) and then exposed to rhEPO for 90 minutes. Gene expression analysis was performed using Affymetrix Mouse Genome 430 2.0 arrays; microarray data were analyzed using Bioconductor.",
			display_name: "EPO-regulated targets in erythroid progenitors",
			taxon_abbrev: "Mm",
			accession_ref: "ArrayExpress",
			display_summary: "Gene expression profiling of control and EPO-challenged bone marrow-derived erythroid progenitor cells at the E1 (CFU-e), E2 (proerythroblast) and E3 (maturing erythroblast) stages",
			short_display_name: "EPO targets: erythroid progenitors",
			menu_text: "EPO targets: Erythroid Progenitors",

			individual_datasets: {
				comparison_tooltip: "Identify candidate EPO targets by comparing EPO-challenged to control cells or identify changes in gene expression during differentiation within the treated or the control stress lineage.",
				title: ["E1 (CFU-e) erythroid progenitors", "E2 (proerythroblasts) erythroid progenitors", "E3 cells (maturing erythroblasts)"],
				search: ["dexp", "rank"]
			}
		},

		{
			name: "Investigation: EPO-regulated targets in murine E1 cells with a truncated erthropoietin receptor (EpoR)",
			type: "transcriptomics",
			type_display: "Transcriptomics",
			dataset_id: "study005",
			attribution: "Wojchowski",
			description: "Global gene expression profiling of control and EPO-challenged bone marrow-derived erythroid progenitor cells at E1 (CFU-e) with wild type and truncated EpoR-H alleles under stress erythropoiesis conditions and in response to EPO challenge. MACS-isolated E1 stage EPCs were cultured in SP34ex media for 6 hrs in the absence of hematopoietic growth factors and the presence of insulin (to enforce survival and anti-apoptotic effects) and then exposed to rhEPO for 90 minutes. The EpoR-H mouse strain was obtained by using homologous recombination to delete the distal 108 amino acids of the EpoR in ES cells.",
			display_name: "Epo-targets in E1 cells with a truncated Epo receptor",
			taxon_abbrev: "Mm",
			display_summary: "Gene expression profiling of  control and EPO-challenged bone marrow-derived erythroid progenitor cells from wtEpoR and EpoR-H mice at the E1 (CFU-e) stage.",
			short_display_name: "EPO targets: wtEpoR and EpoR-H E1 (CFU-e) cells",
			menu_text: "EPO targets: EpoR-H CFU-e",


			individual_datasets: {
				comparison_tooltip: "Find downstream targets of EPO signaling by comparing EPO-challenged to control cells within each EpoR genotype or compare across genotypes to identify differences in gene expression within treated or control cells.",
				title: ["Wild Type E1 (CFU-e) erythroid progenitors", "EpoR-H E1 (CFU-e) erythroid progenitors"],
				search: ["dexp", "rank"]
			}
		},
		{
			name: "Investigation: Targets of EPO phosphorylation in UT-7epo-E Cells",
			type: "proteomics",
			type_display: "Proteomics",
			dataset_id: "study003",
			attribution: "Wojchowski",
			description: "Using a human EPO-dependent UT-7epo-E erythroid progenitor cell model, phospho-PTM LC-MS/MS was employed to document EPOR/JAK2 regulated phospho-PTM events.  Experiments involved a short-term EPO challenge (after first withdrawing EPO from the UT-7epo-E cells) after which total cellular protein was then extracted, and hydrolyzed using trypsin or Glu-C.  Peptides modified at p-Y or p-TPP motifs were the retrieved via immunoadsorption and LC-MS/MS employed to define peptide sequences and sites and levels of EPO-mediated phosphorylation.  Data are also available for PTM-targets of hematide exposure.",
			display_name: "EPO phosphorylation PTM targets in UT-7epo-E cells",
			taxon_abbrev: "Hs",
			display_summary: "Proteomics analysis of post-translational phosphorylation of proteins in UT-7epo-E cells after EPO exposure.",
			short_display_name: "EPO Phos UT-7epo-E",
			menu_text: "EPO Phos UT-7epo-E",

			individual_datasets: {
				comparison_tooltip: "Find PTM targets of EPO by comparing EPO-Challenged to control cells.",
				title: ["one", "two", "three", "four"],
				search: ["mdexp"]
			}
		}
	]


export { _studies };