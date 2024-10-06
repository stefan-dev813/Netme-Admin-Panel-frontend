import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input, CloseButton, Stack } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Slider, message } from "antd";
import UploadImage from "../../PartnerAd/CreateAd/Upload";
// import { createPartnerAdData } from "../../../../Redux/Advertisement/Partner/PartnerAdReducer";
import fullAdPreview2 from "../../../../assets/fullAdPreview2.png";
import { createExternalAdData } from "../../../../Redux/Advertisement/External/ExternalAdReducer";
// import suggestionList from "../../../../assets/suggestionList.png";
// import image1 from "../../../../assets/image1.png";
// import location1 from "../../../../assets/location1.png";
import stars from "../../../../assets/stars.png";

const initialState = {
  name: "",
  image: "",
  title: "",
  body: "",
  legalRepresentative: {
    firstName: "",
  },
  cities: [],
  // "targetGroup":"",
  releaseDate: "",
  buttonUrl: "",
  ageRange: [18, 65],
};

const CreateAd = ({ setCreateAd }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [form, setForm] = useState(initialState);
  const [previewImage, setPreviewImage] = useState("");

  const handleImageUpload = (newFileList) => {
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      setForm({ ...form, image: newFileList[0].response.url });
    }
  };

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

  const addData = () => {
    if (!form.legalRepresentative.firstName) {
      message.error("Enter Client Name");
    } else if (!form.name) {
      message.error("Enter Ad Name");
    } else if (!form.image) {
      message.error("Enter image");
    } else if (!form.title) {
      message.error("Enter title");
    } else if (!form.body) {
      message.error("Enter body");
    } else if (!form.cities) {
      message.error("Enter city");
    } else if (!form.releaseDate) {
      message.error("Enter releaseDate");
    } else if (!form.buttonUrl) {
      message.error("Enter button url");
    } else if (!form.ageRange) {
      message.error("Please select age range");
    } else {
      dispatch(createExternalAdData(form))
        .then(() => {
          setForm(initialState);
          setPreviewImage("");
          setFileList([]);
          message.success("Advertisement created successfully");
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
          External Ad {">"}{" "}
          <b
            style={{ opacity: "100%", color: "#131313", whiteSpace: "nowrap" }}
          >
            Create an Advertisement
          </b>
        </span>
        <h1>Create an Ad</h1>

        <div className={styles.resetPassword}>
          <p>Client Name*</p>
          <Input
            placeholder="Enter Client Name"
            value={form.legalRepresentative.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                legalRepresentative: {
                  ...form.legalRepresentative,
                  firstName: e.target.value,
                },
              })
            }
          />

          <p>Ad Name*</p>
          <Input
            placeholder="Enter Ad Name"
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
          <p>URL for Button*</p>
          <Input
            placeholder="Enter Url Here"
            value={form.buttonUrl}
            onChange={(e) => setForm({ ...form, buttonUrl: e.target.value })}
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
          <div className={styles.releaseDateSection}>
            <div className={styles.releaseDate}>
              <p>Release on:</p>
              <Input
                type="date"
                value={form.releaseDate}
                onChange={(e) =>
                  setForm({ ...form, releaseDate: e.target.value })
                }
              />
            </div>
            <div className={styles.releaseDate}>
              <p className={styles.sliderHeading}>Select Age Range</p>
              <Slider
                range
                defaultValue={initialState.ageRange}
                min={15}
                max={100}
                tipFormatter={(value) => `${value} years`}
                onChange={(value) => setForm({ ...form, ageRange: value })}
                style={{ width: "12vw" }}
              />
            </div>
          </div>
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
        <div className={styles.imageContainer}>
          
          <img
            src={fullAdPreview2}
            alt="Suggestion List"
            className={styles.suggestionImage}
          />
          <div className={styles.imageInside}>
              <div className={styles.previewAdDetails}>
                <div className={styles.adPreviewTitle}>
                  <p>{form.name}</p>
                </div>
              </div>
              <img src={stars} alt="location1" className={styles.stars} />
              <div className={styles.previewAdBody}>
                <p>{form.body}</p>
              </div>
              <div className={styles.previewAdButton}>
                <button style={{height:'40px', width:'58%',objectFit: "inherit"}}><span style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:'auto', paddingBottom:'auto', fontWeight:'bold', fontSize:'0.8em'}}>More details</span></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;
