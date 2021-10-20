import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/NotificationTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateNotification";
import { useNotificationStore } from "./store";
import Heading from "../common/UI/heading/heading";
import EditCategory from "./overview/EditNotification";
import ViewNotifications from "./overview/ViewNotification";

const UserList = () => {
  const [
    { studentList, searchData ,webinarData},
    {
      setVisibleCreate,
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      getWebinar

    },
  ] = useNotificationStore();
  const [currentPage] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
    getStudent();
    getWebinar();

  }, [currentPage]);
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
          </figcaption>
        </div>
      ),
      imageurl: (
        <a target="_blank" href={student.image}>
          {student?.image?.(0, 40)}...
        </a>
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
          title="Notifications"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Notifications{" "}
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
              onClick={() => setVisibleCreate({ value: true })}
              key="1"
              type="primary"
              size="default"
            >
              <FeatherIcon icon="plus" size={16} /> New Notification
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
        <ViewNotifications webinar={webinarData} />
      </Main>
    </>
  );
};

export default UserList;
