import React, { useState } from 'react'
import styles from "./styles.module.css"
import { Button, Input, InputGroup, InputRightAddon, Select } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { createRoleData, fetchRoleData } from '../../../../Redux/Role/RoleReducer'
import { message } from 'antd'

const CreateNewPlan = ({ setNewPlan }) => {
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        userType: "SUB-ADMIN",
        permissions: ""
    })
    const dispatch = useDispatch()
    function generateStrongPassword(length = 20) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        copyToClipboard(password)
        setForm({ ...form, password: password })
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

    const create = () => {
        if (!form.name) {
            message.error("User name is required")
        } else {
            if (!form.email) {
                message.error("Email is required")
            } else {
                if (!form.permissions) {
                    message.error("Permissions is required")
                } else {
                    if (!form.password) {
                        message.error("password is required")
                    } else {
                        dispatch(createRoleData(form)).then((res) => {
                            dispatch(fetchRoleData()).then(() => {
                                setNewPlan(false)
                            })

                        }).catch((err) => {
                            console.log('err:', err)

                        })
                    }
                }

            }

        }
    }
    return (
        <div className={styles.MainContainer}>

            <div className={styles.container1}>
                <span>
                    All Plan {'>'} <b style={{ opacity: "100%", color: "#131313" }}>Create New Role</b>
                </span>
                <h1>
                    Create New Role
                </h1>

                <div className={styles.container}>
                    <p>Username</p>
                    <Input placeholder='Enter Username'  focusBorderColor='transparent' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <p>
                        Email id
                    </p>
                    <Input placeholder='Enter Email Id'  focusBorderColor='transparent' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <p>
                        Role
                    </p>
                    <Select placeholder='Choose role' value={form.permissions} onChange={(e) => setForm({ ...form, permissions: e.target.value })} >
                        <option value="BOTH">Both</option>
                        <option value="USER">User Panel</option>
                        <option value="PARTNER">Partner Panel</option>
                    </Select>
                    <p>
                        Password
                    </p>
                    <InputGroup pr={2} alignItems="center" bg="#ecf1f4" borderRadius="16px">

                        <Input placeholder='Create Password' type='password' focusBorderColor='transparent' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

                        <InputRightAddon h="30px" borderRadius="none" onClick={() => generateStrongPassword()} border="none" className={styles.verified} children='Generate' />
                    </InputGroup>
                </div>

            </div>
            <div className={styles.btn}>
                <Button colorScheme='black' variant='outline' onClick={() => setNewPlan(false)}>Cancel</Button>
                <Button bg="black" color="#fff" variant='solid' onClick={create}>Save</Button>
            </div>
        </div>
    )
}

export default CreateNewPlan