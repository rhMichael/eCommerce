import { Button, Divider, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: 'required',
  },

]
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async(values) => {
    try {
      dispatch(setLoading(true));
      const response = await RegisterUser(values);
      dispatch(setLoading(false));
      if(response.success) {
        navigate('/login');
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400 text-2xl">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-3">
            Register
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
