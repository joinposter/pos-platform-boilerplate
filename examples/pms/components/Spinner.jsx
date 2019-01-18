import React from 'react';

export default class Spinner extends React.Component {
    render() {
        let blades = [];

        for (let i = 0; i < 12; i++) {
            blades.push(i);
        }

        let color = this.props.color || 'gray';

        return (
            <div className={`ispinner ${color} animating ${this.props.className}`}>
                {blades.map((item) => <div key={item} className="ispinner-blade"/>)}
            </div>
        )
    }
}