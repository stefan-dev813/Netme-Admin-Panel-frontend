import React from 'react'
import styles from "./styles.module.css"

const Invoice = () => {
    const newArray = [...Array(10)];


    return (
        <div className={styles.MainContainer}>
            <span>
                Active Partners {'>'} View Meetings  {'>'}<b>Invoice History</b>
            </span>
            <div className={styles.container}>
                <div className={styles.tableHead}>
                    <p className={styles.period}>Period</p>
                    <p>Download</p>
                </div>
                <div className={styles.tableDiv}>

                    {
                        newArray.map((el) => {
                            return (
                                <div>
                                    <p>15.10.2023 - 15.11.2023</p>
                                    <p>Download</p>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Invoice