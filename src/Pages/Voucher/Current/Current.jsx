import React, { useState } from 'react'
import styles from "../styles.module.css"
import { HiPencil } from 'react-icons/hi';
import { Spinner, Switch } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchCurrentVoucherData, updateCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer';
import DeleteModel from '../DeleteModel';
import { Link } from 'react-router-dom';
import { message , Pagination } from 'antd';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Current = ({ history, loading, total , setpage , setEdit ,type}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch()
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    }
    function calculateDateDifference(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

        const firstDate = new Date(date1);
        const secondDate = new Date(date2);

        const diffInTime = Math.abs(firstDate - secondDate);
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setpage(page);
      };

      if (!loading && history.length === 0) {
        return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
      }   

    return (
        <div className={styles.tableDiv}>
            <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
                <Tr>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Promo code Name
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Start Date
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        End Date
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Duration (in days)
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Status
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Redeemed
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Promo Code
                    </Th>
                    <Th style={{ textTransform: 'capitalize' }}>
                        Actions
                    </Th>


                </Tr>
        </Thead>
                {
                    loading ? <span className={styles.spin}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='lg'
                        />

                    </span> : <Tbody>

                        {
                            history && history.map((el, i) => {
                                return (
                                    <Tr key={i}>
                                        <Td>
                                            {el.name}
                                        </Td>
                                        <Td>
                                            {formatDate(el.startDate)}
                                        </Td>
                                        <Td>
                                            {formatDate(el.endDate)}
                                        </Td>

                                        <Td>
                                            {calculateDateDifference(el.startDate, el.endDate)}
                                        </Td>
                                        <Td>
                                            Active &nbsp;
                                            <Switch 
                                            zIndex={1} 
                                            isChecked={el.active} 
                                            colorScheme='teal'
                                            onChange={() => dispatch(updateCurrentVoucherData({ active: !el.active, voucherId: el._id })).then(() => {
                                                dispatch(fetchCurrentVoucherData("Current")).then(() => {
                                                    message.success("Voucher has been updated")
                                                })
                                            })} />
                                        </Td>
                                        <Td>
                                            123
                                        </Td>
                                        <Td>
                                            {el.code}
                                        </Td>
                                        <Td>
                                            <div className={styles.actionDiv}>
                                                <Link to={`/Voucher/${el._id}`}>
                                                    <span className={styles.blackBtn2} ><HiPencil /> Edit</span></Link>
                                                <DeleteModel el={el} type={type}/>
                                            </div>
                                        </Td>



                                    </Tr>

                                )
                            })
                        }
                    </Tbody>}
            </Table>
        </TableContainer>
        {total > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
        </div>
    )
}

export default Current





  