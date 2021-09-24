import React from "react";
import { Form, Input } from "antd";
import { Col, Row, Select } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";

function CreateAdmin() {
  const [form] = Form.useForm();
  const [{ VisibleCreate }, { onfinish, setVisibleCreate }] = useStudentStore();
  const { Option } = Select;

  return (
    <Modal
      type={"primary"}
      title="Add New User"
      visible={VisibleCreate}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createAdmin"
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
            id="createAdmin"
            name="createAdmin"
            onFinish={(values) => onfinish(values)}
          >
           
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input placeholder="Email" />
            </Form.Item>
          
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your name!' }]}>
                  <Input placeholder="Password" />
                </Form.Item>
            
            {/* <Form.Item name="address" initialValue="">
              <Select style={{ width: "50%" }}>
                <Option value="">Admin</Option>
                <Option value="1">Pregnant</Option>
              </Select>
            </Form.Item> */}
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
CreateAdmin.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateAdmin;
