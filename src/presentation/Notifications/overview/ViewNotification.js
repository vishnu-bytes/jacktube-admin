import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useNotificationStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import ViewCards from "../../common/ViewCards"


const { Option } = Select;

const ViewNotification = (props) => {
  const [form] = Form.useForm();
  const [{ viewVisible, singleRow, webinarData }, { onEdit, setVisible }] =
    useNotificationStore();
  console.log( props.webinar, "single course1");


  const getWebinarText = (id) => {
    for (let i = 0; i < props.webinar?.length; i++) {
      if (props.webinar[i].id === id) {
        console.log("web id",id,props.webinar[i].id)
        return props.webinar[i].title;
      }
    }

  }
  return (
    <Modal
      type="primary"
      title="View Notification"
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
          {/* <Button
            form="editProject"
            size="default"
            htmlType="submit"
            type="primary"
            key="submit"
            danger
          >
            Delete
          </Button> */}
        </div>,
      ]}
      onCancel={() => setVisible(false)}
    >
      <div className="project-modal display">
        <ViewCards label="Title" value={singleRow?.title} />
        <ViewCards label="Description" value={singleRow?.description} />
        <ViewCards
          label="Image"
          value={<img src={singleRow?.image}></img>}
        />
        <ViewCards label="Webinar" value={getWebinarText(singleRow?.webinar)} />


        {/* <ul>
          <li>Title</li>
          <li>Description</li>
          <li>Time</li>
          <li>Date</li>
        

        </ul>
        <ul>
          <li>{singleRow?.title}</li>
          <li>{singleRow?.phoneNumber}</li>
          <li>{singleRow?.name}</li>
          <li>{singleRow?.phoneNumber}</li>
        </ul> */}
      </div>
    </Modal>
  );
};

export default ViewNotification;
