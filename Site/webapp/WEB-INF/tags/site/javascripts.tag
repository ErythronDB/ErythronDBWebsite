<?xml version="1.0" encoding="UTF-8"?>
<jsp:root version="2.0"
	  xmlns:jsp="http://java.sun.com/JSP/Page"
	  xmlns:c="http://java.sun.com/jsp/jstl/core"
	  xmlns:imp="urn:jsptagdir:/WEB-INF/tags/imp"
	  xmlns:common="urn:jsptagdir:/WEB-INF/tags/site-common">

    <jsp:directive.attribute name="refer" 
			     type="java.lang.String"
			     required="true" 
			     description="Page calling this tag"/>


    <common:javascripts refer="${refer}"/>

    <c:if test="${refer == 'summary'}">
		<imp:script src="wdkCustomization/js/analysis/heatmap.js"/>
		<imp:script src="wdkCustomization/js/analysis/enrichment.js"/>	
		<imp:script src="wdkCustomization/js/lib/popper.min.js"/>
		<imp:script src="wdkCustomization/js/lib/gtex-viz/build/js/gtex-viz.bundle.min.js"/>	
    </c:if>

</jsp:root>
