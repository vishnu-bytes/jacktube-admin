import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import ViewCards from "../../common/ViewCards";

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
        <ViewCards
          label="Image"
          value={<img className="avatar" src={singleRow?.profileImage}></img>}
        />
        <ViewCards label="Expert Name" value={singleRow?.name} />
        <ViewCards label="Phone Number" value={singleRow?.phone} />
        <ViewCards label="Email" value={singleRow?.email} />
        <ViewCards label="Job Title" value={singleRow?.title} />
        <ViewCards label="Eligibility" value={singleRow?.eligibility} />
        <ViewCards label="Bio" value={singleRow?.bio} />
        <ViewCards
          label="Pan Card"
          value={<img src={singleRow?.image}></img>}
        />
      </div>
    </Modal>
  );
};

export default EditCategory;
