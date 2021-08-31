import React, { lazy, useState,useEffect} from 'react';
import { Row, Col} from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import CreateProject from './overview/CreateProject';
import { ProjectHeader, ProjectSorting } from './style';
import { Button } from '../common/UI/buttons/buttons';
import { Main } from "../common/Style/styled";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import {useCourseStore} from "./store";
import EditCourse from './overview/EditCourse';

const Grid = lazy(() => import('./overview/Grid'));

const Project = () => {
  const [,{getCourse,setVisible}] = useCourseStore(); 
  const [currentPage] = useState(1);

  useEffect(() => {
    getCourse(currentPage)
  }, [currentPage])

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Courses/Events"
          subTitle={<>12 Running Projects</>}
          buttons={[
            <Button onClick={()=>{setVisible(true)}} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} />
              Create Course
            </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <ProjectSorting>
              <div className="project-sort-bar">
                <div className="project-sort-nav">
                  <nav>
                    <ul>
                      <li
                        className={ "active"}
                      >
                        <Link to="#">
                          All Courses
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </ProjectSorting>
            <div>
              <Grid/>
            </div>
          </Col>
        </Row>
        <CreateProject/>
        <EditCourse/>
      </Main>
    </>
  );
};

Project.propTypes = {
  match: propTypes.object,
};

export default Project;
