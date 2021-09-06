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


const { Option } = Select;

const ViewReview = () => {
  const [form] = Form.useForm();
  const [{ viewVisible, singleRow }, { onEdit, setVisible }] =
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
      <div className="project-modal">
       
        <ul>
          <li>User Name</li>
          <li>Rating</li>
          <li>Review</li>
        </ul>
        <ul>
          <li>{singleRow?.name}</li>
          <li><Rate allowHalf defaultValue={2.5} /></li>
          <li>Vitae felis velit nisi nibh lacus dui nisi. Arcu tempor maecenas mi, ut. Sed arcu quis fermentum sit ac sit. Sed ut neque, gravida fringilla ullamcorper nisi. Aliquet faucibus vel posuere aliquam eget. Mauris, dui ipsum purus, neque, posuere et sed. Et ac volutpat sapien eu hac neque, pellentesque. At est, tristique arcu consequat tristique est ut penatibus erat. Lacus a proin quam elit.</li>
        </ul>
      </div>
    </Modal>
  );
};

export default ViewReview;
