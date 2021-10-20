import { initialize as initializeEbrc } from 'ebrc-client/bootstrap';
import * as componentWrappers from "./component-wrappers";
import wrapStoreModules from "./wrapStoreModules";

import { wrapRoutes } from './routes';


import pluginConfig from './pluginConfig';

// Initialize the application.

export const initialize =  initializeWdk => initializeEbrc({
  initializeWdk,
  componentWrappers,
  wrapRoutes,
  wrapStoreModules,
  pluginConfig
})
