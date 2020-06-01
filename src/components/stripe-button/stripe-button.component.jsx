import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_ZiAJG0yW7SfslmgW7WM0nwj600EZeterzZ'

    const onToken = token => {
        console.log(token)
        alert('Payment successful')
    }

    return (
        <StripeCheckout 
         label='Pay now'
         name='CRWN CLothing Ltd.'
         currency='MXN'
         billingAddress
         shippingAddress
         email='info@email.com'
         image={`https://svgshare.com/i/CUz.svg`}
         description={`Your totoal is $${price}`}
         amount={priceForStripe}
         panelLabel='Pay now panel'
         token={onToken}
         stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton
