import React from 'react';

export default class ClientCard extends React.Component {
    chooseClientDone = (e) => {
        const { activeClient } = this.props;
        this.props.assignRoom(activeClient);
    };

    render() {
        const { activeClient, chosenClient, unAssignRoom } = this.props;

        if (!activeClient) return (<div className="client-card" />);

        const disableBtn = 0;

        // 2018-05-12
        let checkOut;
        if (activeClient.roomCheckOut) {
            const parsed = activeClient.roomCheckOut.split('-');
            checkOut = new Date();
            checkOut.setDate(Number(parsed[2]));
            checkOut.setMonth(Number(parsed[1]) - 1);
            checkOut.setFullYear(Number(parsed[0]));
            checkOut = checkOut.toLocaleDateString();
        }

        let checkIn;
        if (activeClient.roomCheckIn) {
            const parsed = activeClient.roomCheckIn.split('-');
            checkIn = new Date();
            checkIn.setDate(Number(parsed[2]));
            checkIn.setMonth(Number(parsed[1]) - 1);
            checkIn.setFullYear(Number(parsed[0]));
            checkIn = checkIn.toLocaleDateString();
        }

        return (
            <div className="client-card">
                <div className="client-card-header">
                    <span className="name">
                        {activeClient.guestName}
                    </span>
                    <span className="group">{activeClient.roomName}</span>
                </div>

                <div className="client-card-body scrollable">
                    <ul className="client-data">
                        <li>
                            <span className="prop-name">Reservation ID</span>
                            <span
                                className="prop-val"
                            >
                                {activeClient.reservationID}
                            </span>
                        </li>
                        <li>
                            <span className="prop-name">Room ID</span>
                            <span
                                className="prop-val"
                            >
                                {activeClient.roomID}
                            </span>
                        </li>
                        <li>
                            <span className="prop-name">Check in</span>
                            <span className="prop-val">{checkIn}</span>
                        </li>
                        <li>
                            <span className="prop-name">Check out</span>
                            <span className="prop-val">{checkOut}</span>
                        </li>
                    </ul>
                </div>

                <div className="client-card-footer">
                    <button className="btn-green needsclick add-client" onClick={this.chooseClientDone}>
                        Apply
                    </button>

                    {chosenClient && chosenClient.guestID === activeClient.guestID ? (
                        <button className="btn-red needsclick remove-client" onClick={unAssignRoom}>
                            Unbind
                        </button>
                    ) : null}

                    {Boolean(disableBtn) && <span className="error-msg">{l('Promotions are added to order')}</span>}
                </div>
            </div>
        );
    }
}
