import React, { useEffect } from 'react'
import styles from "../styles.module.css"
import { HiPencil } from 'react-icons/hi';
import { Spinner, Switch } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentVoucherData, updateCurrentVoucherData } from '../../../Redux/Voucher/CurrentVoucherReducer';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import DeleteModel from '../DeleteModel2';
import { fetchSubscriptionData, updateSubscriptionData } from '../../../../Redux/Subscription/subscriptionReducer';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Current = ({ search, type }) => {
    const dispatch = useDispatch()
    const history = useSelector((store) => store?.SubscriptionReducer?.subscriptionData?.data) || []
    const loading = useSelector((store) => store?.SubscriptionReducer?.isLoading) || false
    useEffect(() => {
        dispatch(fetchSubscriptionData(search, "USER"))
    }, [search, dispatch, type])

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
                        Plan Name
                    </Th>
                    <Th>
                        Time Period(Months)
                    </Th>
                    <Th>
                        Price(Є)
                    </Th>
                    <Th>
                        Features
                    </Th>

                    <Th>
                        Actions
                    </Th>
                    <Th>
                        Status
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
                            history.map((el, i) => {
                                return (
                                    <Tr key={i}>
                                        <Td>
                                            {el?.planName}
                                        </Td>
                                        <Td>
                                            {el?.timePeriod}
                                        </Td>
                                        <Td>
                                            {el?.price}
                                        </Td>

                                        <Td>
                                            {el?.features ? el?.features : "...."}
                                        </Td>
                                        <Td>
                                            <div className={styles.actionDiv}>
                                                <Link to={`/SubscriptionUser/${el._id}`}> <span className={styles.blackBtn2}><HiPencil /> Edit</span></Link>
                                                <DeleteModel id={el._id} />
                                            </div>
                                        </Td>
                                        <Td>
                                            Active  &nbsp;
                                            <Switch zIndex={1} isChecked={el.status} onChange={() => dispatch(updateSubscriptionData({ status: !el.status, planId: el._id, userType: "USER" })).then(() => {
                                                dispatch(fetchSubscriptionData("", "USER")).then(() => {
                                                    message.success("Subscription has been updated")
                                                })
                                            })} />
                                        </Td>

                                    </Tr>

                                )
                            })
                        }
                    </Tbody>
                }
            </Table>
</TableContainer>
        </div>
    )
}

export default Current