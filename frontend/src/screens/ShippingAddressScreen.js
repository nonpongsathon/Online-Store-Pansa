import { Form, Input, Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const layout = {
  labelCol: { xs: 7, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
const tailLayout = {
  wrapperCol: { xs: 17, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [district1, setDistrict1] = useState(shippingAddress.district1);
  const [district2, setDistrict2] = useState(shippingAddress.district2);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    const {
      fullName,
      address,
      district1,
      district2,
      city,
      country,
      postalCode,
    } = values;
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        district1,
        district2,
        city,
        country,
        postalCode,
      })
    );
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Row justify="center">
        <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
          <Row justify="center">
            <div className="signin-status">
              <h1>ที่อยู่จัดส่ง</h1>
            </div>

            <Form
              {...layout}
              style={{ width: "100%" }}
              onFinish={onFinish}
              initialValues={{
                fullName: fullName,
                address: address,
                district1: district1,
                district2: district2,
                city: city,
                country: country,
                postalCode: postalCode,
              }}
            >
              <Form.Item
                label="ชื่อ - นามสกุล"
                name="fullName"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ชื่อ",
                  },
                ]}
              >
                <Input onChange={(e) => setFullName(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="บ้านเลขที่/ถนน/ซอย"
                name="address"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ บ้านเลขที่/ถนน",
                  },
                ]}
              >
                <Input onChange={(e) => setAddress(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="ตำบล/แขวง"
                name="district1"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ ตำบล/แขวง",
                  },
                ]}
              >
                <Input onChange={(e) => setDistrict1(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="อำเภอ/เขต"
                name="district2"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ อำเภอ/เขต",
                  },
                ]}
              >
                <Input onChange={(e) => setDistrict2(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="จังหวัด"
                name="city"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ จังหวัด",
                  },
                ]}
              >
                <Input onChange={(e) => setCity(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="ประเทศ"
                name="country"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ ประเทศ",
                  },
                ]}
              >
                <Input onChange={(e) => setCountry(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="รหัสไปรษณีย์"
                name="postalCode"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ รหัสไปรษณีย์",
                  },
                ]}
              >
                <Input onChange={(e) => setPostalCode(e.target.value)} />
              </Form.Item>

              <Form.Item {...tailLayout} label=" ">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  บันทึก
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
