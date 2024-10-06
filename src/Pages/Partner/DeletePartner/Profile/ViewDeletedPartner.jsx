import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import mail from "../../../../assets/mail.png";
import location from "../../../../assets/location.png";
import { userRequest } from "../../../../requestMethod";



function ViewDeletedPartner() {
  const [photos, setPhotos] = useState([]);
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    userRequest(`/admin/partner/getSinglePartner?partnerId=${params.id}`).then(
      (res) => {
        setData(res?.data?.data);
        setPhotos(res.data.data.business.photos);
      }
    );
  }, []);


  return (
    <div className={styles.MainContainer}>
      <span className={styles.firstSpan}>
        <p onClick={() => navigate("/Partners")}> Deleted Partner</p> {">"}{" "}
        <b>Profile</b>
      </span>
      <div className={styles.PartnerHeader}>
        <div className={styles.Partner}>
          <p>{data?.business?.name}</p>
          <p>{data?.business?.category}</p>
        </div>
      </div>
      <div className={styles.partnerDetails}>
        <div className={styles.partnerContactDetails}>
          <div className={styles.partnerAddress}>
            <img src={location} alt="" />
            <p>{data?.business?.address}</p>
          </div>
          <div className={styles.partnerAddress}>
            <img src={mail} alt="" />
            <p>{data?.email}</p>
          </div>
        </div>
        <div className={styles.partnerStatusDetails}>
          <div className={styles.singleDetails}>
            <p>Registered On</p>
            <p>{convertDate(data?.createdAt)}</p>
          </div>
          <div className={styles.singleDetails}>
            <p>Membership</p>
            <p>{convertDate(data?.business?.createdAt)}</p>
          </div>
          <div className={styles.singleDetails}>
            <p>Tax Number</p>
            <p>{data?.business?.taxNumber}</p>
          </div>
        </div>

        <div className={styles.partnerPics}>
          <p>Pictures</p>
          <div className={styles.picsContainer}>
            {photos.map((photo, index) => (
              <div className={styles.singlePic} key={index}>
                <img src={photo} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDeletedPartner;

function convertDate(dateString) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}
