import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Upload,
  message,
} from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";
import {
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";


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

function EditService() {

  const [form] = Form.useForm();
  const [{ editVisible, singleRow }, { onEdit, setEditVisible }] = useStudentStore();
  const [image, setimage] = useState();
  const [imageUrl, setImageUrl] = useState("")
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


  useEffect(() => {
    form.setFieldsValue(singleRow);
    setImageUrl(singleRow?.image);
    setimage(singleRow?.image);

  }, [singleRow])

  const { profImageUrl } = state;


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
      title="Edit Service"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createProject"
          >
            Submit
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setEditVisible({ value: false })}
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
            id="createProject"
            name="createProject"
            onFinish={(values) => onEdit(values, image,singleRow.id)}
          >
            <Form.Item name="title">
              <Input placeholder="Title" />
            </Form.Item>
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
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
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
EditService.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default EditService;
