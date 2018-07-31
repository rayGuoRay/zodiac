import React, { Component } from 'react';

import './NavigationComponent.css';
import NavigationProfileComponent from './NavigationProfileComponent';
import NavigationWeatherComponent from './NavigationWeatherComponent';

class NavigationComponent extends Component {

    constructor(props) {
        super(props);
    } 

    render() {
        return (
            <div className='navigationStyle'>
                <NavigationWeatherComponent />
                <NavigationProfileComponent />
            </div>    
        );
    }
}

export default NavigationComponent;