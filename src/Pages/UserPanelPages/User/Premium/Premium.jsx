import React from 'react'
import styles from "../style.module.css"
import { Avatar, Pagination, message } from 'antd';
import { Spinner } from '@chakra-ui/react';
import DeleteModel from '../Components/DeleteModel';
import { FaEye } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Premium = ({ data, totalCount, setPage, loading, getData, setType }) => {
    
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
    const notAvailable = () => {
        message.error("Currently Not available")
    }
    return (
        <div className={styles.tableDiv}>
             <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
            <Tr>
                    <Th>
                        User Details
                    </Th>
                    <Th>
                        Email
                    </Th>
                    <Th>
                        Birthday
                    </Th>
                    <Th>
                        Registered on
                    </Th>
                    <Th>
                        Verification
                    </Th>
                    <Th>
                        Did not attend meeting
                    </Th>
                    <Th>
                        Action
                    </Th>
                    <Th>
                        Feedback
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
                            data.map((el, i) => {
                                return (
                                    <Tr key={i}>
                                    <Td>
                                        <div className={styles.profileDetails}>
                                            <div className={styles.profilePic}>
                                                <Avatar name='Dan Abrahmov' src={el.images[0]} />
                                                <p>{el.userName}</p>
                                            </div>

                                        </div>
                                    </Td>
                                    <Td>
                                        {el.email}
                                    </Td>

                                    <Td>
                                        {convertDate(el.dob)}
                                    </Td>
                                    <Td>
                                        {convertDate(el.createdAt)}
                                    </Td>
                                    <Td>
                                        N/A
                                    </Td>
                                    <Td>
                                        {el.verificationType}
                                    </Td>
                                    <Td>
                                        <div className={styles.actionDiv}>
                                        <Link to={`/Users/${el._id}`}>
                                                    <span className={styles.blackBtn26}><FaEye fontSize={20} /> Open Profile</span>
                                                </Link>
                                                <DeleteModel data={el} id={el._id} getData={getData} setType={setType}/>
                                        </div>
                                    </Td>
                                    <Td>
                                    <div className={styles.actionDiv}>
                                                <Link to={`/Users/view/${el._id}`}> <span onClick={notAvailable} className={styles.blackBtn26}><FiSearch fontSize={20} /> View details</span></Link>
                                            </div>
                                    </Td>



                                </Tr>


                                )
                            })
                        }
                    </Tbody>}
            </Table>
            </TableContainer>
            {
                totalCount > 10 &&
                <div className={styles.pagination}>
                    <Pagination defaultCurrent={1} total={totalCount} onChange={(e) => setPage(e)} showSizeChanger={false} />

                </div>
            }

        </div>
    )
}

export default Premium