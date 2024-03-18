import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/Slices/wishlistSlice'
import {addToCart} from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function View() {

  const cart = useSelector(state=>state.cartReducer)
  const wishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
  const [product,setProduct] = useState({})
  const {id} = useParams()
  // console.log(id);
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      // console.log(allProducts);
      setProduct(allProducts.find(item=>item.id==id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // console.log(product);

  const handleWishlist= (product) =>{
      if(wishlist?.includes(product)){
        toast.info("item already in your wishlist")
      }else{
        dispatch(addWishlistItem(product))
      }
  }
  const handleCart = (product)=>{
    const exisitingProduct = cart?.find(item=>item.id==product.id)
    if(exisitingProduct){
      dispatch(addToCart(product))
      toast.success("products added to your cart!!!")
    }else{
      dispatch(addToCart(product))
      toast.success("product added to your cart!!!")
    }
  }
  
  return (
    <>
    <Header/>
    <div style={{marginTop:'150px'}} className='container'>
      <div className="row mt-5">
        <div className="col-lg-6">
          <img width={'400px'} height={'400px'} className='image-fluid' src={product?.thumbnail} alt="" />
        </div>
        <div className="col-lg-6">
          <h5>PID: {product?.id}</h5>
          <h1> {product?.title} </h1>
          <h3 className='text-primary'>$ {product?.price}</h3>
          <p style={{textAlign:'justify'}}>
            <b>Description </b>: {product?.description}
          </p>
          <div className='d-flex justify-content-between'>
            <button onClick={()=>handleWishlist(product)} className='btn btn-outline-dark'>
              <i className='fa-solid fa-heart text-danger'></i>
              Add to Wishlist</button>
            <button onClick={()=>handleCart(product)} className='btn btn-outline-dark'>
            <i className='fa-solid fa-cart-plus text-success'></i>
              Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default View
