import React from 'react';
import {connect} from 'react-redux';
import {getGames, getPlatform} from '../reducers/index';
import {createGame} from '../models/game';
import {createPlatform} from '../models/platform';

const GamesList = ({games, platform: platformData, locale = 'es_ES'}) => {
    const platform = createPlatform(platformData, locale);
    return (
        <div style={{marginLeft: 350}}>
            <p>{platform.getTitle()}</p>
            <img src={platform.getImageUrl()} height="200" alt={platform.getTitle()} />
            <table style={{width: '100%', border: '1px solid #666'}}>
                <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <td style={{width: '40%'}}>title</td>
                        <td style={{width: '25%'}}>developer</td>
                        <td style={{width: '25%'}}>publisher</td>
                        <td style={{width: '10%'}}>year</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map(data => createGame(data, locale)).map(game => (
                        <tr key={game.getTitle()}>
                            <td>{game.getTitle()}</td>
                            <td>{game.getDeveloper()}</td>
                            <td>{game.getPublisher()}</td>
                            <td>{game.getYear()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default connect((state, props) => ({
    games: getGames(state, props.params.id),
    platform: getPlatform(state, props.params.id),
}))(GamesList);
