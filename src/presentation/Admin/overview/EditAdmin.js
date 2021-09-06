import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";
import { Col, Row } from "antd";

const EditAdmin = () => {
  const [form] = Form.useForm();
  const [{ viewVisibleEdit, singleRow }, { onEdit, onfinish, setVisibleEdit }] =
    useStudentStore();
  const { Option } = Select;

  return (
    <Modal
      type="primary"
      title="Edit User"
      visible={viewVisibleEdit}
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
            onClick={() => setVisibleEdit(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisibleEdit(false)}
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
                <Form.Item name="address" initialValue="1">
                  <Select style={{ width: "100%" }}>
                    <Option value="1">Pregnant</Option>
                    <Option value="2">Admin</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" defaultValue={singleRow?.phone} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditAdmin;
