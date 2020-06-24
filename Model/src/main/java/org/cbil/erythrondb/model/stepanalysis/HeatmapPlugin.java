package org.cbil.erythrondb.model.stepanalysis;

import org.gusdb.wdk.model.WdkModelException;
import org.gusdb.wdk.model.WdkUserException;
import org.gusdb.wdk.model.analysis.AbstractSimpleProcessAnalyzer;

import org.gusdb.wdk.model.answer.AnswerValue;
import org.gusdb.wdk.model.user.analysis.IllegalAnswerValueException;

import static org.gusdb.fgputil.FormatUtil.NL;

import org.gusdb.fgputil.validation.ValidationBundle;
import org.gusdb.fgputil.validation.ValidationBundle.ValidationBundleBuilder;
import org.gusdb.fgputil.validation.ValidationLevel;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.gusdb.fgputil.FormatUtil;
import org.gusdb.fgputil.db.runner.BasicResultSetHandler;
import org.gusdb.fgputil.db.runner.SQLRunner;
import org.gusdb.fgputil.db.runner.SingleLongResultSetHandler;
import org.gusdb.fgputil.runtime.GusHome;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class HeatmapPlugin extends AbstractSimpleProcessAnalyzer {
	private static final Logger logger = Logger.getLogger(HeatmapPlugin.class);

	private static final String PROFILE_PARAM_KEY = "experiment";
	private static final String ORGANISM_PARAM_KEY = "organism";
	private static final String VALUE_PARAM_KEY = "value_type";
	private static final String COLOR_PARAM_KEY = "color";
	private static final String CLUSTER_SAMPLES_PARAM_KEY = "boolean_cluster_samples";

	private static final String RESULT_FILE_PREFIX = "dendro_heatmap_";
	private static final String TREE_FILE_NAME = RESULT_FILE_PREFIX + "tree";
	private static final String RESULT_FILE_NAME = RESULT_FILE_PREFIX + "complete";
	private static final String INPUT_FILE_PREFIX = "expression_";
	private static final String INPUT_FILE_NAME = INPUT_FILE_PREFIX + "internal_";
	private static final String DOWNLOAD_EXPRESSION_FILE_NAME = INPUT_FILE_PREFIX;

	private static String _sampleDisplay = "";
	private static String _geneDisplay = "";
	private static String _expressionDownloadFile = "";

	/**
	 * Retrieve list of samples associated with selected dataset and save as comma
	 * separated string also set the display values (_sampleDisplay)
	 * 
	 * @return comma separated list of samples
	 * @throws WdkModelException
	 * @throws WdkUserExpception
	 */

	private String getSampleListing() throws WdkUserException, WdkModelException {
		String profileId = getFormParams().get(PROFILE_PARAM_KEY)[0];

		String sql = "SELECT DISTINCT REPLACE(sample_abbrev, '/', '_') AS sample_abbrev," + NL
				+ " replace(sample, '; replicate ', ' R') AS sample," + NL 
				+ " series_order, sample_order" + NL
				+ "FROM ErythronDB.GeneExpressionDataTable" + NL 
				+ "WHERE profile_id = " + profileId + NL
				+ "ORDER BY series_order, sample_order";

		DataSource ds = getWdkModel().getAppDb().getDataSource();
		BasicResultSetHandler handler = new BasicResultSetHandler();

		new SQLRunner(ds, sql).executeQuery(handler);
		List<Map<String, Object>> results = handler.getResults();
		List<String> abbrev = new ArrayList<String>();
		List<String> display = new ArrayList<String>();

		for (Map<String, Object> r : results) {
			abbrev.add(r.get("sample_abbrev").toString());
			display.add(r.get("sample").toString());
		}

		_sampleDisplay = display.stream().collect(Collectors.joining(","));
		return abbrev.stream().collect(Collectors.joining(","));

	}

	/**
	 * Retrieve gene expression for each gene in result given selected dataset as a
	 * json array
	 * 
	 * @return json array
	 * @throws WdkModelException
	 * @throws WdkUserExpception
	 */

	private JSONArray retrieveJSONExpressionData() throws WdkModelException {

		String idSql = "";

		idSql = getAnswerValue().getIdSql();

		String profileId = getFormParams().get(PROFILE_PARAM_KEY)[0];
		String valueType = getFormParams().get(VALUE_PARAM_KEY)[0];

		String sql = "WITH ids AS (" + idSql  + ")," + NL
			+ "stats AS (" + NL
			+ "SELECT ge.gene_source_id," + NL
			+ "max(ge.value::numeric) AS row_max" + NL
			+ "FROM ErythronDB.GeneExpressionDataTable ge," + NL
			+ "ids" + NL
			+ "WHERE ids.source_id = ge.gene_source_id" + NL
			+ "AND ge.profile_id = ?" + NL
			+ "GROUP BY ge.gene_source_id)," + NL
			+ "scores AS ("
			+ "SELECT jsonb_build_object('record', ge.gene_source_id," + NL 
			+ "'y', ga.gene_symbol," + NL
			+ "'value'," + NL 
			+ "CASE WHEN ? = 'log2' THEN" + NL
			+ "round(log(2, ge.value::numeric), 2)" + NL
			+ "WHEN ? = 'raw' THEN ge.value::numeric" + NL
			+ "ELSE round(ge.value::numeric / stats.row_max, 2) END," + NL
			+ "'log2_value', round(log(2, ge.value::numeric), 2)," + NL
			+ "'raw_value', ge.value::numeric," + NL
			+ "'x', replace(sample, '; replicate ', ' R')," + NL 
			+ "'unit', CASE WHEN ? = 'log2' THEN 'log2 mRNA' WHEN ? = 'raw' THEN 'mRNA' ELSE 'row normalized' END) AS score_json" + NL
			+ "FROM ErythronDB.GeneExpressionDataTable ge," + NL 
			+ "ids," + NL
			+ "CBIL.GeneAttributes ga," + NL 
			+ "stats" + NL 
			+ "WHERE ids.source_id = ge.gene_source_id" + NL
			+ "AND ga.gene_id = ge.gene_id" + NL 
			+ "AND ge.profile_id = ?" + NL
			+ "AND stats.gene_source_id = ge.gene_source_id" + NL
			+ "ORDER BY ids.source_id, series_order, sample_order" + NL 
			+ ")" + NL
			+ "SELECT jsonb_agg(score_json)::text AS data_json" + NL
			+ "FROM scores";
			
		logger.debug("retrieveJSONExpressionData SQL:" + sql);

		DataSource ds = getWdkModel().getAppDb().getDataSource();
		BasicResultSetHandler result = new SQLRunner(ds, sql, "expression-json")
				.executeQuery(
					new Object[] { profileId, valueType, valueType, valueType, valueType, profileId },
					new Integer[] { Types.INTEGER, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER }, new BasicResultSetHandler());

		JSONArray data = new JSONArray((String) result.getResults().get(0).get("data_json"));
		return data;
	}

	/**
	 * Retrieve gene expression for each gene in result given selected dataset,
	 * limited to organism and write to temp file
	 * 
	 * @return file name
	 * @throws WdkModelException
	 * @throws WdkUserExpception
	 * @throws IOException
	 */

	private String retrieveTabbedExpressionData() throws WdkModelException, WdkUserException, IOException {

		String samples = getSampleListing();
		String idSql = getAnswerValue().getIdSql();
		String profileId = getFormParams().get(PROFILE_PARAM_KEY)[0];

		String sql = "SELECT ids.source_id," + NL 
				+ "ga.gene_symbol," + NL
				+ "string_agg(round(log(2, ge.value::numeric),2)::text, ',' ORDER BY series_order, sample_order) AS log2_values" + NL 
				+ "FROM ErythronDB.GeneExpressionDataTable ge," + NL 
				+ "(" + idSql + ") ids," + NL
				+ "CBIL.GeneAttributes ga" + NL 
				+ "WHERE ids.source_id = ge.gene_source_id" + NL
				+ "AND ga.gene_id = ge.gene_id" + NL
				+ "AND ge.profile_id =" + profileId + NL
				+ "GROUP BY ids.source_id, ga.gene_symbol";

		logger.debug("retrieveExpressionData SQL:" + sql);

		DataSource ds = getWdkModel().getAppDb().getDataSource();
		BasicResultSetHandler handler = new BasicResultSetHandler();

		new SQLRunner(ds, sql).executeQuery(handler);
		List<Map<String, Object>> results = handler.getResults();

		Path inputFile = Files.createTempFile(getStorageDirectory(), INPUT_FILE_NAME, ".csv");
		Path expressionFile = Files.createTempFile(getStorageDirectory(), DOWNLOAD_EXPRESSION_FILE_NAME, ".csv");
		logger.debug("INPUT FILE: " + inputFile.toString());

		List<String> genes = new ArrayList<String>();

		try (BufferedWriter writer = Files.newBufferedWriter(inputFile, StandardCharsets.UTF_8,
				StandardOpenOption.WRITE);
				BufferedWriter downloadWriter = Files.newBufferedWriter(expressionFile, StandardCharsets.UTF_8,
						StandardOpenOption.WRITE)) {

			writer.write("Gene," + samples + NL); // header
			downloadWriter.write("Gene,Symbol," + samples + NL);

			for (Map<String, Object> r : results) {
				String oString = r.get("source_id") + "," + r.get("log2_values") + NL;
				writer.write(oString);

				oString = r.get("source_id") + "," + r.get("gene_symbol") + "," + r.get("log2_values") + NL;
				downloadWriter.write(oString);

				genes.add(r.get("gene_symbol").toString());
			}
			writer.close();
			downloadWriter.close();

			// set file to group/other readable otherwise tomcat cannot access for command
			Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rw-r--r--");
			Files.setPosixFilePermissions(inputFile, perms);
			Files.setPosixFilePermissions(expressionFile, perms);
		} catch (IOException e) {
			throw new WdkModelException("Error writing Heatmap Analysis input/download file: " + inputFile.toString(),
					e);
		}

		_geneDisplay = genes.stream().collect(Collectors.joining(",")); // get display values for genes'
		_expressionDownloadFile = expressionFile.getFileName().toString();
		return inputFile.toString();
	}

	private String getResultFilePathString(String file, String extension) {
		return Paths.get(getStorageDirectory().toString(), file).toString() + extension;
	}


	@Override
	public org.json.JSONObject getResultViewModelJson() throws WdkModelException {

		ResultViewModel result = new ResultViewModel();

		String resultFile = getResultFilePathString(RESULT_FILE_NAME, ".json");
		String treeFile = getResultFilePathString(TREE_FILE_NAME, ".json");
		JSONParser parser = new JSONParser();

		try (FileReader reader = new FileReader(treeFile)) {

			Object obj = parser.parse(reader);
			JSONObject tree = new JSONObject(obj.toString()); // convert the 'simple.JSONObject to JSONObject'

			JSONArray data = retrieveJSONExpressionData();
			tree.put("heatmap", data);

			logger.debug("JSON Result: " + tree.toString());
			logger.debug("Writing to: " + resultFile);

			result.setResult(tree);
			result.setExpressionFile(_expressionDownloadFile);
			result.setColor(getFormParams().get(COLOR_PARAM_KEY)[0]);
			result.setClusterSamplesFlag(getFormParams().get(CLUSTER_SAMPLES_PARAM_KEY)[0]);
			
			return result.toJson();
		} catch (FileNotFoundException e) {
			throw new WdkModelException("Result file not found at: " + treeFile);
		} catch (ParseException e) {
			throw new WdkModelException("Error parsing tree: " + treeFile);
		} catch (IOException ioe) {
			throw new WdkModelException("Unable to process (I/O exception) result file at: " + treeFile);
		}
	}

	public ValidationBundle validateFormParams(Map<String, String[]> formParams)
			throws WdkModelException, WdkUserException {

		ValidationBundleBuilder errors = ValidationBundle.builder(ValidationLevel.SEMANTIC);

		return errors.build();
	}

	/**
	 * Make sure only one organism is represented in the results of this step
	 * 
	 * @param answerValue answerValue that will be passed to this step
	 * @throws WdkUserException
	 * @throws IllegalAnswerException if more than one organism is represented in
	 *                                this answer
	 */
	@Override
	public void validateAnswerValue(AnswerValue answerValue)
			throws IllegalAnswerValueException, WdkModelException {
		logger.info("entering validate answer value");

		String idSql = answerValue.getIdSql();
		String sql = "WITH orgs AS (SELECT DISTINCT ga.organism" + NL 
			+ "FROM CBIL.GeneAttributes ga," + NL
			+ "(" + idSql + ") r" + NL
			+ "WHERE ga.source_id = r.source_id)" + NL
			+ "SELECT CASE WHEN 'Human' IN (SELECT organism FROM orgs) AND 'Mouse' IN (SELECT organism FROM orgs) THEN 2" + NL
 			+ "WHEN 'Human' IN (SELECT organism FROM orgs) AND 'Mouse' NOT IN (SELECT organism FROM orgs) THEN 1" + NL
 			+ "ELSE 0 END AS taxon_choice";

		DataSource ds = getWdkModel().getAppDb().getDataSource();
		BasicResultSetHandler handler = new BasicResultSetHandler();
		new SQLRunner(ds, sql).executeQuery(handler);

		Map<String, Object> result = handler.getResults().get(0);

		Long count = (Long) result.get("taxon_choice");
		// check for human
		if (count.intValue() == 2) {
			throw new IllegalAnswerValueException(
					"Heatmaps arecurrently only available for murine gene expression datasets. Please filter your search result for mouse (Mm) genes and try again.");
		}
		if (count.intValue() == 1) {
			throw new IllegalAnswerValueException(
					"Heatmaps arecurrently only available for murine gene expression datasets. To continue, transform your search result into ortholog mouse (Mm) genes and try again.");
		}
		
	}

	@Override
	protected String[] getCommand(AnswerValue answerValue) throws WdkModelException, WdkUserException {

		try {
			String inputFile = retrieveTabbedExpressionData();
			String qualifiedExe = Paths.get(GusHome.getGusHome(), "bin", "clusterAnalysis").toString();

			String[] cmd = new String[] { qualifiedExe, "--cluster", "both", "-i", inputFile, "-o",
					getResultFilePathString(TREE_FILE_NAME, ".json"), "--columnDisplayNames", _sampleDisplay,
					"--rowDisplayNames", _geneDisplay };

			logger.debug("CMD: " + FormatUtil.join(cmd, " "));

			return cmd;
		} catch (IOException e) {
			throw new WdkModelException("Unable to create temp file path heatmap analysis", e);
		}
	}

	public static class ResultViewModel {
		private JSONObject _result;
		private String _expressionFile;
		private String _color;
		private String _clusterSamplesFlag;

		public ResultViewModel() {
		};

		public void setClusterSamplesFlag(String clusterSamplesFlag) {
			this._clusterSamplesFlag = clusterSamplesFlag;
		}

		public void setColor(String color) {
			this._color = color;
		}

		public void setResult(JSONObject result) {
			this._result = result;
		}

		public void setExpressionFile(String file) {
			this._expressionFile = file;
		}

		public JSONObject getResult() {
			return this._result;
		}

		public String getExpressionFile() {
			return this._expressionFile;
		}

		public String getColor() {
			return this._color;
		}

		public String getClusterSamplesFlag() {
			return this._clusterSamplesFlag;
		}

		public JSONObject toJson() {
			JSONObject json = new JSONObject();
			json.put("result", getResult());
			json.put("expressionFile", getExpressionFile());
			json.put("colorTheme", getColor());
			json.put("clusterSamples", getClusterSamplesFlag());
			return json;
		}
	} /* end ResultViewModel */

}