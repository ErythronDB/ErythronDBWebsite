<?xml version="1.0" encoding="UTF-8"?>
<jsp:root version="2.0" xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:c="http://java.sun.com/jsp/jstl/core" xmlns:fn="http://java.sun.com/jsp/jstl/functions"
 xmlns:imp="urn:jsptagdir:/WEB-INF/tags/imp">
	<jsp:directive.page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" />
	<html>

			<style type="text/css">
				.block {
				   display: block;
				}
			 </style>

	<body>
		<div class="ui-helper-clearfix">
			<div style="text-align:center">
				<style>
					.go-form-table td {
			 text-align: left;
			 vertical-align: top;
		     }
		     .go-form-table span {
			 display: inline-block;
			 margin-top: 4px;
			 font-weight: bold;
		     }
		    </style>
				<form>
					<table class="go-form-table" style="margin:0px auto">
						<tr>
							<td>
								<label>
									<span style="font-weight:bold; padding-right: .5em;">Dataset</span>
									<imp:helpIcon helpContent="${viewModel.datasetParamHelp}" />
								</label>
							</td>
							<td>
								<c:forEach var="item" items="${viewModel.datasetOptions}">
								<label class="block">
								<input type="radio" name="dataset" value="${item.term}"/>
											${item.display}</label>
									
								</c:forEach>
							</td>
						</tr>

						<tr>
							<td>
								<label>
									<span style="font-weight:bold; padding-right: .5em;">Color By</span>
									<imp:helpIcon helpContent="${viewModel.expressionParamHelp}" />
								</label>
							</td>
							<td>
								<c:forEach var="item" items="${viewModel.expressionOptions}">
								<label class="block">
								<input checked="checked" type="radio" name="value_type" value="${item.term}"/>
											${item.display}</label>
									
								</c:forEach>
							</td>
						</tr>


						<tr>
							<td colspan="2" style="text-align:center">
								<input type="submit" value="Submit" />
							</td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</body>

	</html>
</jsp:root>