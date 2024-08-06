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

const Cart =()=>{
    const {cartId} = useParams();
    const navigate = useNavigate();
    const [cart,setCart]= useState(null)
    const [cartExist,setCartExist] = useState(false)


    useEffect(() => {
        // eslint-disable-next-line no-template-curly-in-string
        axios.get(`http://localhost:8080/api/cart/${cartId}`)
            .then(response => {
                console.log(`Items fetched for cart: ${cartId}`, response.data);
                setCart(response.data);
                setCartExist(true)
            })
            .catch(error => {
                console.error(`Error while getting item for cart: ${cartId}`, error);

            });
    }, [cartId]);


    const changeQuantity =(itemName,newQuantity)=>{
        //zrobić patch w backend do cart?
        setCart(prevCart => {
            const updatedItemsQuantity = { ...prevCart.itemsQuantity, [itemName]: newQuantity };
            return {
                ...prevCart,
                itemsQuantity: updatedItemsQuantity
            };
        });
        axios.patch(`http://localhost:8080/api/cart/${cartId}/`)
            .then(response => {
                console.log(`Items changed in cart: ${cartId}`, response.data);
            })
            .catch(error => {
                console.error(`Error while changing in cart: ${cartId}`, error);

            });

    }

    if (!cartExist) return <div className="body">Loading</div>

    const itemPriceMap = cart.items.reduce((acc, item) => {
        acc[item.name] = item.price;
        return acc;
    }, {});

    return(
        <section className="h-100 h-custom ">
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
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                            {cart && Object.entries(cart.itemsQuantity).map(([itemName,quantity],index)=>{
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
                                            <MDBBtn className="px-2" color="link">
                                                <MDBIcon fas icon="minus"/>
                                            </MDBBtn>

                                            <MDBInput
                                                min={0}
                                                type="number"
                                                onChange={(event)=>changeQuantity(itemName,Number(event.target.value))}
                                                size="sm"
                                                style={{width: "50px"}}
                                                defaultValue={quantity}
                                            />

                                            <MDBBtn className="px-2" color="link">
                                                <MDBIcon fas icon="plus"/>
                                            </MDBBtn>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <p className="mb-0" style={{fontWeight: "500"}}>
                                            {price * quantity}
                                        </p>
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
                                                minlength="19"
                                                maxlength="19"
                                            />
                                            <MDBInput
                                                className="mb-4 mb-xl-5"
                                                label="Cvv"
                                                placeholder="&#9679;&#9679;&#9679;"
                                                size="lg"
                                                minlength="3"
                                                maxlength="3"
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

                                    <MDBBtn block size="lg">
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