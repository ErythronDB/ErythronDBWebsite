// load erythrondb-specific page controllers
import HomePageController from './controller/HomePageController';
import SiteSearchResultPageController from './controller/SiteSearchResultPageController';
/**
 * Wrap ErythronDB Routes
 */
export const wrapRoutes = ebrcRoutes => [
    {path: '/', component: HomePageController},
    { path: "/lookup", component: SiteSearchResultPageController },
  ...ebrcRoutes
];
