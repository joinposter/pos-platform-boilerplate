'use strict';

import ClientView from './client';
import SettingsView from './settings';
import BonusView from './bonus';

/**
 * Отвечает за общую логику приложения,
 * обрабатывает ивенты Poster и отображает разные компоненты
 */
export default class LoyaltyApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            place: 'functions', // Доступные варианты: functions, order
            clientGroups: [], // Группы клиентов в Poster
            settings: Poster.settings.spotExtras, // Настройки
            currentClient: null,
            currentOrder: null,
        }
    }

    componentDidMount() {
        // Показываем кнопки в интерфейсе Poster
        Poster.interface.showApplicationIconAt({
            functions: 'Интеграция: настройки',
            order: 'Интеграция: добавить клиента',
        });

        // Подписываемся на ивенты Poster
        Poster.on('applicationIconClicked', this.showPopup);
        Poster.on('beforeOrderClose', (data, next) => {
            // Сохранили callback чтобы закрыть заказ
            this.next = next;
            this.showPopup({place: 'beforeOrderClose'});
        });

        this.getClientsGroups();
    };

    /**
     * Получает группы клиентов из Poster
     */
    getClientsGroups = () => {
        Poster.makeApiRequest('clients.getGroups', {method: 'get'}, (groups) => {
            if (groups) {
                // Не показываем удаленные группы
                groups = _.filter(groups, (g) => parseInt(g.delete) === 0);
                this.setState({clientGroups: groups});
            }
        })
    };

    /**
     * Получает текущий заказ и клиента этого заказа
     * @return {PromiseLike<{order, client}>}
     */
    getCurrentClient = () => {
        let activeOrder = null;

        return Poster.orders.getActive()
            .then((data) => {
                if (data.order && data.order.clientId) {
                    activeOrder = data.order;
                    return Poster.clients.get(Number(data.order.clientId))
                } else {
                    return null;
                }
            })
            .then((client) => {
                return {order: activeOrder, client: client}
            })
    };

    /**
     * Добавляет клиента к текущему заказу
     * @param order
     * @param client
     */
    setOrderClient = (order, client) => {
        this.setState({currentOrder: order, currentClient: client});

        // Привязали к заказу
        Poster.orders.setOrderClient(order.id, client.id);
    };

    /**
     * Списывает бонусы
     * @param bonus
     */
    withdrawBonus = (bonus) => {
        let {currentOrder} = this.state;

        bonus = parseFloat(bonus);

        Poster.orders.setOrderBonus(currentOrder.id, bonus);
        Poster.interface.closePopup();

        // Продолжаем стандартный флоу закрытия заказа Poster (показывем окно заказа)
        this.next();
    };

    updateSettings = () => {

    };

    /**
     * Показывает интерфейс в зависимости от места в котором интерфейс вызывают
     * @param data
     */
    showPopup = (data) => {
        if (data.place === 'order') {
            this.getCurrentClient()
                .then((info) => {
                    this.setState({currentClient: info.client, currentOrder: info.order, place: 'order'});

                    Poster.interface.popup({width: 600, height: 400, title: "Клиент интеграции"});
                });
        }

        if (data.place === 'functions') {
            this.setState({currentClient: null, currentOrder: null, place: 'functions'});
            Poster.interface.popup({width: 600, height: 400, title: "Настройки интеграции"});
        }

        if (data.place === 'beforeOrderClose') {
            this.getCurrentClient()
                .then((info) => {
                    if (info.client) {
                        this.setState({
                            currentClient: info.client,
                            currentOrder: info.order,
                            place: 'beforeOrderClose'
                        });

                        Poster.interface.popup({width: 500, height: 300, title: "Списание бонусов"});
                    } else {
                        // Если не нашли клиента, продолжаем поток выполнения в Poster
                        this.next();
                    }
                });
        }
    };

    render() {
        let {place, clientGroups, settings, currentClient, currentOrder} = this.state;

        // В зависимости от места в котором вызвали икно интеграции отображаем разные окна
        // Окно настроек
        if (place === 'functions') {
            return (
                <SettingsView settings={settings} updateSettings={this.updateSettings} />
            )
        }

        // Окно заказа
        if (place === 'order') {
            return (
                <ClientView
                    groups={clientGroups} currentClient={currentClient} order={currentOrder}
                    setCurrentClient={this.setOrderClient}
                />
            );
        }

        // Окно списания бонусов перед закрытием заказа
        if (place === 'beforeOrderClose') {
            return (
                <BonusView
                    currentClient={currentClient} currentOrder={currentOrder}
                    withdrawBonus={this.withdrawBonus}
                />
            )
        }
    }
}