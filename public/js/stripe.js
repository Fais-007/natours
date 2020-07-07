import axios from 'axios';
import { showAlert } from './alerts';

var stripe = Stripe(
    'pk_test_51H235UCHeNN8cfMoIAvxU74WKTq8Da9ZHeQeSN220pyTcCFdorObm3xuYzXAlgqUvGTN6iq5Urp6PDTJdWgrplBJ008qRtKD9J'
);

export const bookTour = async (tourId) => {
    try {
        const session = await axios(
            `/api/v1/booking/checkout-session/${tourId}`
        );

        await stripe.redirectToCheckout({
            sessionId: session.data.session.id,
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};
