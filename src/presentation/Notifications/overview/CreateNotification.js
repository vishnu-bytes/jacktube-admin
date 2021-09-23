import React, { useEffect, useState } from "react";
import { Form, Input, Select, Switch, Upload, InputNumber, Radio } from "antd";
import { Col, Row, DatePicker, TimePicker, message } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useNotificationStore } from "../store";
import moment from "moment";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

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

function CreateNotification() {
  const [form] = Form.useForm();
  const [
    { VisibleCreate, webinarData },
    { onfinish, setVisibleCreate, getWebinar },
  ] = useNotificationStore();
  const [value, setValue] = useState(1);
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
  const { profImageUrl, panImageUrl } = state;
  const [image, setimage] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getWebinar();
  }, []);
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
      title="Create Notification"
      visible={VisibleCreate}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createNotification"
          >
            Create
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisibleCreate(false)}
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
            id="createNotification"
            name="createNotification"
            onFinish={(values) =>
              onfinish(values, image, form, setImageUrl, setimage)
            }
          >
            <Form.Item name="title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="Description" />
            </Form.Item>

            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="webinar" label="Webinar">
                  <Select
                    name="services"
                    placeholder="Please select"
                    style={{ width: "100%" }}
                  >
                    {webinarData?.map((option) => (
                      <Option key={option.id} value={option.id}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
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
            </Row>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
CreateNotification.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateNotification;
