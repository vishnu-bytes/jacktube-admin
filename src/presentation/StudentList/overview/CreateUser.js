import React from "react";
import { Form, Input } from "antd";
import { Col, Row, Select } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";

function CreateStudent() {
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
                <Form.Item name="address" initialValue="">
                  <Select style={{ width: "100%" }}>
                    <Option value="">Presentor</Option>
                    <Option value="1">Grade One</Option>
                    <Option value="2">Grade Two</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
            </Row>
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
