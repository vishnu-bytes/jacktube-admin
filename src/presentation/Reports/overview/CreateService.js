import React, { useState } from "react";
import { Form, Radio } from "antd";
import {  DatePicker } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useStudentStore } from "../store";

const dateFormat = "DD/MM/YYYY";

function CreateStudent() {
  const [{ visibleReport }, { onfinish, setVisible }] = useStudentStore();
  return (
    <Modal
      type={"primary"}
      title="Download Report"
      visible={visibleReport}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createStudent"
          >
            Download
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisible(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form.Item
            name="parentType"
            // initialValue={["team"]}
          >
            <Radio.Group>
              <Radio value={0}>Daily</Radio>
              <Radio value={1}>Weekly</Radio>
              <Radio value={2}>Monthly</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="startDate">
            <DatePicker
              placeholder="Date"
              format={dateFormat}
              style={{ width: "50%" }}
            />
          </Form.Item>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
CreateStudent.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateStudent;
