import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Nike Shoes",
    price: 12000,
    image: "https://source.unsplash.com/300x300/?shoes",
    shopId: 1
  },
  {
    id: 2,
    name: "Apple Watch",
    price: 55000,
    image: "https://source.unsplash.com/300x300/?watch",
    shopId: 1
  },
  {
    id: 3,
    name: "Backpack",
    price: 8000,
    image: "https://source.unsplash.com/300x300/?bag",
    shopId: 1
  }
];

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Products
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;