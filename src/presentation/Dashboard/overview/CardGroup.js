import React from "react";
import { Row, Col } from "antd";
import FeatherIcon from "feather-icons-react";
import { Focard } from "../style";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import Heading from "../../common/UI/heading/heading";
import { user, expert, dollar } from "../../common/Assets/Icons";
const CardGroup = () => {
  return (
    <Row gutter={40}>
      <Col md={8}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Total Users">
              <div className="focard-details growth-downward">
                <img src={user}></img>
                <Heading as="h1">25.3k</Heading>
              </div>
            </Cards>
          </div>
        </Focard>
      </Col>
      <Col md={8}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Total Experts">
              <div className="focard-details growth-upward">
                <img src={expert}></img>
                <Heading as="h1">82.24k</Heading>
              </div>
            </Cards>
          </div>
        </Focard>
      </Col>
      <Col md={8}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Total Revenue">
              <div className="focard-details growth-upward">
                <img src={dollar}></img>
                <Heading as="h1">82.24k</Heading>
              </div>
            </Cards>
          </div>
        </Focard>
      </Col>
    </Row>
  );
};

export default CardGroup;
