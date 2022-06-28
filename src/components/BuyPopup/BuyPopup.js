import React, { useEffect, useState } from "react";
import "./BuyPopup.css";

// Function aanpak

export default function BuyPopup(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [product, setProduct] = useState(null);

  function fetchSimilar() {
    fetch(`https://fakestoreapi.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setIsLoaded(true);
          setSimilarProducts(res);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }

  function resetState() {
    setProduct(null);
    setIsLoaded(false);
    setSimilarProducts([]);
  }

  function dispatchEvent(eventId, detail) {
    const customEvent = new CustomEvent(eventId, { detail });
    window.dispatchEvent(customEvent);
  }

  // Return null if no prop (no 'productToCart' event yet)
  if (props.product == null) {
    return null;
  }
  // Avoid infinite re-render by checking state
  else if (product != props.product) {
    setProduct(props.product);
  }
  // Avoid infinite re-render (and thus API requests) by checking state
  else if (!isLoaded) {
    fetchSimilar();
  }

  return (
    <div>
      {product == null ? null : (
        <div>
          <div class="buyModalBackground"></div>
          <div class="buyModal">
            <div class="successBackground">
              <div class="modalFlexWrapper">
                <div class="modalFlexMessage">
                  <h3>Article added to cart</h3>
                  <p>{product.title}</p>
                </div>
                <div class="modalFlexActions">
                  <badge-button
                    onClick={() => {
                      location.href = "/root-config/#/cart";
                    }}
                  >
                    Continue to cart
                  </badge-button>
                  <badge-button
                    onClick={() => {
                      dispatchEvent("closeModal", null);
                      resetState();
                    }}
                  >
                    or Continue shopping
                  </badge-button>
                </div>
              </div>
            </div>
            <h3>Take a look at similar products</h3>
            <div class="similarProducts">
              {!isLoaded ? (
                <loading-spinner>Loading Products</loading-spinner>
              ) : (
                similarProducts.map((product) => (
                  <div class="similarCard" key={product.id}>
                    <div class="similarCardImage">
                      <img src={product.image}></img>
                      <star-rating
                        starwidth={(product.rating.rate / 5) * 100}
                        ratingcount={product.rating.count}
                      ></star-rating>
                    </div>
                    <div class="similarCardInfo">
                      <p>
                        <strong>{product.title}</strong>
                      </p>
                      <badge-button
                        class="similarCardBuy"
                        onClick={() => {
                          dispatchEvent("productToCart", { product });
                          resetState();
                        }}
                      >
                        🛒 ${product.price}
                      </badge-button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
