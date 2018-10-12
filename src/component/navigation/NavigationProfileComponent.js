import React, { Component } from 'react';
import './NavigationProfileComponent.css';

class NavigationProfileComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='navigationProfileStyle'>
                <img className='navigationProfileImgStyle' src="http://tx.haiqq.com/uploads/allimg/150327/210050FX-0.jpg"/>
                <div className='navigationProfileFontStyle'>寒の石</div>
            </div>
        )
    }
}

export default NavigationProfileComponent;