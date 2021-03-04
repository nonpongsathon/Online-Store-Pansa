import React, { useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const layout = {
  labelCol: { xs: 7, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
const tailLayout = {
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};

export default function RegisterScreen(props) {
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error } = userRegister;

  const onFinish = (values) => {
    dispatch(register(values.name, values.email, values.password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);
  return (
    <Row justify="center">
      <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
        <Row justify="center">
          <div className="page-topic">
            <h1>สร้างบัญชี</h1>
            <div>
              {error && (
                <div>
                  <MessageBox variant="danger">{error}</MessageBox>
                </div>
              )}
            </div>
          </div>

          <Form {...layout} style={{ width: "100%" }} onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "กรุณาใส่ชื่อ",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { type: "email", message: "กรุณาใส่ E-mail! ให้ถูกต้อง" },
                {
                  required: true,
                  message: "กรุณาใส่ E-mail",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              rules={[{ required: true, message: "กรุณาใส่ Password" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm password"
              hasFeedback
              dependencies={["password"]}
              rules={[
                { required: true, message: "กรุณาใส่ Confirm Password" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Confirm password ต้องตรงกับ Password"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} label=" ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                สร้างบัญชี
              </Button>
            </Form.Item>
          </Form>
          <div>
            มีบัญชีแล้ว?{" "}
            <Link to={`/signin?redirect=${redirect}`}>เข้าสู่ระบบ</Link>
          </div>
        </Row>
      </Col>
    </Row>
  );
}
