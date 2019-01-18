# Property Management System integration example


Integration with PMS allows you to assign a room in a hotel to an order in Poster. 
The cashier will be able to send the order to the PMS account in one click.

To connect integration go to your management console → at the bottom of side menu click **All applications**. 
Find PMS application and click **Install**. You will have to accept access to data in your Poster and PMS account.


Let's assign room to order:

1. In order page click ••• → **Assign hotel guest**. 
2. In pop-up window you will see all checked in guests in the hotel. You can search through guests with guest name, reservation ID or room number. 
3. Select room and click **Apply**.
4. Add some dishes to the order and press **Pay**. You will see pop-up window where you can choose how guest will pay for his order.


![Plugin workflow](https://raw.githubusercontent.com/joinposter/pos-platform-boilerplate/master/examples/pms/demo.gif)


If you click **Pay on front desk** order would be closed automatically. In Poster management console you will see that order payed by card with PMS. 
All products from order would be added to invoice in PMS and additional charges would be applied to the room.


If you click **Pay here** you will proceed to regular Poster payment window. 
When order would be closed we will send all information about order to the PMS. Additional charges won’t be applied.
