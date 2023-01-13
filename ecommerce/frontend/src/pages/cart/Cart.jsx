import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutApp from "../../components/Layout";
import {DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button,Modal, Table, Form, Select, Input, message} from 'antd';
import '../../index.css'
import { useState } from "react";
import { useEffect } from "react";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Cart =() =>{
    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);
    const navigate=useNavigate();

    const dispatch = useDispatch();

    const {cartItems} = useSelector( state => state.rootReducer);

    const handlerIncrement= (record) =>{
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity + 1}
        });
    };
    const handlerDecrement= (record) =>{
        if(record.quantity != 1){
            dispatch({
                type: "UPDATE_CART",
                payload: {...record, quantity: record.quantity - 1}
            });
        }
      
    };

    const handlerDelete = (record)=>{
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
        });     
    }

    const columns =[
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: "Image",
            dataIndex: "image",
            render:(image, record)=> <img src={image} alt={record.name} height={60} width={60}/>
        },
        {
            title: "Price",
            dataIndex: "price",

        },
        {
            title: "Quantity",
            dataIndex: "_id",
            render:(id, record)=> 
            <div>
                  <MinusCircleOutlined className='cart-minus'  onClick={()=>handlerDecrement(record)}/>
                <strong className='cart-quantity'>{record.quantity}</strong>
                <PlusCircleOutlined className='cart-plus' onClick={()=>handlerIncrement(record)}/>
            </div>
            
        },
        {
            title: "Action",
            dataIndex: "_id",
            render:(id, record)=> <DeleteOutlined className='cart-action' onClick={()=>handlerDelete(record)}/>
            
        }
    ]

    useEffect(()=>{
        let temp=0;
        cartItems.forEach((product)=> (temp= temp + product.price * product.quantity));
        setSubTotal(temp);

    },[cartItems]);


    const handlerSubmit = async(value)=>{
       try{
        const newObject={
          ...value,
          cartItems,
          totalAmount: Number(Number(subTotal)+Number(200)),
          userId: JSON.parse(localStorage.getItem("auth"))._id
  
         }
         await axios.post("/api/bills/addbills", newObject);
         message.success("Order Confirmed!");
         navigate("/bills")
       }
       catch(error){
        message.error("Error!");
        console.log(error);
       }
    }

  return (
    <LayoutApp>
       <h2>Cart</h2>
       <Table dataSource={cartItems} columns={columns} bordered/>;
       <div className="subTotal">
         <h2>Sub Total: <span>Rs {(subTotal)}</span></h2>
         <Button onClick={()=>setBillPopUp(true)} className="add-new">Checkout</Button>
       </div>
       <Modal title="Enter Details" visible={billPopUp} onCancel={()=>setBillPopUp(false)} footer={false}>
       <Form layout='vertical' onFinish={handlerSubmit}>
          <FormItem name="customerName" label="Name">
            <Input />
          </FormItem>
          <FormItem name="customerPhone" label="Phone Number">
            <Input />
          </FormItem>
          <FormItem name="address" label="Address">
            <Input />
          </FormItem>
         <Form.Item name="paymentMethod" label="Payment Method">
         <Select>
            <Select.Option value="cash">Cash on Delivery</Select.Option>
            <Select.Option value="card">Card</Select.Option>
          </Select>
         </Form.Item>
         <div className="total">
        
            <span>SubTotal: Rs{subTotal}</span><br />
            <span>Delivery charges: Rs200</span>
           
            <h3>Total: Rs{Number(subTotal)+Number(200)}</h3>
         </div>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">Confirm Order</Button>
          </div>
         </Form>

       </Modal>
    </LayoutApp>
  )
}

export default Cart
