import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Pagination, Skeleton } from 'antd';
import Heading from "../../common/UI/heading/heading";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import { ProjectPagination } from '../style';
import {useCourseStore} from "../store";

const GridCard = lazy(() => import('./GridCard'));

const Grid = () => {
  const [course,{getCourse}] = useCourseStore(); 
  const [currentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    getCourse(currentPage)
  }, [currentPage]);


  const onHandleChange = (current) => {
    setCurrentPage(current)
  };

  return (
    <Row gutter={25}>
      {course?.course?.results? (
        course?.course?.results.map(value => {
          return (
            <Col key={value._id} xl={8} md={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <GridCard value={value} />
              </Suspense>
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <Cards headless>
            <Heading>Data Not Found!</Heading>
          </Cards>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        <ProjectPagination>
          {course?.course?.totalDoc ? (
            <Pagination
              onChange={onHandleChange}
              pageSize={9}
              defaultCurrent={1}
              total={course?.course?.totalDoc}
            />
          ) : null}
        </ProjectPagination>
      </Col>
    </Row>
  );
};

export default Grid;
