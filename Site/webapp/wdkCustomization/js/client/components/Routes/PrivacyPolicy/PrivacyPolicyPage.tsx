import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link as RouterLink } from "wdk-client/Components";
import { safeHtml } from "wdk-client/Utils/ComponentUtils";
import { CompositeService as WdkService } from "wdk-client/Service/ServiceMixins";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PrivacyPolicyPage: React.FC<RouteComponentProps<any>> = () => {
  return (
    <Container fluid={true}>
      <h1 id="eupathdb-website-privacy-policy">
        ErythronDB Website Privacy Policy
      </h1>

      <div className="static-content">
        <p>UPDATED: April 12, 2020</p>
        <h2 id="introduction">Introduction</h2>
        <p>
          ErythronDB (also referred to as ‘we’ throughout this document) is
          committed to protecting its users’ data and privacy. The purpose of
          this page is to provide you with information about how the data we
          collect from users of the ErythronDB website is used or shared. We may
          update this Privacy Notice from time to time. We encourage you to
          visit this page frequently and take note of the date updated field
          above.
        </p>
        <p>
          We do not use or share any of your personal information for any
          purpose unrelated to the functionality of the websites; however, we do
          collect some information to help us understand how our sites are being
          used in order to improve community support and to enhance the
          ErythronDB community’s experience when visiting our sites.
        </p>
        <h2 id="information-automatically-collected">
          Information Automatically Collected
        </h2>
        <p>
          When you browse ErythronDB, certain information about your visit
          will be collected. We automatically collect and store the following
          type of information about your visit:
        </p>
        <ul>
          <li>
            <p>
              The IP address of the client making the request. Often the IP
              address is that of your personal computer or smart phone; however,
              it might be that of a firewall or proxy your internet provider
              manages.
            </p>
          </li>
          <li>
            <p>
              The operating system and information about the browser used when
              visiting the site.
            </p>
          </li>
          <li>
            <p>The date and time of each visit.</p>
          </li>
          <li>
            <p>Pages visited.</p>
          </li>
          <li>
            <p>
              The address of a referring page. If you click a link on a website
              that directs you to a ErythronDB page, the address of that
              originating web page will be collected. This “referrer”
              information is transmitted as part of the browser and server
              communications; it is not based on any marketing or partnering
              agreements with the referring site.
            </p>
          </li>
        </ul>
        <p>
          This automatically collected information does not identify you
          personally.
          We use this information to measure the number of visitors to our site.
          The aggregate data may be included in prospectuses and reports to
          funding agencies.
        </p>
        <h2 id="information-you-directly-provide">
          Information You Directly Provide
        </h2>
        <p>
          The Basket, Favorites, and Public Strategies features of 
          the ErythronDB website require that you
          register for an account. A valid email address is required so we can
          send you your temporary account password. An anonymous email service
          can be used if you do not want to provide personally identifying
          information.
        </p>
        <p>
          Your email address will be used to send you infrequent alerts if you
          subscribe to receive them. We do not sell or distribute email
          addresses to third parties.
        </p>
        <p>
          We also ask for your name and institution during account registration.
          If you make one of
          your strategies public, your name and institution will be displayed
          with it. We do not routinely verify the validity of names and
          institutions associated with public strategies; however,
          we will delete accounts if we believe them to be
          fraudulent based on inappropriate activity or posted content. We will
          not sell or distribute your name or institution to third parties.
        </p>
        <p>
          When you log in, the client IP address is recorded. This IP address
          can be correlated with the address automatically collected as noted
          above. If your user profile personally identifies you, then it may be
          possible to associate you with your detailed activity on ErythronDB.
        </p>
        <h2 id="how-eupathdb-uses-cookies">How ErythronDB Uses Cookies</h2>
        <p>
          ErythronDB uses cookies to associate multiple requests by your web
          browser into a stateful session. Cookies are essential to track the
          state of query strategies, gene baskets and authentication.
        </p>
        <p>
          Some cookies persist only for a single session. The information is
          recorded temporarily and is erased when the user quits the session or
          closes the browser. Others may be persistently stored on the hard
          drive of your computer until you manually delete them from a browser
          folder or until they expire, which can be months after they were last
          used.
        </p>
        <p>
          Cookies can be disabled in your browser (refer to your browser’s
          documentation for instructions); however, the majority of the website
          functionality will be unavailable if cookies are disabled.
        </p>
        <h3 id="google-analytics">Google Analytics</h3>
        <p>
          Google Analytics provides aggregate measurements of website traffic
          including counts of page hits and unique users along with statistics
          on countries of origin.
        </p>
        <p>
          The raw measurements and statistics are only available to approved
          ErythronDB staff. Aggregated data may be included in prospectuses and
          reports to funding agencies.
        </p>

        <h2 id="third-party-websites-and-applications">
          Third-Party Websites and Applications
        </h2>
        <p>
          ErythronDB provides links to third-party websites.  These sites and any affiliated
          applications are not exclusively operated or
          controlled by ErythronDB. By using these third-party websites,
          individuals may be providing nongovernmental third-parties with access
          to personally identifying information.
        </p>

        <h2 id="your-rights-based-on-the-general-data-protection-regulation-gdpr">Your Rights based on the General Data Protection Regulation (GDPR)</h2>

        <p>
          To read more about GDPR please check the{" "}
          <a target="_blank" href="https://gdpr-info.eu">
            GDPR website
          </a>
          .
        </p>
        <ol type="1">
          <li>
            The right of transparency and modalities. The privacy policy should
            be clear and easy to follow in explaining what data we collect and
            how we use it.
          </li>
          <li>
            The right to be informed about when data is gathered. This is
            described in the privacy policy, during the registration process (if
            you choose to register), site banner and an email sent out to all
            registered users on May 25, 2018.
          </li>
          <li>
            The right of access. You can ask for what sepecific data we have
            about you and how we use it.
          </li>
          <li>
            The right to rectification. We will correct any errors in your
            personal data that you point out to us.
          </li>
          <li>
            The right to be forgotten. We are happy to delete your account and
            info when you make such a request.
          </li>
          <li>
            The right to restrict processing. You have the right to request that
            we restrict the use of your data.
          </li>
          <li>
            The right for notification obligation regarding
            rectification/erasure/restriction.
          </li>
          <li>The right to data portability.</li>
          <li>
            The right to object to the processing of your personal data at any
            time.
          </li>
          <li>
            The right in relation to automated decision making and profiling.
            Basically, you have the right not to be subject to decisions based
            solely on automated processing which significantly affect you.
          </li>
        </ol>
        <p>
          To make any of the above stated requests or if you have any questions
          please contact us (link at bottom of page).
        </p>
      </div>
    </Container>
  );
};

export default withRouter(PrivacyPolicyPage);
