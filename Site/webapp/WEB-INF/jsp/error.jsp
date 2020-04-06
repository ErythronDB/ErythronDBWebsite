<?xml version="1.0" encoding="UTF-8"?>
<jsp:root version="2.0"
	  xmlns:jsp="http://java.sun.com/JSP/Page"
	  xmlns:common="urn:jsptagdir:/WEB-INF/tags/site-common"
	  xmlns:imp="urn:jsptagdir:/WEB-INF/tags/imp">
  <jsp:directive.page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"/>
  <common:pageFrame title="${applicationScope.wdkModel.displayName} :: Error" refer="error">
    <imp:errorPageContent/>
  </common:pageFrame>
</jsp:root>
