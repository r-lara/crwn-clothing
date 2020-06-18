import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_ZiAJG0yW7SfslmgW7WM0nwj600EZeterzZ'

    const onToken = token => {
        console.log('token',token)
        axios.post('/payment', {
            token,
            amount: priceForStripe
        }).then( response => {
            alert('Payment was successful')
        }).catch( error => {
            console.log('Payment error', JSON.parse(error));
            alert('There was an issue with your payment. Please sure you use the privided credentials.')
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Commerce'
            billingAddress
            shippingAddress
            currency='USD'
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
      );
}

export default StripeCheckoutButton
