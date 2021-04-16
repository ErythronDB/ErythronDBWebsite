// load erythrondb-specific page controllers
import HomePageController from './controller/HomePageController';
import SiteSearchResultPageController from './controller/SiteSearchResultPageController';
import AboutPageController from './controller/AboutPageController';
import FAQPageController from './controller/FAQPageController';
import PrivacyPolicyPageController from './controller/PrivacyPolicyPageController';

export const STATIC_ROUTE_PATH = '/static-content';
/**
 * Wrap ErythronDB Routes
 */
export const wrapRoutes = ebrcRoutes => [
    {path: '/', component: HomePageController, rootClassNameModifier: 'erythrondb-home'},
    { path: "/lookup", component: SiteSearchResultPageController },
    { path: "/about", component: AboutPageController },
    { path: "/faq", component: FAQPageController },
    { path: "/privacy-policy", component: PrivacyPolicyPageController },

    ...ebrcRoutes,
  

];
