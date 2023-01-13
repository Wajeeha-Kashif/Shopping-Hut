import React, {useEffect} from "react";
import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, message} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login =() =>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) =>{
    try{
      dispatch({
        type:"SHOW_LOADING",
      });
      const res = await axios.post('/api/users/login');
      dispatch({
        type:"HIDE_LOADING",
      }); 

      message.success("Login Successfully!!");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
          
    }catch(error){
      dispatch({
        type:"HIDE_LOADING",
      });
      message.error("Error!")
      console.log(error);
    }
}

useEffect(()=>{
  if(localStorage.getItem("auth")){
  localStorage.getItem("auth");
  navigate("/");
  }
}, [navigate]);

return (
<div className="form">
    <h2>SHOPPING HUT</h2>
    <p>Login</p>
    <div className="form-group">
    <Form layout='vertical' onFinish={handlerSubmit}>
      <FormItem name="userId" label="User ID">
        <Input />
      </FormItem>
      <FormItem name="password" label="Password">
        <Input  type="password"/>
      </FormItem>
      <div className="form-btn-add">
        <Button htmlType="submit" className="add-new">Login</Button>
        <Link to="/register" className="form-other">Register</Link>
      </div>
     </Form>
    </div>
</div>
)
}

export default Login
