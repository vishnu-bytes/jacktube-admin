import React, { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import FeatherIcon from "feather-icons-react";
import UserListTable from "./overview/BannerTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import CreateStudent from "./overview/CreateBanner";
import { useBannerStore } from "./store";
import Heading from "../common/UI/heading/heading";
import EditCategory from "./overview/EditBanner";
import ViewNotifications from "./overview/ViewBanner";

const UserList = () => {
  const [
    { studentList, searchData, webinarData },
    {
      setVisibleCreate,
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      getWebinar,
    },
  ] = useBannerStore();
  const [currentPage] = useState(1);

  const getWebinarText = (id) => {
    for (let i = 0; i < webinarData?.length; i++) {
      if (webinarData[i].id === id) {
        console.log("web id",id,webinarData[i].id)
        return webinarData[i].title;
      }
    }

  }

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
    return {
      key: index,
      bannerType:student.type===1?"Webinar":"Other",
      title:student.type===1?getWebinarText(student.webinar):student.title,
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
        <a target="_blank" href={student?.image}>
          {student?.image?.slice(0, 40)}...
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
            {student?.type=== 2&& <Button
              onClick={() => setEditVisible({ value: true, data: student })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button>}
           
            <Popconfirm
             title="Are you sure to delete this webinar?"
             onConfirm={() => {
               onDelete(
                student?.id,
               );
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
          title="Banners"
          subTitle={
            <>
              <span className="title-counter">
                {studentList?.length} Banners{" "}
              </span>
              <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Title"
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
              <FeatherIcon icon="plus" size={16} /> New Banner
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
