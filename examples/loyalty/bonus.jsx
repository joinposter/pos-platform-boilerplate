/**
 * Окно подтверждения списания бонусов
 */
import React from 'react';

export default class BonusView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    updateInput = (e) => {
        let {id, value} = e.target;
        this.setState({[id]: value});
    };

    setBonus = () => {
        // TODO: В этом методе стороння система может делать подтверджение списания бонусов
        // Для отправки запроса используйте http://api.joinposter.com/#makerequest
        this.props.withdrawBonus(this.state.bonus);
    };

    render() {
        let {bonus} = this.state;
        let {currentClient} = this.props;
        console.log(currentClient);

        return (
            <form onSubmit={this.setBonus}>
                {/** using hidden input for IOS 9 input focus and onChange fix **/}
                <input type="hidden"/>

                <div className="row">
                    <div className="col-xs-12">
                        <p>У {currentClient.firstname} {currentClient.lastname} есть {currentClient.bonus} грн бонусов</p>

                        <label htmlFor="bonus">Списать</label>
                        <input
                            type="text" placeholder="10.99 грн" id="bonus" className="form-control"
                            value={bonus} onChange={this.updateInput}
                        />

                    </div>
                </div>

                <div className="footer">
                    <div className="row">
                        <div className="col-xs-12">
                            <button className="btn btn-lg btn-success" type="submit">
                                Списать бонусы
                            </button>

                            <button
                                className="btn btn-lg btn-default" onClick={Poster.interface.closePopup}
                                style={{marginRight: 20}}
                            >
                                Продолжить без списания
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}