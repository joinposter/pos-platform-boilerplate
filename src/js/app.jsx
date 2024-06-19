import '../css/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorldApp from '../../examples/hello-world/app';
import LoyaltyApp from '../../examples/loyalty/app';
import TextPrintApp from '../../examples/text-print/app';
import PmsApp from '../../examples/pms/App';

class ExampleApp extends React.Component {
    render() {
        // Чтобы отобразить нужный пример, просто закомментируйте не нужные компоненты

        return <HelloWorldApp />;

        return <LoyaltyApp />;

        return <TextPrintApp />;

        return <PmsApp />;
    }
}

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('app-container'),
);
