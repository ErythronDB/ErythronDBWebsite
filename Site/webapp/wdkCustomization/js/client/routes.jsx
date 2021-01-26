// load erythrondb-specific page controllers
import HomePageController from './controller/HomePageController';
import SiteSearchResultPageController from './controller/SiteSearchResultPageController';
import AboutPageController from './controller/AboutPageController';
import FAQPageController from './controller/FAQPageController';
/**
 * Wrap ErythronDB Routes
 */
export const wrapRoutes = ebrcRoutes => [
    {path: '/', component: HomePageController},
    { path: "/lookup", component: SiteSearchResultPageController },
    { path: "/about", component: AboutPageController },
    { path: "/faq", component: FAQPageController },
  ...ebrcRoutes
];
