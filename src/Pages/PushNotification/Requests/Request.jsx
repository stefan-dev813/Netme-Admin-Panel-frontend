import React, { useState } from "react";
import styles from "../style.module.css";
import { RxCrossCircled } from "react-icons/rx";
import { BsChatDots } from "react-icons/bs";
import { PiBellLight } from "react-icons/pi";
import calender from "../../../assets/calendarIcon.svg";
import { useDispatch } from "react-redux";
import {
  fetchNotificationData,
  updateNotificationData,
} from "../../../Redux/PushNotification/NotificationReducer";
import { Link, useNavigate } from "react-router-dom";
import { message , Pagination } from "antd";
import { Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Request = ({ notification, setContact,requestTotal, setCreate, setpage, type, page, loading }) => {
  console.log(notification, 'notification');
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

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

    const formattedDate =
      getDayWithSuffix(date.getDate()) +
      " " +
      date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

    return formattedDate;
  }
  const handleDelete = (id) => {
    const updatedData = {
      notificationId: id,
      deleted: true,
    };
    dispatch(updateNotificationData(updatedData)).then(() => {
      dispatch(fetchNotificationData(type,"", page));
      message.success("Notification updated successfully");
    });
  };

   const handlePageChange = (page) => {
     setCurrentPage(page);
     setpage(page);
   };

   if (!loading && notification.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }   

  return (
    <div className={styles.tableDiv}>
      <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
        <Tr>
          <Th style={{ textTransform: 'capitalize' }}>Partner</Th>
          <Th style={{ textTransform: 'capitalize' }}>Title</Th>
          <Th style={{ textTransform: 'capitalize' }}>Body</Th>
          <Th style={{ textTransform: 'capitalize' }}>Received On</Th>
          <Th style={{ textTransform: 'capitalize' }}>Release On</Th>
          <Th style={{ textTransform: 'capitalize' }}>Actions</Th>
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

                    </span> :
        <Tbody>
        {notification && notification.map((el, i) => {
          return (
            <Tr key={i}>
              <Td>
               {el?.partnerId?.fullName +" "+ el?.partnerId?.lastName}
              </Td>
              <Td>{el.title}</Td>
              <Td>{el.body}</Td>

              <Td>{formatDateFromString(el.createdAt)}</Td>
              <Td>
                {formatDateFromString(el.releaseDate)},{el.releaseTime}
              </Td>

              <Td>
                <div className={styles.actionDiv}>
                <span  onClick={() => navigate(`/sendMesage/${el.partnerId && el.partnerId._id}`)} className={styles.blackBtn2}><BsChatDots fontSize={20} />Contact Partner</span>
                  {/* <Link to={`/Notification/${el._id}`}><span className={styles.blackBtn2}><PiBellLight fontSize={20} /> Create Push</span></Link> */}
                  <Link
                    to={{
                      pathname: `/Notification/${el._id}`,
                      state: {
                        setCreate: setCreate,
                        page: page,
                        type: type,
                      },
                    }}
                  >
                    <span className={styles.blackBtn2}>
                      <PiBellLight fontSize={20} /> Create Push
                    </span>
                  </Link>
                  <span
                    className={styles.blackBtn3}
                    onClick={() => handleDelete(el._id)}
                  >
                    <RxCrossCircled fontSize={20} /> Delete
                  </span>
                </div>
              </Td>
            </Tr>
          );
        })}
        </Tbody>
        }
      </Table>
      </TableContainer>
      {requestTotal > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={requestTotal}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Request;
