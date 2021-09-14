import React from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { Col, Row } from "antd";

const EditCategory = () => {
  const [form] = Form.useForm();
  const [{ editVisible, singleRow }, { onEdit, onfinish, setEditVisible }] =
    useStudentStore();

  return (
    <Modal
      type="primary"
      title="Edit Experts"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            form="editProject"
            size="default"
            htmlType="submit"
            type="primary"
            key="submit"
          >
            Confirm
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setEditVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setEditVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="editProject"
            name="editProject"
            onFinish={(values) =>console.log(values,"values")|| onfinish(values) }
          >
            <Form.Item name="name"> 
              {singleRow?.name && <Input name="name" placeholder="Name" defaultValue={singleRow?.name}  /> }
              
            </Form.Item>
            <Form.Item name="email">
              <Input name="email" placeholder="Email" defaultValue={singleRow?.email} />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="title">
                  <Input
                    name="title"
                    placeholder="Job Title"
                    defaultValue={singleRow?.title}
                  />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" name="phone" defaultValue={singleRow?.phone} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="eligibility">
              <Input
              name="eligibility"
                placeholder="Eligibility"
                defaultValue={singleRow?.eligibility}
              />
            </Form.Item>
            <Form.Item name="bio">
              <Input.TextArea
              name="bio"
                rows={4}
                placeholder="Bio"
                defaultValue={singleRow?.bio}
              />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditCategory;
