import React, { useEffect } from "react";
import {AutoComplete} from "../common/UI/autoComplete/autoComplete"
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { Main, CardToolbox } from "../common/Style/styled";
import Heading from "../common/UI/heading/heading";
import { Button } from "../common/UI/buttons/buttons";
import CreateFaculty from "./overview/CreateFaculty";
import { useFacultyStore } from "./store";
import { logError } from "../common/Utils";
import EditFaculty from "./overview/EditFaculty";

const UserList = () => {
  const [
    { facultyList, searchData },
    { getFaculty, setVisible, seteditVisible, onDelete, setFaculty },
  ] = useFacultyStore();
  const handleSearch = (searchText) => {
    const data = facultyList?.filter((item) =>
      item.name.toUpperCase().startsWith(searchText.toUpperCase())
    );
    logError(data, "data");
    setFaculty(data);
    logError(facultyList, "faculty List");
  };
  const facultyData = searchData?.map((faculty, index) => {
    return {
      key: index,
      user: (
        <div className="user-info">
          <figure>
            <img
              style={{ width: "50px", height: "50px", "border-radius": "50%" }}
              src="https://picsum.photos/id/237/200/300"
              alt="Faculty"
            />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {faculty.name}
            </Heading>
            <span className="user-designation">{faculty.expertise}</span>
          </figcaption>
        </div>
      ),
      email: faculty.email,
      position: faculty.expertise,
      joinDate: faculty.joiningDate.split("T")[0],
      status:
        faculty.status === "1" ? (
          <span className={`status-text active`}>{"active"}</span>
        ) : faculty.status === "0" ? (
          <span className={`status-text blocked`}>{"blocked"}</span>
        ) : (
          <span className={`status-text deactivate`}>{"deactive"}</span>
        ),
      action: (
        <div className="table-actions">
          <>
            <Button
              onClick={() => seteditVisible({ value: true, data: faculty })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this faculty?"
              onConfirm={() => {
                onDelete({ id: faculty?._id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </Popconfirm>
          </>
        </div>
      ),
    };
  });
  useEffect(() => {
    window.scroll(0, 0);
    getFaculty();
  }, []);

  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Faculty List"
          subTitle={
            <>
              <span className="title-counter">
                {facultyList?.length} Faculties{" "}
              </span>
              <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
          buttons={[
            <Button
              onClick={() => setVisible(true)}
              key="1"
              type="primary"
              size="default"
            >
              <FeatherIcon icon="plus" size={16} /> Add New User
            </Button>,
          ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable usersTableData={facultyData} />
          </Col>
        </Row>
        <CreateFaculty />
        <EditFaculty />
      </Main>
    </>
  );
};

export default UserList;
