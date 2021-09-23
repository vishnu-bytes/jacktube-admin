import React, { useState } from "react";
import { Form, Input, Select, Switch, Upload, InputNumber, Radio } from "antd";
import { Col, Row, DatePicker, TimePicker } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import FeatherIcon from "feather-icons-react";
import { useWebinarStore } from "../store";
import moment from "moment";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

function AddPrice() {
  const [{ visiblePrice }, { setVisiblePrice }] = useWebinarStore();
  const [form] = Form.useForm();
  const [{ visible }, { onAddPrice, setVisible }] = useWebinarStore();
  const [value, setValue] = useState(1);
  const [image, setimage] = useState({});

  return (
    <Modal
      type={"primary"}
      title="Webinar Price"
      visible={visiblePrice}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="createProject"
          >
            Confirm
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => {
                setVisiblePrice(false)}}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisiblePrice(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="createProject"
            name="createProject"
            onFinish={(values) => onAddPrice(values)}
          >
            <Form.Item name="price">
              <Input placeholder="Price" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
AddPrice.propTypes = {
  visiblePrice: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddPrice;
