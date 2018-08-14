import React, { Component } from 'react';
import './NavigationWeatherComponent.css';
import comfortableImg from '../../img/comfortable_temperature.png';
import unComfortableImg from '../../img/uncomfortable_temperature.png';
import suitableWashCarImg from '../../img/suitable_car_washing.png';
import unSuitableWashCarImg from '../../img/unsuitable_car_washing.png';
import drsgHotImg from '../../img/drsg_hot.png';
import drsgFitImg from '../../img/drsg_fit.png';
import drsgColdImg from '../../img/drsg_cold.png';
import fluRiskHighImg from '../../img/flu_risk_high.png';
import fluRiskLowImg from '../../img/flu_risk_low.png';
import fitSportImg from '../../img/fit_sport.png';
import unFitSportImg from '../../img/unfit_sport.png';
import fitTravImg from '../../img/unfit_trav.png';
import unFitTravImg from '../../img/unfit_trav.png';
import uvHighImg from '../../img/uv_high.png';
import uvNormalImg from '../../img/uv_normal.png';
import uvLowImg from '../../img/uv_low.png';

require ('./NavigationWeatherIconFont.js');

class NavigationWeatherComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherInfo : {},
            comfInfo : {},
            drsgInfo : {},
            fluInfo : {},
            sportInfo: {},
            travInfo: {},
            uvInfo: {},
            cwInfo: {},
        }
    } 

    render() {
        const location = "成都:";
        const cond_image = "https://cdn.heweather.com/cond_icon/" + this.state.weatherInfo.cond_code + ".png";
        const tmp_value = this.state.weatherInfo.tmp + "℃";
        const fitColorStyle = {fill:'#1296DB'};
        const unFitColorStyle = {fill:'#FF6C6C'}
        // clothing index
        const isDrsgUnFit = this.state.drsgInfo.brf && this.state.drsgInfo.brf.indexOf("舒适") == -1;
        const isDrsgCold = this.state.drsgInfo.brf && this.state.drsgInfo.brf.indexOf("热") == -1;
        const drsgBrfIcon = isDrsgUnFit ? (isDrsgCold ? "#icon-dayi" : "#icon-duanxiu") : "#icon-changxiu";
        const drsgIconColorStyle= isDrsgUnFit ? (isDrsgCold ? {fill:'#1296DB'} : {fill:'#FF6C6C'}) : {fill:'#f39813'}
        
        // const fluBrf = this.state.fluInfo.brf;
        // const fluBrfIcon = fluBrf && fluBrf.indexOf("易发") == -1 ? fluRiskLowImg : fluRiskHighImg;
        
        const isSportUnFit = this.state.sportInfo.brf && this.state.sportInfo.brf.indexOf("适宜") == -1
        const sportIconSyle = isSportUnFit ? unFitColorStyle : fitColorStyle;

        const isTravUnFit = this.state.travInfo.brf && this.state.travInfo.brf.indexOf("适宜") == -1;
        const travIconStyle = isTravUnFit ? unFitColorStyle : fitColorStyle;
        
        // const uvBrf = this.state.uvInfo.brf;
        // const uvBrfIcon = uvBrf && uvBrf.indexOf("中等") == -1 ? (uvBrf.indexOf("强") == -1 ? uvLowImg : uvHighImg) : uvNormalImg; 
        
        const isCwFit = this.state.cwInfo.brf && this.state.cwInfo.brf.indexOf("不宜") === -1;
        const cwIconColorStyle = isCwFit ? fitColorStyle : unFitColorStyle;

        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationFontStyle">{location}</div>
                <div className="navigationWeatherTemperatureFontStyle">{tmp_value}</div>
                <img className="navigationWeatherIconStyle" src={cond_image}/>
                <svg className="navigationLifeStyleIconStyle" aria-hidden="true" style={drsgIconColorStyle}>
                    <use xlinkHref={drsgBrfIcon}></use>
                </svg>
                <svg className="navigationLifeStyleIconStyle" aria-hidden="true" style={sportIconSyle}>
                    <use xlinkHref="#icon-yundong"></use>
                </svg>
                <svg className="navigationLifeStyleIconStyle" aria-hidden="true" style={travIconStyle}>
                    <use xlinkHref="#icon-feiji"></use>
                </svg>   
                <svg className="navigationLifeStyleIconStyle" aria-hidden="true" style={cwIconColorStyle}>
                    <use xlinkHref="#icon-xiche"></use>
                </svg>
            </div>
        );
    }

    componentWillMount() {
        this.getWeatherData();
        this.getLifeStyleData();
    }

    getWeatherData() {
        // let requestFormData = new FormData();
        // requestFormData.append("location", "chengdu");
        // requestFormData.append("key", "b88dcee02748474691a8e303e2200d69");
        let requestFormData = "location=chengdu&key=b88dcee02748474691a8e303e2200d69";
        let requestParams = {
            method:"POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }, 
            body:requestFormData,
        }

        fetch("https://free-api.heweather.com/s6/weather/now", requestParams)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then(weatherJson => {
                let weatherObject = weatherJson.HeWeather6[0]
                if (weatherObject.status === "ok") {
                    return weatherObject.now;
                } else {
                    console.log(weatherObject);
                }
            })
            .then(weatherNowData => {
                this.setState({weatherInfo : weatherNowData});
            })
            .catch(function(error) {
                console.log(error);    
            });
    }

    getLifeStyleData() {
        let requestFormData = "location=chengdu&key=b88dcee02748474691a8e303e2200d69";
        let requestParams = {
            method:"POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }, 
            body:requestFormData,
        }

        fetch("https://free-api.heweather.com/s6/weather/lifestyle", requestParams)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then(lifeStyleJson => {
                let lifeStyleObject = lifeStyleJson.HeWeather6[0]
                if (lifeStyleObject.status === "ok") {
                    return lifeStyleObject.lifestyle;
                } else {
                    console.log(lifeStyleObject);
                }
            })
            .then(lifeStyleArray => {
                this.setState({comfInfo : lifeStyleArray[0]});
                this.setState({drsgInfo : lifeStyleArray[1]});
                this.setState({fluInfo : lifeStyleArray[2]});
                this.setState({sportInfo : lifeStyleArray[3]});
                this.setState({travInfo : lifeStyleArray[4]});
                this.setState({uvInfo : lifeStyleArray[5]});
                this.setState({cwInfo : lifeStyleArray[6]});
            })
            .catch(function(error) {
                console.log(error);    
            });
    }
}

export default NavigationWeatherComponent;