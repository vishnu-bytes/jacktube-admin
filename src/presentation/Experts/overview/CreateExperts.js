import React, { useState } from "react";
import { Form, Input, Select, Upload, message, Radio } from "antd";

import { Col, Row } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useStudentStore } from "../store";
import moment from "moment";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { increment, decrement } from "../../common/Assets/Icons"

const { Option } = Select;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function CreateStudent() {
  const [state, setState] = useState({
    fileList: [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "http://www.baidu.com/xxx.png",
      },
    ],
    loading: false,
    profImgLoading: false,
    image: null,
  });
  const [image, setimage] = useState({});
  const [panImage, setpanImage] = useState({});
  const { profImageUrl, panImageUrl } = state;

  const children = [];
 
  // function handleChange(value) {
  //   console.log(`Selected: ${value}`);
  // }
  // function changeQualifications(value) {
  //   console.log(`Selected: ${value}`);
  // }

  const onHandleChange = (info) => {
    setState({ ...state, panImageUrl: info.fileoriginFileObj });

    setpanImage(info.file.originFileObj);
    setState({ ...state, panImageUrl: URL.createObjectURL(info.file.originFileObj) });
  };

  const uploadButton = (loading) => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  };


  const [form] = Form.useForm();
  const [{ visible, studentList, serviceList }, { onfinish, setVisible }] = useStudentStore();
  console.log("serviceList", serviceList)
  return (
    <Modal
      type={"primary"}
      title="Add New Expert"
      visible={visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createExpert"
            onClick={() => {
              console.log(state, "current state");
            }}
          >
            Create
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => {
              console.log(state, "current state");
              setVisible(false);
            }}
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
            id="createExpert"
            name="createExpert"
            onFinish={(values) => onfinish(values, image, studentList, panImage,form)}
          >

            <span className="label">Profile Image</span>
            <Upload
              name="profImage"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
        
              beforeUpload={beforeUpload}
              onChange={(info) => {
                setimage(info.file.originFileObj);
                setState({ ...state, profImageUrl: URL.createObjectURL(info.file.originFileObj) });
              }}
            >
              {profImageUrl ? (
                <img
                  src={profImageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                  uploadButton(state.image)
                )}
            </Upload>

            <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]} >
              <Input  placeholder="Name" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]} >
              <Input placeholder="Email" />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="title" rules={[{ required: true, message: 'Please input your job title!' }]}>
                  <Input placeholder="Job Title" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="services" rules={[{ required: true, message: 'Please select your services' }]} >
                  <Select
                    name="services"
                    mode="multiple"
                    placeholder="Please select"
                    style={{ width: '100%' }}
                  >
                    {serviceList?.map((option) => <Option key={option.id} value={option.id} >{option.title}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="qualifications" rules={[{ required: true, message: 'Please add your qaulifications!' }]} >
                  <Select
                    mode="tags"
                    name="qualifications"
                    placeholder="Please select"
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
                  {/* <Input value={qualText} onChange={(value) => setQualText(value.target.value)} suffix={<img className="button_img" src={increment} onClick={() => {
                    console.log(qualText, "qualText")
                    setQualifications([...quaifications, qualText]);
                    console.log(quaifications, "quaifications")
                    setQualText("");
                  }} />} placeholder="Qualifications" />
                  <ul className="qualifications">
                    {quaifications?.map((item, index) => <li>
                      <span>
                        <PlusOutlined className="dot" />
                        {item}
                      </span>
                      <img className="button_img" src={decrement} type="button" onClick={() => {
                        quaifications.splice(index, 1)
                        setQualifications([...quaifications])
                      }} />
                    </li>)}
                  </ul> */}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="experience" rules={[{ required: true, message: 'Please input your experience!' }]}>
              <Input placeholder="Experience (In years)" />
            </Form.Item>
            <Form.Item name="bio" rules={[{ required: true, message: 'Please input your bio!' }]}>
              <Input.TextArea rows={4} placeholder="Bio" />
            </Form.Item>

            <span className="label">PAN Card</span>
            <Upload
              name="panCard Image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
             
              beforeUpload={beforeUpload}
              onChange={onHandleChange}
            >
              {panImageUrl ? (
                <img src={panImageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                  uploadButton(state.loading)
                )}
            </Upload>

          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
CreateStudent.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateStudent;
