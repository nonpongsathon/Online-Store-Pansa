import { notification } from "antd";
import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  (err) => {
    if (err && err.response.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.reload();
      notification.error({ message: "กรุณาเข้าสู่ระบบใหม่" });

      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);
export default axios;
