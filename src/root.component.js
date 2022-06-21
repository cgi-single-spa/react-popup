import React from "react";
import BuyPopup from "./components/BuyPopup/BuyPopup";

class App extends React.Component {
  state = {
    product: null
  }

  productListener() {
    window.addEventListener('productToCart', (evt) => {
        this.setState({ product: evt.detail.product });
    })
    // Illegale spaghetti maar helaas ):
    window.addEventListener('closeModal', () => {
      this.setState({ product: null });
    })
  }

  componentDidMount() {
    this.productListener();
  }

  render() {
    return (< BuyPopup product={this.state.product} />);
  }
}

export default App