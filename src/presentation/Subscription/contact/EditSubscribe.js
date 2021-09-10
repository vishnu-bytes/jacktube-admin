import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Checkbox, Select } from 'antd';
import { Link } from 'react-router-dom';
import { ContactPageheaderStyle } from './style';
import ContactCard from './overview/ContactCard';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, CardToolbox, BasicFormWrapper } from '../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { AddUser } from '../../../container/pages/style';
import { contactSearchData, contactAddData } from '../../../redux/contact/actionCreator';
// import { Modal } from '../../components/modals/antd-modals';
import { Modal } from '../../../components/modals/antd-modals';
import { useStudentStore } from "./store";
import { increment, decrement } from "../../common/Assets/Icons"

const { Option } = Select;

const EditSubscribe = () => {
  const dispatch = useDispatch();
  const [
    { studentList, searchData, viewVisible ,editVisible},
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
  const [form] = Form.useForm();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: true,
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
  });

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const { update } = state;

  const handleSearch = searchText => {
    dispatch(contactSearchData(searchText));
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const showEditModal = data => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
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

  return (
    <>

      <Row gutter={25}>
      </Row>
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
              <Form form={form} name="contact" >
                <Form.Item name="name">
                  <Input placeholder="Price" />
                </Form.Item>
                <div className="checkboxContainer">
                  <Checkbox onChange={onChange}>One-on-one</Checkbox>
                </div>
                <div className="checkboxContainer">
                  <Checkbox onChange={onChange}>Webinar</Checkbox>
                </div>
                <div className="rowContainer space">
                  <span className="label">
                    One-on-one
                </span>
                  <span className="value">
                    <img src={decrement} />
                    &nbsp;&nbsp;
                    3
                    &nbsp;&nbsp;
                    <img src={increment} />
                  </span>
                </div>
                <div className="rowContainer">
                  <span className="label">
                    Webinar
                </span>
                  <span className="value">
                    <img src={decrement} />
                    &nbsp;&nbsp;
                    1
                    &nbsp;&nbsp;
                    <img src={increment} />
                  </span>
                </div>
                <Form.Item name="presentor" className="space" initialValue="">
                  <Select style={{ width: "100%" }}>
                    <Option value="">1 Year</Option>
                    <Option value="1">6 Months</Option>
                    <Option value="2">1 Month</Option>
                  </Select>
                </Form.Item>
                <div className="footer">
                  <Button htmlType="submit" size="default" key="submit">
                    Cancel
                  </Button>
                  <Button htmlType="submit" size="default" type="primary" key="submit">
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
