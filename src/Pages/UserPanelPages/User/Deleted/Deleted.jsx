import React, { useEffect, useState } from 'react';
import styles from '../style.module.css';
import { Avatar, Spinner } from '@chakra-ui/react';
import { Pagination, message } from 'antd';
import { userRequest } from '../../../../requestMethod';
import DeletePermanentlyModel from './DeletePermanentlyModal';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Deleted = ({ data, totalCount, setPage, loading, getData }) => {
  console.log("setPage", setPage)
  console.log("getData", getData)
  console.log("data", data)

  const [deletedData, setDeletedData] = useState();
  console.log(deletedData, 'deltedDataIsHere');
    const notAvailable = () => {
        message.error('Currently Not available');
    };

    function formatDateFromString(inputDate) {
        const date = new Date(inputDate);
      
        // Function to add "st", "nd", "rd", or "th" to the day
        function getDayWithSuffix(day) {
          if (day >= 11 && day <= 13) {
            return day + "th";
          }
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
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
      

    const handleUpdate = async (id) => {
        console.log(id, 'id**');
        try {
            const response = await userRequest.put('/admin/user/updateCustomer', {
                userId: id,
                deleted: false,
            });
            if (response) {
              const updatedData = deletedData.filter(item => item._id !== id);
              setDeletedData(updatedData);
              getData('Deleted');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
      setDeletedData(data);
  }, [data]);

  console.log(deletedData, 'deletedData');

    return (
        <div className={styles.tableDiv}>
           <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
                    <Tr>
                        <Th>User Details</Th>
                        <Th>Birthday</Th>
                        <Th>Registered on</Th>
                        <Th>Deleted Date</Th>
                        <Th>Note</Th>
                        <Th>Deleted By</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className={styles.spin}>
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="lg"
                                />
                            </td>
                        </tr>
                    ) : (
                      deletedData && deletedData.map((el, i) => {
                         return (
                                <tr key={i}>
                                    <td>
                                        <div className={styles.profileDetails}>
                                            <div className={styles.profilePic}>
                                                <Avatar name="Dan Abrahmov" src={el.images[0]} />
                                                <p>{el.userName}</p>
                                            </div>
                                            <p>{el.email}</p>
                                        </div>
                                    </td>
                                    <td>{formatDateFromString(el.dob)}</td>
                                    <td>{formatDateFromString(el.createdAt)}</td>
                                    <td>{formatDateFromString(el.updatedAt)}</td>
                                    <td>{el.reason}</td>
                                    <td>admin@gmail.com</td>
                                    <td>
                                        <div className={styles.actionDiv2}>
                                            <p onClick={() => handleUpdate(el._id)} className={styles.blackBtn2}>
                                                Remove from blacklist
                                            </p>
                                            <DeletePermanentlyModel getData={getData} data={el} id={el._id} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </Tbody>
            </Table>
            </TableContainer>
            {totalCount > 10 && (
                <div className={styles.pagination}>
                    <Pagination defaultCurrent={1} total={totalCount} onChange={(e) => setPage(e)} showSizeChanger={false} />
                </div>
            )}
        </div>
    );
};

export default Deleted;
