import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Button, Input, Select } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
// import {  fetchCurrentPromotionData, updateCurrentPromotionData } from '../../../../Redux/Promotion/CurrentPromotionReducer'
import { useDispatch } from "react-redux";
import { message } from "antd";
import { userRequest } from "../../../../requestMethod";

const initialState = {
  name: "",
  code: "",
  percentage: "",
  startDate: "",
  endDate: "",
};

const EditPromotion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [form, setForm] = useState(initialState);
  console.log("form:", form);
  const currentDate = new Date().toISOString().split("T")[0];
  const UpdateData = () => {
    if (!form.name) {
      message.error("Enter Promotion Name");
    } else {
      if (!form.code) {
        message.error("Enter Code");
      } else {
        if (!form.percentage) {
          message.error("Select Percentage");
        } else {
          if (!form.startDate) {
            message.error("Select startDate");
          } else {
            if (!form.endDate) {
              message.error("Select endDate");
            } else {
              if (new Date(form.endDate) < new Date(form.startDate)) {
                message.error("End Date Cannot be greater then start date");
              } else {
                // form.PromotionId = form._id;
                // delete form._id;
                // dispatch(updateCurrentPromotionData(form)).then((res) => {
                //   dispatch(fetchCurrentPromotionData("Current")).then(() => {
                //     navigate("/Promotion")
                //     message.success("Promotion has been updated")
                //   })
                // })
              }
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    userRequest
      .get(`/admin/Promotion/getSinglePromotion?PromotionId=${params.id}`)
      .then((res) => {
        setForm(res.data.data);
      })
      .catch((err) => {
        console.log(err.message || "An error occurred");
      });
  }, [params.id]);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.container1}>
        <span>
          All Promotion {">"}{" "}
          <b style={{ opacity: "100%", color: "#131313" }}>Edit Promotion</b>
        </span>
        <h1>Edit Promotion</h1>

        <div className={styles.resetPassword}>
          <p>Promotion Name</p>
          <Input
            placeholder="Enter Promotion Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <p>Promotion Code</p>
          <Input
            placeholder="Enter Promotion Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <p>Promotion Percentage</p>
          <Select
            placeholder="Choose Percentage"
            value={form.percentage}
            onChange={(e) => setForm({ ...form, percentage: e.target.value })}
          >
            <option value="25% off">25% off</option>
            <option value="50% off">50% off</option>
            <option value="75% off">75% off</option>
            <option value="Buy 1 Get 1 free">Buy 1 Get 1 free</option>
            <option value="1 month free">1 month free</option>
            <option value="3 months free">3 months free</option>
            <option value="6 months free">6 months free</option>
            <option value="12 months free">12 months free</option>
          </Select>
          <p>Start Date</p>
          <Input
            placeholder="Confirm Your Password"
            type="date"
            min={currentDate}
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
          <p>End Date</p>
          <Input
            placeholder="Confirm Your Password"
            type="date"
            min={form.startDate || currentDate}
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          colorScheme="black"
          variant="outline"
          w="127px"
          onClick={() => navigate("/Promotions")}
        >
          Cancel
        </Button>
        <Button
          bg="black"
          color="#fff"
          variant="solid"
          w="208px"
          onClick={UpdateData}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default EditPromotion;
