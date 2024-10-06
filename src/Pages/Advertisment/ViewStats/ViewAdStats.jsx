import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import location from "../../../assets/locationPin.png";
import AdChart from "./AdChart";
import { useParams } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import { message } from "antd";

function ViewAdStats() {
  const {id} = useParams();
 
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const fetchSingleAd = async () => {
      try {
        const response = await userRequest.get(`/admin/partner/getSingleAds?_id=${id}`);
        const singleAd = response.data.data;
        setAdData(singleAd);
      } catch (error) {
        message.error("Error fetching single ad:", error.message);
      }
    };
    fetchSingleAd();
  }, [id]);

  console.log(adData, 'adDataass');

  
  return (
    <div className={styles.MainContainer}>
      <div className={styles.breadCrumb}>
        <span>
          All Advertisement {">"}{" "}
          <b style={{ opacity: "100%", color: "#131313" }}>
            Advertisement Stats
          </b>
        </span>
      </div>
      <div className={styles.adDetails}>
        <p>{adData.title}</p>
        <p>{adData.name}</p>
        <div className={styles.location}>
          <img src={location} alt="" /> <p>{adData.location}</p>
        </div>
        <div className={styles.adContent}>
         {adData.body}
        </div>
        <div className={styles.adInfo}>
          <div className={styles.adType}>
            <p>Ad Type</p>
            <p>{adData.adType}</p>
          </div>
          <div className={styles.adType}>
            <p>Released On</p>
            <p>{convertDate(adData.releaseDate)}</p>
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <AdChart releaseTime={adData.releaseTime}/>
      </div>
    </div>
  );
}

export default ViewAdStats;



function convertDate(dateStr) {
  try {
    const dateObj = new Date(dateStr);
    const formattedDate = `${dateObj.getUTCDate()}.${
      dateObj.getUTCMonth() + 1
    }.${dateObj.getUTCFullYear()}`;
    return formattedDate;
  } catch (error) {
    return null;
  }
}