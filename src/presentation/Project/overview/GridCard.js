import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import { Dropdown } from "../../common/UI/dropdown/dropdown";
import { textRefactor } from "../../common/UI/utilities/utilities";
import { ProjectCard } from '../style';
import { useCourseStore } from "../store";
import { Popconfirm } from 'antd';

const GridCard = ({ value }) => {
  const { _id, title, description, } = value;
  const [, { onDelete, setEditVisible }] = useCourseStore();
  return (
    <ProjectCard>
      <Cards headless>
        <div className="project-top">
          <div className="project-title">
            <h1>
              <Link to={`/admin/project/projectDetails/${_id}`}>{title}</Link>
            </h1>
            <Dropdown
              content={
                <>
                  <Link to="#" onClick={() => { setEditVisible({ visible: true, data: value }) }}>Edit</Link>
                  <Popconfirm
                    title="Are you sure to delete this course?"
                    onConfirm={() => {
                      onDelete({ "id": _id })
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Link to="#" >Delete</Link>
                  </Popconfirm>
                </>
              }
            >
              <Link to="#">
                <FeatherIcon icon="more-horizontal" size={18} />
              </Link>
            </Dropdown>
          </div>
          <p className="project-desc">{textRefactor(description, 13)}</p>
        </div>
        <div className="project-bottom">
          <div className="project-assignees">
            <p>Enrolled Students:</p>
            <ul>
              <li>
                <img
                  src={require(`../../common/static/img/users/1.png`)}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={require(`../../common/static/img/users/2.png`)}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={require(`../../common/static/img/users/3.png`)}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={require(`../../common/static/img/users/4.png`)}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={require(`../../common/static/img/users/5.png`)}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={require(`../../common/static/img/users/6.png`)}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={require(`../../common/static/img/users/7.png`)}
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
      </Cards>
    </ProjectCard>
  );
};

GridCard.propTypes = {
  value: PropTypes.object,
};

export default GridCard;
