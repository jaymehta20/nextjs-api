import { useEffect, useState, useRef } from "react";
import Card from "../components/Card";
export default function Home() {
  const [filter, setFilter] = useState("Default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcher = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      setError("There's an error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetcher();
  }, []);

  useEffect(() => {
    if (filter == "price-high-to-low") {
      setProducts((prevState) => {
        return prevState.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
      });
    } else if (filter == "price-low-to-high") {
      setProducts((prevState) => {
        return prevState.sort((a, b) => {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
          return 0;
        });
      });
    }
    // else {
    //   setProducts((prevState) => {
    //     return prevState.sort((a, b) => {
    //       if (a.id > b.id) return -1;
    //       if (a.id < b.id) return 1;
    //       return 0;
    //     });
    //   });
    // }
  }, [filter]);

  if (loading) return "Loading...";
  if (error) return "Error...";

  return (
    <>
      <header>
        <h1> Next js Company</h1>
        <select
          name="price"
          id="price"
          onChange={(e) => setFilter(e.target.value)}
        >
          {/* <option value="Default">Default</option> */}
          <option value="price-high-to-low">Price high to low</option>
          <option value="price-low-to-high">Price low to high</option>
        </select>
      </header>
      <main>
        <h2>Products</h2>
        <div className="product-cards">
          {products.map((product) => {
            return <Card product={product} key={product.id} />;
          })}
        </div>
      </main>
    </>
  );
}
