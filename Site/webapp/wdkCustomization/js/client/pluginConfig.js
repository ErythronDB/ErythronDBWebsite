import {
  // ResultTableSummaryViewPlugin,
  StepAnalysisPathwayEnrichmentResults,
} from "wdk-client/Plugins";

import { StepAnalysisGoEnrichmentResults } from "./components/StepAnalysis/StepAnalysisGoEnrichmentResults";
import { StepAnalysisHeatmapResult } from "./components/StepAnalysis/StepAnalysisHeatmapResult";
import { StepAnalysisGeneNetworkResults } from "./components/StepAnalysis/StepAnalysisGeneNetworkResults";

import DefaultQuestionForm from "./components/Components/DefaultQuestionForm";

export default [
  /* {
      type: 'questionFilter',
      name: 'matched_transcript_filter_array',
      component: MatchedTranscriptsFilterPlugin
    },
    {
      type: 'questionFilter',
      name: 'gene_boolean_filter_array',
      component: MatchedTranscriptsFilterPlugin
    },*/

  {
    type: "questionForm",
    component: DefaultQuestionForm,
  },

  {
    type: "stepAnalysisResult",
    name: "gene-network",
    component: StepAnalysisGeneNetworkResults,
  },

  {
    type: "stepAnalysisResult",
    name: "pathway-enrichment",
    component: StepAnalysisPathwayEnrichmentResults,
  },
  {
    type: "stepAnalysisResult",
    name: "custom-go-enrichment",
    component: StepAnalysisGoEnrichmentResults,
  },
  {
    type: "stepAnalysisResult",
    name: "gene-expression-heatmap",
    component: StepAnalysisHeatmapResult,
  },
];
