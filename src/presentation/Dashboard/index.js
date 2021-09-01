import React, { lazy, Suspense } from "react";
import { Row, Col, Skeleton } from "antd";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { Cards } from "../common/UI/cards/frame/cards-frame";
import { Main } from "../styled";

const CardGroup = lazy(() => import("./overview/CardGroup"));
const AccountGroup = lazy(() => import("./overview/AccountGroup"));
const Subscription = lazy(() => import("./overview/SessionsByDevice"));

const Business = () => {
  return (
    <>
      <PageHeader />
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <CardGroup />
        </Suspense>
        <Row gutter={[60, 60]}>
          <Col xxl={16}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <AccountGroup />
            </Suspense>
          </Col>
          <Col xxl={8}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Subscription />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Business;
