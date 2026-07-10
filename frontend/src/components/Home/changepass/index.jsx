// 



import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await axios.put(
        "http://localhost:3000/api/user/change-password",
        { password: values.password },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }

      );

//     await axios.put(
//   "http://localhost:3000/api/user/change-password",   // 'api' add kiya
//   { password: values.password },
//   {
//     headers: { Authorization: Bearer ${token} },
//     withCredentials: true,
//   },
// );

      toast.success("Password changed successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Change Password</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: "Please enter new password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;