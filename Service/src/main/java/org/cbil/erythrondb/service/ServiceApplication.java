package org.cbil.erythrondb.service;

import java.util.Set;

import org.gusdb.wdk.service.WdkServiceApplication;
import org.cbil.erythrondb.service.contact.ContactUsService;

// import static org.gusdb.fgputil.functional.Functions.filter;
import org.gusdb.fgputil.SetBuilder;

public class ServiceApplication extends WdkServiceApplication {
  @Override
  public Set<Class<?>> getClasses() {
    return new SetBuilder<Class<?>>()
        // add WDK services
        .addAll(super.getClasses())
        .add(ContactUsService.class)
        .toSet();
  }

}