import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${router.query.id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
        setError("There's an error");
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [router]);

  if (loading) return "Loading...";
  if (error) return "Error...";

  return (
    <>
      <Card product={product} key={product.id} />
    </>
  );
}
