import React from "react";
import { PageController } from "wdk-client/Controllers";
import SiteSearchResultPage from "../components/Routes/SiteSearchResultPage/SiteSearchResultPage";

export default class SiteSearchResultPageController extends PageController {
  getTitle() {
    return "ErythronDB Gene Search";
  }

  renderView = () => <SiteSearchResultPage />;
}
