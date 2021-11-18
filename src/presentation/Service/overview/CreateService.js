import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  Upload,
  InputNumber,
  Radio,
  message,
} from "antd";
import { Col, Row, DatePicker, TimePicker } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
// import { Cards } from '../components/cards/frame/cards-frame';

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
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
  const [form] = Form.useForm();
  const [{ VisibleCreate, loader }, { onfinish, setVisibleCreate }] =
    useStudentStore();
  const [value, setValue] = useState(1);
  const [image, setimage] = useState({});
  const [imageUrl, setImageUrl] = useState("");

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
  });

  const uploadButton = (loading) => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  };

  return (
    <Modal
      type={"primary"}
      title="Create Service"
      visible={VisibleCreate}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createProject"
            loading={loader}
disabled={loader}
          >
            Create
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisibleCreate({ value: false })}
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
            onFinish={(values) => {
              onfinish(values, image, form, setImageUrl, setimage);
            }}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            {/* <Form.Item name="description">
              <Input placeholder="Description" />
            </Form.Item> */}

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
                setImageUrl(URL.createObjectURL(info.file.originFileObj));
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton(state.image)
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
