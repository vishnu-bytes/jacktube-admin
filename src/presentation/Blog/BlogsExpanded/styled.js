import Styled from "styled-components";

const BlogExpandedDiv = Styled.div`
    min-height:calc(100vh - 124px);
`;

const Container = Styled.div`
    display: flex;
    flex-direction : column;
    justify-content: space-between;
    align-items : flex-start;
    max-width: 60%;
    margin:0 auto;
    .BlogImage{
        margin-bottom: 24px;
        width: 100%;
        img{
            width: 100%;
            height:500px;
            object-fit:cover;
        }
    }
    .BlogHeading{
        h1{
            font-size : 32px;
        }
    }
    .BloggerDetails{
        display: flex;
        flex-direction: row;
        align-items : center;
        margin-bottom:24px;
        
        p{
            margin-left:20px;
            margin-top :20px;
            font-size: 24px;
        }
    }
    .Blog{
        margin-left:12px;
        p{
            font-size:18px;
            
        }
    }

`;
export  {Container,BlogExpandedDiv}
