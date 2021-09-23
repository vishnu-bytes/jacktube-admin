import React, { useState, useEffect } from "react";
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

const EditSubscribe = () => {
  const dispatch = useDispatch();
  const [
    { studentList, searchData, viewVisible, editVisible, singleRow },
    {
      setVisible,
      setEditVisible,
      getStudent,
      getCourse,
      setSearchData,
      onEdit,
      onDelete,
      setViewVisible,
    },
  ] = useStudentStore();
  console.log(singleRow, "edit data");
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
  const [Onevalue, setOnevalue] = useState();
  const [Webvalue, setWebvalue] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setWebvalue(singleRow?.webinar ? singleRow?.webinar : 1);
    setOnevalue(singleRow?.oneonone ? singleRow?.oneonone : 1);
    setOptions(singleRow?.options);
  }, [singleRow]);

  const onChange = (checkedValues) => {
    console.log(checkedValues, "checked values");
    setOptions(checkedValues);
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  const plainOptions = ["Webinar", "One-on-one"];

  return (
    <>
      <Modal
        type={state.modalType}
        title={null}
        visible={editVisible}
        footer={null}
        width="300px"
        onCancel={() => setEditVisible(false)}
        ghost
      >
        <div className="project-modal">
          <AddUser>
            <BasicFormWrapper>
              <Form
                form={form}
                name="contact"
                onFinish={(values) =>
                  onEdit(
                    values,
                    Webvalue,
                    Onevalue,
                    options,
                    singleRow.id,
                    singleRow.entry_pass
                  )
                }
                name="editSub"
                id="editSub"
              >
                <Form.Item initialValue={singleRow?.values?.price} name="price">
                  <Input placeholder="Price" />
                </Form.Item>
                {!singleRow?.entry_pass && (
                  <div className="checkboxContainer">
                    <Checkbox.Group
                      options={plainOptions}
                      defaultValue={singleRow?.options}
                      onChange={onChange}
                    />
                  </div>
                )}

                <div
                  className="rowContainer space"
                  style={{
                    display: options?.includes("Webinar") ? "flex" : "none",
                  }}
                >
                  <span className="label">Webinar</span>
                  <span className="value">
                    <img
                      src={decrement}
                      onClick={() => Webvalue > 1 && setWebvalue(Webvalue - 1)}
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
                    display: options?.includes("One-on-one") ? "flex" : "none",
                  }}
                >
                  <span className="label">One-on-one</span>
                  <span className="value">
                    <img
                      src={decrement}
                      type="button"
                      onClick={() => Onevalue > 1 && setOnevalue(Onevalue - 1)}
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
                  initialValue={singleRow?.values?.validity}
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
                    form="editSub"
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

export default EditSubscribe;
