import Link from "next/link";
import Card from "../../components/Card";
export default function ProductPage(props) {
  const { data } = props;
  return (
    <>
      <Link href="/" passHref>
        <span
          style={{
            display: "flex",
            marginBlock: "5%",
            cursor: "pointer",
          }}
        >
          <svg
            style={{
              width: "25px",
              marginRight: "8px",
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </span>
      </Link>

      <Card product={data} key={data.id} isFull={true} />
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
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const data = await res.json();
    return {
      props: { data },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        data: [],
      },
    };
  }
}
