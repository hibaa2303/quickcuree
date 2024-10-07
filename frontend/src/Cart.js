import cartuu from './image/cart.jpeg'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
function Cart(){
    const Homepage=async()=>{
        window.location.replace("/Homepage")

    }
 
    return(
    <div  className="">
        
        <div className="cart container text-center  ">
        
        
       
        <img className="cart" src={cartuu}></img>
        <h4 className="fw-bold">Your cart is empty</h4>
        <p className=" text-secondary">We have all the medicines and health care
        <p> products that you need</p></p>
        <button className ="btn text-danger border border-danger "onClick={()=>{Cart()}}><AddShoppingCartIcon /></button>
        <div className="pb-5"></div>
        </div>
    </div>
    )}
   export default Cart

   