import React, { useState, useEffect } from "react";
import { Form, Input, Upload} from "antd";
import propTypes from "prop-types";
import { Button } from "../common/UI/buttons/buttons";
import { Modal } from "../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useBlogStore } from "./store";

function CreateBlog({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [, { onSubmit }] = useBlogStore();
  const [state, setState] = useState({
    visible,
    modalType: "primary",
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <Modal
      type={state.modalType}
      title="Create Student"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" htmlType="submit"
            form="createBlog">
          Add New Blog
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form id="createBlog" form={form} name="createBlog" onFinish={onSubmit}>
            <Form.Item name="title" label="Title">
              <Input placeholder="Blog Title"/>
            </Form.Item>
            <Form.Item name="author" label="Author">
              <Input placeholder="Author Name"/>
            </Form.Item>
            <Form.Item name="body" label="Description">
              <Input.TextArea placeholder="Add description"/>
            </Form.Item>
            <Form.Item name="image" label="Image">
            <Upload
                accept="image/*"
                maxCount={1}
                listType="picture"
                onChange={(info) => {
                info.file.status = "done";
                }}
              >
                <Button type="primary">
                  <FeatherIcon icon="camera" size={16} />
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
CreateBlog.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateBlog;
