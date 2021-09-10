import React from 'react';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContactCardWrapper } from '../style';
import { Dropdown } from '../../../../components/dropdown/dropdown';
import { contactDeleteData } from '../../../../redux/contact/actionCreator';
// import Done from "../../../common/Assets/Icons/done"
// import {done} from "../common/Assets/Icons";
import {done} from "../../../common/Assets/Icons";
import { useStudentStore } from "../store";



import { Button } from '../../../../components/buttons/buttons';

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
        <span className="price">
        ₹1800
        </span>
        <span className="timespan">
        6 months
        </span>
        <ul className="features">
          <li><img src={done}/>&nbsp;&nbsp;4 free webinar passes</li>
          <li><img src={done}/>&nbsp;&nbsp;1 free consultation</li>
        </ul>
        {/* <figure> */}
          {/* <img src={require(`../../../${img}`)} alt="" /> */}
          {/* <figcaption>
            <h3>{name}</h3>
            <span>{designation}</span>
          </figcaption>
        </figure> */}
        {/* <div className="user-info">
          <ul>
            <li>
              <FeatherIcon icon="phone" size={16} />
              {phone}
            </li>
            <li>
              <FeatherIcon icon="mail" size={16} />
              {email}
            </li>
            <li>
              <FeatherIcon icon="map-pin" size={16} />
              {company}
            </li>
          </ul>
        </div> */}
      </div>
      <Dropdown
        className="wide-dropdwon"
        content={
          <>
            <Link onClick={() => setEditVisible({value:true})} to="#">
              <span>Edit</span>
            </Link>
            <Link onClick={() => onDelete(id)} to="#">
              <span>Delete</span>
            </Link>
          </>
        }
        action={['click']}
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
