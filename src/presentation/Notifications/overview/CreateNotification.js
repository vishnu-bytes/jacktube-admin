import React, { useState } from "react";
import { Form, Input, Select, Switch, Upload, InputNumber, Radio } from "antd";
import { Col, Row, DatePicker, TimePicker } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useNotificationStore } from "../store";
import moment from "moment";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

function CreateNotification() {
  const [form] = Form.useForm();
  const [{ VisibleCreate }, { onfinish, setVisibleCreate }] = useNotificationStore();
  const [value, setValue] = useState(1);
  const [image, setimage] = useState({});

  return (
    <Modal
      type={"primary"}
      title="Create Notification"
      visible={VisibleCreate}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createStudent"
          >
            Create
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisibleCreate(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisibleCreate(false)}
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
}
CreateNotification.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateNotification;
