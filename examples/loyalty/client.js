export default class OrderView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientName: '',
            clientPhone: '',
            selectedGroup: '',
        };
    }

    updateInput = (e) => {
        let {id, value} = e.target;
        this.setState({[id]: value});
    };

    addClient = (e) => {
        e.preventDefault();

        let {clientName, clientPhone, selectedGroup} = this.state;
        let {setCurrentClient, groups, order} = this.props;

        // TODO: тут можно искать клиента в сторонней системе и получать по нему всю информацию

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
                // Отобразили клиента
                setCurrentClient(order, client);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    render() {
        let {clientName, clientPhone, selectedGroup} = this.state;
        let {groups, currentClient} = this.props;

        // Если клиент привязан то показываем его бонусы по нему
        // Иначе даем возможность создать клиента и добавить заказа
        if (currentClient) {
            return (
                <div className="row">
                    <div className="col-xs-6">
                        <p><b>Имя:</b> {currentClient.firstname} {currentClient.lastname}</p>
                        <p><b>Номер карты:</b> {currentClient.cardNumber || '—'}</p>
                        <p><b>Сумма покупок:</b> {currentClient.totalPayedSum} грн.</p>

                        <p><b>Скидка:</b> {currentClient.discount} %</p>
                        <p><b>Бонус:</b> {currentClient.bonus} грн.</p>
                    </div>
                </div>
            );
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
                                {/** У каждого клиента в Poster обязательно должна быть группа **/}
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