import { useState } from "react";
import Card from "../components/Card";

export default function Home(props) {
  const { data } = props;
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  return (
    <>
      <header>
        <h1>Acme</h1>
        <div>
          <input
            placeholder="search products..."
            type="search"
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <select
            name="category"
            id="category"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Default">Popular</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="price-low-to-high">Price low to high</option>
          </select>
        </div>
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
            .filter((item) => {
              if (search) {
                const title = item.title.toLowerCase();
                return title.includes(search.toLowerCase());
              }
              return item;
            })
            .map((product) => {
              return <Card product={product} key={product.id} isFull={false} />;
            })}
        </div>
        <footer>
          <p>&copy;2021</p>
        </footer>
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
