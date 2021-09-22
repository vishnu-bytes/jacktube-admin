import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";

const { Option } = Select;

const EditCategory = () => {
  const [form] = Form.useForm();
  const [{ editVisible, singleRow }, { onEdit, setEditVisible }] =
    useStudentStore();
useEffect(()=>{
  form.setFieldsValue(singleRow);
},[singleRow])
  return (
    <Modal
      type="primary"
      title="Edit Category"
      visible={editVisible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            form="editProject"
            size="default"
            htmlType="submit"
            type="primary"
            key="submit"
          >
            Confirm
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
            id="editProject"
            name="editProject"
            onFinish={(values) => onEdit({ values, initial: singleRow })}
          >
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'This field is required!' }]}>
              <Input
                placeholder="Category"
                defaultValue={singleRow?.category}
              />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditCategory;
