import React, {useEffect} from "react";
import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, message} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register =() =>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handlerSubmit = async(value) =>{

      try{
        dispatch({
          type:"SHOW_LOADING",
        });
       await axios.post('/api/users/register', value)
        message.success("Registered Successfully!!")
        navigate("/login");
      
        dispatch({
          type:"HIDE_LOADING",
        });      
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
        <p>Register</p>
        <div className="form-group">
        <Form layout='vertical' onFinish={handlerSubmit}>
          <FormItem name="name" label="Name">
            <Input />
          </FormItem>
          <FormItem name="userId" label="User ID">
            <Input />
          </FormItem>
          <FormItem name="password" label="Password">
            <Input  type="password"/>
          </FormItem>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">Register</Button>
            <Link to="/login" className="form-other">Already have an account? Login</Link>
          </div>
         </Form>
        </div>
    </div>
  )
}

export default Register
