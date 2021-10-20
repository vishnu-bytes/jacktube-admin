import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateWebinar";
import { useWebinarStore } from "./store";
import Heading from "../common/UI/heading/heading";
import EditWebinar from "./overview/EditWebinar";
import ViewWebinar from "./overview/ViewWebinar";

const UserList = () => {
  const [
    { studentList, searchData, categoryList, expertList },
    {
      setVisible,
      setEditVisible,
      getStudent,
      getCategory,
      getExperts,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      setViewVisible,
    },
  ] = useWebinarStore();
  const [currentPage] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
    getStudent();
    getCategory();
    getExperts();
  }, [currentPage]);
  console.log(studentList, "studentList data");
  console.log("serachData", searchData);

  const handleSearch = (searchText) => {
    const data = studentList?.filter((value) =>
      value.title.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
  const studentData = searchData?.map((student, index) => {
    console.log(student);
    return {
      key: index,
      user: (
        <div className="user-info">
          <figcaption>
            <Heading className="user-name" as="h6">
              {student.title}
            </Heading>
            <span className="user-designation">{student.school}</span>
          </figcaption>
        </div>
      ),

      email: "test!@gmail.com",
      grade: student.grade,
      school: student.school,
      joinDate: student.date,
      status:
        student.status === "1" ? (
          <span className={`status-text active`}>{"active"}</span>
        ) : student.status === "0" ? (
          <span className={`status-text blocked`}>{"blocked"}</span>
        ) : (
          <span className={`status-text deactivate`}>{"deactive"}</span>
        ),
      action: (
        <div className="table-actions">
          <>
            <Button
              onClick={() => setViewVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="eye" size={16} />
            </Button>
            <Button
              onClick={() => setEditVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this webinar?"
              onConfirm={() => {
                onDelete({
                  id: student?.id,
                  presentor: student?.presentor,
                  zoom: student?.zoom_id,
                });
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

  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Webinars Management"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Webinars{" "}
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
              <FeatherIcon icon="plus" size={16} /> New Webinar
            </Button>,
          ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable usersTableData={studentData} />
          </Col>
        </Row>
        <CreateStudent category={categoryList} experts={expertList} />
        <EditWebinar category={categoryList} experts={expertList} />
        <ViewWebinar />
      </Main>
    </>
  );
};

export default UserList;
