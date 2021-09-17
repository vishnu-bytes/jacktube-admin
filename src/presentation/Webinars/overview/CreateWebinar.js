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

function CreateStudent(props) {
  const [{ visiblePrice }, { setVisiblePrice }] = useStudentStore();
  const [form] = Form.useForm();
  const [{ visible, price }, { onfinish, setVisible }] = useStudentStore();
  const [Time, setTime] = useState("");
  const [image, setimage] = useState({});
  const [Date, setDate] = useState("");


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
            form="createWebinar"
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
            id="createWebinar"
            name="createWebinar"
            onFinish={(values) => onfinish(values, Date, Time, price)}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item
                  name="category"
>
                  <Select
                  mode="multiple"
                    rules={[
                      { required: true, message: "Please input your description!" },
                    ]}
                  
                    style={{ width: "100%" }}
                    onChange={(value) => console.log(value, "valuue")}
                    placeholder="Category">
                    {props.category &&
                      props?.category.map((res) => (
                        <Option value={res.id}>{res.category}</Option>
                      ))}
                  </Select>
                  

                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="presentor" rules={[
                  { required: true, message: "Please input your description!" },
                ]} >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Presentor">
                    {props?.experts &&
                      props.experts.map((res) => (
                        <Option value={"+91" + res.phone}>{res.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Row gutter={15}>
                <Col md={12}>
                  <Form.Item name="startDate" rules={[
                    { required: true, message: "Please input your description!" },
                  ]}>
                    <DatePicker
                      placeholder="Date"
                      format={dateFormat}
                      style={{ width: "100%" }}
                      onChange={(date, dateString) => setDate(dateString)}
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    rules={[
                      { required: true, message: "Please input your description!" },
                    ]}
                    name="time"

                  >
                    <TimePicker

                      onChange={(time, timeString) => setTime(timeString)}
                      style={{ width: "100%" }}
                      format={"HH:mm"}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <span>Premium Webinar{visiblePrice} &nbsp; &nbsp;</span>

            <Form.Item name="premium">
              
                  <Switch
                    onChange={(value) => value&&setVisiblePrice(true)}
                    style={{ height: "unset!important" }}
                  />
           
            </Form.Item>
            <Form.Item
              name="commonPrice"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="Price" />
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
