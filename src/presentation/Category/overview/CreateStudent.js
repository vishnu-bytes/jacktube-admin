import React, { useState } from "react";
import { Form, Input, Select, Upload, InputNumber, Radio } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useStudentStore } from "../store";
const { Option } = Select;

function CreateStudent() {
  const [form] = Form.useForm();
  const [{ visible }, { onfinish, setVisible }] = useStudentStore();

  const [image, setimage] = useState({});

  return (
    <Modal
      type={"primary"}
      title="Create category"
      visible={visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createCategory"
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
            id="createCategory"
            form={form}
            name="createCategory"
            onFinish={(values) => onfinish(values,form)}
          >
            <Form.Item name="category" rules={[{ required: true, message: 'This field is required!' }]}>
              <Input placeholder="Category name" />
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
