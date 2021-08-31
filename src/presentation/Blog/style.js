import Styled from 'styled-components';

const BlogWrapper = Styled.div`
    display: flex;
    flex-wrap:wrap;
    gap:25px;
    margin-bottom:50px ;

`;

const BlogCard =Styled.div`
    background: #F7FDFA;
    padding : 25px 26px 23px 26px;
    width: 49%;
    @media only screen and (max-width: 1590px){
        width:48%;
    }
    h6{
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
        color: #272B41;
    }
    .blog-content{
        display: flex;
        justify-content:space-between;

    }
    .blog-left{
        width:30%;
        img{
            width: 100%;
            object-fit:cover;
        }
    }
    .blog-right{
        width:65%;
        .user-profile{
            display: flex;
            justify-content:start;
            gap : 15px;
            align-items:center;
            margin-bottom:10px;
            img{
                width: 40px;
                height: 40px;
                border-radius:50%;
            }
            span{
                font-size: 16px;
                line-height: 17px;
                color: #272B41;
            }
        }
        p{
            text-align:justify;
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color:#5A5F7D;
        }
    }
    .blog-more{
        display: flex;
        justify-content:end;
        button{
            padding:5px 35px ;
            color : #40BFB4;
        }
    }
`; 

export { BlogCard,BlogWrapper} ;