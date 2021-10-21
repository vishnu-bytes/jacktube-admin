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
import { useWebinarStore } from "../store";
import moment from "moment";
import AddPrice from "./AddPrice";
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
  const [{ visiblePrice }, { setVisiblePrice }] = useWebinarStore();
  const [form] = Form.useForm();
  const [{ visible, price }, { onfinish, setVisible }] = useWebinarStore();
  const [Time, setTime] = useState("");
  const [image, setimage] = useState({});
  const [Date, setDate] = useState();

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
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
            onFinish={(values) => onfinish(values, Date, Time, price, image)}
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
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item
                  name="category"
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    onChange={(value) => console.log(value, "valuue")}
                    placeholder="Tag"
                  >
                    {props.category &&
                      props?.category.map((res) => (
                        <Option value={res.id}>{res.category}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  name="presentor"
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                >
                  <Select style={{ width: "100%" }} placeholder="Presentor">
                    {props?.experts &&
                      props.experts.map((res) => (
                        <Option value={ res.id}>{res.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row gutter={15}>
                <Col md={12}>
                  <Form.Item
                    name="startDate"
                    rules={[
                      { required: true, message: "This field is required!" },
                    ]}
                  >
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
                      { required: true, message: "This field is required!" },
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
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item
                  name="month"
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => console.log(value, "valuue")}
                    placeholder="Month/Trimester">
                    <Option value={13} >First Trimester</Option>
                    <Option value={14} >Second Trimester</Option>
                    <Option value={15} >Third Trimester</Option>
                    {
                      months.map((res) => (
                        <Option value={res}>{"Month " + res}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                  name="password"
                >
                  <Input.Password placeholder="Zoom meeting password" />
                </Form.Item>
              </Col>
            </Row>
            <span
              className="label"
              style={{ marginTop: "15px", display: "block" }}
            >
              Premium Webinar{visiblePrice} &nbsp; &nbsp;
            </span>
            <Form.Item name="premium">
              <Switch
                name="premium"
                onChange={(value) => value}
                style={{ height: "unset!important" }}
              />
            </Form.Item>
            <span className="label">Image</span>
            <Upload
              name="profImage"
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
            <Form.Item
              name="commonPrice"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input disabled={visiblePrice} placeholder="Price" />
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
