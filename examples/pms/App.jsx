import './css/main.less';

import React from 'react';

import API from './helpers/api';
import Storage from './helpers/storage';

import AssignRoom from './views/AssignRoom';
import PaymentPlace from './views/PaymentPlace';


const PAGE_ASSIGN_ROOM = 'assignRoom';
const PAGE_PAYMENT_PLACE = 'paymentPlace';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRoom: null,
            activeOrder: null,
        };

        const extras = Poster.settings.extras || {};

        // Here we will init API
        API.setParams({ posterToken: extras.posterToken });

        console.log('---> PMS loaded', Poster.settings);
    }

    componentDidMount() {
        Poster.interface.showApplicationIconAt({ order: 'Add hotel guest' });

        // Bind all events
        Poster.on('afterPopupClosed', this.closePopup);
        Poster.on('applicationIconClicked', this.showPopup);
        Poster.on('beforeOrderClose', this.beforeOrderClose);
        Poster.on('afterOrderClose', this.afterOrderClose);
    }

    /**
     * Unmount all views
     */
    closePopup = () => {
        this.setState({
            errorMsg: null,
            activePage: null,
            blockButtons: null,
            next: null,
        });
    };

    /**
     *
     */
    showPopup = () => {
        this.setState({ activePage: PAGE_ASSIGN_ROOM }, () => {
            Poster.interface.popup({
                title: 'Assign hotel guest',
                width: '80%',
                height: 328,
            });
        });
    };

    beforeOrderClose = (data, next) => {
        const { order } = data;

        const reservation = Storage.get(`order${order.id}`);
        if (!reservation) {
            console.warn('skipped order reservation for order', order.id);
            next();
            return;
        }

        this.setState({
            activePage: PAGE_PAYMENT_PLACE,
            activeRoom: reservation,
            activeOrder: order,
            next,
        }, () => {
            Poster.interface.popup({
                title: 'Choose payment place',
                width: 500,
                height: 370,
            });
        });
    };

    /**
     * Group data about items in orders
     *
     * @param data
     */
    afterOrderClose = async (data) => {
        const { order, paymentPlace } = data;
        const products = [];
        const reservation = Storage.get(`order${order.id}`);
        const discount = order.subtotal - order.total + (order.platformDiscount || 0);

        if (!reservation) {
            console.warn('skipped order reservation for order', order.id);
            return;
        }

        for (const i in Object.values(order.products)) {
            const product = await Poster.products.getFullName(order.products[i]);
            const model = await Poster.products.get(product.id);

            // If discount applied to the order we should calculate price with discount
            if (product.promotionPrice !== undefined) {
                product.price = product.promotionPrice;
            }

            // Вычитаем скидку на заказ
            product.price -= product.price / order.subtotal * discount;
            product.tax = 0;

            // Here we will calculate total tax value, but product price will be only for 1 item
            // E.g. for 2 donuts price field will contain 1 donut price and tax field will contain whole taxes sum for 2 donuts

            // Считаем Sales Tax
            if (model.taxType === 1 && model.taxValue) {
                product.tax = product.price * model.taxValue / 100;
            }

            // Calculate VAT. VAT already included in price so we have to subtract it
            if (model.taxType === 3 && model.taxValue) {
                product.tax = product.price - product.price / (1 + model.taxValue / 100);
                product.price -= product.tax;
            }

            // Calculate tax on turnover
            if (model.taxType === 2 && model.taxValue) {
                product.tax = product.price * model.taxValue / 100;
                product.price -= product.tax;
            }

            if (product.tax !== undefined) {
                product.tax *= product.count;
                product.taxName = model.taxName;
            }

            products.push(product);
        }

        reservation.products = products;
        reservation.payed = paymentPlace !== 'frontdesk'; // Order has been payed at Poster
        reservation.payments = {
            cash: order.payedCash,
            card: order.payedCard,
            bonus: order.payedBonus + order.platformDiscount,
        };


        await API.addOrderToReservation(reservation);
        Storage.remove(`order${order.id}`);
    };

    sendPayment = async (paymentPlace) => {
        const { activeOrder, next } = this.state;

        // If guest will pay later front desk
        if (paymentPlace === 'frontdesk') {
            this.setState({ blockButtons: 'frontdesk' });

            try {
                await this.afterOrderClose({
                    order: activeOrder,
                    paymentPlace: 'frontdesk',
                });
            } catch (err) {
                this.setState({
                    errorMsg: err.message || 'Something went wrong, call to support',
                    blockButtons: null,
                });
                return;
            }

            // Close order
            const res = await Poster.orders.closeOrder(activeOrder.id, {
                type: 'mix',
                change: 0,
                payed_card_id: 0,
                payed_card_type: Poster.settings.application_id, // Order payed by app
                payment: { card: activeOrder.total - (activeOrder.platformDiscount || 0) },
                privat_id: 0,
                reason: '1',
            });

            Poster.interface.closePopup();
            console.log('----> Poster order closed', res);
            return;
        }

        // В других случаях закрываем чек через окно оплаты
        Poster.interface.closePopup();
        next();
    };

    render() {
        const {
            activePage, activeRoom, activeOrder, blockButtons, errorMsg,
        } = this.state;

        return (
            <div className="main-container">
                {(activePage === PAGE_ASSIGN_ROOM) && (
                    <AssignRoom
                        activeOrder={activeOrder}
                        activeRoom={activeRoom}
                        errorMsg={errorMsg}
                    />
                )}

                {(activePage === PAGE_PAYMENT_PLACE) && (
                    <PaymentPlace
                        activeRoom={activeRoom}
                        activeOrder={activeOrder}
                        onPayClicked={this.sendPayment}
                        blockButtons={blockButtons}
                        error={errorMsg}
                    />
                )}
            </div>
        );
    }
}
