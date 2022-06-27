import ReactDOM from "react-dom";
import React from "react";
import ReactCart from "./modules/ReactCart";

const rootEl = document.getElementById("react-cart-drawer")

rootEl && ReactDOM.render(<ReactCart />, rootEl)
