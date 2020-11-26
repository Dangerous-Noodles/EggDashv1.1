import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useToast } from '@chakra-ui/react';
export default class Paypal extends React.Component {
  render() {
    //const toast = useToast();
    const onSuccess = (payment) => {
      console.log('The payment was succeeded!', payment);
      //   toast({
      //     title: 'Purchased!',
      //     description: `You purchased $${total} worth of grocieries.`,
      //     status: 'error',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('The payment was cancelled!', data);
      //const toast = useToast();
      alert('Payment Cancelled');
      //   toast({
      //     title: 'Payment Cancelled!',
      //     description: `Please pay again`,
      //     status: 'error',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = (err) => {
      //   toast({
      //     title: 'Payment Error!',
      //     description: `Please pay again`,
      //     status: 'error',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      console.log('Error!', err);
    };

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let total = this.props.toPay; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        'AaSONsJ0DGsK02_vGlESGWRFv_TKGXna89pXF95dQjKanWGBekKeC60ELqAV1cj_zzr_7yHSmtz7F69z',
      production: 'YOUR-PRODUCTION-APP-ID',
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
          size: 'small',
          color: 'blue',
          shape: 'rect',
          label: 'checkout',
        }}
      />
    );
  }
}
