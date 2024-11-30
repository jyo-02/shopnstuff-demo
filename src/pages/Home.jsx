import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productService from "../connectServer/config"; // Import your product service
import { Container, ProductCard } from "../components";
import Carousel from "../components/Carousal"; // Ensure correct import
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await productService.getAllProducts();
        if (response && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(error?.data?.message || error?.error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All categories"
    ? products
    : products.filter(product =>
        product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const images = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
  ];


  // Content for logged out users
  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center mb-9">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <div className="bg-background dark:bg-dark-bg">
                <div className="relative justify-center max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                  <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center dark:text-white px-4">
                    <span className="text-theme-color">Shopping</span> Online is
                    now much easier
                  </h1>
                  <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
                  Your One-Stop Shop for Everything You Love: Curated Collections for Everyday Life!
                  </p>
                  <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
                    <Link to="/signup">
                      <button className="lg:mx-0 text-xl font-bold rounded-full py-5 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out bg-slate-900 hover:bg-slate-700 focus:ring-2 focus:ring-slate-400">
                        Join Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder for image grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-9">
            {images.map((src, index) => (
              <div key={index}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={src}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  const slides = ["./img1.jpg", "./img2.jpg", "./img3.jpg", "./img4.jpg"];

  return (
    <>
      <div className="flex flex-wrap">
        <Carousel autoSlide={true}>
          {slides.map((s, index) => (
            <img key={index} src={s} alt={`Slide ${index + 1}`} />
          ))}
        </Carousel>
      </div>
      <div className="w-full pt-8">
        <Container>
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            {["All categories", "Shoes", "T-Shirt", "Socks", "Hoodie"].map((category) => (
              <button
                key={category}
                type="button"
                className="text-gray-900 border border-white bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 me-3 mb-3 dark:text-white dark:bg-gray-900"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
            {isLoading ? (
              <div>Loading...</div> // Add a loading state here
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className="p-2">
                  <ProductCard
                    id={product._id}
                    title={product.name}
                    productImage={product.productImage}
                    price={product.price}
                  />
                </div>
              ))
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
