import axios from "axios";
import { useDispatch } from "react-redux";
import { set_data } from "../cart/same_slice";



export function fetchArticleDetails(cart) {
  return funk(cart)
}


const funk = async (cart) => {

  const dispatch = useDispatch();
  const { data } = await axios.post("http://localhost:4000/products/cart", {
    data: cart
  });
  console.log(data)
  dispatch(set_data(data));

}