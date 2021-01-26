import React from "react";
import { PageController } from "wdk-client/Controllers";
import FAQPage from "../components/Routes/FAQPage/FAQPage";

export default class FAQPageController extends PageController {
  getTitle() {
    return "ErythronDB FAQ";
  }

  renderView = () => <FAQPage/>;
}
