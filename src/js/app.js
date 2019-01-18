import '../css/main.less';
import React from 'react';
import ReactDOM from 'react-dom';

// Required for work on iOS 9b
import 'babel-polyfill';

import HelloWorldApp from '../../examples/hello-world/app';
import LoyaltyApp from '../../examples/loyalty/app';
import DeviceHandshakeApp from '../../examples/device-handshake/app';
import TextPrintApp from '../../examples/text-print/app';
import PmsApp from '../../examples/pms/App';


class ExampleApp extends React.Component {
    render() {
        // Чтобы отобразить нужный пример просто закомментируйте не нужныйе компоненты

        return <HelloWorldApp />;

        return <LoyaltyApp />;

        return <DeviceHandshakeApp />;

        return <TextPrintApp />;

        return <PmsApp />;
    }
}

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('app-container'),
);
