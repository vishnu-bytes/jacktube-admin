import React, { useState } from "react";
import { Form, Input, Select, Upload, message } from "antd";
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

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

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

  const onHandleChange = (info) => {
    setState({ ...state, panImage: info.fileoriginFileObj });
    // if (info.file.status === "uploading") {
    //   setState({ ...state, loading: true });
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(
    //     info.file.originFileObj,
    //     (imageUrl) => setState({ ...state, imageUrl, loading: false }),
    //     console.log(state, "imageUrl")
    //   );
    // }
  };

  const uploadButton = (loading) => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  };

  const { imageUrl, profImageUrl } = state;

  const [form] = Form.useForm();
  const [{ visible }, { onfinish, setVisible }] = useStudentStore();

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
            onFinish={(values) => onfinish(values, image)}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={(info) => {
                info.file.status = "done";
                setimage(info.file.originFileObj);
                console.log(info.file.originFileObj, "image");
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

            <Form.Item name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email" />
            </Form.Item>
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
            <Form.Item name="eligibility">
              <Input placeholder="Eligibility" />
            </Form.Item>
            <Form.Item name="bio">
              <Input.TextArea rows={4} placeholder="Bio" />
            </Form.Item>
            {/* <Form.Item name="pan card">
              <Upload
                name="panCard Image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={onHandleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton(state.loading)
                )}
              </Upload>
            </Form.Item> */}
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
