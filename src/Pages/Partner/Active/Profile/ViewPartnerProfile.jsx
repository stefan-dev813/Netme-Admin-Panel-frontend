import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import mail from "../../../../assets/mail.png";
import location from "../../../../assets/location.png";
import { userRequest } from "../../../../requestMethod";
import { Select } from "@chakra-ui/react";
import { DatePicker, message } from "antd";
import crossImg from "../../../../assets/crossImg.svg";
import UploadPartnerImage from "./UploadPartnerImage";



function ViewPartnerProfile({setProfile,profileId}) {
  const [viewPage, setViewPage] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [photos, setPhotos] = useState([]);
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const togglePage = () => {
    setViewPage(!viewPage);
  };


  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };


  const handleRemovePicture = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleImageUpload = (newFileList) => {
    const uploadedImages = newFileList.filter((file) => file.status === "done");
    if (uploadedImages.length > 0) {
      const updatedPhotos = [
        ...photos,
        ...uploadedImages.map((file) => file.response.url),
      ];
      setPhotos(updatedPhotos);
    }
  };


  useEffect(() => {
    userRequest(`/admin/partner/getSinglePartner?partnerId=${profileId}`).then(
      (res) => {
        setData(res?.data?.data);
        setPhotos(res.data.data.business.photos);
      }
    );
  }, []);

  const updatedData = {
    businessId: data?._id,
    photos,
    partnerId: profileId,
    category: selectedOption,
  };

  const updatePartnerProfile = async () => {
    userRequest.put("admin/partner/updateProfile", updatedData)

      .then((response) => {
        message.success("Profile updated successfully");
        navigate("/Partners");
      })
      .catch((error) => {
        message.error("Error updating profile", error);
      });

  };
  

  return (
    <div className={styles.MainContainer}>
      <span className={styles.firstSpan}>
        <p onClick={() => setProfile(false)}> Active Partner</p> {">"}{" "}
        <p> <b>Profile</b></p>
      </span>
      <div className={styles.PartnerHeader}>
        <div className={styles.Partner}>
          <p>{data?.business?.name}</p>
          <p>{data?.business?.category}</p>
        </div>
        {viewPage ? (
          <button onClick={togglePage}>Edit</button>
        ) : (
          <div className={styles.buttonAction}>
            <button onClick={togglePage}>Cancel</button>
            <button onClick={updatePartnerProfile}>Save</button>
          </div>
        )}
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
        {viewPage ? null : (
          <div className={styles.editParterDetails}>
            <div className={styles.editSingleDetails}>
              <p>Type</p>
              <Select placeholder="Select option" onChange={(event) => handleOptionChange(event.target.value)}>
                <option value="Restaurant">Restaurant</option>
                <option value="Bar">Bar</option>
                <option value="Coffeeshop">Coffeeshop</option>
              </Select>
            </div>
            <div className={styles.editSingleDetails}>
              <p>New Membership</p>
              <Select placeholder="Select option" disabled></Select>
            </div>
            <div className={styles.editSingleDetails}>
              <p>Starting From</p>
              <DatePicker
                style={{
                  height: "40px",
                }}
                placement="bottomLeft"
                disabled
              />
            </div>
          </div>
        )}
        <div className={styles.partnerPics}>
          <p>Pictures</p>
          <div className={styles.picsContainer}>
            {photos.map((photo, index) => (
              <div className={styles.singlePic} key={index}>
                <img src={photo} alt="" />
                {!viewPage && (
                  <div className={styles.removeImage}>
                    <img
                      src={crossImg}
                      onClick={() => handleRemovePicture(index)}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
            {!viewPage && (
              <div className={styles.uploadImage}>
                <UploadPartnerImage
                  fileList={fileList}
                  setFileList={setFileList}
                  onImageUpload={handleImageUpload}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPartnerProfile;

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
