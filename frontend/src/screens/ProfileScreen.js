import { Form, Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const layout = {
  labelCol: { xs: 7, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
const tailLayout = {
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};

export default function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo.id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo.id, user]);

  const onFinish = (values) => {
    dispatch(
      updateUserProfile(user.id, values.name, values.email, values.password)
    );
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row justify="center">
          <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
            <Row justify="center">
              <div className="page-topic">
                <h1>แก้ไขโปรไฟล์</h1>
                <div>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                  {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                  )}
                  {successUpdate && (
                    <MessageBox variant="success" style={{ color: "green" }}>
                      โปรไฟล์อัพเดตสำเร็จ
                    </MessageBox>
                  )}
                </div>
              </div>
              <Form
                {...layout}
                style={{ width: "100%" }}
                onFinish={onFinish}
                initialValues={{
                  email: userInfo.email,
                  name: userInfo.name,
                }}
              >
                <Form.Item label="ชื่อ" name="name">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    rules={[
                      {
                        required: true,
                        message: "กรุณาใส่ชื่อ",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="อีเมล์"
                  name="email"
                  rules={[
                    { type: "email", message: "กรุณาใส่ E-mail! ให้ถูกต้อง" },
                    {
                      required: true,
                      message: "กรุณาอีเมล์",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Password" name="password" hasFeedback>
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rules={[
                      {
                        required: true,
                        message: "กรุณาใส่ password",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirm password"
                  hasFeedback
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "กรุณาใส่ confirm password",
                    },
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
                  <Input.Password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item {...tailLayout} label=" ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    อัพเดต
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}
