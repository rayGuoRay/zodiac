import React, { Component } from 'react';
import './NavigationWeatherComponent.css'
import suitWashCarImg from '../../img/suit_wash_car.png';
import unSuitWashCarImg from '../../img/unsuit_wash_car.png';

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
        const wind_sc = this.state.weatherInfo.wind_sc;
        const comf = this.state.comfInfo.brf;
        const drsg = this.state.drsgInfo.brf;
        const flu = this.state.fluInfo.brf;
        const sport = this.state.sportInfo.brf;
        const trav = this.state.travInfo.brf;
        const uv = this.state.uvInfo.brf;
        const cwIcon = (this.state.cwInfo.brf.toString()).indexof("不宜") === -1 ? unSuitWashCarImg : suitWashCarImg;


        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationStyle">成都:</div>
                <img className="navigationWeatherIconStyle" src={cond_image}/>
                <div className="navigationWeatherTemperatureStyle"> {tmp_value}℃ </div>
                <div className="navigationWeatherAirQualityStyle"> {wind_sc} </div>
                <div className="navigationWeatherAirQualityStyle"> {comf} </div>
                <div className="navigationWeatherAirQualityStyle"> {drsg} </div>
                <div className="navigationWeatherAirQualityStyle"> {flu} </div>
                <div className="navigationWeatherAirQualityStyle"> {sport} </div>
                <div className="navigationWeatherAirQualityStyle"> {trav} </div>
                <div className="navigationWeatherAirQualityStyle"> {uv} </div>        
                <img className="navigationWeatherIconStyle" src={cwIcon}/>
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