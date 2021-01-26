import React from "react";
import { PageController } from "wdk-client/Controllers";
import AboutPage from "../components/Routes/AboutPage/AboutPage";

export default class AboutPageController extends PageController {
  getTitle() {
    return "About ErythronDB";
  }

  renderView = () => <AboutPage />;
}
