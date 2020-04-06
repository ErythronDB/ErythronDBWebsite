package org.cbil.erythrondb.service.dataset;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.gusdb.wdk.model.WdkModelException;

import org.gusdb.wdk.service.service.AbstractWdkService;

import org.json.JSONException;

@Path("/search/dataset/expression")
@Produces(MediaType.APPLICATION_JSON)
public class GeneByDatasetQuestionService extends AbstractWdkService {

  @SuppressWarnings("unused")
  private static final Logger LOG = Logger.getLogger(GeneByDatasetQuestionService.class);
  // private static final String ONTOLOGY_RESOURCE = "Ontology Name: ";

  // private static final String CATEGORIES_ONTOLOGY_ALIAS = "__wdk_categories__";

  /**
   * Get information to populate the genes by dataset question (names)
   */
  @GET
  public Response getDatasets() throws JSONException {
    //return Response.ok(FormatUtil.stringCollectionToJsonArray(
    //    getWdkModel().getOntologyNames()).toString()).build();
	return Response.ok("getDatasets...").build();
  }

  /**
   * Get the information about a specific ontology.
   */
  @GET
  @Path("{questionFullName}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getDatasetsByQuestion(@PathParam("questionFullName") String questionFullName) throws WdkModelException {
    return Response.ok("ok").build();
  }


}
