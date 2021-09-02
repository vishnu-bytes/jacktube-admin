import React from "react";
import { Form, Input, Select } from "antd";
import { Col, Row } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useStudentStore } from "../store";
import moment from "moment";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

function CreateStudent() {
  const [form] = Form.useForm();
  const [{ visible }, { onfinish, setVisible }] = useStudentStore();

  return (
    <Modal
      type={"primary"}
      title="Add New Expert"
      visible={visible}
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
                <Form.Item name="title">
                  <Input placeholder="Job Title" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="eligibility">
              <Input placeholder="Eligibility" />
            </Form.Item>
            <Form.Item name="bio">
              <Input.TextArea rows={4} placeholder="Bio" />
            </Form.Item>
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
