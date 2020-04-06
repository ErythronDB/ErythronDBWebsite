<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="imp" tagdir="/WEB-INF/tags/imp" %>



<div style="text-align: right; display: block; float: right; padding-top: 35px;">

  <div style="display: inline-block; margin: 5px;">
    <form target="_blank" action="#" method="post">
      <button type="submit" title="Coming Soon" name="download-heatmap" class="btn" style="font-size: 12px;" disabled="disabled">
        <i class="fa fa-download red-text" style="margin-left:0; padding-left: 0;"> </i>
        Dowload Heatmap
      </button>
    </form>
  </div>



  <div style="display: inline-block; margin: 5px;">
    <c:url var="downloadUrl" value="/stepAnalysisResource.do?analysisId=${analysisId}&amp;path=${viewModel.expressionFile}"/>
    <a href="${downloadUrl}">
      <button class="btn" style="font-size: 12px;">
        <i class="fa fa-download blue-text" style="margin-left:0; padding-left: 0;"> </i>
        Download log<sub>2</sub> Expression
      </button>
    </a>
  </div>

</div>


<div>
<h3>Analysis Results: </h3>
</div>
