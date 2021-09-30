import React,{useEffect} from "react";
import { Row, Col } from "antd";
import FeatherIcon from "feather-icons-react";
import { Focard } from "../style";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import Heading from "../../common/UI/heading/heading";
import { user, expert, dollar } from "../../common/Assets/Icons";
import { useDashboardStore } from "../store";

const CardGroup = () => {
  const [
    { totalExperts ,totalUsers,totalRevenue},
    
  ] = useDashboardStore();

  return (
    <Row gutter={40}>
      <Col span={8}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Total Users">
              <div className="focard-details growth-downward">
                <img src={user}></img>
                <Heading as="h1">{totalUsers>=1000?totalUsers/1000+"k":totalUsers}</Heading>
              </div>
            </Cards>
          </div>
        </Focard>
      </Col>
      <Col span={8}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Total Experts">
              <div className="focard-details growth-upward">
                <img src={expert}></img>
                <Heading as="h1">{totalExperts>=1000?totalExperts/1000+"k":totalExperts}</Heading>
              </div>
            </Cards>
          </div>
        </Focard>
      </Col>
      <Col span={8}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Total Revenue">
              <div className="focard-details growth-upward">
                <img src={dollar}></img>
                <Heading as="h1">{totalRevenue>=1000?totalRevenue/100000+"k":totalRevenue}</Heading>
              </div>
            </Cards>
          </div>
        </Focard>
      </Col>
    </Row>
  );
};

export default CardGroup;
