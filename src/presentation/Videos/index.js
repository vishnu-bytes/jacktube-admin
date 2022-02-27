import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateVideo";
import { useVideoStore } from "./store";
import ViewVideo from "./overview/ViewVideo";
import moment from "moment";

const UserList = () => {
  const [
    { studentList, searchData, categoryList, expertList },
    {
      setVisible,
      getStudent,
      setSearchData,
      onDelete,
      setViewVisible,
    },
  ] = useVideoStore();
  const [currentPage] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
    getStudent();
   
  }, [currentPage]);

  const handleSearch = (searchText) => {
    const data = studentList?.filter((value) =>
      value.title.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
  const studentData = searchData?.map((student, index) => {
    console.log(student,"data check");
    return {
      key: index,
      title: student.title,

      description: student.description.slice(0,30)+"...",
     uploadedDate:moment(student.uploadedDate).format("DD/MM/YYYY HH:mm"),
      
     like:student?.like?.length,
     dislike:student?.dislike?.length,
     imageUrl:<a href={student.imageUrl}>{student?.imageUrl?.slice(0,30)}</a>,
     videoUrl:<a href={student.imageUrl}>{student?.videoUrl?.slice(0,30)}</a>,

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
          
            <Popconfirm
              title="Are you sure to delete this video?"
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
          title="Video Management"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Videos{" "}
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
              <FeatherIcon icon="plus" size={16} /> New Video
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
        
        <ViewVideo />
      </Main>
    </>
  );
};

export default UserList;
