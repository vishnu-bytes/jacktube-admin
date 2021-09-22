import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateService";
import { useStudentStore } from "./store";
import { CSVLink } from "react-csv";

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
  const headers = [
    { label: "First Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "School", key: "school" },
  ];

  const csvReport = {
    data: studentList && studentList,
    headers: headers,
    filename: "Clue_Mediator_Report.csv",
  };
  console.log(csvReport, "studentlsit");

  const studentData = searchData?.map((student, index) => {
    console.log(student);
    return {
      key: index,
      date: "test!@gmail.com",
      data: student.name,
      one: student.school,
      revenue: "1200",
      status:
        student.status === "1" ? (
          <span className={`status-text active`}>{"active"}</span>
        ) : student.status === "0" ? (
          <span className={`status-text blocked`}>{"blocked"}</span>
        ) : (
          <span className={`status-text deactivate`}>{"deactive"}</span>
        ),
    };
  });

  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Reports"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Reports{" "}
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
              Download Report
              {/* <CSVLink {...csvReport}>Export to CSV</CSVLink> */}
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
      </Main>
    </>
  );
};

export default UserList;
