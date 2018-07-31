import React, { Component } from 'react';
import './NavigationWeatherComponent.css'

class NavigationWeatherComponent extends Component {

    constructor(props) {
        super(props);
    } 

    render() {
        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationStyle">成都</div>
                <div className="navigationWeatherIconStyle">晴</div>
                <div className="navigationWeatherTemperatureStyle">27</div>
                <div className="navigationWeatherAirQualityStyle">良</div>        
            </div>    
        );
    }
}

export default NavigationWeatherComponent;