import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Invoice from '../InvoiceHistory/Invoice';
import { userRequest } from '../../../requestMethod';

const View = ({ setViewMeatings,businessId }) => {
    const [invoice, setInvoice] = useState(false)
    const [viewData,setViewData]=useState([]);

    useEffect(() => {
        userRequest(`/admin/partner/getAllPartnerStamps/${businessId}`).then(
          (res) => {
            setViewData(res.data)
          }
        );
      }, []);

    if (invoice) {
        return (
            <Invoice setInvoice={setInvoice} />
        )
    }

     return (
        <div className={styles.MainContainer}>
            <div>
                <span className={styles.firstSpan}>
                    <p  onClick={() => setViewMeatings(false)}> Active Partners</p> {'>'} <p><b>View Meetings</b></p>
                </span>
                <div className={styles.cardDiv}>
                    <div>
                        <p>Total Meetings</p>
                        <h1>{viewData.count}</h1>
                    </div>
                    <div>
                        <p>Meetings Past Month</p>
                        <h1>{viewData.previousMonthDataCount}</h1>
                    </div>
                    <div>
                        <p>Meetings This Month</p>
                        <h1>{viewData.currentMonthDataCount}</h1>
                    </div>
                </div>
                <div className={styles.tableDiv}>
                    <table>
                        <thead>
                            <th>Date of meeting</th>
                            <th>Scan ID</th>
                            <th>Scanned On</th>
                        </thead>
                        {
                            viewData?.data?.map((el) => {
                                return (
                                    <tr>
                                        <td>{convertDate(el.createdAt)}</td>
                                        <td>{el._id}</td>
                                        <td>{convertDateTime(el.createdAt)}</td>
                                    </tr>

                                )
                            })
                        }
                    </table>

                </div>

            </div>
            <div className={styles.btn}>
                <Button colorScheme='black' variant='outline' w="170px" onClick={() => setInvoice(true)} >Invoice History</Button>
                <Button bg="black" color="#fff" variant='solid' w="170px">Generate Invoice</Button>
            </div>

        </div>
    )
}

export default View



function convertDate(dateStr) {
    try {
      const dateObj = new Date(dateStr);
      const formattedDate = `${dateObj.getUTCDate()}.${
        dateObj.getUTCMonth() + 1
      }.${dateObj.getUTCFullYear()}`;
      return formattedDate;
    } catch (error) {
      return null;
    }
  }

  function convertDateTime(dateStr) {
    try {
        const dateObj = new Date(dateStr);
        const formattedDate = `${dateObj.getUTCDate()}.${dateObj.getUTCMonth() + 1}.${dateObj.getUTCFullYear()}`;
        const formattedTime = `${String(dateObj.getUTCHours()).padStart(2, '0')}:${String(dateObj.getUTCMinutes()).padStart(2, '0')}`;
        return `${formattedDate} ${formattedTime}`;
    } catch (error) {
        return null;
    }
}

