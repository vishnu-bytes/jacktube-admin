import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import Default from "../../common/Assets/Images/default.png"

const { Option } = Select;

const ViewService = () => {
  const [form] = Form.useForm();
  const [{ viewVisible, singleRow }, { onEdit, setVisible }] =
    useStudentStore();
  console.log(singleRow, "single course");
  return (
    <Modal
      type="primary"
      title="View User"
      visible={viewVisible}
      footer={[
        <div key="1" className="project-modal-footer-delete">
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
          <Button
            form="editProject"
            size="default"
            htmlType="submit"
            type="primary"
            key="submit"
            danger
          >
            Delete
          </Button>
        </div>,
      ]}
      onCancel={() => setVisible(false)}
    >
      <div className="project-modal display">
       
        <ul>
          <li>Title</li>
          <li>Image</li>
        </ul>
        <ul>
          <li>{singleRow?.name}</li>
          <li><img src={Default} /></li>
        </ul>
      </div>
    </Modal>
  );
};

export default ViewService;
