import React, { Component } from 'react';
import './NavigationWeatherComponent.css'
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
        const cond_image = "https://cdn.heweather.com/cond_icon/" + this.state.weatherInfo.cond_code + ".png";
        const tmp_value = this.state.weatherInfo.tmp;
        const comfBrf = this.state.comfInfo.brf;
        const comBrfIcon = comfBrf && comfBrf.indexOf("不舒适") == -1 ? comfortableImg : unComfortableImg;
        const drsgBrf = this.state.drsgInfo.brf;
        const drsgBrfIcon = drsgBrf && drsgBrf.indexOf("舒适") == -1 ? (drsgBrf.indexOf("热") == -1 ? drsgColdImg : drsgHotImg) : drsgFitImg;
        const fluBrf = this.state.fluInfo.brf;
        const fluBrfIcon = fluBrf && fluBrf.indexOf("易发") == -1 ? fluRiskLowImg : fluRiskHighImg;
        const sportBrf = this.state.sportInfo.brf;
        const sportBrfIcon = sportBrf && sportBrf.indexOf("适宜") == -1 ? unFitSportImg : fitSportImg; 
        const travBrf = this.state.travInfo.brf;
        const travBrfIcon = travBrf && travBrf.indexOf("适宜") == -1 ? unFitTravImg : fitTravImg;
        const uvBrf = this.state.uvInfo.brf;
        const uvBrfIcon = uvBrf && uvBrf.indexOf("中等") == -1 ? (uvBrf.indexOf("强") == -1 ? uvLowImg : uvHighImg) : uvNormalImg; 
        const cwBrf = this.state.cwInfo.brf;
        const cwBrfIcon = cwBrf && cwBrf.indexOf("不宜") === -1 ? suitableWashCarImg : unSuitableWashCarImg;

        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationStyle">成都:</div>
                <img className="navigationWeatherIconStyle" src={cond_image}/>
                <div className="navigationWeatherTemperatureStyle"> {tmp_value}℃ </div>
                <img className="navigationWeatherIconStyle" src={comBrfIcon}/>
                <img className="navigationWeatherIconStyle" src={drsgBrfIcon}/>
                <img className="navigationWeatherIconStyle" src={fluBrfIcon}/>
                <img className="navigationWeatherIconStyle" src={sportBrfIcon}/>
                <img className="navigationWeatherIconStyle" src={travBrfIcon}/>
                <img className="navigationWeatherIconStyle" src={uvBrfIcon}/>       
                <img className="navigationWeatherIconStyle" src={cwBrfIcon}/>
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