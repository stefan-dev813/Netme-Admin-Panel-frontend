import React from 'react'
import styles from "../style.module.css"
import { Avatar, Spinner } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Pagination, message } from 'antd';
import DeleteModel from '../Components/DeleteModel';
import { Link } from 'react-router-dom';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Standard = ({ data = [], totalCount, setPage, loading, setViewProfile,getData, setType }) => {
    
    function formatDateFromString(inputDate) {
        const date = new Date(inputDate);
      
        // Function to add "st", "nd", "rd", or "Th" to the day
        function getDayWithSuffix(day) {
          if (day >= 11 && day <= 13) {
            return day + "Th";
          }
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "Th";
          }
        }
      
        // Function to check if the date is today or yesterday
        function isTodayOrYesterday(checkDate) {
          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
      
          if (
            checkDate.getDate() === today.getDate() &&
            checkDate.getMonth() === today.getMonth() &&
            checkDate.getFullYear() === today.getFullYear()
          ) {
            return "Today";
          } else if (
            checkDate.getDate() === yesterday.getDate() &&
            checkDate.getMonth() === yesterday.getMonth() &&
            checkDate.getFullYear() === yesterday.getFullYear()
          ) {
            return "Yesterday";
          } else {
            return getDayWithSuffix(checkDate.getDate());
          }
        }
      
        const formattedDate =
          isTodayOrYesterday(date) +
          ", " +
          date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
      
        return formattedDate;
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
                            data.length > 0 && data.map((el, i) => {
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
                                            {formatDateFromString(el.dob)}
                                        </Td>
                                        <Td>
                                            {formatDateFromString(el.createdAt)}
                                        </Td>
                                        <Td>
                                        {el.verificationType}
                                        </Td>
                                        <Td>
                                        N/A
                                        </Td>
                                        <Td>
                                            <div className={styles.actionDiv}>
                                                <Link to={`/Users/${el._id}`}>
                                                    <span className={styles.blackBtn26}><FaEye fontSize={20} /> Open Profile</span>
                                                </Link>
                                                <DeleteModel data={el} id={el._id} getData={getData} setType={setType} />
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
                    </Tbody>
                }
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

export default Standard