import React from 'react';
import { ViewController } from 'wdk-client/Controllers';
import Footer   from '../components/Layout/Footer';

export default class FooterController extends ViewController {
  renderView() {
    return <Footer/>;
  }
}
