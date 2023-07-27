import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const totalPriceRef = useRef(null);
  useEffect(() => {
    cart.length > 0
      ? (totalPriceRef.current.style.display = "table-row")
      : (totalPriceRef.current.style.display = "none");
  }, [cart]);

  return (
    <table className="w-full text-left table-auto border-collapse border border-gray-600">
      <thead>
        <tr>
          <th className="border border-gray-600 px-4 py-2">Product</th>
          <th className="border border-gray-600 px-4 py-2">Price</th>
          <th className="border border-gray-600 px-4 py-2">Quantity</th>
          <th className="border border-gray-600 px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          cart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            return (
              <tr key={item.id}>
                <td className="border border-gray-600 px-4 py-2">
                  {product.title.substring(0, 20)}...
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  $ {product.price.toLocaleString()}
                </td>
                <td className="border border-gray-600 px-4 py-2">{item.qty}</td>
                <td className="border border-gray-600 px-4 py-2">
                  {typeof product.price === "number" &&
                  !isNaN(product.price) &&
                  typeof item.qty === "number" &&
                  !isNaN(item.qty)
                    ? `$. ${(product.price * item.qty).toLocaleString()}`
                    : "Invalid price or quantity"}
                </td>
              </tr>
            );
          })}
        <tr ref={totalPriceRef}>
          <td className="border border-gray-600 px-4 py-2" colSpan={3}>
            <b>Total Price</b>
          </td>
          <td className="border border-gray-600 px-4 py-2">
            <b>$ {totalPrice.toLocaleString()}</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default TableCart;
