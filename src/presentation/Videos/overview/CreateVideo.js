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
import FeatherIcon from "feather-icons-react";
import { useVideoStore } from "../store";
import moment from "moment";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

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

function CreateStudent(props) {
  const [form] = Form.useForm();
  const [{ visible, price, loader, progress }, { onfinish, setVisible }] =
    useVideoStore();
  const [image, setimage] = useState({});
  const [video, setVideo] = useState({})
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
    image: null,
  });
  const { imageUrl } = state;
  
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
      title="Create Video"
      visible={visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createWebinar"
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
            onFinish={(values) => onfinish(values, image, video)}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <TextArea placeholder="Description" />
            </Form.Item>

            <span className="label">Image</span>
            <Upload
              name="thumbImage"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={(info) => {
                setimage(info.file.originFileObj);
                setState({
                  ...state,
                  imageUrl: URL.createObjectURL(info.file.originFileObj),
                });
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton(state.image)
              )}
            </Upload>
            <span className="label">Video</span>

            <input type="file" onChange={(file) => setVideo(file.target.files)}></input>
            {progress>0?<span>Uploading {progress}</span>:""}
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
