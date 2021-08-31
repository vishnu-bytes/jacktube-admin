import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
} from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from '../../../infrastructure/faculty';

const { Option } = Select;

const EditCategory = () => {
  const [form] = Form.useForm();
  const [{ editVisible, singleCourse }, { onEdit, setEditVisible }] =
    useStudentStore();

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
            onFinish={onEdit}
          >
            <Form.Item name="category" label="Category">
              <Input placeholder="Category" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditCategory;
