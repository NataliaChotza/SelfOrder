import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
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


import {Button} from "reactstrap";
import {PriceFormater} from "./helpers/PriceFormater";
import {CurrencyFormater} from "./helpers/CurrencyFormater";
import {WarningAlert} from "./WarningAlert";

const PaymentMethods = {
    CARD: 'card',
    BLIK: 'blik',
    CASH: 'cash',
};
const Cart = () => {
    const {cartId} = useParams();
    const [cart, setCart] = useState(null)
    const [itemQuantities, setItemQuantities] = useState(new Map())
    const [blikPayment, setBlikPayment] = useState(false);
    const [cashPayment, setCashPayment] = useState(true);
    const [cardPayment, setCardPayment] = useState(false);

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
    const removeItem = (itemName) => {
        setItemQuantities(prevQuantities => {
            const newQuantities = new Map(prevQuantities);
            newQuantities.delete(itemName);
            return newQuantities;
        });
        let newItems = cart.items.filter(item => item.name !== itemName)

        setCart((prevCart) => {
            return {
                ...prevCart,
                items: newItems,
                itemsQuantity: itemQuantities
            }
        });
        console.log(newItems)

    };

    const countCartPrice = () => {
        return Array.from(itemQuantities.entries()).reduce((sum, [item, quantity]) => {
            const price = itemPriceMap[item] || 0; // Get the price, default to 0 if not found
            return sum + (quantity * price)
        }, 0);
    }

    useEffect(() => {
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

    const handleChangePaymentType = (type) => {
        if (type === PaymentMethods.BLIK) {
            setBlikPayment(true)
            setCashPayment(false)
            setCardPayment(false)
        } else if (type === PaymentMethods.CARD) {
            setCardPayment(true)
            setCashPayment(false)
            setBlikPayment(false)
        } else {
            setCashPayment(true)
            setBlikPayment(false)
            setCardPayment(false)
        }
    }

    const checkOutButton = async (cartId) => {
        const updatedCart = {
            ...cart,
            itemsQuantity: Object.fromEntries(itemQuantities),
            price: countCartPrice()
        };
        if (updatedCart.price === 0) {
            console.log("warning")

        } else {
            await axios.put(`http://localhost:8080/api/cart/${cartId}`, updatedCart, {
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
    }
    if (!cart) return <div className="body">Loading</div>

    const itemPriceMap = cart.items.reduce((acc, item) => {

        acc[item.name] = item.price;
        return acc;
    }, {});

    return (
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
                                {cart && cart.items.map((item) => {
                                    const itemName = item.name;
                                    const quantity = itemQuantities.get(itemName) || 1;
                                    const price = itemPriceMap[itemName]
                                    return (
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
                                                    <MDBBtn className="px-2" color="link"
                                                            onClick={() => decrementQuantity(itemName)}>
                                                        <MDBIcon fas icon="minus"/>
                                                    </MDBBtn>

                                                    <MDBInput
                                                        min={1}
                                                        type="number"
                                                        size="sm"
                                                        style={{width: "50px"}}
                                                        value={quantity}
                                                        onChange={(e) => handleQuantityChange(e, itemName)}
                                                    />
                                                    <MDBBtn className="px-2" color="link"
                                                            onClick={() => incrementQuantity(itemName)}>
                                                        <MDBIcon fas icon="plus"/>
                                                    </MDBBtn>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <p className="mb-0" style={{fontWeight: "500"}}>
                                                    {CurrencyFormater(PriceFormater(quantity * price), false)}
                                                </p>
                                            </td>
                                            <td className="align-middle">
                                                <Button onClick={() => removeItem(itemName)} style={{
                                                    color: "black",
                                                    fontSize: "40px"
                                                }}>
                                                </Button>
                                            </td>

                                        </tr>
                                    )
                                })}
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
                                                <input
                                                    type="radio"
                                                    name="radio_card"
                                                    onClick={() => handleChangePaymentType(PaymentMethods.CARD)}
                                                    checked={cardPayment}
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
                                                    Card
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <input
                                                    type="radio"
                                                    name="radio_cash"
                                                    checked={cashPayment}
                                                    onClick={() => handleChangePaymentType(PaymentMethods.CASH)}
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
                                                <input
                                                    type="radio"
                                                    name="radio_blik"
                                                    checked={blikPayment}
                                                    onClick={() => handleChangePaymentType(PaymentMethods.BLIK)}
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon fab icon="cc-paypal fa-2x text-dark pe-2"/>
                                                    Blik
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </MDBCol>
                                {blikPayment &&
                                    <MDBCol md="6" lg="4" xl="6">
                                        <MDBRow>
                                            <MDBCol size="10" xl="6">
                                                <MDBInput
                                                    className="mb-4 mb-xl-5"
                                                    placeholder="BLIK CODE"
                                                    size="lg"
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                }
                                <MDBCol lg="4" xl="3">
                                    <div className=" justify-content-between">
                                        <MDBBtn block size="lg" onClick={() => checkOutButton(cartId)}>
                                            <span>Checkout {countCartPrice()}</span>
                                        </MDBBtn>
                                    </div>
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
