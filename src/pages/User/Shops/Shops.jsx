import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../../redux/user/userSilce";

const Shops = () => {

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };




  return (

  <div>
    
    <div className='flex justify-center items-center gap-6'>

           


        <Link to="/ClothShop">
      <div  className='bg-white rounded-lg  border w-60 h-44 mt-40'>  
      <div className='flex justify-center items-center mt-2 '>
          
        <img className='rounded-full w-28 h-28  object-cover' src='https://thumbs.dreamstime.com/b/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg'/>
        
         </div>
         <div className='flex justify-center items-center  font-serif text-gray-500 mt-1 text-xl'> Clothing</div>
         
        </div>
        </Link>

        <Link to="/BeautyShop">
        <div  className='bg-white rounded-lg  border w-60 h-44 mt-40'>  
      <div className='flex justify-center items-center mt-2  '>
          
        <img className='rounded-full w-28 h-28   object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzET4BuI4_ITRlzsZ9BcQyJ-YAXUUVGe6XnQ&s'/>
        
         </div>
         <div className='flex justify-center items-center  font-serif text-gray-500 mt-1 text-xl'> Beauty & Cosmetics</div>
         
        </div>
        </Link>


        <Link to="/BookShop">
        
        <div  className='bg-white rounded-lg  border w-60 h-44 mt-40'>  
      <div className='flex justify-center items-center mt-2 '>
          
        <img className='rounded-full w-28 h-28  object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73ZnhbzyoosYXcbwgkmrzAOGW50g60rEo_NT4t1-WCQ&s'/>
        
         </div>
         <div className='flex justify-center items-center  font-serif text-gray-500 mt-1 text-xl'> Books</div>
         
        </div>
        </Link>

    </div>
    </div>
  )
}

export default Shops