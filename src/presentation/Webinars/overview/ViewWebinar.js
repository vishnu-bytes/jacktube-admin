import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useWebinarStore } from "../store";
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
  ] = useWebinarStore();
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
        <RowContainer>
          <span className="label">Tag </span>
          <span className="value">
            {singleRow?.category?.map((item, index) => (
              <span key={index}>
                {index ? ", " : ""}
                {getCategoryText(item)}
              </span>
            ))}
          </span>
        </RowContainer>
        <ViewCards
          label="Presentor"
          value={getPresentorText(singleRow?.presentor)}
        />
        <ViewCards label="Date" value={singleRow?.startDate} />
        <ViewCards label="Time" value={singleRow?.time} />
        <ViewCards label="Month" value={"Month " + singleRow?.month} />
        <ViewCards
          label="Premium webinar"
          value={singleRow?.premium ? "Yes" : "No"}
        />
        <ViewCards
          label="Image"
          value={<img src={singleRow?.imageUrl} alt="" />}
        />
        <ViewCards label="Price" value={singleRow?.commonPrice} />
        <ViewCards
          label="Zoom URL"
          value={
            <a href={singleRow?.zoom_url} target="_blank">
              {singleRow?.zoom_url?.slice(0, 40)}....
            </a>
          }
        />
      </div>
    </Modal>
  );
};

export default ViewWebinar;
