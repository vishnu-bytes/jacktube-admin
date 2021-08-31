import React from 'react'
import {Container,BlogExpandedDiv} from "./styled";
import { Avatar, Image } from "antd";
import { useLocation } from "react-router";

function BlogsExpanded() {
  let location = useLocation();
  let data = location.state;
  console.log(data)

    return (
      <BlogExpandedDiv>
      <Container>
        <div className="BlogImage">
          <img
            src={data.image}
            alt="blog1"
          />
        </div>
        <div className="BlogHeading">
          <h1>{data.title}</h1>
        </div>
        <div className="BloggerDetails">
          <Avatar
            size="large"
            src={
              <Image src="https://picsum.photos/id/870/200/300?grayscale&blur=2" />
            }
          />
          <p>{data.author}</p>
        </div>
        <div className="Blog">
          <p>{data.body}</p>
        </div>
      </Container>
      </BlogExpandedDiv>
    );
}

export default BlogsExpanded
