export class DevAPI {
    constructor() {
        this.params = {};
    }

    setParams(params) {
        for (let param in params) {
            if (params.hasOwnProperty(param)) {
                this.params[param] = params[param];
            }
        }
    }

    /** Returns guests in a hotel
     *
     * @returns {Promise}
     */
    getReservations = () => {
        console.log('Fake API request getReservations');

        return new Promise((resolve, reject) => {
            resolve({
                success: true,
                data: [{
                    guestID: '1',
                    guestName: 'Joey Tribbiani',
                    reservationID: '123941423',
                    roomCheckIn: '2019-09-01',
                    roomCheckOut: '2019-09-10',
                    roomID: '1',
                    roomName: 'Q10',
                }, {
                    guestID: '2',
                    guestName: 'Chandler Bing',
                    reservationID: '1239123423',
                    roomCheckIn: '2019-09-21',
                    roomCheckOut: '2019-09-25',
                    roomID: '2',
                    roomName: 'Q11',
                }, {
                    guestID: '3',
                    guestName: 'Ross Geller',
                    reservationID: '1257521423',
                    roomCheckIn: '2019-07-01',
                    roomCheckOut: '2019-08-10',
                    roomID: '3',
                    roomName: 'B12',
                }, {
                    guestID: '4',
                    guestName: 'Monica Geller',
                    reservationID: '1257521423',
                    roomCheckIn: '2019-07-01',
                    roomCheckOut: '2019-08-10',
                    roomID: '4',
                    roomName: 'B12',
                }, {
                    guestID: '5',
                    guestName: 'Rachel Green',
                    reservationID: '1222521423',
                    roomCheckIn: '2019-07-01',
                    roomCheckOut: '2019-08-10',
                    roomID: '5',
                    roomName: 'Q13',
                }, {
                    guestID: '6',
                    guestName: 'Phoebe Buffay',
                    reservationID: '12562521423',
                    roomCheckIn: '2019-07-01',
                    roomCheckOut: '2019-08-10',
                    roomID: '6',
                    roomName: 'Q14',
                }],
            });
        });
    };


    /**
     * Send order to PMS
     *
     * @param params {{reservationID: number, itemPaid, items: array, payments: array}}
     * @returns {*}
     */
    addOrderToReservation = (params) => {
        console.log('Fake API request addOrderToReservation > ', params);

        return new Promise((resolve, reject) => {
            resolve({ success: true });
        });
    };
}

export default new DevAPI();
