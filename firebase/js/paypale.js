paypal.Button.render({

    env: 'sandbox', // production Or 'sandbox'

    client: {
        sandbox:'AY1QtzdFyi6YiSLpJFr9zIbVT9sXkc6QCEbpHEsiNjw_4H6yP-bpepmTp67jm-ktGyYyQZYk66jfxtX4',
        production: 'AT4UP826uklOKEN54x4Q0SHukJklhDWNndFqpt6gRwGxpEEbiYB62pPdcE3npwUsFKd9aHrK5Gf4xV8M'
    },

    commit: true, // Show a 'Pay Now' button

    payment: function(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: '1.00', currency: 'USD' }
                        
                    }
                ]
            }
        });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {

            // The payment is complete!
            // You can now show a confirmation message to the customer
        });
    }

}, '#paypal-button');