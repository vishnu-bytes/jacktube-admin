import React,{useState} from "react";
import Heading from "../../../common/UI/heading/heading";
import { Checkbox } from "../../../common/UI/checkbox/checkbox";
import { Form, Input, Button } from "antd";
import { OverviewCard, AuthWrapper } from "./Styled.js";
import { useUserStore } from "../../store";
import { useHistory } from "react-router";

function LoginForm() {



  let history = useHistory();
  const [form] = Form.useForm();
  const [, { onSubmit }] = useUserStore();

  return (
    <OverviewCard>
      <Heading as="h2" children="Sign in to" sub=" Admin"></Heading>
      <AuthWrapper>
        <div className="auth-contents">
          <Form
            name="login"
            layout="vertical"
            form={form}
            onFinish={(values) => onSubmit(values, history)}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  message: "Please input your email",
                },
              ]}
              label="Username or Email Address"
            >
              <Input  placeholder="Email" />
            </Form.Item>
            <Form.Item name="password"  label="Password">
              <Input.Password placeholder="Password" />
            </Form.Item>
            <div className="auth-form-action">
              {/* <Checkbox>Keep me logged in</Checkbox> */}
            </div>
            <Form.Item>
              <Button
                // onClick={onSubmit}
                className="btn-signin"
                htmlType="submit"
                type="primary"
                size="large"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </AuthWrapper>
    </OverviewCard>
  );
}

export default LoginForm;
