/*==============================================================================
 * This SQL script will create additional User DB schemas and all required
 * tables and sequences common to Ebrc websites.
 *============================================================================*/

DROP SCHEMA IF EXISTS ANNOUNCE CASCADE;
CREATE SCHEMA ANNOUNCE;

/*==============================================================================
 * create tables
 *============================================================================*/

CREATE TABLE announce.projects 
(
  PROJECT_ID    NUMERIC(3,0) NOT NULL PRIMARY KEY, 
  PROJECT_NAME  CHARACTER VARYING(150) NOT NULL
);

-- existing projects
INSERT INTO announce.projects(PROJECT_ID, PROJECT_NAME) VALUES(10, 'ErythronDB');

GRANT SELECT, INSERT, UPDATE, DELETE ON announce.projects TO COMM_WDK_W;

--==============================================================================

CREATE TABLE announce.category
(
  CATEGORY_ID    NUMERIC(3,0) NOT NULL PRIMARY KEY,
  CATEGORY_NAME  CHARACTER VARYING(150) NOT NULL 
);

INSERT INTO announce.category(CATEGORY_ID, CATEGORY_NAME) VALUES(10, 'Information');
INSERT INTO announce.category(CATEGORY_ID, CATEGORY_NAME) VALUES(20, 'Degraded');
INSERT INTO announce.category(CATEGORY_ID, CATEGORY_NAME) VALUES(30, 'Down');
INSERT INTO announce.category(CATEGORY_ID, CATEGORY_NAME) VALUES(230, 'Event');

GRANT SELECT, INSERT, UPDATE, DELETE ON announce.category TO COMM_WDK_W;

--==============================================================================

CREATE TABLE announce.messages
(
  MESSAGE_ID        NUMERIC(10,0) NOT NULL PRIMARY KEY,
  MESSAGE_TEXT      CHARACTER VARYING(4000) NOT NULL,
  MESSAGE_CATEGORY  CHARACTER VARYING(150) NOT NULL,
  START_DATE        DATE NOT NULL,
  STOP_DATE         DATE NOT NULL,
  ADMIN_COMMENTS    CHARACTER VARYING(4000),
  TIME_SUBMITTED    TIMESTAMP NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON announce.messages TO COMM_WDK_W;

--==============================================================================

CREATE TABLE announce.message_projects
(
  MESSAGE_ID  NUMERIC(10,0) NOT NULL PRIMARY KEY,
  PROJECT_ID  NUMERIC(3,0) NOT NULL,
  CONSTRAINT "MESSAGE_ID_FKEY" FOREIGN KEY (MESSAGE_ID)
      REFERENCES announce.messages (MESSAGE_ID),
  CONSTRAINT "PROJECT_ID_FKEY" FOREIGN KEY (PROJECT_ID)
      REFERENCES announce.projects (PROJECT_ID)
);

CREATE INDEX message_projects_idx01 ON announce.message_projects (project_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON announce.message_projects TO COMM_WDK_W;

/*==============================================================================
 * create sequences
 * ApiCommN for 100000000, ApiCommS for 100000003
 *============================================================================*/

-- note start value may change depending on initial project list: see above
CREATE SEQUENCE announce.projects_id_pkseq INCREMENT BY 10 START WITH 100;
GRANT SELECT ON announce.projects_id_pkseq TO COMM_WDK_W;

-- note start value may change depending on initial project list; see above
CREATE SEQUENCE announce.category_id_pkseq INCREMENT BY 10 START WITH 40;
GRANT SELECT ON announce.category_id_pkseq TO COMM_WDK_W;

CREATE SEQUENCE announce.messages_id_pkseq INCREMENT BY 10 START WITH 10;
GRANT SELECT ON announce.messages_id_pkseq TO COMM_WDK_W;

GRANT USAGE ON SCHEMA ANNOUNCE TO COMM_WDK_W;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA ANNOUNCE TO COMM_WDK_W;
