import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import { Col, Row, DatePicker, TimePicker, Switch } from "antd";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

const EditCategory = () => {
  const [form] = Form.useForm();
  const [{ editVisible, singleCourse }, { onEdit, onfinish, setEditVisible }] =
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
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email" />
            </Form.Item>
          </Form>

          <Row gutter={15}>
            <Col md={12}>
              <Form.Item name="title">
                <Input placeholder="Job Title" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditCategory;
