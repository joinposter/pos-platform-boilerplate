# Пример интеграции с системой лояльности

Этот пример показывает типичный вариант интеграции системы лояльности. 

Приложение добавляет кнопку на экран заказа и по ее клику показывает Popup. 
Если к заказу привязан клиент то отображает информацию по нему, а если не привязан то предлагает создать нового.

Перед закрытием заказа показывает Popup с предложением списать доступные бонусы.


Используются такие методы платформы: 

1. Добавить кнопки в интерфейс Poster — [Poster.interface.showApplicationIconAt](http://api.joinposter.com/#interface-showapplicationiconat) 

2. Обработка ивентов — [Poster.on](http://api.joinposter.com/#on)

3. Отобразить попап — [Poster.interface.popup](http://api.joinposter.com/#interface-popup)

4. Получить текущий заказа — [Poster.orders.getActive](http://api.joinposter.com/#orders-getactive) 

5. Установить скидку на заказ — [Poster.orders.setOrderBonus](http://api.joinposter.com/#orders-setorderbonus)

6. Поиск среди клиентов заведения — [Poster.clients.find](http://api.joinposter.com/#clients-find)

7. Создание клиента — [Poster.clients.find](http://api.joinposter.com/#clients-find)

8. Добавление клиента к заказу — [Poster.orders.setOrderClient](http://api.joinposter.com/#orders-setorderclient)