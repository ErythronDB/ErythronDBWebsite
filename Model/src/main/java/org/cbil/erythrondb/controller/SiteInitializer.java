package org.cbil.erythrondb.controller;

import org.gusdb.fgputil.web.ApplicationContext;
import org.gusdb.wdk.controller.WdkInitializer;


public class SiteInitializer {

  public static void startUp(ApplicationContext context) {
    WdkInitializer.initializeWdk(context);
  }

  public static void shutDown(ApplicationContext context) {
    WdkInitializer.terminateWdk(context);
  }
}
