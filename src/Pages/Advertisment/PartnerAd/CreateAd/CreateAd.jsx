import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  CloseButton,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { createCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer'
import { useDispatch } from "react-redux";
import { message } from "antd";
import { userRequest } from "../../../../requestMethod";
import UploadImage from "./Upload";
import { createPartnerAdData } from "../../../../Redux/Advertisement/Partner/PartnerAdReducer";
import suggestionList from "../../../../assets/suggestionList.png";
import image1 from "../../../../assets/image1.png";
import location1 from "../../../../assets/location1.png";
import stars from "../../../../assets/stars.png";
import inFeedList from "../../../../assets/inFeedList.png";
import Ad from "../../../../assets/ad.png";
import Cross from "../../../../assets/cross.png";
import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
}

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

const initialState = {
  name: "",
  partnerId: "",
  image: "",
  title: "",
  body: "",
  cities: [],
  releaseDate: "",
  // releaseTime: "",
  adType: "Feed",
};

const CreateAd = ({ setCreateAd }) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [form, setForm] = useState(initialState);
  const [previewImage, setPreviewImage] = useState("");
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    userRequest
      .get(`/admin/partner/getAllPartners`)
      .then((res) => {
        setPartners(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching partners:", err);
      });
  }, []);
  const handleImageUpload = async (newFileList) => {
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      try {
        const key = `uploads/${Date.now()}_${newFileList[0].name}`;
        const params = {
          Bucket: "netme-stage",
          Key: key,
          ContentType: newFileList[0].type,
          Expires: 600, // URL expiration time in seconds
        };

        const presignedUrl = await s3.getSignedUrlPromise("putObject", params);

        await uploadImageToS3(presignedUrl, newFileList[0].originFileObj);
        console.log(newFileList[0].originFileObj);
        // Update the form state with the generated presigned URL
        setForm({ ...form, image: presignedUrl });
      } catch (error) {
        console.error("Error generating presigned URL:", error);
      }
    }
  };
  const uploadImageToS3 = async (presignedUrl, file) => {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        console.log("Image uploaded successfully!");
      } else {
        console.error("Image upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleImageUpload6 = (newFileList) => {
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      setForm({ ...form, image: newFileList[0].response.url });
    }
  };

  console.log(handleImageUpload6, "imageupload");

  const addCity = () => {
    if (form.city && !form.cities.includes(form.city)) {
      setForm((prevForm) => ({
        ...prevForm,
        cities: [...prevForm.cities, prevForm.city],
        city: "",
      }));
    }
  };

  const removeCity = (removedCity) => {
    setForm({
      ...form,
      cities: form.cities.filter((city) => city !== removedCity),
    });
  };

  console.log(form.image, "allForms");

  const addData = () => {
    if (!form.name) {
      message.error("Enter Ad Name");
    } else if (!form.partnerId) {
      message.error("Enter partnerId");
    } else if (!form.image) {
      message.error("Enter image");
    } else if (!form.title) {
      message.error("Enter title");
    } else if (!form.body) {
      message.error("Enter body");
    } else if (!form.cities) {
      message.error("Enter cities");
    } else if (!form.releaseDate) {
      message.error("Enter releaseDate");
    } else {
      dispatch(createPartnerAdData(form))
        .then(() => {
          setForm(initialState);
          setPreviewImage("");
          setFileList([]);
          message.success("Advertisement created successfully");
          setTimeout(() => {
            setCreateAd(false);
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          message.error(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.container1}>
        <span style={{ whiteSpace: "nowrap" }}>
          Partner Ads {">"}{" "}
          <b
            style={{ opacity: "100%", color: "#131313", whiteSpace: "nowrap" }}
          >
            Create an Advertisement
          </b>
        </span>
        <h1>Create an Ad</h1>

        <div className={styles.resetPassword}>
          <RadioGroup
            value={form.adType}
            onChange={(value) => setForm({ ...form, adType: value })}
          >
            <Stack direction="column">
              <Radio value="Suggestion">
                <p className={styles.radioP}>Suggestion List (choose a city)</p>
              </Radio>
              <Radio value="Feed">
                <p className={styles.radioP}>
                  In-feed Ad (location-based + 10 Km radius)
                </p>
              </Radio>
            </Stack>
          </RadioGroup>
          <p>Select Partner*</p>
          <Select
            w="70%"
            placeholder="Select Partner name"
            value={form.partnerId}
            onChange={(e) => setForm({ ...form, partnerId: e.target.value })}
          >
            {partners.length > 0 &&
              partners.map((el) => {
                return (
                  <option key={el._id} value={el.partnerId?._id}>
                    {el.partnerId?.fullName}
                  </option>
                );
              })}
          </Select>
          <p>Ad Name*</p>
          <Input
            placeholder="Enter Ad "
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <p>Ad title*</p>
          <Input
            placeholder="Ad Title (max. 50 characters)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <p>Ad Body*</p>
          <textarea
            placeholder="Ad Body (max. 150 characters)"
            rows={4}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <UploadImage
            setFileList={setFileList}
            fileList={fileList}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
            onImageUpload={handleImageUpload}
          />
          <p className={styles.longString}>
            Please verify that your uploaded file compiles with our system
            requirements for ads campaign
          </p>
          <div></div>
          <p>Only Received by users in the following city:</p>
          <div className={styles.citydiv}>
            <div className={styles.scrollstack}>
              <Stack direction="row" spacing={2} align="center">
                {form.cities.map((city) => (
                  <div key={city} className={styles.selectedCity}>
                    <p>{city}</p>
                    <CloseButton onClick={() => removeCity(city)} />
                  </div>
                ))}
              </Stack>
            </div>

            <input
              placeholder="City"
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && addCity()}
              onBlur={addCity}
            />
          </div>
          <p>Release on:</p>
          <Input
            type="date"
            value={form.releaseDate}
            onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
          />
          {/* <p>Release time:</p>
          <Input
            type="time"
            value={form.releaseTime}
            onChange={(e) => setForm({ ...form, releaseTime: e.target.value })}
          /> */}
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.btn}>
          <Button
            colorScheme="black"
            variant="outline"
            w="127px"
            onClick={() => setCreateAd(false)}
          >
            Cancel
          </Button>
          <Button
            bg="black"
            color="#fff"
            variant="solid"
            w="127px"
            onClick={addData}
          >
            Save
          </Button>
        </div>
        {form.adType === "Suggestion" && (
          <div className={styles.imageContainer}>
            <img
              src={suggestionList}
              alt="Suggestion List"
              className={styles.suggestionImage}
            />
            <div className={styles.imageInside}>
              <div className={styles.previewText}>
                <p>Here are some </p>
                <p>suggestions for you !</p>
                <p>Discover for each place.</p>
              </div>
              <div>
                <div className={styles.previewInputImage}>
                  <img
                    src={form.image.length > 0 ? form.image : image1}
                    alt="Uploaded"
                  />
                </div>
                <div className={styles.previewAdDetails}>
                  <div className={styles.adPreviewTitle}>
                    <p>{form.name}</p>
                  </div>

                  <div className={styles.locations}>
                    <img src={location1} alt="location1" />
                    <p>2km</p>
                  </div>
                </div>
                <img src={stars} alt="location1" className={styles.stars} />
              </div>
              <div style={{ marginTop: "10px" }}>
                <div className={styles.previewInputImage}>
                  <img
                    src={form.image.length > 0 ? form.image : image1}
                    alt="1"
                  />
                </div>
                <div className={styles.previewAdDetails}>
                  <div className={styles.adPreviewTitle}>
                    <p>{form.name}</p>
                  </div>

                  <div className={styles.locations}>
                    <img src={location1} alt="location1" />
                    <p>2km</p>
                  </div>
                </div>
                <img src={stars} alt="location1" className={styles.stars} />
              </div>
            </div>
          </div>
        )}
        {form.adType === "Feed" && (
          <div className={styles.imageContainer1}>
            <img
              src={inFeedList}
              alt="inFeedList"
              className={styles.suggestionImage1}
            />
            <div className={styles.imageInside1}>
              <div>
                <div className={styles.previewInputImage1}>
                  <div className={styles.div1}>
                    <img
                      src={Ad}
                      alt="1"
                      style={{
                        width: "30px",
                        position: "absolute",
                        top: "4%",
                        left: "4%",
                      }}
                    />
                    <img
                      src={Cross}
                      alt="1"
                      style={{
                        width: "30px",
                        position: "absolute",
                        right: "4%",
                        top: "4%",
                      }}
                    />
                    <img
                      src={form.image.length > 0 ? form.image : image1}
                      alt="1"
                    />
                    <div className={styles.div2}>
                      <p className={styles.paragraph}>{form.name}</p>
                      <p className={styles.paragraph1}>{form.body}</p>
                    </div>
                    <div className={styles.div3}>
                      <button className={styles.buttons1}>
                        All Localities
                      </button>
                      <button className={styles.buttons2}>More Details</button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAd;
