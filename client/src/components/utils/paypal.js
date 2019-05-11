import React, { Component } from 'react';

import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      //   console.log(JSON.stringify(payment));

      this.props.onSuccess(payment);

      // const successScenario = {
      //   paid: true,
      //   cancelled: false,
      //   payerID: 'JEDVY9LVW743S',
      //   paymentID: 'PAYID-LTLLV4I58C07747CY970890U',
      //   paymentToken: 'EC-6F3150813R495050T',
      //   returnUrl:
      //     'https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LTLLV4I58C07747CY970890U&token=EC-6F3150813R495050T&PayerID=JEDVY9LVW743S',
      //   address: {
      //     recipient_name: 'test buyer',
      //     line1: '1 Main St',
      //     city: 'San Jose',
      //     state: 'CA',
      //     postal_code: '95131',
      //     country_code: 'US'
      //   },
      //   email: 'hsiehdanny860605-buyer@gmail.com'
      // };
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = error => {
      console.log(JSON.stringify(error));
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox:
        'AcjMwBr23OAw6qpfpbl8qrTg0NWoOs3dJSNj46vZY4yI__JWeMvKIcHJ4aWuh16l-8FUalvZa2BimFM-',
      production: ''
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;
