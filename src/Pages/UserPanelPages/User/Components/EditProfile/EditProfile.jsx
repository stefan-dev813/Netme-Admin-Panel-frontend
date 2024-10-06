import React, { useState } from 'react'
import styles from "./styles.module.css"
import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { Radio, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { fileRequest } from '../../../../../requestMethod';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../../../../Redux/User/UserReducer';
import crossImg from "../../../../../assets/icons/crossPhotos.svg"
import pencil from '../../../../../assets/pencil.png'
import mic from '../../../../../assets/mic.png'
import film from '../../../../../assets/film.png'
import computer from '../../../../../assets/computer.png'

const EditProfile = ({ setEditProfile, user, setUser }) => {
    console.log('user:', user)
    const dispatch = useDispatch()
    const onChange = (e) => {
        setUser({ ...user, gender: e.target.value });
    };

    const updateUser = () => {
        const newFrom = { ...user, userId: user._id }
        delete newFrom._id
        dispatch(updateUserData(newFrom)).then((res) => {
            setEditProfile(false)
            message.success("Update Success")

        }).catch((err) => {
            console.log('err:', err)

        })

    }
    const deleteImage = (index) => {
        const newImages = [...user.images];
        newImages.splice(index, 1); // Remove the image at the given index
        setUser({ ...user, images: newImages }); // Update the user state
    };

    const InterestArray = [
        { title: 'Design', icon: pencil },
        { title: 'Standup', icon: mic },
        { title: 'Computers', icon: computer },
        { title: 'Films', icon: film },
      ];

    const upload = async (e) => {
        const formData = new FormData();
        const image = e.target.files[0]; // Get the first selected file from the array

        if (image) {

            formData.append('file', image);

            // Append the selected file to the FormData

            fileRequest.post('/api/util/uploadFile', formData)
                .then((res) => {
                    console.log('res:', res.data.url);
                    setUser({ ...user, images: [...user.images, res.data.url] });
                    alert("File uploaded successfully");
                })
                .catch((err) => {
                    console.log(err);
                    alert("File upload failed");
                });
        }
    };


    return (
        <div className={styles.MainContainer}>
            <div className={styles.firstDiv}>
                <div className={styles.head}> <p
                //    onClick={() => setEditProfile(false)}
                > All Users{'>'} <b>Edit User Profile</b></p>
                    <h1>
                        User Detail
                    </h1>
                </div>

                <div className={styles.btn}>
                    <Button variant="outline" onClick={() => setEditProfile(false)}>Cancel</Button>
                    <Button bg="black" color="#fff" onClick={updateUser}> Save Changes</Button>
                </div>
            </div>
            <div className={styles.secondDiv}>
                <div className={styles.details}>
                    <p className={styles.title}>
                        User name
                    </p>
                    <div className={styles.name}>
                        <InputGroup pr={2} alignItems="center">

                            <Input focusBorderColor="transparent" placeholder='Enter User name' value={user?.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                            {/* <InputRightAddon h="30px" borderRadius="none" border="none" bg="#15EEB0" className={styles.verified} children='Verified' /> */}
                        </InputGroup>

                    </div>
                    <p className={styles.title}>
                        Email
                    </p>
                    <div className={styles.name}>
                        <InputGroup pr={2} alignItems="center">

                            <Input focusBorderColor="transparent" placeholder='Enter Email' value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            {/* <InputRightAddon h="30px" borderRadius="none" border="none" bg="#15EEB0" className={styles.verified} children='Verified' /> */}
                        </InputGroup>
                    </div>
                    <p className={styles.title}>DOB</p>
                    <div className={styles.name}>
                        <InputGroup pr={2} alignItems="center">

                            <Input focusBorderColor="transparent" placeholder='Enter DOB' type='date' outline="none" 
                           value= {user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''} 
                            onChange={(e) => setUser({ ...user, dob: e.target.value })} />
                        </InputGroup>
                    </div>
                    <p className={styles.title}>City</p>
                    <div className={styles.name}>
                        <InputGroup pr={2} alignItems="center">

                            <Input focusBorderColor="transparent" placeholder='Enter City' value={user?.city} onChange={(e) => setUser({ ...user, city: e.target.value })} />
                        </InputGroup>
                    </div>
                    <p className={styles.title}>Current Job</p>
                    <div className={styles.name}>
                        <InputGroup pr={2} alignItems="center">

                            <Input focusBorderColor="transparent" placeholder='Enter Current Job' value={user?.job} onChange={(e) => setUser({ ...user, job: e.target.value })} />
                        </InputGroup>
                    </div>

                    <p className={styles.title}>Gender</p>
                    <Radio.Group onChange={onChange} value={user.gender} >
                        <Radio value={`Male`}>Male</Radio>
                        <Radio value={`Female`}>Female</Radio>
                        <Radio value={`I don't want to identify`}>I don't want to identify</Radio>
                    </Radio.Group>




                </div>
                <div className={styles.photoDiv}>
                    <p className={styles.title}>Bio</p>
                    <textarea value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} ></textarea>
                    <div className={styles.photos}>
                        <div>
                            {
                                user.images.length > 0 ? <div className={styles.mainPhoto}>
                                    <span> <img src={crossImg} className={styles.mainCross} onClick={()=>deleteImage(0)} alt="" /></span>
                                    <img src={user?.images[0]} alt="" />
                                </div> : <>
                                    <label htmlFor="main">
                                        <div className={styles.uploadMain} >
                                            <PlusOutlined />
                                        </div>
                                    </label>
                                    <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} /></>
                            }
                        </div>
                        <div className={styles.subDiv1}>
                            {
                                user.images.length > 1 ? <div className={styles.subPhoto}>
                                    <span> <img src={crossImg} className={styles.mainCross} onClick={()=>deleteImage(1)} alt="" /></span>


                                    <img src={user?.images[1]} alt="" /></div> : <>
                                    <label htmlFor="main">
                                        <div className={styles.uploadSub} >
                                            <PlusOutlined />
                                        </div>
                                    </label>
                                    <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} /></>
                            }

                            {
                                user.images.length > 2 ? <div className={styles.subPhoto}>
                                    <span> <img src={crossImg} onClick={()=>deleteImage(2)} className={styles.mainCross} alt="" /></span>

                                    <img src={user?.images[2]} alt="" /></div> : <>
                                    <label htmlFor="main">
                                        <div className={styles.uploadSub} >
                                            <PlusOutlined />
                                        </div>
                                    </label>
                                    <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} /></>
                            }
                        </div>
                    </div>
                    <div className={styles.subDiv2}>
                        {
                            user.images.length > 3 ? <div className={styles.subPhoto}>
                                <span> <img src={crossImg} onClick={()=>deleteImage(3)} className={styles.mainCross} alt="" /></span>

                                <img src={user?.images[3]} alt="" /></div> : <>
                                <label htmlFor="main">
                                    <div className={styles.uploadSub} >
                                        <PlusOutlined />
                                    </div>
                                </label>
                                <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} /></>
                        }

                        {
                            user.images.length > 4 ? <div className={styles.subPhoto}>
                                <span> <img src={crossImg} onClick={()=>deleteImage(4)} className={styles.mainCross} alt="" /></span>

                                <img src={user?.images[4]} alt="" /></div> : <>
                                <label htmlFor="main">
                                    <div className={styles.uploadSub} >
                                        <PlusOutlined />
                                    </div>
                                </label>
                                <input type="file" id='main' onChange={(e) => upload(e)} style={{ display: "none" }} /></>
                        }
                    </div>
                    <p className={styles.title}>Interest</p>
                    <div className={styles.interestDiv}>
                        {InterestArray.map((el) => (
                          <button key={el.title}>
                            <img src={el.icon} alt={el.title} /> {el.title}
                          </button>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile