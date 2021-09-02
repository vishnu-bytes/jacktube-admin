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
            id="createProject"
            name="createProject"
            onFinish={(values) => onfinish(values)}
          >
            <Form.Item name="name">
              <Input placeholder="Name" defaultValue={singleRow?.name} />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email" defaultValue={singleRow?.email} />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="title">
                  <Input
                    placeholder="Job Title"
                    defaultValue={singleRow?.jobTitle}
                  />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" defaultValue={singleRow?.phone} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="eligibility">
              <Input
                placeholder="Eligibility"
                defaultValue={singleRow?.eligibility}
              />
            </Form.Item>
            <Form.Item name="bio">
              <Input.TextArea
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
