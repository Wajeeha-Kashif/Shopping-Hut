import LayoutApp from "../../components/Layout"
import React,{useEffect, useState} from "react";
import axios from "axios";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from "react-redux";
import {DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Modal, Form, Input, Select, message} from 'antd';

const Bills =() =>{
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const getAllBills = async () =>{
    try{
      dispatch({
        type:"SHOW_LOADING",
      });
      const {data} = await axios.get('/api/bills/getbills')
      setBillsData(data);
      dispatch({
        type:"HIDE_LOADING",
      });
      console.log(data);

    }catch(error){
      dispatch({
        type:"HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() =>{
    getAllBills();

  }, []);

  
  const columns =[
    {
        title: 'ID',
        dataIndex: '_id'
    },
    {
        title: "Customer Name",
        dataIndex: "customerName",
    },
    {
        title: "  Contact Number",
        dataIndex: "customerPhone",

    },
    {
      title: "  Contact Address",
      dataIndex: "address",

  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",

},
]

  return (
    <LayoutApp>
      <h2>Order History</h2>
      <Button className="add-new" onClick={()=>setPopModal(true)}>Add New</Button>
      <Table dataSource={billsData} columns={columns} bordered/>;
     
    </LayoutApp>
  )
}

export default Bills
