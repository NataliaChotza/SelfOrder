import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {css, jsx, Global} from "@emotion/react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRadio,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";
import eventHandler from "bootstrap/js/src/dom/event-handler";
import {Button} from "reactstrap";


const Cart =()=>{
    const {cartId} = useParams();
    const [cart,setCart]= useState(null)
    const [itemQuantities,setItemQuantities] = useState(new Map())


    const handleQuantityChange = (e, itemName) => {
        const newQuantity = parseInt(e.target.value);
        setItemQuantities(prevQuantities => new Map(prevQuantities).set(itemName, newQuantity));
    };
    const incrementQuantity = (itemName) => {
        setItemQuantities(prevQuantities => {
            const newQuantities = new Map(prevQuantities);
            newQuantities.set(itemName, (newQuantities.get(itemName) || 0) + 1);
            return newQuantities;
        });
    };

    const decrementQuantity = (itemName) => {
        setItemQuantities(prevQuantities => {
            const newQuantities = new Map(prevQuantities);
            const currentQuantity = newQuantities.get(itemName) || 1;
            newQuantities.set(itemName, Math.max(currentQuantity - 1, 1));// Prevent negative quantities
            return newQuantities;
        });
    };
    const removeItem =(itemName)=>{
        setCart(prevCart=>{
            const updatedItems = prevCart.items.filter(item=>item.name!==itemName);
            const updatedItemQuantity={...prevCart.itemsQuantity};
            delete updatedItemQuantity[itemName];
            return {
                ...prevCart,
                items:updatedItems,
                itemQuantities:updatedItemQuantity
            };
        });
    };


    useEffect(() => {
        // eslint-disable-next-line no-template-curly-in-string
        axios.get(`http://localhost:8080/api/cart/${cartId}`)
            .then(response => {
                console.log(`Items fetched for cart: ${cartId}`, response.data);
                setCart(response.data);
                const initialQuantities = new Map(Object.entries(response.data.itemsQuantity))
                setItemQuantities(initialQuantities)
            })
            .catch(error => {
                console.error(`Error while getting item for cart: ${cartId}`, error);

            });
    }, [cartId]);


    const checkOutButton =async (cartId) => {
        await axios.patch(`http://localhost:8080/api/cart/${cartId}`, cart, {
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(response => {
                console.log(`cart updated: ${cartId}`, response.data);
            })
            .catch(error => {
                console.error(`Error while changing in cart: ${cartId}`, error);

            });

    }

    if (!cart) return <div className="body">Loading</div>

    const itemPriceMap = cart.items.reduce((acc, item) => {
        acc[item.name] = item.price;
        return acc;
    }, {});

    return(
        <section className="app-background h-100 h-custom ">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBTable responsive>
                            <MDBTableHead>
                                <tr>
                                    <th scope="col" className="h5">
                                        Your Cart
                                    </th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                            {cart && cart.items.map((item)=>{
                                const itemName = item.name;
                                const quantity = itemQuantities.get(itemName) || 1;
                                const price = itemPriceMap[itemName]
                                return(
                                <tr>
                                    <th scope="row">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src="https://i.imgur.com/2DsA49b.webp"
                                                fluid
                                                className="rounded-3"
                                                style={{width: "90px"}}
                                                alt="Book"
                                            />
                                            <div className="flex-column ms-4">
                                                <p className="mb-2">{itemName}</p>
                                            </div>
                                        </div>
                                    </th>
                                    <td className="align-middle">
                                        <div className="d-flex flex-row align-items-center">
                                            <MDBBtn className="px-2" color="link" onClick={()=>decrementQuantity(itemName)}>
                                                <MDBIcon fas icon="minus" />
                                            </MDBBtn>

                                            <MDBInput
                                                min={1}
                                                type="number"
                                                size="sm"
                                                style={{width: "50px"}}
                                                value={quantity}
                                                onChange={(e)=>handleQuantityChange(e,itemName)}
                                            />
                                            <MDBBtn className="px-2" color="link" onClick={()=>incrementQuantity(itemName)}>
                                                <MDBIcon fas icon="plus"/>
                                            </MDBBtn>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <p className="mb-0" style={{fontWeight: "500"}}>
                                            {price * quantity}
                                        </p>
                                    </td>
                                    <td className="align-middle">
                                        <Button onClick={() => removeItem(itemName)} style={{ color:"black",backgroundColor:"lightblue", fontSize: "40px"}}>
                                            <FontAwesomeIcon icon={"trash-can"}></FontAwesomeIcon>
                                        </Button>

                                    </td>

                                </tr>
                )})}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                    <MDBCard
                        className="shadow-2-strong mb-5 mb-lg-0"
                        style={{borderRadius: "16px"}}
                    >
                        <MDBCardBody className="p-4">
                            <MDBRow>
                                <MDBCol md="6" lg="4" xl="3" className="mb-4 mb-md-0">
                                    <form>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <MDBRadio
                                                    type="radio"
                                                    name="radio1"
                                                    checked
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon
                                                        fab
                                                        icon="cc-mastercard fa-2x text-dark pe-2"
                                                    />
                                                    Credit Card
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <MDBRadio
                                                    type="radio"
                                                    name="radio1"
                                                    checked
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon fab icon="cc-visa fa-2x text-dark pe-2"/>
                                                    Cash
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <MDBRadio
                                                    type="radio"
                                                    name="radio1"
                                                    checked
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon fab icon="cc-paypal fa-2x text-dark pe-2"/>
                                                    PayPal
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </MDBCol>
                                <MDBCol md="6" lg="4" xl="6">
                                    <MDBRow>
                                        <MDBCol size="10" xl="6">
                                            <MDBInput
                                                className="mb-4 mb-xl-5"
                                                label="Name on card"
                                                placeholder="John Smiths"
                                                size="lg"
                                            />
                                            <MDBInput
                                                className="mb-4 mb-xl-5"
                                                label="Expiration"
                                                placeholder="MM/YY"
                                                size="lg"
                                                maxLength={7}
                                                minLength={7}
                                            />
                                        </MDBCol>

                                        <MDBCol size="10" xl="6">
                                            <MDBInput
                                                className="mb-4 mb-xl-5"
                                                label="Card Number"
                                                placeholder="1111 2222 3333 4444"
                                                size="lg"
                                                minLength="19"
                                                maxLength="19"
                                            />
                                            <MDBInput
                                                className="mb-4 mb-xl-5"
                                                label="Cvv"
                                                placeholder="&#9679;&#9679;&#9679;"
                                                size="lg"
                                                minLength="3"
                                                maxLength="3"
                                                type="password"
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol lg="4" xl="3">
                                    <div
                                        className="d-flex justify-content-between"
                                        style={{fontWeight: "500"}}
                                    >
                                        <p className="mb-2">Subtotal</p>
                                        <p className="mb-2">{cart.price}</p>
                                    </div>

                                    <hr className="my-4"/>

                                    <div
                                        className="d-flex justify-content-between mb-4"
                                        style={{fontWeight: "500"}}
                                    >
                                        <p className="mb-2">Total (tax included)</p>
                                        <p className="mb-2">{cart.price}</p>
                                    </div>

                                    <MDBBtn block size="lg" onClick={()=>checkOutButton(cartId)}>
                                        <div className="d-flex justify-content-between">
                                            <span>Checkout</span>
                                            <span>{cart.price}</span>
                                        </div>
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
        </section>
    );

};

export default Cart;