import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useVideoStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import ViewCards from "../../common/ViewCards";
import { RowContainer } from "../../common/ViewCards/style";

const { Option } = Select;

const ViewWebinar = () => {
  const [form] = Form.useForm();
  const [
    { viewVisible, singleRow, categoryList, expertList },
    { onEdit, setViewVisible },
  ] = useVideoStore();
  const getCategoryText = (id) => {
    for (let i = 0; i < categoryList.length; i++) {
      if (id === categoryList[i].id) {
        return categoryList[i].category;
      }
    }
  };
  const getPresentorText = (id) => {
    console.log("id", id);
    for (let i = 0; i < expertList?.length; i++) {
      if (id === "+91" + expertList[i].phone) {
        return expertList[i].name;
      }
    }
  };
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
        <ViewCards label="Desccription" value={singleRow?.description} />
       
        <ViewCards label="Uploaded Date" value={singleRow?.uploadedDate} />
      
      
        <ViewCards
          label="Image"
          value={<img src={singleRow?.imageUrl} alt="" />}
        />
    
        <ViewCards
          label="Video URL"
          value={
            <a href={singleRow?.videoUrl} target="_blank">
              {singleRow?.videoUrl?.slice(0, 40)}....
            </a>
          }
        />
        <ViewCards label="Like" value={singleRow?.like} />
        <ViewCards label="Dislike" value={singleRow?.dislike} />
      </div>
    </Modal>
  );
};

export default ViewWebinar;
