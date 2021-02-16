package org.cbil.erythrondb.model.stepanalysis;

import org.gusdb.wdk.model.WdkModelException;
import org.gusdb.wdk.model.WdkUserException;
import org.gusdb.wdk.model.analysis.AbstractSimpleProcessAnalyzer;
import org.gusdb.wdk.model.answer.AnswerValue;

import org.json.JSONArray;

import static org.gusdb.fgputil.FormatUtil.NL;
import org.gusdb.fgputil.runtime.GusHome;

import org.json.JSONObject;
import javax.sql.DataSource;
import org.apache.log4j.Logger;

import org.gusdb.fgputil.db.runner.BasicResultSetHandler;
import org.gusdb.fgputil.db.runner.SQLRunner;

import java.sql.Types;

import java.nio.file.Paths;


public class GeneNetworkPlugin extends AbstractSimpleProcessAnalyzer {
    private static final Logger logger = Logger.getLogger(GeneNetworkPlugin.class);

    private static final String ORGANISM_PARAM_KEY = "organism";
    private static final Integer GENE_LIST_SIZE_LIMIT = 50;


    @Override
    protected String[] getCommand(AnswerValue answerValue) throws WdkModelException, WdkUserException {
        String qualifiedExe = Paths.get(GusHome.getGusHome(), "bin", "runSuccess").toString();
        String[] cmd = new String[] { qualifiedExe };
        return cmd;
    }


    @Override
    public org.json.JSONObject getResultViewModelJson() throws WdkModelException {
        JSONObject resultViewModel = new JSONObject();
        
        String organism = PluginUtil.getSingleAllowableValueParam(ORGANISM_PARAM_KEY, getFormParams(), null);
        resultViewModel.put("organism", organism);

        String idSql = getAnswerValue().getIdSql();
        String sql = "SELECT count(ga.source_id) AS num_genes," + NL + "jsonb_agg(ga.source_id)::text AS genes" + NL
                + "FROM CBIL.GeneAttributes ga," + NL + "(" + idSql + " ) ids" + NL
                + "WHERE ids.source_id = ga.source_id" + NL + "AND ga.ncbi_tax_id = ?::numeric";

        DataSource ds = getWdkModel().getAppDb().getDataSource();
        BasicResultSetHandler result = new SQLRunner(ds, sql, "fetch-ensembl-id-sql")
                .executeQuery(new Object[] { organism }, new Integer[] { Types.VARCHAR }, new BasicResultSetHandler());

        Long nGenes = (Long) result.getResults().get(0).get("num_genes");
        if (nGenes > GENE_LIST_SIZE_LIMIT) {
            resultViewModel.put("exceedsLimit", true);
        } else {
            resultViewModel.put("exceedsLimit", false);
            String geneList = (String) result.getResults().get(0).get("genes");
            resultViewModel.put("genes", new JSONArray(geneList.toString()));
        }

        return resultViewModel;
    }
}