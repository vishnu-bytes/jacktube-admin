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

const ViewWebinar = () => {
  const [form] = Form.useForm();
  const [{ viewVisible, singleRow }, { onEdit, setViewVisible }] =
    useStudentStore();
  return (
    <Modal
      type="primary"
      title="View Webinar"
      visible={viewVisible}
      footer={[
        <div key="1" className="project-modal-footer-delete">
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setViewVisible(false)}
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
      onCancel={() => setViewVisible(false)}
    >
      <div className="project-modal display">
        <ul>
          <li>Title</li>
          <li>Desccription</li>
          <li>Category</li>
          <li>Persecutor</li>
          <li>Date</li>
          <li>Time</li>
          <li>Premium webinar</li>
          <li>Price</li>
          <li>Image</li>
        </ul>
        <ul>
          <li>{singleRow?.name}</li>
          <li>{singleRow?.phone}</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li><img src=""/></li>
        </ul>
      </div>
    </Modal>
  );
};

export default ViewWebinar;
