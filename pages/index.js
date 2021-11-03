import { useState } from "react";
import Card from "../components/Card";

export default function Home(props) {
  const { data } = props;
  const [filter, setFilter] = useState("");
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetcher = async () => {
  //   try {
  //     const res = await fetch("https://fakestoreapi.com/products");
  //     const data = await res.json();
  //     setProducts(data);
  //   } catch (err) {
  //     console.log(err);
  //     setError("There's an error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetcher();
  // }, []);

  // if (loading) return "Loading...";
  // if (error) return "Error...";

  return (
    <>
      <header>
        <h1> Next js Company</h1>
        <select
          name="price"
          id="price"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Default">Default</option>
          <option value="price-high-to-low">Price high to low</option>
          <option value="price-low-to-high">Price low to high</option>
        </select>
      </header>
      <main>
        <h2>Products</h2>
        <div className="product-cards">
          {data
            .sort((a, b) => {
              if (filter === "price-high-to-low") return b.price - a.price;
              if (filter === "price-low-to-high") return a.price - b.price;
              return a.id - b.id;
            })
            .map((product) => {
              return <Card product={product} key={product.id} />;
            })}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: { data },
  };
}
