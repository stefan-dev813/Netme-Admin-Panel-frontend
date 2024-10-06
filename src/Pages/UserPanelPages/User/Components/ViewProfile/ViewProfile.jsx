import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { Button } from '@chakra-ui/react'
import { BiSolidPencil } from 'react-icons/bi'
import { Radio } from 'antd'
import EditProfile from '../EditProfile/EditProfile'
import { userRequest } from '../../../../../requestMethod'
import { useParams , Link } from 'react-router-dom'
import pencil from '../../../../../assets/pencil.png'
import mic from '../../../../../assets/mic.png'
import film from '../../../../../assets/film.png'
import computer from '../../../../../assets/computer.png'
const ViewProfile = () => {
    const [editProfile, setEditProfile] = useState(false)
    const [user, setUser] = useState({})
    console.log('user:', user)
    const params = useParams()

    const InterestArray = [
        { title: 'Design', icon: pencil },
        { title: 'Standup', icon: mic },
        { title: 'Computers', icon: computer },
        { title: 'Films', icon: film },
      ];
    function convertDate(dateStr) {
        try {
            // Convert the input date string to a Date object
            const dateObj = new Date(dateStr);

            // Format the Date object in the desired output format
            const formattedDate = `${dateObj.getUTCDate()}.${dateObj.getUTCMonth() + 1}.${dateObj.getUTCFullYear()}`;
            return formattedDate;
        } catch (error) {
            // If the input date string is not in the correct format, handle the error
            return null
        }

    }

    useEffect(() => {
        userRequest.get(`/admin/user/getSingleUser?userId=${params.id}`).then((res) => {
            setUser(res.data.user)
        })
    }, [])
    if (editProfile) {
        return (
            <EditProfile setEditProfile={setEditProfile} user={user} setUser={setUser} />
        )
    }
    return (
        <div className={styles.MainContainer}>
            <div className={styles.firstDiv}>
                <div className={styles.head}> <p
                //    onClick={() => setViewMeatings(false)}
                > 
                <Link to="/Users" >All Users</Link>
                
                {'>'} <b>User detail</b></p>
                    <h1>
                        User Detail
                    </h1>
                </div>

                <div className={styles.btn}>
                    <Button variant="outline">Upgrade Profile</Button>
                    <Button bg="#8CC9E9" onClick={() => setEditProfile(true)}> <BiSolidPencil /> &nbsp; Edit Details</Button>
                </div>
            </div>
            <div className={styles.secondDiv}>
                <div className={styles.details}>
                    <p className={styles.title}>
                        User name
                    </p>
                    <div className={styles.name}>
                        <p>{user?.userName}</p>
                        {/* <p className={styles.verified}>Verified</p> */}
                    </div>
                    <p className={styles.title}>
                        Email
                    </p>
                    <div className={styles.name}>
                        <p>{user?.email}</p>
                        {/* <p className={styles.verified}>Verified</p> */}
                    </div>
                    <p className={styles.title}>DOB</p>
                    <p>{convertDate(user?.dob)}</p>
                    <p className={styles.title}>City</p>
                    <p>{user?.city}</p>
                    <p className={styles.title}>Current Job</p>
                    <p>{user?.job}</p>
                    <p className={styles.title}>Gender</p>

                    <Radio.Group value={user?.gender} >
                        <Radio value={`Male`}>Male</Radio>
                        <Radio value={`Female`}>Female</Radio>
                        <Radio value={`I don't want to identify`}>I don't want to identify</Radio>
                    </Radio.Group>
                    <p className={styles.title}>Interest</p>
                    <div className={styles.interestDiv}>
                    {InterestArray.map((el) => (
                      <button key={el.title}>
                        <img src={el.icon} alt={el.title} /> {el.title}
                      </button>
                    ))}

                    </div>



                </div>
                <div className={styles.photoDiv}>
                    <p className={styles.title}>Bio</p>
                    <p>
                        {user?.bio}
                    </p>
                    <div className={styles.photos}>
                        <div>
                            {
                                user?.images?.length > 0 && <div className={styles.mainPhoto}>


                                    <img src={user?.images[0]} alt="" /></div>

                            }
                        </div>
                        <div className={styles.subDiv1}>
                            {
                                user?.images?.length > 1 && <div className={styles.subPhoto}>


                                    <img src={user?.images[1]} alt="" /></div>

                            }

                            {
                                user?.images?.length > 2 && <div className={styles.subPhoto}>


                                    <img src={user?.images[2]} alt="" /></div>

                            }
                        </div>
                    </div>
                    <div className={styles.subDiv2}>
                        {
                            user?.images?.length > 3 && <div className={styles.subPhoto}>


                                <img src={user?.images[3]} alt="" /></div>

                        }

                        {
                            user?.images?.length > 4 && <div className={styles.subPhoto}>


                                <img src={user?.images[4]} alt="" /></div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile