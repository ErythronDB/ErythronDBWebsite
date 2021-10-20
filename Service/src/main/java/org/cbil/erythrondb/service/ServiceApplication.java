package org.cbil.erythrondb.service;

import java.util.Set;

import org.gusdb.wdk.service.WdkServiceApplication;
import org.cbil.erythrondb.service.contact.ContactUsService;
import org.cbil.erythrondb.service.search.GeneLookupService;
import org.cbil.erythrondb.service.browser.FeatureLookupService;
import org.eupathdb.common.service.announce.SiteMessagesService;
import org.cbil.erythrondb.service.util.HeartbeatService;

// import static org.gusdb.fgputil.functional.Functions.filter;
import org.gusdb.fgputil.SetBuilder;

public class ServiceApplication extends WdkServiceApplication {
  @Override
  public Set<Class<?>> getClasses() {
    return new SetBuilder<Class<?>>()
        // add WDK services
        .addAll(super.getClasses())
        .add(ContactUsService.class)
        .add(GeneLookupService.class)
        .add(FeatureLookupService.class)
        .add(SiteMessagesService.class)
        .add(HeartbeatService.class)
        .toSet();
  }

}