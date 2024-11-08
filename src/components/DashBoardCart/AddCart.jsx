import React, { createContext, useContext, useEffect, useState } from "react";
import { clearCartGadgets, getGadgetList, removeCartGadget } from "../../utilities/storeCard";
import CartDetails from "./CartDetails";
import { priceContext } from "../../Layout/Main";
import modalImage from "../../assets/assets/Group.png";
import { useNavigate } from "react-router-dom";

const AddCart = () => {
  const [carts, setCarts] = useState([]);
  const {priceItem,setPrice,resetItems,setResetItems,modalBtnDisable,setModalBtnDisable} = useContext(priceContext);
  const navigate = useNavigate();



  const handleNavigate = (event) => {
    event.preventDefault()
    setResetItems(true);
    clearCartGadgets();
    setPrice(0)
    navigate('/')
  }



  useEffect(() => {
    const cartList = getGadgetList();
    setCarts(cartList);
  }, [resetItems]);



useEffect(()=> {
   if(priceItem > 0){
      setModalBtnDisable(false)
    }
},[])


  const handleSorting = () => {
    const sortingPrice = [...carts].sort((a, b) => b.price - a.price);
    setCarts(sortingPrice);
  };

  const handleRemoveCart = (id) => {
    removeCartGadget(id)
    const cartList = getGadgetList();
    setCarts(cartList);
  }


  const handlePurchase = () => {
    document.getElementById("my_modal_1").showModal();
  };




  return (
    <div>
      <div className="w-11/12 mx-auto py-4">
        <div className="sm:flex sm:justify-between text-center">
          <div className="">
            <h2 className="font-bold text-xl">Cart</h2>
          </div>
          <div className="sm:flex gap-4 items-center">
            {
                !resetItems ?  <p className="py-3 font-bold text-xl">Total = $ {priceItem}</p> : " Total = $ 00"
            }
            <button
              onClick={handleSorting}
              className="rounded-full px-6 py-3 bg-transparent  hover:bg-[#9538E2] hover:text-white border border-[#9538E2] text-[#9538E2]"
            >
              Sort By Price
            </button>
            <button
              onClick={handlePurchase}
              className="btn px-6 py-2 bg-[#9538E2] shadow-inner rounded-full text-white"
            >
              Purchase
            </button>
          </div>
        </div>

        {/* : <h2 className="font-bold flex items-center justify-center h-60 text-3xl">Cart is Empty</h2>  */}

        {
        
        carts.map((cart, index) => (
          <CartDetails key={index} handleRemoveCart={handleRemoveCart} cart={cart}></CartDetails> 
        )) 
        
        }
      </div>
      {/* <Modal></Modal> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-center">
          <div className="flex justify-center">
            <img src={modalImage} alt="" />
          </div>
          <div className="border-b py-3">
              <h2 className="font-bold text-center text-3xl  mb-2">Payment Successfully</h2>
          </div>
          
          <p className="py-4">Thanks For Purchasing</p>
          {
            !resetItems ?  <p className="py-3">Total = $ {priceItem}</p> : "Total = $ 00"  
          }
         
          <div className="">
            <form method="" className="text-center">
              {/* if there is a button in form, it will close the modal */}
              {
                priceItem > 0 ?  <button  onClick={handleNavigate} className="btn w-full rounded-full">
                Close
              </button> :  <button disabled className="btn w-full rounded-full">
                Close
              </button>
              }
             
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCart;
