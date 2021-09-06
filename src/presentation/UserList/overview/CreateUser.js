import React from "react";
import { Form, Input } from "antd";
import { Col, Row, Select } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useUserStore } from "../store";

function CreateStudent() {
  const [form] = Form.useForm();
  const [{ VisibleCreate }, { onfinish, setVisibleCreate }] = useUserStore();
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
            form="createStudent"
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
            id="createProject"
            name="createProject"
            onFinish={(values) => onfinish(values)}
          >
            <Form.Item name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12}>
                <Form.Item name="address" initialValue="1">
                  <Select style={{ width: "100%" }}>
                    <Option value="1">Mother</Option>
                    <Option value="2">Pregnant</Option>
                    <Option value="3">Admin</Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
            </Row>
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
CreateStudent.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateStudent;
