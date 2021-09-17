import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateExperts";
import { useStudentStore } from "./store";
import Heading from "../common/UI/heading/heading";
import EditCategory from "./overview/EditExperts";
import ViewExperts from "./overview/ViewExperts";

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
      setViewVisible,
      switchChange
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
              src={student.profileImage}
              alt="profile"
            />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {student.name}
            </Heading>
            <span className="user-designation">{student.email}</span>
          </figcaption>
        </div>
      ),
      image:(<a target="_blank" href={student.panIamgeUrl} >{student?.panIamgeUrl?.slice(0,40)}...</a>),
      pan: student.pan,
      // img: <a target="_blank" href={student.image}>{student.image.substring(0,40)+"..."}</a>,
      status:
        student.status === 1 ? (
          <span className={`status-text active`}>{"active"}</span>
        ) : student.status === 2 ? (
          <span className={`status-text blocked`}>{"blocked"}</span>
        ) : (
          <span className={`status-text deactivate`}>{"deactive"}</span>
        ),
      action: (
        <div className="table-actions">
          <>
            <Switch
            
              defaultChecked={student.status === 1 ? true : false}
              style={{ height: "unset!important" }}
              onChange={(value)=>switchChange(value ===true?1:0,student.phone)}
            />

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
              title="Are you sure to delete this expert?"
              onConfirm={() => {
                onDelete(student?.phone);
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
          title="Experts Management"
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
              <FeatherIcon icon="plus" size={16} /> New Expert
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
        <EditCategory />
        <ViewExperts />
      </Main>
    </>
  );
};

export default UserList;
