import React, { useEffect, useState } from "react";
import {Button} from 'reactstrap'; 
import LineItems  from "./LineItems"; 


const cartIcon = (
  <svg className="icon icon-cart" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
    <path fill="currentColor" fill-rule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"/>
  </svg>
)

const getCartJS = () => {
  return fetch("/cart.js", {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache"
    },
    credentials: "same-origin"
  }).then(data => data.json())
}

export const CartDrawer = () => {

  const [show, setShow] = useState('');
  const [backdrop, setBackdrop] = useState(false);
  
  const offcanvasClose = () => {
    setShow('visible'); 
    setBackdrop(false);
    document.body.classList.remove('overflow-hidden');
  }
  const offcanvasShow = () => {
    setBackdrop(true);
    setShow('show visible');
    document.body.classList.add('overflow-hidden');
  }
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getCartJS().then(cart => setCart(cart))
  }, []) 

  return (
    <>
      <div> 
        <a href="#"
          className="border-0 text-dark"
          onClick={offcanvasShow}
        >
          {cartIcon}
          { cart ?
            (<div class="cart-count-bubble">
              <span aria-hidden="true">{cart.item_count}</span>
              <span class="visually-hidden">{cart.item_count} items</span>
            </div>)
            : ''
          }
        </a>
        <div id="offcanvas-cart" 
            className={'offcanvas offcanvas-end offcanvas-wide offcanvas-mobile-width-100 '+show}  
            tabIndex="-1" 
            aria-labelledby="offcanvas-cart-label" 
            aria-modal="true" 
            role="dialog"
            >
            <div id="offcanvas-cart-inner" className="d-flex flex-column h-100 bg-white position-relative">
                <div className="offcanvas-header text-primary">
                    <h4 className="offcanvas-title text-body ps-3 pr-2" id="offcanvas-cart-label">
                        My Cart
                    </h4>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={offcanvasClose}></button>
                </div>
                <LineItems />
            </div>
            { 
              backdrop ? (<div class="offcanvas-backdrop fade show d-block"></div>) : (<div></div>)
            }
        </div>
      </div>
    </>
  )
}

