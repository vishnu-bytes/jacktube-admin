import React,{useState} from 'react';
import { Pagination } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../common/UI/page-headers/page-headers';
import { Main } from '../common/Style/styled';
import { Button } from '../common/UI/buttons/buttons';
import {BlogCard,BlogWrapper} from './style';
import { ProjectPagination } from '../Project/style';
import { useEffect } from 'react';
import {useBlogStore} from "./store";
import CreateBlog from './CreateBlog';
import { Link } from 'react-router-dom';
import { routes } from "../common/Routes/index";

const Blog = () => {
  const [blog, { onBlog}] = useBlogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState({
    // notData: searchData,
    visible: false,
    categoryActive: "all",
  });
  const { visible } = state;
  const onHandleChange = (current) => {
    setCurrentPage(current)
  };
  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };
  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  useEffect(() => {
    onBlog(currentPage)
  },[currentPage])
    return (
      <>
        <PageHeader
          ghost
          title="Blogs/Articles"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button onClick={showModal} size="small" type="primary">
                <FeatherIcon icon="plus" size={14} />
                Create Blog
              </Button>
            </div>,
            
          ]}
        />
        <Main>
          <BlogWrapper>
            {blog?.result?.results?.map(result=>(
              <BlogCard>
              <h6>{result?.title}</h6>
              <div className="blog-content">
                <div className="blog-left">
                  <img src={result?.image} alt="Blog" />
                </div>
                <div className="blog-right">
                  <div className="user-profile">
                    <img src="https://picsum.photos/id/237/200/300" alt="User" />
                    <span>{result?.author}</span>
                  </div>
                  <p>{result?.body}</p>
                  <div className="blog-more">
                    <Link 
                      to={{
                        pathname: routes.BLOGEXPANDED,
                        state: result,
                      }}>
                      <Button>More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </BlogCard>
            ))}
          </BlogWrapper>
          <ProjectPagination>
          {blog?.result?.totalDoc ? (
            <Pagination
              onChange={onHandleChange}
              pageSize={8}
              defaultCurrent={1}
              total={blog?.result?.totalDoc}
            />
          ) : null}
        </ProjectPagination>
        <CreateBlog onCancel={onCancel} visible={visible} />
        </Main>
      </>
    );
  };
  
  export default Blog;
  