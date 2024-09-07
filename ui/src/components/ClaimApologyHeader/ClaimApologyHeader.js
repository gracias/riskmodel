import React from 'react'

import "./ClaimApologyHeader.css";
import TitleHeader from '../ClaimHeader/TitleHeader.js';

const innerIconStyle = {
    height: '3.5rem',
    width: '3.5rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-1.75rem 0 0 -1.75rem',
    border: '2px solid #FF4646',
    borderRadius: '50%',
    backgroundImage: ' linear-gradient(to bottom right, #F62516, #400400)',
    zIndex: 100
}

const outerIconStyle = {
    width: '5.5rem',
    height: '5.5rem',
    borderRadius: '50%',
    position: 'relative',
    border: '2px solid #FF4646',
    backgroundImage: 'linear-gradient(to bottom right, #F62516, #400400)'
}

const ApologyIcon = () => {
    return (
        <svg
            style={{ marginTop: '-0.75rem' }}
            className="apology-icon" width="40" height="40" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.3604 22.6399L28.248 20.1953C28.1201 20.1442 27.9866 20.12 27.8545 20.12C27.5079 20.12 27.1727 20.2905 26.9724 20.593L26.3517 21.5248L26.0079 21.4865C25.5207 21.4311 25.1344 21.0504 25.0747 20.5632L23.2111 5.65554C23.1443 5.12431 22.694 4.72656 22.1585 4.72656H17.596C17.0605 4.72656 16.6102 5.12431 16.5434 5.65554L14.6784 20.5617C14.6173 21.0475 14.2309 21.4296 13.7451 21.485L13.4014 21.5234L12.7807 20.5916C12.579 20.289 12.2437 20.1186 11.8986 20.1186C11.7665 20.1186 11.6329 20.1427 11.5051 20.1953L5.39274 22.6399C4.99074 22.8004 4.72656 23.191 4.72656 23.6242V33.9664C4.72656 34.5517 5.201 35.0275 5.78765 35.0275H9.68693C9.91136 35.0275 10.1301 34.9565 10.3105 34.8244L17.5407 29.5658C18.0009 29.2306 18.1145 28.5928 17.7992 28.1198L17.589 27.8045L19.8773 26.401L22.1657 27.803L21.9555 28.1184C21.6401 28.5914 21.7538 29.2292 22.214 29.5644L29.4442 34.823C29.626 34.9551 29.8433 35.0261 30.0677 35.0261H33.967C34.5522 35.0261 35.0281 34.5517 35.0281 33.965V23.6228C35.0281 23.191 34.7637 22.8004 34.3604 22.6399ZM9.53635 33.5119H6.23948V23.9308L11.6969 21.7476L15.7268 27.7505C15.7296 27.7547 15.7339 27.7562 15.7367 27.759L16.2935 28.5957L9.53635 33.5119ZM14.3233 22.9083C15.3105 22.6327 16.052 21.7946 16.1826 20.7506L17.9966 6.24078H19.1173V25.0917L16.7466 26.5448L14.3233 22.9083ZM20.6342 25.0901V6.23918H21.7549L23.5688 20.749C23.6995 21.7945 24.441 22.6311 25.4282 22.9067L23.0049 26.5416L20.6342 25.0901ZM33.512 33.5119H30.2151L23.4566 28.597L24.0134 27.7603C24.0162 27.7561 24.0205 27.7547 24.0233 27.7518L28.0531 21.7489L33.5106 23.9321L33.512 33.5119Z" fill="white" />
        </svg>

    )
}

const ClaimApologyHeader = () => {
    return (

        <TitleHeader
            title="We apologise for your loss!"
            description="We are here to assist you in a hassle free claim process"
            Icon={ApologyIcon}
            iconClassName="icon apology-icon"
            innerIconStyle={innerIconStyle}
            outerIconStyle={outerIconStyle}
        />



    )
}

export default ClaimApologyHeader