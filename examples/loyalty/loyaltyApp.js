export default class LoyaltyApp extends React.Component {
    constructor(props) {
        super(props);

        this.bindEvents();
        this.uploadClientsGroups();

        Poster.interface.showApplicationIconAt({
            functions: 'Настройки лояльности',
            order: "Добавить клиента",
        });

        this.state = {
            place: 'functions', // functions or order
            selectedGroup: 0,
            groups: [],
            clientName: "",
            clientPhone: ""
        };
    }

    updateInput = (e) => {
        console.log('update input event', e);
        let {id, value} = e.target;

        this.setState({[id]: value});
    };

    uploadClientsGroups = () => {
        Poster.makeApiRequest('clients.getGroups', {method: 'get'}, (groups) => {
            console.log(groups);

            if (groups) {
                groups = _.filter(groups, (g) => parseInt(g.delete) === 0);
                this.setState({groups: groups});
            }
        })
    };

    bindEvents = () => {
        Poster.on('applicationIconClicked', (data) => {
            this.setState({place: data.place});


            if (data.place === 'order') {
                Poster.clients
                    .get(data.order.clientId)
                    .then((client) => {
                        if (!(client && client.id)) {
                            client = null;
                        }

                        console.log({currentClient: client, currentOrder: data.order});
                        this.setState({currentClient: client, currentOrder: data.order});

                        Poster.interface.popup({
                            width: 600,
                            height: 400,
                            title: "Заказ"
                        });
                    });
            } else {
                this.setState({currentClient: null, currentOrder: null});

                Poster.interface.popup({
                    width: 600,
                    height: 400,
                    title: "Настройки"
                });
            }
        });
    };

    addClient = (e) => {
        e.preventDefault();

        let {clientName, clientPhone, groups, selectedGroup} = this.state;

        Poster.clients
            .find({searchVal: clientPhone})
            .then((result) => {
                // Если нашли хоть одного клиента, добавляем к заказу
                if (result && result.foundClients && result.foundClients.length) {
                    return result.foundClients[0];
                }

                // Создаем нового клиента
                return Poster.clients.create({
                    client: {
                        client_sex: 1,
                        client_name: clientName,
                        phone: clientPhone,
                        client_groups_id_client: groups[selectedGroup].client_groups_id
                    }
                })
            })
            .then((client) => {
                let {currentOrder} = this.state;

                return Poster.orders.setOrderClient(currentOrder.id, client.id);
            })
            .then((result) => {
                console.log('===== RESULT =====', result);
            })
            .catch((err) => {
                console.log('===== ERROR =====', err);
            });
    };

    render() {
        let {place, clientName, clientPhone, groups, selectedGroup, currentClient} = this.state;

        if (place === 'functions') {
            return (
                <div>
                    <p>В этом окне можно показывать настройки приложения</p>
                </div>
            )
        } else {
            return (
                <form onSubmit={this.addClient}>
                    {/** using hidden input for IOS 9 input focus and onChange fix **/}
                    <input type="hidden"/>

                    <div className="row">
                        <div className="col-xs-6">
                            <div className="form-group">
                                <label htmlFor="clientName">Имя</label>
                                <input
                                    className="form-control" type="text" placeholder="Попов Сергей"
                                    id="clientName" onChange={this.updateInput} value={clientName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="clientPhone">Телефон</label>
                                <input
                                    className="form-control" type="text" placeholder="+380 (91) 415 2664"
                                    id="clientPhone" onChange={this.updateInput} value={clientPhone}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="selectedGroup">Группа</label>
                                <select
                                    className="form-control"
                                    id="selectedGroup" onChange={this.updateInput} value={selectedGroup}
                                >
                                    {groups.map((g, i) => (
                                        <option value={i} key={i}>
                                            {g.client_groups_name} ({g.client_groups_discount} %)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {currentClient && (
                            <div className="col-xs-6">
                                <p><b>Бонус:</b> {currentClient.bonus} грн.</p>
                                <p><b>Номер карты:</b> {currentClient.cardNumber}</p>
                                <p><b>Скидка:</b> {currentClient.discount} %</p>
                                <p><b>Сумма покупок:</b> {currentClient.totalPayedSum} грн.</p>
                            </div>
                        )}
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