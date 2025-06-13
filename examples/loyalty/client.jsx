/**
 * Отображает и создает новых клиентов
 * **/
import React from 'react';

export default class OrderView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientName: '',
            clientPhone: '',
            selectedGroup: 0,
        };
    }

    scanQR = () => {
        Poster.interface.scanBarcode().then((barcode) => {
            this.addClient({
                preventDefault: () => {
                }
            })
        })
    };

    updateInput = (e) => {
        let { id, value } = e.target;
        this.setState({ [id]: value });
    };

    addClient = (e) => {
        e.preventDefault();

        let { setCurrentClient, groups, currentOrder } = this.props;

        setCurrentClient(currentOrder, {
            name: 'Vladimir',
            phone: '+380 (91) 415 2664',
            groupId: groups[0].client_groups_id
        });
    };

    render() {
        let { clientCode, clientPhone, selectedGroup } = this.state;
        let { groups, currentClient } = this.props;

        // Если клиент привязан, то показываем его бонусы по нему
        // Иначе даем возможность создать клиента и добавить заказа
        if (currentClient) {
            return (
                <div className="row">
                    <div className="col-xs-4"><b>Имя</b></div>
                    <div className="col-xs-8"><p>{currentClient.firstname} {currentClient.lastname}</p></div>

                    <div className="col-xs-4"><b>Номер карты</b></div>
                    <div className="col-xs-8"><p>{currentClient.cardNumber || '—'}</p></div>

                    <div className="col-xs-4"><b>Сумма покупок</b></div>
                    <div className="col-xs-8"><p>{currentClient.totalPayedSum || 0} грн</p></div>

                    <div className="col-xs-4"><b>Скидка</b></div>
                    <div className="col-xs-8"><p>{currentClient.discount || 0} %</p></div>

                    <div className="col-xs-4"><b>Бонус</b></div>
                    <div className="col-xs-8"><p>{currentClient.bonus || 200} грн</p></div>
                </div>
            );
        } else {
            return (
                <form onSubmit={this.addClient}>
                    {/** using hidden input for IOS 9 input focus and onChange fix **/}
                    <input type="hidden"/>

                    <div className="row">
                        <div className="col-xs-3">
                            <label htmlFor="code btn btn-default" style={{ marginTop: 10 }}>Guest code</label>
                        </div>
                        <div className="col-xs-5">
                            <div className="input-group-lg">
                                <input
                                    className="form-control" type="text" placeholder="391230"
                                    id="code" onChange={this.updateInput} value={clientCode}
                                />
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <button type="button" className="btn btn-primary btn-lg" onClick={this.scanQR}>
                                Scan QR
                            </button>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="row">
                            <div className="col-xs-12">
                                <button className="btn btn-lg btn-success" type="submit">Добавить клиента</button>
                            </div>
                        </div>
                    </div>
                </form>
            );
        }
    }
}
