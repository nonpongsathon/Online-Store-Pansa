import React, { useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const layout = {
  labelCol: { xs: 7, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
const tailLayout = {
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};

export default function SigninScreen(props) {
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const onFinish = (values) => {
    dispatch(signin(values.email, values.password));
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
            <h1>เข้าสู่ระบบ</h1>
            <div>
              {loading && (
                <div>
                  <LoadingBox></LoadingBox>
                </div>
              )}
              {error && (
                <div>
                  <MessageBox variant="danger">{error}</MessageBox>
                </div>
              )}
            </div>
          </div>

          <Form {...layout} style={{ width: "100%" }} onFinish={onFinish}>
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
              rules={[{ required: true, message: "กรุณาใส่ Password" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} label=" ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
          <div>
            ยังไม่มีบัญชี?{" "}
            <Link to={`/register?redirect=${redirect}`}>สร้างบัญชี</Link>
          </div>
        </Row>
      </Col>
    </Row>
  );
}
