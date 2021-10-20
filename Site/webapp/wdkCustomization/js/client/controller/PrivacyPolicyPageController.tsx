import React from "react";
import { PageController } from "wdk-client/Controllers";
import PrivacyPolicyPage from "../components/Routes/PrivacyPolicy/PrivacyPolicyPage";

export default class PrivacyPolicyPageController extends PageController {
  getTitle() {
    return "ErythronDB Privacy Policy";
  }

  renderView = () => <PrivacyPolicyPage/>;
}
