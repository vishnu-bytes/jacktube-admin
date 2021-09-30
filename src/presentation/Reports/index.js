import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm ,DatePicker} from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateService";
import { useStudentStore } from "./store";
import { CSVLink } from "react-csv";
import moment from "moment"


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const UserList = () => {
  
  const [
    { studentList, searchData ,isDisabled},
    {
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      getAllPayents
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
    { label: "Transaction ID", key: "id" },
    { label: "Date", key: "created_at" },
    { label: "Status", key: "status" },
    { label: "Amount", key: "amount" },

  ];

  const csvReport = {
    data: studentList && studentList,
    headers: headers,
    filename: "Clue_Mediator_Report.csv",
  };
  console.log(csvReport, "studentlsit");

const onDateRangeChange=(dateRange,dateString)=>{
  if(dateRange===null){
    getStudent();
  }else{
    getAllPayents(dateString[0],dateString[1]);
    console.log(studentData,"disable");

  }
}

  const studentData = searchData?.map((student, index) => {
    console.log(moment.unix(student.created_at),"date");
    return {
      key: index,
      id:student.id,
      date: student.created_at,
      data: student.name,
      one: student.school,
      revenue: student?.amount/100,
      status:student.status,
      email:student.email
       
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
            <RangePicker
           
            format={dateFormat}
            onChange={(dateRange,dateString)=>{
              onDateRangeChange(dateRange,dateString);
            }}


          />,
            <Button  type="primary"
         disabled={isDisabled?true:false}
            size="default">
              {studentData &&<CSVLink {...csvReport}>Export to CSV</CSVLink>}
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
