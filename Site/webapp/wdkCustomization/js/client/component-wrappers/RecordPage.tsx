import React from "react";
import { findExportWith } from "ebrc-client/component-wrappers/util";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//todo: typings (esp dynamic record interface, cause that's going to become a problem)
export function RecordHeading(DefaultComponent: any) {
    const DynamicRecordHeading = makeDynamicWrapper("RecordHeading")(DefaultComponent);
    return function ErythronDBRecordHeading(props: any) {
        return (
            <Container fluid>
                <Row className="record-heading-container">
                    <DynamicRecordHeading {...props} />
                </Row>
            </Container>
        );
    };
}

export function RecordMainSection(DefaultComponent: React.Component) {
    const DynamicRecordMainSection = makeDynamicWrapper("RecordMainSection")(DefaultComponent);
    return function ErythronDBRecordMainSection(props: any) {
        return <DynamicRecordMainSection {...props} />;
    };
}

//cast webpack's global
//@ts-ignore;
const requireCast = require as any;

const findRecordPageComponent = findExportWith(requireCast.context("../components/Records/Types", true));

function makeDynamicWrapper(componentName: string) {
    return function dynamicWrapper(DefaultComponent: React.Component) {
        return function DynamicWrapper(props: any) {
            const ResolvedComponent =
                findRecordPageComponent(componentName)(`./${props.recordClass.fullName}`) || DefaultComponent;
            return <ResolvedComponent {...props} DefaultComponent={DefaultComponent} />;
        };
    };
}