
import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'querystring';
import { emptyAction } from 'wdk-client/Core/WdkMiddleware';
import { Link } from 'wdk-client/Components';
import { getSingleRecordAnswerSpec } from 'wdk-client/Utils/WdkModel';

import ErythronDBFooter from './components/Layout/Footer';
import ErythronDBHeader from './components/Layout/Header';

import newFeatureImage from 'wdk-client/Core/Style/images/new-feature.png';

export const SiteHeader = () => ErythronDBHeader;
export const Footer = () => ErythronDBFooter; 

const stopPropagation = event => event.stopPropagation();
