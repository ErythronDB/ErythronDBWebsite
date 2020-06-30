import { initialize } from 'ebrc-client/bootstrap';
import * as componentWrappers from './componentWrappers';

import { wrapRoutes } from './routes';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import pluginConfig from './pluginConfig';

// Initialize the application.
const castInitialize: any = initialize;

initialize({
  componentWrappers,
  wrapRoutes,
  pluginConfig
});

import 'site/wdkCustomization/css/client.css'; 
import 'site/wdkCustomization/sass/client.scss';