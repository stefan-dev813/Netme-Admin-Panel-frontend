import React, { useState } from 'react'
import styles from "../styles.module.css"
import { Spinner, Switch } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchCurrentVoucherData, updateCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer';
import DeleteModel from '../DeleteModel';
import { message , Pagination } from 'antd';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const History = ({ history, loading, type ,setpage , total }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch()
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    }
    function calculateDateDifference(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;

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
                    <Th>
                        Promo code Name
                    </Th>
                    <Th>
                        Start Date
                    </Th>
                    <Th>
                        End Date
                    </Th>
                    <Th>
                        Time Period
                    </Th>
                    <Th>
                        Promo Code
                    </Th>
                    <Th>
                        Redeemed
                    </Th>
                    <Th>
                        Comments
                    </Th>
                    <Th>
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
                            history &&  history.map((el, i) => {
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
                                            Active  &nbsp;
                                            <Switch 
                                            zIndex={1} 
                                            isChecked={el.active} 
                                            colorScheme='teal'
                                            onChange={() => dispatch(updateCurrentVoucherData({ active: !el.active, voucherId: el._id })).then(() => {
                                                dispatch(fetchCurrentVoucherData("History")).then(() => {
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
                                            <DeleteModel type={type} el={el} />
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

export default History