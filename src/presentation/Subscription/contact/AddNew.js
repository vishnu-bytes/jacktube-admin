import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Input, Checkbox, Select } from "antd";
import { Link } from "react-router-dom";
import { ContactPageheaderStyle } from "./style";
import ContactCard from "./overview/ContactCard";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { Main, CardToolbox, BasicFormWrapper } from "../styled";
import { AutoComplete } from "../../../components/autoComplete/autoComplete";
import { Button } from "../../../components/buttons/buttons";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { AddUser } from "../../../container/pages/style";
import {
  contactSearchData,
  contactAddData,
} from "../../../redux/contact/actionCreator";
// import { Modal } from '../../components/modals/antd-modals';
import { Modal } from "../../../components/modals/antd-modals";
import { useStudentStore } from "./store";
import { increment, decrement } from "../../common/Assets/Icons";

const { Option } = Select;

const AddNew = () => {
  const dispatch = useDispatch();
  const [
    { studentList, searchData, viewVisible },
    {
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      onfinish,
      setViewVisible,
    },
  ] = useStudentStore();
  const [form] = Form.useForm();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: true,
    editVisible: false,
    modalType: "primary",
    url: null,
    update: {},
  });
  const [Onevalue, setOnevalue] = useState(0);
  const [Webvalue, setWebvalue] = useState(0);
  const [options, setOptions] = useState([]);

  const onChange = (checkedValues) => {
    setOptions(checkedValues);
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  const handleCancel = () => {
    onCancel();
  };
  const plainOptions = ["Webinar", "One-on-one"];

  return (
    <>
      <Row gutter={25}></Row>
      <Modal
        type={state.modalType}
        title={null}
        visible={viewVisible}
        footer={null}
        width="300px"
        onCancel={() => setVisible(false)}
        ghost
      >
        <div className="project-modal">
          <AddUser>
            <BasicFormWrapper>
              <Form
                form={form}
                name="createSub"
                id="createSub"
                onFinish={(values) => {
                  onfinish(values, Webvalue, Onevalue, options);
                }}
              >
                <Form.Item name="price">
                  <Input placeholder="Price" />
                </Form.Item>
                <div className="checkboxContainer">
                  <Checkbox.Group options={plainOptions} onChange={onChange} />
                </div>
                <div
                  className="rowContainer space"
                  style={{
                    display: options.includes("Webinar") ? "flex" : "none",
                  }}
                >
                  <span className="label">Webinar</span>
                  <span className="value">
                    <img
                      src={decrement}
                      onClick={() => Webvalue > 0 && setWebvalue(Webvalue - 1)}
                    />
                    &nbsp;&nbsp; {Webvalue} &nbsp;&nbsp;
                    <img
                      src={increment}
                      onClick={() => setWebvalue(Webvalue + 1)}
                    />
                  </span>
                </div>
                <div
                  className="rowContainer space"
                  style={{
                    display: options.includes("One-on-one") ? "flex" : "none",
                  }}
                >
                  <span className="label">One-on-one</span>
                  <span className="value">
                    <img
                      src={decrement}
                      type="button"
                      onClick={() => Onevalue > 0 && setOnevalue(Onevalue - 1)}
                    />
                    &nbsp;&nbsp; {Onevalue} &nbsp;&nbsp;
                    <img
                      src={increment}
                      onClick={() => setOnevalue(Onevalue + 1)}
                    />
                  </span>
                </div>

                <Form.Item
                  name="validity"
                  className="space"
                  initialValue="1 year"
                >
                  <Select style={{ width: "100%" }}>
                    <Option value="1 year">1 Year</Option>
                    <Option value="6 months">6 Months</Option>
                    <Option value="1 month">1 Month</Option>
                  </Select>
                </Form.Item>

                <div className="footer">
                  <Button htmlType="submit" size="default" key="submit">
                    Cancel
                  </Button>
                  <Button
                    htmlType="submit"
                    size="default"
                    type="primary"
                    key="submit"
                    form="createSub"
                  >
                    Create
                  </Button>
                </div>
              </Form>
            </BasicFormWrapper>
          </AddUser>
        </div>
      </Modal>
    </>
  );
};

export default AddNew;
