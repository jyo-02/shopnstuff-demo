import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard({ id, title, productImage, price }) {
  return (
    <Link to={`/product/${id}`}>
      <div>
        <div>
          {productImage && (
            <img
              loading="eager"
              src={productImage}
              alt={title || "Product Image"}
              className="product-list-item__image"
              sizes="(min-width: 920px) 288px, calc(100vw - 32px)"
              srcSet={`${productImage} 288w, ${productImage} 576w, ${productImage} 656w, ${productImage} 861w, ${productImage} 984w`}
            />
          )}
        </div>
        <div className="product-list-item__details">
          <h6>{title}</h6>
          <div>
            <p>
              <span>₹{price}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// PropTypes for type checking (optional)
ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired, // Ensure you pass the image URL directly
};

export default ProductCard;
