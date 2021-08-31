import React, {useState,useEffect} from 'react';
import {Form,Input,Select,Col,Row,DatePicker,TimePicker,Radio} from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from '../../common/Style/styled';
import moment from "moment";
import {useCourseStore} from "../store";
import { logError } from '../../common/Utils';
import { onEdit } from '../../../infrastructure/faculty';


const { Option } = Select;

const EditCourse = () => {
  const [form] = Form.useForm();
  const [{ editVisible,singleCourse }, { onEdit, setEditVisible }] = useCourseStore()

  useEffect(() => {
    if(singleCourse?.startDate){
        let start = singleCourse?.startDate
        let end = singleCourse?.endDate
        let date = start.split("T")[0];
        let dateEnd = end.split("T")[0];
        let sDate = moment(date,"YYYY/MM/DD")
        let eDate = moment(dateEnd,"YYYY/MM/DD")
        let sTime = moment(singleCourse?.startTime,"hh:mm:ss")
        let eTime = moment(singleCourse?.endTime,"hh:mm:ss")
        let data = {
            ...singleCourse,
            startDate:sDate,
            endDate : eDate,
            startTime : sTime,
            endTime : eTime
        };
        logError("data",data)
        form.setFieldsValue(data);
    }

  }, [singleCourse])

  return (
    <Modal
      type='primary'
      title="Edit Course"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button form="editProject" size="default" htmlType="submit" type="primary" key="submit" >
            Update Course
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={()=>setEditVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={()=>setEditVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} id="editProject" name="editProject" onFinish={onEdit}>
            <Form.Item  name="title" label="Title">
              <Input placeholder="Course/Event Name" />
            </Form.Item>
            <Form.Item 
              name = "type"
              label = "Event type"
            >
              <Radio.Group >
                <Radio value="1">Private</Radio>
                <Radio value="2">Team</Radio>
                <Radio value="3">Public</Radio>
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
                  <DatePicker  format={"YYYY/MM/DD"} />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item 
                  label="Start Time"
                  name="startTime"
                  initialValue={moment("00:00:00", "hh:mm:ss")}
                >
                  <TimePicker />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="endDate" label="End Date">
                  <DatePicker  format={"YYYY/MM/DD"} />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  label="End Time"
                  name="endTime"
                  initialValue={moment("12:00:00", "hh:mm:ss")}
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

export default EditCourse;