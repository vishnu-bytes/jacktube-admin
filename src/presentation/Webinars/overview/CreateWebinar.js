import React, { useState } from "react";
import { Form, Input, Select, Switch, Upload, InputNumber, Radio } from "antd";
import { Col, Row, DatePicker, TimePicker } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useStudentStore } from "../store";
import moment from "moment";
import AddPrice from "./AddPrice";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

function CreateStudent() {
  const [{ visiblePrice }, { setVisiblePrice }] = useStudentStore();
  const [form] = Form.useForm();
  const [{ visible }, { onfinish, setVisible }] = useStudentStore();
  const [value, setValue] = useState(1);
  const [image, setimage] = useState({});

  return (
    <Modal
      type={"primary"}
      title="Create Webinar"
      visible={visible}
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
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisible(false)}
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
                <Form.Item name="category" initialValue="">
                  <Select style={{ width: "100%" }}>
                    <Option value="">Category</Option>
                    <Option value="1">Grade One</Option>
                    <Option value="2">Grade Two</Option>D
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="presentor" initialValue="">
                  <Select style={{ width: "100%" }}>
                    <Option value="">Presentor</Option>
                    <Option value="1">Grade One</Option>
                    <Option value="2">Grade Two</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
            <Form.Item name="presentor" initialValue="">
              <Row gutter={15} className="switch-webinar">
                <Col md={12}>
                  <span>Premium Webinar{visiblePrice} &nbsp; &nbsp;</span>
                  <Switch
                  checked={visiblePrice}
                    onChange={() => setVisiblePrice(true)}
                    style={{ height: "unset!important" }}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} placeholder="Add description" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
        <AddPrice />
      </div>
    </Modal>
  );
}
CreateStudent.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateStudent;
