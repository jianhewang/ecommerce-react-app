import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KBnKBIfhUhG2OnbQPecKqd17vkodk61tjnBmojDvdQ94xnifUNQZttvEHBpFyFH8U8x6gqNHK5ikXGrzFLxgmg0004WJTOfpt';

    const onToken = token => {
        console.log(token);
        alert('payment successful')
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        >

        </StripeCheckout>
    )
}

export default StripeCheckoutButton;