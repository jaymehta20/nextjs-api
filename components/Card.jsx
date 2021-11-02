import Image from "next/image";
import Link from "next/link";
const Card = (props) => {
  const { title, price, image, id, description } = props.product;
  const truncate = (desc) => {
    return desc.substr(0, 50) + ".....";
  };
  console.log(`${price}\n`);

  return (
    <Link passHref href={`/products/${id}`}>
      <div className="product-card" key={id}>
        <Image src={image} width={200} height={200} alt={title} />
        <h3>{title}</h3>
        <code className="product-price">{`$ ${price}`}</code>
        <p className="product-desc">{truncate(description)}</p>
      </div>
    </Link>
  );
};

export default Card;
