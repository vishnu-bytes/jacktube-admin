import React from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import { AddEventWrap } from "../Style";
import { BasicFormWrapper } from "../../common/Style/styled";
import { Button } from "../../common/UI/buttons/buttons";
import { useCalenderStore } from "../store";
const { Option } = Select;

const AddNewEvent = ({ defaultValue, onHandleAddEvent }) => {
  const [, { onSubmit }] = useCalenderStore();
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  moment.tz.setDefault("America/Los_Angeles");
  return (
    <BasicFormWrapper>
      <AddEventWrap>
        <Form
          style={{ width: "100%" }}
          form={form}
          name="addNewEvent"
          onFinish={onSubmit}
        >
          <Form.Item {...formItemLayout} label="Title" name="title">
            <Input placeholder="Weekly report meeting" />
          </Form.Item>
          <Form.Item {...formItemLayout} name="eventType" label="Event Type">
            <Radio.Group>
              <Radio value={0}>Event</Radio>
              <Radio value={1}>Task</Radio>
              <Radio value={2}>Reminder</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} name="startDate" label="Start Date">
            <DatePicker />
          </Form.Item>
          <Form.Item {...formItemLayout} name="startTime" label="Start Time">
            <DatePicker picker="time" />
          </Form.Item>

          <Form.Item {...formItemLayout} name="endDate" label="End Date">
            <DatePicker />
          </Form.Item>
          <Form.Item {...formItemLayout} name="endTime" label="End Time">
            <DatePicker picker="time" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            className="event-desc"
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Write Your Description" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="label"
            initialValue="primary"
            label="Label"
          >
            <Select style={{ width: "100%" }}>
              <Option value="primary">
                <span className="bullet primary" />
                Primary
              </Option>
              <Option value="secondary">
                <span className="bullet secondary" />
                Secondary
              </Option>
              <Option value="success">
                <span className="bullet success" />
                success
              </Option>
              <Option value="warning">
                <span className="bullet warning" />
                Warning
              </Option>
              <Option value="info">
                <span className="bullet info" />
                Info
              </Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="add-event-footer text-right">
              <Button
                className="ant-btn ant-btn-white"
                onClick={() => {
                  return form.resetFields();
                }}
              >
                Reset
              </Button>
              <Button htmlType="submit" className="btn-save" type="primary">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </AddEventWrap>
    </BasicFormWrapper>
  );
};

AddNewEvent.propTypes = {
  defaultValue: PropTypes.string,
  onHandleAddEvent: PropTypes.func,
};

export default AddNewEvent;
