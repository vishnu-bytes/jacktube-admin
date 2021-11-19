import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Calendar, Skeleton } from "antd";
import FeatherIcon from "feather-icons-react";
import { Link, NavLink } from "react-router-dom";
import CalenDar from "react-calendar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
// import ProjectUpdate from "./ProjectUpdate";
// import AddNewEvent from "./AddNewEvent";
import { BlockViewCalendarWrapper } from "./Style";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import { Button } from "../../common/UI/buttons/buttons";
import { Dropdown } from "../../common/UI/dropdown/dropdown";
import "./style.css";
import {
  calendarDeleteData,
  eventVisible,
  addNewEvents,
} from "../../../redux/calendar/actionCreator";
import { Modal } from "../../common/UI/modals/antd-modals";
import { useStudentStore } from "../store";

const MonthCalendar = () => {

  const [selectedDate, setSelectedDate] = useState();
  const [sessionList, setSessionList] = useState();
  const [loader, setLoader] = useState(false);

  const [{ events, singleRow }, { getEvents, onEventDelete }] = useStudentStore();
  useEffect(() => {
    getEvents();

  }, [getEvents, singleRow]);
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => {
    return {
      eventsRed: state.Calender.events,
      isVisible: state.Calender.eventVisible,
    };
  });

  const [state, setState] = useState({
    date: new Date(),
    container: null,
    currentLabel: moment().format("MMMM YYYY"),
    width: 0,
    defaultValue: moment().format("YYYY-MM-DD"),
  });

  const { date, container, currentLabel, width, defaultValue } = state;
  const getInput = useRef();

  useLayoutEffect(() => {
    const button = document.querySelector(
      ".calendar-header__left .react-calendar__navigation .react-calendar__navigation__label"
    );
    const containers = document.querySelector(
      ".calendar-header__left .react-calendar__viewContainer"
    );
    const calenderDom = document.querySelectorAll(
      ".ant-picker-calendar-date"
    );
    calenderDom.forEach((element) => {
      element.addEventListener("click", (e) => {

        if (e.target.classList[0] === "ant-picker-calendar-date-value" || e.target.classList[0] === "ant-picker-calendar-date-content") {
          console.log(loader, "true");


          const getDate = moment(
            e.currentTarget.closest("td").getAttribute("title")
          ).format("YYYY-MM-DD");
          setSelectedDate( moment(
            e.currentTarget.closest("td").getAttribute("title")
          ).format("DD/MM/YYYY"));


          console.log(getDate, "date")
          setState({
            container: containers,
            date,
            currentLabel,
            width: getInput?.current !== null && getInput?.current?.clientWidth,
            defaultValue: getDate,
          });
          singleRow.sessions&&
          Object.keys(singleRow.sessions).map(function (key, index) {
            if (moment(getDate).format("DD-MM-YYYY") === key) {
              setSessionList(singleRow.sessions[key]);
              // console.log("selected session",singleRow.sessions[key],key)
              dispatch(eventVisible(true));
            }
          });
          setLoader(false);


        }


      });
    });

    setState({
      container: containers,
      defaultValue,
      date,
      currentLabel,
      width: getInput?.current !== null && getInput?.current?.clientWidth,
    });
  }, [date, currentLabel, defaultValue, dispatch]);

  const onChange = (dt) =>
    setState({
      ...state,
      date: dt,
      defautlValue: moment(dt).format("YYYY-MM-DD"),
    });
  function getListData(value) {
    let listData;
    const data = [];
    events.map((event) => {
      if (moment(event.date[0]).format("MMMM YYYY") === currentLabel) {
        const { label, title, id, description, time, date, type } = event;
        const a = moment(moment(event.date[1]).format("DD MMMM YYYY"));
        const b = moment(moment(event.date[0]).format("DD MMMM YYYY"));
        const totalDays = a.diff(b, "days");

        switch (value.date()) {
          case parseInt(moment(event.date[0]).format("DD"), 10):
            data.push({
              label,
              title,
              id,
              totalDays,
              description,
              time,
              date,
              type,
            });
            listData = data;
            break;
          default:
        }
      }
      return listData;
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    // console.log('value', moment(value).format("DD-MM-YYYY"))
    return (
      <ul className="events">

        {
          singleRow?.sessions !== undefined && Object.keys(singleRow?.sessions).map(function (key, index) {
            if (moment(value).format("DD-MM-YYYY") === key) {
              return <div style={{ width: "8px", height: "8px", backgroundColor: "blue", borderRadius: "50%" }}></div>
            }
          })
        }
      </ul>
    );
  }

  const handleCancel = () => {
    dispatch(eventVisible(false));
  };

  const addNew = (event) => {
    const arrayData = [];
    events.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(addNewEvents([...events, { ...event, id: max + 1 }]));
    dispatch(eventVisible(false));
  };

  return (
    <Cards headless>
      <Modal
        className="addEvent-modal"
        footer={null}
        type="primary"
        title="Slots"
        visible={isVisible}
        onCancel={handleCancel}
      >

        <h2>{selectedDate}</h2>
        {sessionList !== undefined &&
          Object.keys(sessionList).map(function (key, index) {
            return <span style={{ backgroundColor: "#F5F5F5", padding: "4px", marginRight: "10px", borderRadius: "3px" }}>{key}</span>
          })
        }
        {/* {sessionList.key} */}
        {/* <AddNewEvent onHandleAddEvent={addNew} defaultValue={defaultValue} /> */}
      </Modal>
      <div className="calendar-header">
        <div className="calendar-header__left">

          <CalenDar
            onClickMonth={() => {
              container.classList.remove("show");
            }}
            onActiveStartDateChange={({ activeStartDate }) =>
              setState({
                ...state,
                currentLabel: moment(activeStartDate).format("MMMM YYYY"),
                defaultValue: moment(activeStartDate).format("YYYY-MM-DD"),
              })
            }
            next2Label={null}
            prev2Label={null}
            nextLabel={<FeatherIcon icon="chevron-right" />}
            prevLabel={<FeatherIcon icon="chevron-left" />}
            onChange={onChange}
            value={state.date}
          />
        </div>

      </div>
      <BlockViewCalendarWrapper className="table-responsive">
        <Calendar
          headerRender={() => {
            return <></>;
          }}
          mode="month"
          dateCellRender={dateCellRender}
          value={moment(defaultValue)}
          defaultValue={moment(defaultValue)}
        />
      </BlockViewCalendarWrapper>
      {/* {loader ? <p>juyfjtuy</p> : "787878"} */}
      {/* <Skeleton loading={loader}>
        {
          sessionList !== undefined &&
          Object.keys(sessionList).map(function (key, index) {
            return <p>{key}</p>
          })
        }

      </Skeleton> */}



    </Cards>
  );
};

export default MonthCalendar;
