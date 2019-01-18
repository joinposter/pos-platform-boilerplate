import React from 'react';

export default function Client(props) {
    const { guestName, roomName } = props.data;
    const { active, chosen, onClick } = props;

    return (
        <li className={active ? 'active needsclick' : 'needsclick'} onClick={onClick}>
            {chosen ? <i className="icon-check" /> : null}
            <span className="client-name">{guestName}</span>
            <span className="group">{roomName}</span>
        </li>
    );
}
