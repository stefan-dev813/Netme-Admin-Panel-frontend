import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { Button, Input, InputGroup, InputRightAddon, Select } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { userRequest } from '../../../../requestMethod'
import { useDispatch } from 'react-redux'
import { fetchRoleData, updateRoleData } from '../../../../Redux/Role/RoleReducer'
import { message } from 'antd'

const EditPlan = ({ setNewPlan }) => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [password, setPassword] = useState()
    const [user, setUser] = useState()
    console.log('user:', user)
    useEffect(() => {
        userRequest((`/api/userAdmin/getUserById?_id=${params.id}`)).then((res) => {
            setUser(res.data.data)

        })

    }, [])

    const handelUpdate = () => {
        const data = { userId: params.id, name: user.name, email: user.email, password: password, permissions: user.permissions }
        console.log('data:', data)
        dispatch(updateRoleData(data)).then(() => {
            dispatch(fetchRoleData()).then(() => {
                navigate("/Roles")
                message.success("Data Update successfully")
            })
        })

    }
    function generateStrongPassword(length = 20) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        copyToClipboard(password)
        setPassword(password)
        message.success("Password is Generated and saved to your clipboard")

        return password;
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    return (
        <div className={styles.MainContainer}>

            <div className={styles.container1}>
                <span>
                    All Plan {'>'} <b style={{ opacity: "100%", color: "#131313" }}>Edit Role</b>
                </span>
                <h1>
                    Edit  Role
                </h1>

                <div className={styles.container}>
                    <p>Username</p>
                    <Input placeholder='Enter Username' focusBorderColor='transparent' value={user?.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <p>
                        Email id
                    </p>
                    <Input placeholder='Enter Email Id' focusBorderColor='transparent' value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <p>
                        Role
                    </p>
                    <Select placeholder='Choose role' value={user?.permissions} onChange={(e) => setUser({ ...user, permissions: e.target.value })} >
                        <option value="BOTH">Both</option>
                        <option value="USER">User Panel</option>
                        <option value="PARTNER">Partner Panel</option>
                    </Select>
                    <p>
                        Password
                    </p>
                    <InputGroup pr={2} alignItems="center" bg="#ecf1f4" borderRadius="16px">

                        <Input placeholder='Create Password' type='password' focusBorderColor='transparent' value={password} onChange={(e) => setPassword(e.target.value)} />


                        <InputRightAddon h="30px" borderRadius="none" onClick={() => generateStrongPassword()} border="none" className={styles.verified} children='Generate New' />
                    </InputGroup>

                </div>

            </div>
            <div className={styles.btn}>
                <Button colorScheme='black' variant='outline' onClick={() => navigate("/Roles")}>Cancel</Button>
                <Button bg="black" color="#fff" variant='solid' onClick={handelUpdate}>Save</Button>
            </div>
        </div>
    )
}

export default EditPlan