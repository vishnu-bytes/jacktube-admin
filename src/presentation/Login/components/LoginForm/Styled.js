import Styled from "styled-components";

const OverviewCard = Styled.div`
    width : 340px;
    height: 480px;
    display : flex;
    flex-direction :column;
    align-items :flex-start;
    justify-content:center;
    h1{
        margin-bottom:0px;
        font-family:${({ theme }) => theme["font-family"]}
    }
`;
const AuthWrapper = Styled.div`
  height: 100%;
  padding-top:47px;


  @media only screen and (max-width: 767px){
    text-align: center;
  }
  .auth-notice{
    text-align: right;
    font-weight: 500;
    color: ${({ theme }) => theme["gray-color"]};
    @media only screen and (max-width: 767px){
      text-align: center;
      margin-bottom: 10px;
    }
  }
  button{
    &.btn-signin{
      min-width: 280px;
       border-radius: 13px;
       background:${({ theme }) => theme["primary-color"]};
       border:${({ theme }) => theme["primary-color"]};
       width:185px
    }
    &.btn-create{
      border-radius: 8px;
      min-width: 205px;
    }
    &.btn-reset{
      border-radius: 8px;
      min-width: 260px;
    }
    &.ant-btn-lg{
      font-size: 14px;
      font-weight: 500;
      height: 48px;
    }
  }
  .auth-contents{
    display: flex;
    align-items: center;
    justify-content: center;
    form{
      width: 420px;
      h1{
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 45px;
        @media only screen and (max-width: 767px){
          margin-bottom: 28px;
        }
        input::placeholder{
          color: ${({ theme }) => theme["extra-light-color"]};
        }
      }
      .auth-form-action{
        margin-bottom: 31px;
        display: flex;
        justify-content: space-between;
      }
    }
    .form-divider{
      font-size: 14px;
      color: ${({ theme }) => theme["gray-solid"]};
      text-align: center;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        width: 100%;
        background: ${({ theme }) => theme["border-color-light"]};
      }
      span{
        background: #F7FDFA;;
        display: inline-block;
        position: relative;
        z-index: 2;
      }
    }
`;
export { OverviewCard, AuthWrapper };
