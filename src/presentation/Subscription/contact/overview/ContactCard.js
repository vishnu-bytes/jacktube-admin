import React from "react";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ContactCardWrapper } from "../style";
import { Dropdown } from "../../../../components/dropdown/dropdown";
import { contactDeleteData } from "../../../../redux/contact/actionCreator";
// import Done from "../../../common/Assets/Icons/done"
// import {done} from "../common/Assets/Icons";
import { done } from "../../../common/Assets/Icons";
import { useStudentStore } from "../store";

import { Button } from "../../../../components/buttons/buttons";

const ContactCard = ({ user, showEditModal }) => {
  const [
    { studentList, searchData },
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
  const { id, name, designation, img, email, phone, company } = user;

  return (
    <ContactCardWrapper>
      <div className="contact-card">
        <span className="price">&#8377;{user?.values?.price}</span>
        <span className="timespan">{user?.values?.validity}</span>
        <ul className="features">
          {user.webinar > 0 && (
            <li>
              <img src={done} />
              &nbsp;&nbsp;{user.webinar} free webinar passes
            </li>
          )}
          {user.oneonone > 0 && (
            <li>
              <img src={done} />
              &nbsp;&nbsp;{user.oneonone} free consultation
            </li>
          )}
        </ul>
      </div>
      <Dropdown
        className="wide-dropdwon"
        content={
          <>
            <Link
              onClick={() => setEditVisible({ value: true, data: user })}
              to="#"
            >
              <span>Edit</span>
            </Link>
            <Link onClick={() => onDelete(user.id)} to="#">
              <span>Delete</span>
            </Link>
          </>
        }
        action={["click"]}
      >
        <Button className="btn-icon" type="light" to="#" shape="circle">
          <FeatherIcon icon="more-vertical" size={18} />
        </Button>
      </Dropdown>
    </ContactCardWrapper>
  );
};

ContactCard.propTypes = {
  user: PropTypes.object,
  showEditModal: PropTypes.func,
};

export default ContactCard;
