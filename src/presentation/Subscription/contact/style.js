import Styled from 'styled-components';

const Action = Styled.div`
  .active{
    color: #FA8B0C;
  }
`;
const ContactPageheaderStyle = Styled.div`
  .ant-page-header-heading-title{
    margin-right: 0;
    padding-right: 0;
    &:after{
      display: none;
    }
  }
  .ant-select .ant-select-selection-search-input{
    border-radius: 6px;
  }
`;
const ContactCardWrapper = Styled.div`
.ant-card-body{
  padding:25px 0 !important;
}
  position: relative;
  
  button{
    position: absolute;
    background: transparent !important;
    top: 0;
    right: 0;
    padding: 0;
    svg {      
      color: #AEB9CD;
      width: 18px;
      height: 18px;
    }
  }
  .contact-card{
    padding:28px 0 35px;
    display:flex;
    align-items:center;
    flex-direction:column;
    .price{
      font-size: 48px;
      line-height: 58px;
      text-align: center;
      color: #20C997;
      margin-bottom:18px;
    }
    .timespan{
      background: #C7F8E8;
      border-radius: 5px;
      padding:5px 30px;
      margin-bottom:24px;

    }
    .features li{
      font-size: 12px;
line-height: 16px;



color: #272B41;
    }
    figure{
      text-align: center;
      margin: 0;
      img{
        border-radius: 50%;
      }
      figcaption{
        margin-top: 20px;
        h3{
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 0;
        }
      }
    }
    .user-info{
      margin-top: 20px;
      // border-top: 1px solid #F1F2F6;
      padding-top: 25px;
      ul{
        li{
          display: flex;
          align-items: center;
          color: #8288A4;
          &:not(:last-child){
            margin-bottom: 14px;
          }
          svg{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
            color: #8288A4;
          }
        }
      }
    }
  }
`;
export { Action, ContactPageheaderStyle, ContactCardWrapper };
