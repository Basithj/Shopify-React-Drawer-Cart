import React, { useEffect, useState } from "react"
import { Container, Row, Col, Button, InputGroup, FormGroup, Input, InputGroupText} from 'reactstrap';

const cartRemoveIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove">
        <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"/>
        <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"/>
    </svg>
)

const getCart = async () => {
    return fetch("/cart.js", {
        headers: {
            "Content-Type": "application/json",
        pragma: "no-cache",
            "cache-control": "no-cache"
        },
        credentials: "same-origin"
    }).then(data => data.json())
}

const LineItems = () => {

    const [cart, setCart] = useState({});
    const [items, setItems] = useState([]);

    const formatPrice = (price) => {
        return (price / 100).toFixed(2);
    }

    const updateQuantity = (e, line) => {  
        console.log('a')
        let uri = `/cart/change.js`
        const data = {
            'line': line + 1,
            'quantity': e.target.value
        }
        
        fetch(uri, {
            method:'POST', 
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            pragma: "no-cache",
                "cache-control": "no-cache"
            },
            credentials: "same-origin"
        }).then(response => {
            return response.json()
        }).then(data => {
            useEffect(() => {
                getCart().then( cart => {   
                    setCart(cart)
                    setItems(cart.items);
                })
            }, [])
        })
    };
    
    const addQuantity = (line, qty) => {
        console.log('ab')
        let uri = `/cart/change.js`

        const data = {
            'line': line + 1,
            'quantity': qty + 1
        }
        console.log(data)
        fetch(uri, {
            method:'POST', 
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            pragma: "no-cache",
                "cache-control": "no-cache"
            },
            credentials: "same-origin"
        }).then(response => {
            return response.json()
        }).then(data => {
            getCart().then( cart => {   
                setCart(cart)
                setItems(cart.items);
            })
        })
    };
    
    const minusQuantity = (line, qty) => {
        console.log('ac')
        let uri = `/cart/change.js`
        const data = {
            'line': line + 1,
            'quantity': qty - 1
        }
        
        fetch(uri, {
            method:'POST', 
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            pragma: "no-cache",
                "cache-control": "no-cache"
            },
            credentials: "same-origin"
        }).then(response => {
            return response.json()
        }).then(data => {
            getCart().then( cart => {   
                setCart(cart)
                setItems(cart.items);
            })
        }) 
    };
    
    
    const removeItem = (line) => {
        console.log('ad')
        let uri = `/cart/change.js`
        const data = {
            'line': line + 1,
            'quantity': 0
        }
        
        fetch(uri, {
            method:'POST', 
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            pragma: "no-cache",
                "cache-control": "no-cache"
            },
            credentials: "same-origin"
        }).then(response => {
            return response.json()
        }).then(data => {
            getCart().then( cart => {   
                setCart(cart)
                setItems(cart.items);
            })
        })
    };

    useEffect(() => {
        getCart().then(cart => {
            setCart(cart);
            setItems(cart.items);
            //setLineprice(formatPrice(cart.final_price));
        })
    }, [])
    
   //console.log(items)

    return (
        <>
        <div className="offcanvas-body pt-1"> 
            <div className="d-flex justify-content-top flex-column align-items-left h-100 text-primary small pt-5">        
                <Container> 
                { cart ?
                    (
                        items.map(function (item, line) {
                            return (
                                <Row key={line} className="text-dark mb-3"> 
                                    <Col xs="3"><img src={item.featured_image.url} width={'80'} alt={item.title}/></Col>
                                    <Col xs="7">
                                        <p className="fs-4 text-capitalize">{item.title}</p> 
                                        <FormGroup className="w-100 d-flex justify-content-between">
                                            <InputGroup className="w-75"> 
                                                <InputGroupText>
                                                    <Button onClick={event => minusQuantity(line, item.quantity)}>
                                                        -
                                                    </Button>
                                                </InputGroupText>
                                                <Input
                                                    id="quantity"
                                                    name="quantity"
                                                    type="number"
                                                    min="0"
                                                    required
                                                    onChange={event => updateQuantity(event, line)}
                                                    value={item.quantity}
                                                    className="form-input text-center"
                                                />
                                                <InputGroupText>
                                                    <Button onClick={event => addQuantity(line, item.quantity)}>
                                                        +
                                                    </Button> 
                                                </InputGroupText>
                                            </InputGroup>
                                            <a onClick={event => removeItem(line)} className="mt-2 ic-remove text-dark">
                                                {cartRemoveIcon}
                                            </a>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="2"> 
                                        <span className="fs-4">${formatPrice(item.final_line_price)}</span>
                                    </Col>
                                </Row>
                            )
                        })
                    )
                    : (<p className="text-dark">Your cart is currently empty.</p> )
                }
                </Container>
            </div>
        </div>
        <div className="offcanvas-footer py-4 px-4 ">
            <p className="d-flex justify-content-between">
                <span className="">
                    Subtotal
                </span> 
                <b id="cart-subtotal-value" data-cart-role="subtotal">
                    <span className="fs-4" data-role="price" data-variant="without-currency">${ cart && (cart.total_price / 100 ).toFixed(2) }</span> 
                </b> 
            </p>
            <a href={'/checkout'} className="btn btn-primary btn-checkout w-100 d-flex align-items-center justify-content-center mb-2 py-3 fs-3 border-0" name="checkout" type="submit" data-disable-recharge="true">
                Checkout 
            </a>
        </div>
        </>
    )
}


export default LineItems;