import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import { Col, Row, DatePicker, TimePicker,Switch } from "antd";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

const EditCategory = () => {
  const [form] = Form.useForm();
  const [{ editVisible, singleCourse }, { onEdit,onfinish, setEditVisible }] =
    useStudentStore();

  return (
    <Modal
      type="primary"
      title="Edit Notification"
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
            <Form.Item name="title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="Description" />
            </Form.Item>
          
         
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="startDate">
                  <DatePicker
                    placeholder="Date"
                    format={dateFormat}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="time" initialValue={moment("00:00", "HH:mm")}>
                  <TimePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditCategory;
