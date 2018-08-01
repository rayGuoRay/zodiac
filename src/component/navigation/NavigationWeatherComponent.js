import React, { Component } from 'react';
import './NavigationWeatherComponent.css'

class NavigationWeatherComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherInfo : {},
        }
    } 

    render() {
        // "cond_code": "101",
        //         "cond_txt": "多云",
        //         "fl": "16",
        //         "hum": "73",
        //         "pcpn": "0",
        //         "pres": "1017",
        //         "tmp": "14",
        //         "vis": "1",
        //         "wind_deg": "11",
        //         "wind_dir": "北风",
        //         "wind_sc": "微风",
        //         "wind_spd": "6"
        const cond_txt = this.state.weatherInfo.cond_txt;
        const tmp = this.state.weatherInfo.tmp;
        const wind_sc = this.state.weatherInfo.wind_sc;

        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationStyle">成都</div>
                <div className="navigationWeatherIconStyle"> {cond_txt} </div>
                <div className="navigationWeatherTemperatureStyle"> {tmp} </div>
                <div className="navigationWeatherAirQualityStyle"> {wind_sc} </div>        
            </div>    
        );
    }

    componentWillMount() {
        this.getWeatherData();
    }

    getWeatherData() {
        let requestFormData = new FormData();
        requestFormData.append("location","chengdu");
        requestFormData.append("key","b88dcee02748474691a8e303e2200d69");
        requestFormData.append("lang", "cn");
        
        let requestParams = {
            method:"POST",
            body:requestFormData,
        }

        fetch("https://free-api.heweather.com/s6/weather/now?parameters", requestParams)
            .then(function(response) {
                if (response.ok) {
                    return response.json;
                } else {
                    console.log(response);
                }
            })
            .then(function(json) {
                if (json.status == "ok") {
                    return json.now;
                } else {
                    console.log(json);
                }
            })
            .then(function(nowData) {
                this.setState({
                    slideList:nowData
                });
            })
            .catch(function(error) {
                console.log(error);    
            });
    }
}

export default NavigationWeatherComponent;