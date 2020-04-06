import React from 'react';
import { PageController } from 'wdk-client/Controllers';
import HomePage from '../components/Routes/HomePage/HomePage';

export default class HomePageController extends PageController {

  getTitle() {
    return 'ErythronDB';
  }

  renderView() {
    return <HomePage/>;
  }
}