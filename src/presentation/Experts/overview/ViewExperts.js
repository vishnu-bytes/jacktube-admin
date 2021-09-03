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
  const [{ viewVisible, singleRow }, { onEdit, setViewVisible }] =
    useStudentStore();
  console.log(singleRow, "single course");
  return (
    <Modal
      type="primary"
      title="View Expert"
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
          <li>Expert Name</li>
          <li>Phone Number</li>
          <li>Email</li>
          <li>Job Title</li>
          <li>Eligibility</li>
          <li>Bio</li>
          <li>Pan Card</li>
        </ul>
        <ul>
          <li>{singleRow?.name}</li>
          <li>{singleRow?.phone}</li>
          <li>{singleRow?.email}</li>
          <li>{singleRow?.jobTitle}</li>
          <li>{singleRow?.eligibility}</li>
          <li>{singleRow?.bio}</li>
          <li>
            <img src={singleRow?.image}></img>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default EditCategory;
