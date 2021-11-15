import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/UserTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
// import CreateStudent from "./overview/CreateStudent";
import { useReviewStore } from "./store";
import Heading from "../common/UI/heading/heading";
import { Rate } from 'antd';
import ViewReview from "./overview/ViewReview"
import { accept, reject } from "../common/Assets/Icons"

const UserList = () => {
  const [
    { studentList, searchData, expertData },
    {
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      getExpertData,
      onStatusChange
    },
  ] = useReviewStore();
  const [currentPage] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
    getStudent();
    getExpertData()
  }, [currentPage]);
  const handleSearch = (searchText) => {
    const data = studentList?.filter((value) =>
      value.user.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };

  const getExperText = (id) => {
    for (let i = 0; i < expertData?.length; i++) {
      if (id === "91" + expertData[i].phone) {
        return expertData[i].name;
      }
    }
  }
  console.log("expertDatavzd", expertData)
  const studentData = searchData?.map((student, index) => {
    console.log(student,"review data",expertData);
    return {
      key: index,
      user: (
        // <div className="user-info">

        //   <figcaption>
        //     <Heading className="user-name" as="h6">
        //       {student.name}
        //     </Heading>
        <span className="user-designation">{student.user}</span>
        //   </figcaption>
        // </div>
      ),
      expert: expertData && expertData?.map((item) => student.expert ===  item.id && item.name),
      webinar: student.webinar ? "Webinar" : "Session",
      userName: <div className="user-info">
        <figcaption>
          <Heading className="user-name" as="h6">
            {student.name}
          </Heading>
        </figcaption>
      </div>,
      review: student.review?.slice(0,30),
      rating: <Rate allowHalf disabled defaultValue={student.rating} />,
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
            {student.statusChanged ? student.status : <> <Popconfirm
              title="Are you sure to accept this review?"
              onConfirm={() => {
                onStatusChange(student.id,"Accepted",student.expert,student?.review,student?.rating,student.user);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <img src={accept} alt="" />
              </Button>
            </Popconfirm>
              <Popconfirm
                title="Are you sure to reject this review?"
                onConfirm={() => {
                  onStatusChange(student.id,"Rejected");
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button className="btn-icon" type="danger" to="#" shape="circle">
                  <img src={reject} alt="" />
                </Button>
              </Popconfirm></>}
            <Button
              onClick={() => setVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="eye" size={16} />
            </Button>
            {/* <Popconfirm
              title="Are you sure to delete this review?"
              onConfirm={() => {
                onDelete({ id: student?._id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </Popconfirm> */}
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
          title="Review Management"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Reviews{" "}
              </span>
              {/* <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Name"
                width="100%"
                patterns
              /> */}
            </>
          }
        // buttons={[
        //   <Button
        //     onClick={() => setVisible(true)}
        //     key="1"
        //     type="primary"
        //     size="default"
        //   >
        //     <FeatherIcon icon="plus" size={16} /> New Category
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
        <ViewReview />

      </Main>
    </>
  );
};

export default UserList;
