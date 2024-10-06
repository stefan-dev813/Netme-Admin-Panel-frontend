import React, { useEffect, useState } from 'react';
import styles from "../styles.module.css";
import { Button, Input, Select } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
// import {  fetchCurrentSubscriptionData, updateCurrentSubscriptionData } from '../../../Redux/Subscription/CurrentSubscriptionReducer'
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { InputGroup, InputRightAddon } from '@chakra-ui/react';
import { userRequest } from '../../../requestMethod';
import { fetchSubscriptionData, updateSubscriptionData } from '../../../Redux/Subscription/subscriptionReducer'
// import { userRequest } from '../../../requestMethod'

const initialState = {
  planName: "",
  timePeriod: "",
  price: "",
}

const EditSubscription = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams()
  const [form, setForm] = useState(initialState)
  console.log('form:', form)
  useEffect(() => {
    userRequest.get(`/admin/subscription/getSingleSubscription?_id=${params.id}`).then((res) => {
      setForm(res.data.data)
    })
  }, [params.id])

  const UpdateData = () => {
    if (!form.planName) {
      message.error("Plan Name is Required")
    } else {
      if (!form.timePeriod) {
        message.error("Time Period is Required")
      } else {
        if (!form.price) {
          message.error("Price is Required")
        } else {

          dispatch(updateSubscriptionData({ ...form, planId: form._id, userType: "PARTNER" })).then((res) => {
            navigate("/Subscription")
            fetchSubscriptionData("", "PARTNER")
            message.success("Plan Updated Successfully")

          }).catch(err => {
            message.error("Something went Wrong")

          })
        }
      }
    }
  }




  return (
    <div className={styles.MainContainer}>

      <div className={styles.container1}>
        <span>
          All Plan {'>'} <b style={{ opacity: "100%", color: "#131313" }}>Create Plan</b>
        </span>
        <h1>
          Create New Plan
        </h1>

        <div className={styles.container}>
          <p>Plan Name</p>
          <Select placeholder='Choose Plan' onChange={(e) => setForm({ ...form, planName: e.target.value })} value={form.planName}>
            <option value="Standard">Standard</option>
            <option value="Silver">Silver </option>
            <option value="Gold">Gold</option>
          </Select>
          <p>
            Plan Time
          </p>
          <InputGroup className={styles.inputGroup}>

            <Input placeholder='Enter amount' type="Number" onChange={(e) => setForm({ ...form, timePeriod: e.target.value })} value={form.timePeriod} />
            <InputRightAddon children='Month' className={styles.sideItem} />
          </InputGroup>
          <p>
            Price
          </p>
          <InputGroup className={styles.inputGroup}>

            <Input placeholder='Enter amount' type="Number" onChange={(e) => setForm({ ...form, price: e.target.value })} value={form.price} />
            <InputRightAddon className={styles.sideItem} children='Є' />

          </InputGroup>
        </div>

      </div>
      <div className={styles.btn}>
        <Button colorScheme='black' variant='outline' onClick={() => navigate("/Subscription")}>Cancel</Button>
        <Button bg="black" color="#fff" variant='solid' onClick={UpdateData}>Save Changes</Button>
      </div>
    </div>
  )
}

export default EditSubscription