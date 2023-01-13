# Shopping-Hut

Frontend-> React JS

Backend-> Node JS & Express JS

Database-> MongoDB

### Database Structure: (Table: columns)

users: _id, name, userId, password;

products: _id, name, category, price, image;

bills: _id, customerName, customerPhone, address, paymentMethod, totalAmount,  cartItems:Array, createdAt, updatedAt
 
 ### App Description
 
1.	System will allow the user to sign-up.
2.	System will allow the user to login.
3.	System will allow the user to logout.
4.	System will allow the user to view items.
5.	System will allow the user to display categories.
6.	System will allow the user to view cart.
7.	System will allow the user to view order.
8.	System will allow the user to add items to cart.
9.	System will allow the user to remove items from cart.
10.	System will allow the user to buy product.
11.	System will allow the user to view order history.
12.	System will allow the admin to add product.
13.	System will allow the admin to remove product.
14.	System will allow the admin to update product.

### How to Install and run the project
Install npm packages
#### npm i react-router-dom axios redux react-redux redux-thunk antd body-parser color concurrently cors dotenv express mongoose morgan nodemon --force
#### cd frontend 
#### npm i react-router-dom redux-devtools-extension antd


Both backend and frontend will run concurrently using the following command:
####  npm run dev
