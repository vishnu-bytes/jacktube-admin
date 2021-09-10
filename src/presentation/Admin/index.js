import React, { useEffect } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/AdminTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { useStudentStore } from "./store";
import Heading from "../common/UI/heading/heading";
import ViewStudent from "./overview/ViewAdmin";
import CreateUser from "./overview/CreateAdmin";
import EditAdmin from "./overview/EditAdmin";

const AdminList = () => {
  const [
    { studentList, searchData },
    {
      setVisible,
      getStudent,
      setSearchData,
      onEdit,
      onDelete,
      setVisibleEdit,
      setVisibleCreate,
    },
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
          <figcaption>
            <Heading className="user-name" as="h6">
              {student.name}
            </Heading>
           
          </figcaption>
        </div>
      ),
      phone: student.phone,
      type: student.type,
      email:student.email,
      action: (
        <div className="table-actions">
          <>
            <Switch
              defaultChecked={student.status === 1 ? true : false}
              style={{ height: "unset!important" }}
            />

            <Button
              onClick={() => setVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="eye" size={16} />
            </Button>
            {/* <Button
              onClick={() => setVisibleEdit({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button> */}
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
          title="Admin Management"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Admins{" "}
              </span>
              <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
          // buttons={[
          //   <Button
          //     onClick={() => setVisibleCreate({ value: true })}
          //     key="1"
          //     type="primary"
          //     size="default"
          //   >
          //     <FeatherIcon icon="plus" size={16} /> Add New User
          //   </Button>,
          // ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable usersTableData={studentData} />
          </Col>
        </Row>
        <ViewStudent />
        <CreateUser />
        <EditAdmin />
      </Main>
    </>
  );
};

export default AdminList;
