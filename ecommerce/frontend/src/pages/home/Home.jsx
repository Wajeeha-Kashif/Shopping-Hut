import React,{useState, useEffect} from "react";
import axios from "axios";
import { Col, Row } from 'antd';
import Product from "../../components/Product";
import LayoutApp from "../../components/Layout";
import { useDispatch } from "react-redux";
import '../../index.css'

const Home =() =>{

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('glasses');
  const categories = [
    {
      name: "glasses",
      imageUrl: "https://freepngimg.com/thumb/glasses/7-glasses-png-image-thumb.png",
    },
    {
      name: "bags",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8j2EKJyFDXgoREUHLAklgvyc89ObgvE8QCQ&usqp=CAU"
    },
    {
      name: "cosmetics",
      imageUrl: "https://thumbs.dreamstime.com/b/black-white-silhouette-make-up-brush-set-st-valentine-gift-woman-beauty-themed-vector-illustration-stamp-label-certificate-138441365.jpg",
    },
    {
      name: "sports",
      imageUrl: "https://freepngimg.com/thumb/football/2-football-ball-png-image-thumb.png",
    },

  ]

  useEffect(() =>{
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
        console.log(error);
      }
    };
    getAllProducts();

  }, [dispatch]);


  return (
  <LayoutApp>
    <div className="category">
      {categories.map((category)=>(
        <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 
        'category-active'}`} onClick={()=> setSelectedCategory(category.name)}>
          <h3 className="categoryName">{category.name}</h3>
          <img src={category.imageUrl} alt={category.name} height={60} width={60} />
        </div>
      ))}
    </div>
   <Row>
    {productData.filter((i)=> i.category === selectedCategory).map (product =>(
      <Col xs= {24} sm= {6} md={12} lg={6}>
      <Product key={product.id} product={product}/>
      </Col>
    ))}
   </Row>
  </LayoutApp>
)
}

export default Home
