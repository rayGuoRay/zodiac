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
        const cond_image = "https://cdn.heweather.com/cond_icon/" + this.state.weatherInfo.cond_code + ".png";
        const tmp_value = this.state.weatherInfo.tmp;
        const wind_sc = this.state.weatherInfo.wind_sc;

        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationStyle">成都</div>
                <img className="navigationWeatherIconStyle" src={cond_image}/>
                <div className="navigationWeatherTemperatureStyle"> {tmp_value}℃ </div>
                <div className="navigationWeatherAirQualityStyle"> {wind_sc} </div>        
            </div>    
        );
    }

    componentWillMount() {
        this.getWeatherData();
    }

    getWeatherData() {
        // let requestFormData = new FormData();
        // requestFormData.append("location", "chengdu");
        // requestFormData.append("key", "b88dcee02748474691a8e303e2200d69");
        let requestFormData =  "location=chengdu&key=b88dcee02748474691a8e303e2200d69";
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
                alert(weatherObject);
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
}

export default NavigationWeatherComponent;