import React, { useEffect } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { useStudentStore } from "./store";
import Heading from "../common/UI/heading/heading";
import ViewStudent from "./overview/ViewStudent";

const UserList = () => {
  const [
    { studentList, searchData },
    { setVisible, getStudent, setSearchData, onEdit, onDelete },
  ] = useStudentStore();
  useEffect(() => {
    window.scroll(0, 0);
    getStudent();
  }, []);
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
              onClick={() => setVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="eye" size={16} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this user?"
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
          title="User Management"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Users{" "}
              </span>
              <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable usersTableData={studentData} />
          </Col>
        </Row>
        <ViewStudent/>
      </Main>
    </>
  );
};

export default UserList;
