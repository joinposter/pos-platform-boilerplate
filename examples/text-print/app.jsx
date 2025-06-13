import receipt from 'receipt';
import React from 'react';


export default class TextPrint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
        };
    }

    componentDidMount() {
        // Add button to order and functions windows
        Poster.interface.showApplicationIconAt({
            order: 'Print Order',
            functions: 'Platform Devices',
        });

        // Subscribe to button click
        Poster.on('applicationIconClicked', this.onIconClick);
    }

    onIconClick = async (data) => {
        const devices = await Poster.devices.getAll({ type: 'printer' });

        if (data.place === 'order') {
            devices.forEach(device => this.orderPrint(device, data.order));
        } else {
            this.setState({ devices: devices || [] });

            Poster.interface.popup({ width: 500, height: 400, title: 'Platform App' });
        }
    };

    /**
     * Will print basic pre-check of order, using receipt library for text formatting
     *
     * @param device
     * @param order
     * @returns {Promise<void>}
     */
    orderPrint = async (device, order) => {
        let products = [];
        for (const prodId in order.products) {
            if (!order.products.hasOwnProperty(prodId)) {
                continue;
            }

            const product = order.products[prodId];
            products.push(product);
        }

        products = await Poster.products.getFullName(products);

        // Sets max amount of characters in one line
        // Different printer have different with of printhead and user can setup it's size in Functions → Devices
        receipt.config.width = device.textLineLength || 30;
        receipt.config.currency = '$';
        receipt.config.ruler = '-';

        const output = receipt.create([{
            type: 'properties',
            lines: [
                { name: 'Order Number', value: order.orderName },
                { name: 'Date', value: order.dateStart },
            ],
        }, {
            type: 'table',
            lines: products.map(p => ({
                item: p.name,
                qty: p.count,
                cost: p.price,
            })),
        }, {
            type: 'empty',
        }, {
            type: 'properties',
            lines: [
                { name: 'Total amount', value: order.subtotal },
            ],
        }]);

        // Send text to printer
        device.printText({ text: output });
    };

    /**
     * Will print test receipt with device name and ip
     * @param device
     */
    testPrint = (device) => {
        device.printText({ text: `Test printing from platform:\nDevice: ${device.name}\nIP: ${device.ip}` });
    };


    render() {
        const { devices } = this.state;

        return (
            <div className="hello-world">
                {devices.map(device => (
                    <div>
                        <p style={{ textAlign: 'left', marginBottom: 20 }}>
                            {device.name}
                            {' '}
                            {device.ip}

                            <button className="btn btn-primary pull-right" onClick={() => this.testPrint(device)}>
                                Print
                            </button>
                        </p>
                    </div>
                ))}
            </div>
        );
    }
}
