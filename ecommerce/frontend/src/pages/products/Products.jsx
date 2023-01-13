import React,{useEffect, useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import {DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Modal, Form, Input, Select, message} from 'antd';
import '../../index.css'
import FormItem from "antd/es/form/FormItem";

const Products =() =>{

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const getAllProducts = async () =>{
    try{
      dispatch({
        type:"SHOW_LOADING",
      });
      dispatch({
        type:"HIDE_LOADING",
      });
      const {data} = await axios.get('/api/products/getproducts')
      setProductData(data);
      console.log(data);

    }catch(error){
      dispatch({
        type:"HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() =>{
    getAllProducts();

  }, [dispatch]);

  const handlerDelete = async(record) =>{
    try{
      dispatch({
        type:"SHOW_LOADING",
      });
      await axios.post('/api/products/deleteproducts', {productId: record._id});
      message.success("Product Deleted Successfully!!")
      getAllProducts();
      setPopModal(false);
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
        title: "Action",
        dataIndex: "_id",
        render:(id, record)=> 
        <div>
          <DeleteOutlined className='cart-action' onClick={()=>handlerDelete(record)}/>
          <EditOutlined className='cart-edit' onClick={()=>{setEditProduct(record); setPopModal(true)}}/>
        </div>
        
    }
]

  const handlerSubmit= async(value)=>{
   if(editProduct !== null){
    try{
      dispatch({
        type:"SHOW_LOADING",
      });
      const res = await axios.post('/api/products/addproducts', value)
      message.success("Product Added Successfully!!")
      getAllProducts();
      setPopModal(false);
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
   else{
    try{
      dispatch({
        type:"SHOW_LOADING",
      });
      await axios.put('/api/products/updateproducts', {...value, productId: editProduct._id});
      message.success("Product Updated Successfully!!")
      getAllProducts();
      setPopModal(false);
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
  }

  return (
    <LayoutApp>
      <h2>All Products</h2>
      <Button className="add-new" onClick={()=>setPopModal(true)}>Add New</Button>
      <Table dataSource={productData} columns={columns} bordered/>;
      {
        popModal && 
        <Modal title={`${editProduct !== null ? "Edit Product" : "Add New Product"} `}
        visible={popModal} onCancel={()=> {setEditProduct(null); setPopModal(false)}}
        footer={false}>
         <Form layout='vertical' initialValues={editProduct} onFinish={handlerSubmit}>
          <FormItem name="name" label="Name">
            <Input />
          </FormItem>
         <FormItem name="category" label="Category">
         <Select>
            <Select.Option value="cosmetics">Cosmetics</Select.Option>
            <Select.Option value="sports">Sports</Select.Option>
            <Select.Option value="glasses">Glasses</Select.Option>
            <Select.Option value="bags">Bags</Select.Option>
          </Select>
         </FormItem>
          <FormItem name="price" label="Price">
            <Input />
          </FormItem>
          <FormItem name="image" label="Image URL">
            <Input />
          </FormItem>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">Add</Button>
          </div>
         </Form>
        </Modal>
      }
    </LayoutApp>
  )
}

export default Products
