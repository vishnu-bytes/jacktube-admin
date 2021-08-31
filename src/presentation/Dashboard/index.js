import React, {  Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
// import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../common/UI/page-headers/page-headers';
// import { CalendarButtonPageHeader } from '../common/UI/buttons/calendar-button/calendar-button';
import { Main } from '../common/Style/styled';
// import { ExportButtonPageHeader } from '../common/UI/buttons/export-button/export-button';
// import { ShareButtonPageHeader } from '../common/UI/buttons/share-button/share-button';
// import { Button } from '../common/UI/buttons/buttons';
import { Cards } from '../common/UI/cards/frame/cards-frame';
import DailyOverview from '../Dashboard/components/performance/DailyOverview';
import WebsitePerformance from '../Dashboard/components/performance/WebsitePerformance';
import TrafficChannel from '../Dashboard/components/performance/TrafficChannel';
import SessionsByDevice from '../Dashboard/components/performance/SessionsByDevice';


const Dashboard = () => {
    return (
      <>
        <PageHeader
          ghost
          title="Website Performance Dashboard"
        />
        <Main>
          <Row justify="center" gutter={25}>
            <Col xxl={8} xl={10} lg={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <DailyOverview />
              </Suspense>
            </Col>
            <Col xxl={16} xl={14} lg={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <WebsitePerformance />
              </Suspense>
            </Col>
            <Col xxl={16} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <TrafficChannel />
              </Suspense>
            </Col>
            <Col xxl={8} xl={8} md={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <SessionsByDevice />
              </Suspense>
            </Col>
          </Row>
        </Main>
      </>
    );
  };
  
  export default Dashboard;
  