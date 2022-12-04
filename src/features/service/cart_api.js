import axios from "axios";
import { useDispatch } from "react-redux";
import { set_data } from "../cart/same_slice";



export function fetchArticleDetails(cart) {
  return funk()
}


const funk = async () => {

  const dispatch = useDispatch();
  const { data } = await axios.post("http://localhost:4000/products/cart", {
    data: [
      {
        "_id": "6388b8e975c9cce741055268",
        "quantity": 666
      }
    ]
  });
  console.log(data)
  dispatch(set_data(data));

}