<?xml version="1.0" encoding="UTF-8"?>
<jsp:root version="2.0"
	  xmlns:jsp="http://java.sun.com/JSP/Page"
	  xmlns:c="http://java.sun.com/jsp/jstl/core"
	  xmlns:fn="http://java.sun.com/jsp/jstl/functions"
	  xmlns:imp="urn:jsptagdir:/WEB-INF/tags/imp"
	  xmlns:common="urn:jsptagdir:/WEB-INF/tags/site-common">
	<jsp:directive.page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"/>
	<c:set var="req" value="${pageContext.request}" />
	<c:set var="url">${req.requestURL}</c:set>
	<c:set var="uri" value="${req.requestURI}" />

	<c:set var="baseUrl" value="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/" />
    <html>
	<body>
	    <div>
			
		<div style="position:relative">
		    <c:if test="${empty viewModel.resultFile}">
			<div class="enrich-empty-results">No genes in your result are expressed in ErythronDB datasets.</div>
		    </c:if>
		    <c:if test="${not empty viewModel.resultFile}">
				<imp:heatmapResultTitle/>
				<c:set var="resultFileUrl" value="${baseUrl}/stepAnalysisResource.do?analysisId=${analysisId}&amp;path=${viewModel.resultFile}&amp;format=json"/>
			
				<div id="gene-expression-heatmap" data-heatmap="${resultFileUrl}"></div>
		    </c:if>
		</div>
	    </div>
	</body>
    </html>
</jsp:root>
