import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import moment from "moment";
import { useReviewStore } from "../store";
import { logError } from "../../common/Utils";
import { onEdit } from "../../../infrastructure/faculty";
import Default from "../../common/Assets/Images/default.png"
import { Rate } from 'antd';
import ViewCards from "../../common/ViewCards";


const { Option } = Select;

const ViewReview = () => {
  const [form] = Form.useForm();
  const [{ viewVisible, singleRow,expertData }, { onEdit, setVisible }] =
  useReviewStore();
  console.log(singleRow, "single course");
  return (
    <Modal
      type="primary"
      title="View Review"
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
      <div className="project-modal">
      <ViewCards label="Review" value={singleRow?.review} />
      <ViewCards label="Expert" value={expertData && expertData?.map((item) => singleRow?.expert === "+91" + item.phone && item.name)} />
      <ViewCards label="User" value={singleRow?.user} />
      <ViewCards label="Webinar/Session" value={singleRow?.webinar?"Webinar":"Session"} />
      <ViewCards label="Rating" value={<Rate allowHalf disabled defaultValue={singleRow?.rating} />}/>
      </div>
    </Modal>
  );
};

export default ViewReview;
