import React from 'react';

import Client from './Client';
import ClientCard from './ClientCard';

import Helper from '../helpers/helper';


export default class ClientSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputVal: '',
            activeClient: props.chosenRoom,
            allClients: props.rooms,
            foundClients: [],
        };
    }

    componentDidMount() {
        this.setAllClients();

        if (this.searchInput) this.searchInput.focus();
    }

    closePopup = () => {
        Poster.interface.closePopup();
    };

    clearSearchField = () => {
        this.setState({ inputVal: '' });
        this.searchClient('');
    };

    onInputValChange = (e) => {
        const { target } = e;
        const inputVal = target.value;

        this.setState({ inputVal });
        this.searchClient(inputVal);
    };

    onClientClick = (client) => {
        this.setState({ activeClient: client });
    };

    searchClient = (val) => {
        const filterString = val.toLowerCase().trim();
        let { allClients } = this.state;

        if (filterString) {
            allClients = allClients
                .filter((room) => {
                    const { guestName, roomName, reservationID } = room;

                    return (guestName || '').toLowerCase().indexOf(filterString) > -1
                        || (roomName || '').toLowerCase().indexOf(filterString) > -1
                        || (reservationID || '').toLowerCase().indexOf(filterString) > -1
                        || (roomName && Helper.getEditDistance(filterString, roomName.toLowerCase()) < 3);
                })
                .sort((a, b) => {
                    const { guestName, roomName, reservationID } = a;

                    return guestName === filterString || roomName === filterString || reservationID === filterString ? -1 : 0;
                });

            this.setState({ foundClients: allClients });
        } else {
            this.setAllClients();
        }
    };

    setAllClients = () => {
        const { allClients } = this.state;

        this.setState({ foundClients: allClients.slice(0, 100) });
    };

    render() {
        const { foundClients, activeClient, inputVal } = this.state;
        const { assignRoom, unAssignRoom, chosenRoom } = this.props;
        const chosenClient = chosenRoom;

        return (
            <div className="discount-wrapper">
                <div className="discount-component-wrapper">
                    <div className="clients">
                        <div className="client-search-header">
                            <i className="icon-search" />
                            <input
                                type="text"
                                value={inputVal}
                                onChange={this.onInputValChange}
                                ref={elem => this.searchInput = elem}
                                placeholder="Guest name or room..."
                                className="search-client needsclick full-width"
                            />
                            <button className="clear-search-field" onClick={this.clearSearchField}>
                                <i className="icon-cancel-circled" />
                            </button>
                        </div>

                        <ul className="clients-list">
                            <div>
                                {Boolean(chosenClient) && (
                                    <Client
                                        data={chosenClient}
                                        chosen
                                        active={activeClient.guestID === chosenClient.guestID}
                                        onClick={() => this.onClientClick(chosenClient)}
                                    />
                                )}

                                {foundClients.map((client, i) => {
                                    if (!chosenClient || chosenClient.guestID !== client.guestID) {
                                        return (
                                            <Client
                                                key={i}
                                                data={client}
                                                active={activeClient && activeClient.guestID === client.guestID}
                                                onClick={() => this.onClientClick(client)}
                                            />
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        </ul>
                    </div>

                    <ClientCard
                        activeClient={activeClient}
                        assignRoom={assignRoom}
                        unAssignRoom={unAssignRoom}
                        chosenClient={chosenClient}
                    />
                </div>
            </div>
        );
    }
}
