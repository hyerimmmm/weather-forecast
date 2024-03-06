import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./css/style.css";

const Main = () => {
  const [weatherItem, setWeatherItem] = useState(undefined);
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = "0" + (today.getMonth() + 1);
  const todayDay = "0" + today.getDate();
  const todayString = todayYear + todayMonth + todayDay;

  const CheckSky = (value) => {
    if (value < 6) {
      return "sun";
    }
    if (value > 5 && value < 9) {
      return "cloud";
    }
    return "blur";
  };

  const getData = async () => {
    const key =
      "xDqXKbjPAXZBXl2Nv9WfPvyD379m4BSZlAxydtjnSKe%2FyALbbpKp0jkrwyN1W5wqjbbejhyNjLRlR%2Bf0ePht%2FA%3D%3D";

    const res = await axios.get(
      `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&numOfRows=12&pageNo=1&dataType=JSON&base_date=${todayString}&base_time=1100&nx=35&ny=128`
    );
    const weather = res.data.response.body.items.item;
    let obj = {};
    weather.forEach((item) => {
      obj[item.category] = item;
    });
    setWeatherItem(obj);
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <div className="main-page">
      <div className="header">
        <div className="date">
          오늘, {todayYear}/{todayMonth}
        </div>
        <img className="menu" src="./assets/menu.svg" alt="" />
      </div>
      <div className="region">지금의 대구</div>
      <div className="weather-container">
        <div className="tmp">{weatherItem && weatherItem.TMP.fcstValue}℃</div>
        <img
          className="sky"
          src={`/assets/${CheckSky(
            weatherItem && weatherItem.SKY.fcstValue
          )}.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Main;
