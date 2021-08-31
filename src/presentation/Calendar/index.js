import React, { useState, useEffect, lazy, Suspense } from "react";
import { Row, Col, Skeleton } from "antd";
import FeatherIcon from "feather-icons-react";
import CalenDar from "react-calendar";
import { Link, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Aside, CalendarWrapper } from "./Style";
import { Main } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { Cards } from "../common/UI/cards/frame/cards-frame";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import "react-calendar/dist/Calendar.css";
import { eventVisible } from "../../redux/calendar/actionCreator";
import { logError } from "../common/Utils";
import { useCalenderStore } from "./store";

const YearCalendar = lazy(() => import("./overview/Year"));
const MonthCalendar = lazy(() => import("./overview/Month"));
const WeekCalendar = lazy(() => import("./overview/Week"));
const DayCalendar = lazy(() => import("./overview/Day"));
const TodayCalendar = lazy(() => import("./overview/Today"));
const ScheduleCalendar = lazy(() => import("./overview/Schedule"));

const Calendars = () => {
  const dispatch = useDispatch();

  const { events, isVisible } = useSelector((state) => {
    return {
      events: state.Calender.events,
      isVisible: state.Calender.eventVisible,
    };
  });
  const [state, setState] = useState({
    date: new Date(),
    visible: false,
  });

  const onChange = (date) => setState({ date });

  const onHandleVisible = () => {
    dispatch(eventVisible(!isVisible));
  };

  return (
    <>
      <PageHeader ghost title="Calendar" />
      <Main>
        <CalendarWrapper>
          <Row gutter={25}>
            <Col xxl={6} xl={9} xs={24}>
              <Aside>
                <Button
                  onClick={onHandleVisible}
                  className="btn-create"
                  size="large"
                  type="secondary"
                >
                  <FeatherIcon icon="plus" size={14} /> Create New Event
                </Button>
                <div className="calendar-display">
                  <CalenDar
                    next2Label={null}
                    prev2Label={null}
                    onChange={onChange}
                    value={state.date}
                  />
                </div>
                <br />
                <Cards headless>
                  <h3 className="listHeader">
                    My Calendars
                    <Link
                      onClick={onHandleVisible}
                      className="add-label"
                      to="#"
                    >
                      <FeatherIcon icon="plus" size={14} />
                    </Link>
                  </h3>
                  <ul className="event-list">
                    {events.map((event) => {
                      const { id, title, label } = event;
                      return (
                        <li key={id}>
                          <Link to="#">
                            <span className={`bullet ${label}`} />
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Cards>
              </Aside>
            </Col>
            <Col xxl={18} xl={15} xs={24}>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 15 }} active />
                    </Cards>
                  }
                >
                  <Route path={`/calender/year`} component={YearCalendar} />
                  <Route path={`/calender/month`} component={MonthCalendar} />
                  <Route path={`/calender/week`} component={WeekCalendar} />
                  <Route path={`/calender/day`} component={DayCalendar} />
                  <Route path={`/calender/today`} component={TodayCalendar} />
                  <Route
                    path={`/calender/schedule`}
                    component={ScheduleCalendar}
                  />
                </Suspense>
              </Switch>
            </Col>
          </Row>
        </CalendarWrapper>
      </Main>
    </>
  );
};

export default Calendars;
