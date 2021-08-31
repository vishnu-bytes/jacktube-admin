import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateWebinar";
import { useStudentStore } from "./store";
import Heading from "../common/UI/heading/heading";
import EditCategory from "./overview/EditWebinar";

const UserList = () => {
  const [
    { studentList, searchData },
    {
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
    },
  ] = useStudentStore();
  const [currentPage] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
    getStudent();
  }, [currentPage]);
  const handleSearch = (searchText) => {
    const data = studentList?.filter((value) =>
      value.name.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
  const studentData = searchData?.map((student, index) => {
    console.log(student);
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
              {student.name}
            </Heading>
            <span className="user-designation">{student.school}</span>
          </figcaption>
        </div>
      ),
      email: "test!@gmail.com",
      grade: student.grade,
      school: student.school,
      joinDate: "January 20, 2020",
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
              onClick={() => setEditVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => {
                onDelete({ id: student?._id });
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
        <CreateStudent />
        <EditCategory/>

      </Main>
    </>
  );
};

export default UserList;
