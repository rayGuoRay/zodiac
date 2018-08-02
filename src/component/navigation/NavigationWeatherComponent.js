import React, { Component } from 'react';
import './NavigationWeatherComponent.css'

class NavigationWeatherComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherInfo : {},
            comfInfo : {},
        }
    } 

    render() {
        const cond_image = "https://cdn.heweather.com/cond_icon/" + this.state.weatherInfo.cond_code + ".png";
        const tmp_value = this.state.weatherInfo.tmp;
        const wind_sc = this.state.weatherInfo.wind_sc;

        return (
            <div className='navigationWeatherStyle'>
                <div className="navigationWeatherLocationStyle">成都:</div>
                <img className="navigationWeatherIconStyle" src={cond_image}/>
                <div className="navigationWeatherTemperatureStyle"> {tmp_value}℃ </div>
                <div className="navigationWeatherAirQualityStyle"> {wind_sc} </div>        
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
            .map((index, object) => {
                if (index === 0) {
                    alert(object);
                } else if (index === 1) {
                    alert(object);
                }
            })
            .catch(function(error) {
                console.log(error);    
            });
    }
}

export default NavigationWeatherComponent;