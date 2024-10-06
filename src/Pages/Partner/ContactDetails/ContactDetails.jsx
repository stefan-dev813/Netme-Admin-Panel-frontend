import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { TbMailFilled } from 'react-icons/tb';
import { IoMdCall } from 'react-icons/io';
import { userRequest } from '../../../requestMethod';

const ContactDetails = ({ setContact, partnerId }) => {
    const [data, setData] = useState({})
    console.log('data:', data)
    useEffect(() => {
        userRequest(`/admin/partner/getSinglePartner?partnerId=${partnerId}`).then((res) => {
            setData(res?.data?.data)
        })

    }, [])
    return (
        <div className={styles.MainContainer}>
            <span className={styles.firstSpan}>
                <p  onClick={() => setContact(false)} > Active Partners</p> {'>'} <b>Legal Representative Contact Details</b>
            </span>
            <h1>
                {data?.fullName} {data?.lastName}
            </h1>
            <p className={styles.sir}>{data?.jobPosition}</p>
            <div className={styles.number}>
                <span className={styles.numSpan}> <IoMdCall fontSize={25} /><p>{data?.mobile}</p></span>
                <span className={styles.numSpan}> <TbMailFilled fontSize={25} /><p>{data?.email}</p></span>
            </div>

        </div>
    )
}

export default ContactDetails