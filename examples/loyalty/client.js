
/**
 * Отображает и создает новых клиентов
 * **/
export default class OrderView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientName: '',
            clientPhone: '',
            selectedGroup: 0,
        };
    }

    updateInput = (e) => {
        let {id, value} = e.target;
        this.setState({[id]: value});
    };

    addClient = (e) => {
        e.preventDefault();

        let {clientName, clientPhone, selectedGroup} = this.state;
        let {setCurrentClient, groups, currentOrder} = this.props;

        setCurrentClient(currentOrder, {
            name: clientName,
            phone: clientPhone,
            groupId: groups[selectedGroup].client_groups_id
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
                    <div className="col-xs-4"><b>Имя</b></div>
                    <div className="col-xs-8"><p>{currentClient.firstname} {currentClient.lastname}</p></div>

                    <div className="col-xs-4"><b>Номер карты</b></div>
                    <div className="col-xs-8"><p>{currentClient.cardNumber || '—'}</p></div>

                    <div className="col-xs-4"><b>Сумма покупок</b></div>
                    <div className="col-xs-8"><p>{currentClient.totalPayedSum || 0} грн</p></div>

                    <div className="col-xs-4"><b>Скидка</b></div>
                    <div className="col-xs-8"><p>{currentClient.discount || 0} %</p></div>

                    <div className="col-xs-4"><b>Бонус</b></div>
                    <div className="col-xs-8"><p>{currentClient.bonus || 0} грн</p></div>
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