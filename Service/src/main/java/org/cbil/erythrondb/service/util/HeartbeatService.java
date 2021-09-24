package org.cbil.erythrondb.service.util;

import static org.gusdb.fgputil.FormatUtil.NL;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.gusdb.fgputil.db.runner.BasicResultSetHandler;
import org.gusdb.fgputil.db.runner.SQLRunner;
import org.gusdb.wdk.model.WdkModel;
import org.gusdb.wdk.model.WdkModelException;
import org.gusdb.wdk.model.WdkRuntimeException;
import org.gusdb.wdk.service.service.AbstractWdkService;

@Path("util/heartbeat")
public class HeartbeatService extends AbstractWdkService {
    private static final Logger LOG = Logger.getLogger(HeartbeatService.class);
    
    private static final String SQL = "SELECT true AS result";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response buildResponse(String body) throws WdkModelException {
        LOG.info("Starting 'Heartbeat' Service");
        Boolean response = false;
        try {
            response = run();
            LOG.debug("query result: " + response);
        }
        
        catch(WdkRuntimeException ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        
        if (response != null) {
            return Response.status(Response.Status.OK).build();
        }
        else {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
    }
    
    private Boolean run() {   
        
        WdkModel wdkModel = getWdkModel();
        DataSource ds = wdkModel.getAppDb().getDataSource();
        BasicResultSetHandler handler = new BasicResultSetHandler();
        
        SQLRunner runner = new SQLRunner(ds, SQL, "heartbeat-query");
        runner.executeQuery(handler);
        
        List <Map <String, Object>> results = handler.getResults();
        if (!results.isEmpty() && results != null)
            return (Boolean) results.get(0).get("result");
        
        return null;
    }
    
}