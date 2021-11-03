import Link from "next/link";
import Card from "../../components/Card";
export default function ProductPage(props) {
  const { data } = props;
  return (
    <>
      <Link href="/">Go to home</Link>
      <Card product={data} key={data.id} />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  const paths = data.map((item) => {
    return {
      params: {
        id: String(item.id),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
