import React, { useState, useEffect } from "react";
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
const dateFormat = "DD MMM YYYY";

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

function EditWebinar(props) {
  const [{ visiblePrice }, { setVisiblePrice }] = useWebinarStore();
  const [form] = Form.useForm();
  const [
    { editVisible, price, singleRow, loader },
    { onEdit, setEditVisible },
  ] = useWebinarStore();
  const [Time, setTime] = useState(singleRow?.time);
  const [image, setimage] = useState(singleRow?.imageUrl);
  const [Date, setDate] = useState(singleRow?.startDate);
  const [imageUrl, setImageUrl] = useState(singleRow?.imageUrl);

  useEffect(() => {
    if (singleRow?.startDate) {
      let newSingleRow = { ...singleRow };
      let convertedDate = moment(singleRow.startDate, "DD MMM YYYY").format(
        "DD/MM/YYYY"
      );
      newSingleRow = {
        ...newSingleRow,
        startDate: moment(convertedDate, "DD/MM/YYYY"),
      };
      newSingleRow = { ...newSingleRow, time: moment(singleRow.time, "HH:mm") };
      console.log(singleRow, "new single row", newSingleRow);
      form.setFieldsValue(newSingleRow);
      setimage(singleRow?.imageUrl);
      setDate(singleRow?.startDate);
      setTime(singleRow?.time);
      setImageUrl(singleRow.imageUrl);
    }
  }, [singleRow, editVisible]);
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

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15];
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
      title="Edit Webinar"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="editWebinar"
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
            onClick={() => setEditVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setEditVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="editWebinar"
            name="editWebinar"
            onFinish={(values) =>
              onEdit(
                values,
                Date,
                Time,
                price,
                image,
                singleRow.id,
                singleRow.presentor,
                singleRow.zoom_id
              )
            }
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
                        <Option value={res?.id}>{res?.name}</Option>
                        
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
                      style={{ width: "100%" }}
                      onChange={(date, dateString) => setDate(dateString)}
                      format={"DD/MM/YYYY"}
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
                    placeholder="Month/Trimester"
                  >
                    {/* <Option value={10}>First Trimester</Option>
                    <Option value={11}>Second Trimester</Option>
                    <Option value={12}>Third Trimester</Option> */}
                    {months.map((res) => (
                      <Option value={res}>{res===13?"First Trimester":res===14?"Second Trimester":res===15?"Third Trimester":"Month " + res}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <span
              className="label"
              style={{ marginTop: "15px", display: "block" }}
            >
              Premium Webinar{visiblePrice} &nbsp; &nbsp;
            </span>

            <Form.Item valuePropName={true ? "checked" : null} name="premium">
              <Switch
                name="premium"
                onChange={(value) => value && setVisiblePrice(true)}
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
                setImageUrl(URL.createObjectURL(info.file.originFileObj));
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
              <Input placeholder="Price" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
        <AddPrice />
      </div>
    </Modal>
  );
}
EditWebinar.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default EditWebinar;
