# Пример интеграции с системой лояльности

Этот пример показывает типичный вариант интеграции системы лояльности. 

Приложение добавляет кнопку на экран заказа и по ее клику показывает Popup. 
Если к заказу привязан клиент, то отображает информацию по нему, а если не привязан, то предлагает создать нового.

Перед закрытием заказа показывает Popup с предложением списать доступные бонусы.


Используются такие методы платформы: 

1. Добавить кнопки в интерфейс Poster — [Poster.interface.showApplicationIconAt](https://dev.joinposter.com/docs/v3/pos/interfaces/interface-showApplicationIconAt) 

2. Обработка ивентов — [Poster.on](https://dev.joinposter.com/docs/v3/pos/events/index)

3. Отобразить попап — [Poster.interface.popup](https://dev.joinposter.com/docs/v3/pos/interfaces/interface-popup)

4. Получить текущий заказа — [Poster.orders.getActive](https://dev.joinposter.com/docs/v3/pos/orders/orders-getActive) 

5. Установить скидку на заказ — [Poster.orders.setOrderBonus](https://dev.joinposter.com/docs/v3/pos/orders/orders-setOrderBonus)

6. Поиск среди клиентов заведения — [Poster.clients.find](https://dev.joinposter.com/docs/v3/pos/clients/clients-find)

7. Создание клиента — [Poster.clients.create](https://dev.joinposter.com/docs/v3/pos/clients/clients-create)

8. Добавление клиента к заказу — [Poster.orders.setOrderClient](https://dev.joinposter.com/docs/v3/pos/orders/orders-setOrderClient)
