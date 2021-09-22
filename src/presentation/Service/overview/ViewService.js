import React, { useState, useEffect } from "react";
import { Form, Input, Select,Popconfirm } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useStudentStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import Default from "../../common/Assets/Images/default.png";
import ViewCards from "../../common/ViewCards";


const { Option } = Select;

const ViewService = () => {
  const [form] = Form.useForm();
  const [{ viewVisible, singleRow }, {  setVisible, onDelete }] =
    useStudentStore();
  console.log(singleRow, "single course");
  return (
    <Modal
      type="primary"
      title="View Service"
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
            
            size="default"
            
            type="primary"
            key="submit"
            danger
            onClick={() => onDelete( singleRow?.id )}
          >
            Delete
          </Button>
           
         
        </div>,
      ]}
      onCancel={() => setVisible(false)}
    >
      <div className="project-modal display">
      <ViewCards label="Title" value={singleRow?.title} />
      <ViewCards
          label="Image"
          value={<img  src={singleRow?.image}></img>}
        />

        {/* <ul>
          <li>Title</li>
          <li>Description</li>
          <li>Image</li>
        </ul>
        <ul> */}
          {/* <li>{singleRow?.title}</li> */}
          {/* <li>{singleRow?.description}</li> */}
          {/* <li>
            <img src={singleRow?.image} />
          </li>
        </ul> */}
      </div>
    </Modal>
  );
};

export default ViewService;
