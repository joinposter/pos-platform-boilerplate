import React from 'react';

import Spinner from '../components/Spinner';
import ClientsSearch from './ClientSearch';

import API from '../helpers/api';
import Storage from '../helpers/storage';


export default class AssignRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            loading: true,
            activeOrder: null,
        };
    }

    async componentDidMount() {
        let rooms = [];

        const result = await API.getReservations();
        if (result.success) {
            rooms = result.data;
        }

        const res = await Poster.orders.getActive();
        const activeOrder = res.order;
        let activeRoom;

        if (activeOrder) {
            activeRoom = Storage.get(`order${activeOrder.id}`);
        }

        this.setState({
            activeRoom,
            activeOrder,
            rooms,
            loading: false,
        });
    }

    /**
     * Bind guest to order
     */
    assignRoom = (room) => {
        const { activeOrder } = this.state;

        // Сохраняем содержимое в локальное хранилище с ключем order + id заказа
        // При закрытии заказа будем проверять есть ли такой заказа
        Storage.set(`order${activeOrder.id}`, room);
        Poster.orders.setOrderComment(activeOrder.id, `Room ${room.roomName} with ${room.guestName} assigned to order`);
        Poster.interface.closePopup();
    };

    /**
     * Unbind guest to order
     */
    unAssignRoom = () => {
        const { activeOrder } = this.state;
        Storage.remove(`order${activeOrder.id}`);

        this.setState({ activeRoom: null });
        Poster.orders.setOrderComment(activeOrder.id, '');
    };

    render() {
        const { rooms, loading, activeRoom } = this.state;

        return (
            <div className="page-temp">
                {loading ? (
                    <Spinner />
                ) : (
                    <ClientsSearch
                        chosenRoom={activeRoom}
                        rooms={rooms}
                        assignRoom={this.assignRoom}
                        unAssignRoom={this.unAssignRoom}
                    />
                )}
            </div>
        );
    }
}
