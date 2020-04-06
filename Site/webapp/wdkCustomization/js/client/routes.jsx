// load erythrondb-specific page controllers
import HomePageController from './controller/HomePageController';
/**
 * Wrap ErythronDB Routes
 */
export const wrapRoutes = ebrcRoutes => [
    {path: '/', component: HomePageController},
  ...ebrcRoutes
];
