import React from 'react'
import styles from "./styles.module.css"
import { Button } from 'antd'
import img from "../../../../assets/icons/successGif.gif"

const Success = ({ setCurrent, setForgot }) => {
  return (
    <div className={styles.formDiv}>
      <div className={styles.gif}>
        <img src={img} alt="" />

      </div>
      <h2>
        Your password successfully<br /> changed!
      </h2>
      <Button
        onClick={() => {
          setCurrent("")
          setForgot(false)
        }}
      >Log in</Button>
    </div>
  )
}

export default Success