import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import ViewCards from "../../common/ViewCards"

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
        <ViewCards label="Title" value={singleRow?.title} />
        <ViewCards label="Desccription" value={singleRow?.desc} />
        <ViewCards label="Category" value={singleRow?.category} />
        <ViewCards label="Presenter" value={singleRow?.presenter} />
        <ViewCards label="Date" value={singleRow?.date} />
        <ViewCards label="Time" value={singleRow?.time} />
        <ViewCards label="Premium webinar" value={singleRow?.premium === 1 ? "Yes" : "No"} />
        <ViewCards label="Image" value={<img src={singleRow?.image} />} />
      </div>
    </Modal>
  );
};

export default ViewWebinar;
