import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import { Button, Input, Select } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {  fetchCurrentVoucherData, updateCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { userRequest } from '../../../requestMethod'

const initialState = {
  "name": "",
  "code": "",
  "percentage": "",
  "startDate": "",
  "endDate": ""
}

const EditVoucher = ({promotionKey}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  
  const [form, setForm] = useState(initialState)
  const currentDate = new Date().toISOString().split('T')[0];
  console.log("paraam@@" , params)
  console.log("promotionKey" , promotionKey)

  const UpdateData = () => {
    if (!form.name) {
      message.error("Enter Promotion Name")

    } else {
      if (!form.code) {
        message.error("Enter Code")
      }
      else {
        if (!form.percentage) {
          message.error("Select Percentage")
        } else {
          if (!form.startDate) {
            message.error("Select startDate")
          } else {
            if (!form.endDate) {
              message.error("Select endDate")
            } else {
              if (new Date(form.endDate) < new Date(form.startDate)) {
                message.error("End Date Cannot be greater then start date")
              } else {
                form.voucherId = form._id;
                delete form._id;
                dispatch(updateCurrentVoucherData(form)).then((res) => {
                  dispatch(fetchCurrentVoucherData("Current")).then(() => {
                    if(promotionKey==="Promotions"){

                      message.success("Promotion has been updated")
                      navigate("/Promotions")
                    }
                    else{
                      message.success("Voucher has been updated")
                      navigate("/Voucher")
                    }
                  })
                })
              }
            }
          }
        }
      }
    }

  }
  useEffect(() => {
    userRequest.get(`/admin/voucher/getSingleVoucher?voucherId=${params.id}`).then((res) => {
      setForm(res.data.data)
    })
  }, [])

  return (
    <div className={styles.MainContainer}>

      <div className={styles.container1}>
        <span>
          All Promotion {'>'} <b style={{ opacity: "100%", color: "#131313" }}>Edit Promotion</b>
        </span>
        <h1>
          Edit Promotion
        </h1>

        <div className={styles.resetPassword}>
          <p>Promotion Name</p>
          <Input placeholder='Enter Promotion Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <p>Voucher Code</p>
          <Input placeholder='Enter Voucher Code' value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <p>Promotion Percentage</p>
          <Select placeholder='Choose Percentage' value={form.percentage} onChange={(e) => setForm({ ...form, percentage: e.target.value })}>
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
          <Input placeholder='Start Date' type='date' min={currentDate} value={formatDate(form.startDate)} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <p>End Date</p>
          <Input placeholder='End Date' type='date' min={form.startDate || currentDate} value={formatDate(form.endDate)} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>

      </div>
      <div className={styles.btn}>
        <Button colorScheme='black' variant='outline' w="127px" onClick={() => {promotionKey === "Promotions" ? navigate("/Promotions"): navigate("/Voucher")}}>Cancel</Button>
        <Button bg="black" color="#fff" variant='solid' w="208px" onClick={UpdateData}>Save changes</Button>
      </div>
    </div>
  )
}

export default EditVoucher



function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}