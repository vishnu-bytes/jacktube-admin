import React, { useEffect } from "react";
import { Row, Col } from "antd";
import ContactCard from "./contact/overview/ContactCard";
import { Cards } from "../../components/cards/frame/cards-frame";
import { PageHeader } from "../../components/page-headers/page-headers";
import { Button } from "../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { Main } from "./styled";
import { useStudentStore } from "./contact/store";
import AddNew from "./contact/AddNew";
import EditSubscribe from "./contact/EditSubscribe";

const Subscription = () => {
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
    },
  ] = useStudentStore();

  console.log(studentList, "data list1");

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div>
      <PageHeader
        title="Subscription Management"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              size="small"
              type="primary"
              onClick={() => setVisible(true)}
            >
              <FeatherIcon icon="plus" size={14} />
              New Package
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          {studentList &&
            studentList?.map((user) => (
              <Col key={user.id} xxl={6} md={12} sm={12} xs={24}>
                <Cards headless>
                  <ContactCard user={user} />
                </Cards>
              </Col>
            ))}
        </Row>
        <AddNew />
        <EditSubscribe />
      </Main>
    </div>
  );
};

export default Subscription;
