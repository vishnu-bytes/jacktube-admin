import React, { useState, useEffect } from "react";
import { Form, Input, Select, Upload, message } from "antd";
import { Col, Row } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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

function EditExpert() {
  const [
    { editVisible, studentList, serviceList, singleRow, loader },
    { onEdit, setEditVisible },
  ] = useStudentStore();

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

  const [image, setimage] = useState(singleRow?.profileImage);
  const [panImage, setpanImage] = useState(singleRow?.panIamgeUrl);
  const [profImageUrl, setProfileImageUrl] = useState(singleRow?.profileImage);
  const [panImageUrl, setPanImageUrl] = useState(singleRow?.panIamgeUrl);
  const [serviceArray, setServicesArray] = useState([]);

  const [form] = Form.useForm();
  useEffect(() => {
    setProfileImageUrl(singleRow?.profileImage);
    setPanImageUrl(singleRow?.panIamgeUrl);
    setimage(singleRow?.profileImage);
    setpanImage(singleRow?.panIamgeUrl);
    form.setFieldsValue(singleRow);
    setServicesArray(singleRow?.services);
    console.log("services", singleRow);
  }, [singleRow]);

  const children = [];

  profImageUrl !== undefined && console.log("urllllll", profImageUrl);

  const onHandleChange = (info) => {
    setState({ ...state, panImageUrl: info.fileoriginFileObj });
    setpanImage(info.file.originFileObj);
    setPanImageUrl(URL.createObjectURL(info.file.originFileObj));
  };

  const uploadButton = (loading) => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  };

  console.log("serviceList", serviceList);
  return (
    <Modal
      type={"primary"}
      title="Edit Expert"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="editExpert"
            onClick={() => {
              console.log(state, "current state");
            }}
            loading={loader}
            disabled={loader}
          >
            Submit
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => {
              console.log(state, "current state");
              setEditVisible(false);
            }}
          >
            Cancel
          </Button>
        </div>
      ]}
      onCancel={() => setEditVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="editExpert"
            name="editExpert"
            onFinish={(values) => onEdit(values, image, studentList, panImage, singleRow.id, serviceArray, singleRow.phone)}
            initialValues={{}}
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
                setProfileImageUrl(
                  URL.createObjectURL(info.file.originFileObj)
                );
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
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]} >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item
                  label="Job Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please input your job title!" },
                  ]}
                >
                  <Input placeholder="Job Title" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item
                  label="Services"
                  name="services"
                  rules={[
                    { required: true, message: "Please select your services" },
                  ]}
                >
                  <Select
                    name="services"
                    mode="multiple"
                    placeholder="Services"
                    style={{ width: "100%" }}
                  >
                    {serviceList?.map((option) => (
                      <Option key={option.id} value={option.id}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  label="Qualifications"
                  name="qualifications"
                  rules={[
                    {
                      required: true,
                      message: "Please add your qaulifications!",
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    name="qualifications"
                    placeholder="Qualifications"
                    style={{ width: "100%" }}
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
            <Form.Item
              label="Experience"
              name="experience"
              rules={[
                { required: true, message: "Please input your experience!" },
              ]}
            >
              <Input placeholder="Experience (In years)" />
            </Form.Item>
            <Form.Item
              label="Bio"
              name="bio"
              rules={[{ required: true, message: "Please input your bio!" }]}
            >
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
EditExpert.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default EditExpert;
