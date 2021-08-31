import React, {useState} from 'react';
import {Form,Input,Select,Col,Row,DatePicker,TimePicker,Radio} from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from '../../common/Style/styled';
import moment from "moment";
import {useCourseStore} from "../store";


const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const CreateProject = () => {
  const [form] = Form.useForm();
  const [{ visible }, { onfinish,createCourse, setVisible }] = useCourseStore()
  const [value,setValue] = useState(1)

  return (
    <Modal
      type='primary'
      title="Create Course"
      visible={visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button form="createProject" size="default" htmlType="submit" type="primary" key="submit" >
            Add New Course
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={()=>setVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={()=>setVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} id="createProject" name="createProject" onFinish={(values)=>createCourse(values)}>
            <Form.Item  name="title" label="Title">
              <Input placeholder="Course/Event Name" />
            </Form.Item>
            <Form.Item 
              name = "type"
              initialValue = {1}
              label = "Event type"
            >
              <Radio.Group value={value}>
                <Radio value={1}>Private</Radio>
                <Radio value={2}>Team</Radio>
                <Radio value={3}>Public</Radio>
              </Radio.Group>

            </Form.Item>
            <Form.Item name="grade" initialValue="" label="Grade">
              <Select style={{ width: "100%" }}>
                <Option value="">Select grade</Option>
                <Option value ="1" >Grade One</Option>
                <Option value ="2" >Grade Two</Option>
              </Select>
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="startDate" label="Start Date">
                  <DatePicker placeholder="Start Date" format={dateFormat} />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item 
                  label="Start Time"
                  name="startTime"
                  initialValue={moment("00:00:00", "HH:mm:ss")}
                >
                  <TimePicker />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="endDate" label="End Date">
                  <DatePicker placeholder="Start Date" format={dateFormat} />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  label="End Time"
                  name="endTime"
                  initialValue={moment("00:00:00", "HH:mm:ss")}
                >
                  <TimePicker />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} placeholder="Add description" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default CreateProject;