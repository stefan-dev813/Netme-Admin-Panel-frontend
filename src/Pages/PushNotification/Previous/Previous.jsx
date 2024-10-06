import React, { useState } from 'react'
import styles from "../style.module.css"
import { RxCrossCircled } from 'react-icons/rx';
import { BsChatDots } from 'react-icons/bs';
import { HiEye } from 'react-icons/hi';
import calender from "../../../assets/calendarIcon.svg";
import { Pagination } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { unstable_batchedUpdates } from 'react-dom';
import { Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Request = ({ notification, setpage, previousTotal, loading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Get the day, month, and year parts from the date
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

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
      getDayWithSuffix(day) + " " + month + ", " + year;
    return formattedDate;
  }
  function formatCustomDate(inputDate) {
    const date = new Date(inputDate);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

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

    // Format the time in 24-hour format (without AM/PM)
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false, // Set to false for 24-hour format
    });

    const formattedDate =
      getDayWithSuffix(date.getDate()) +
      " " +
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " " +
      formattedTime;

    return formattedDate;
  }
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
          <Th style={{ textTransform: 'capitalize' }}>
            Partner
          </Th>
          <Th style={{ textTransform: 'capitalize' }}>
            Title
          </Th>
          <Th style={{ textTransform: 'capitalize' }}>
            Body
          </Th>

          <Th style={{ textTransform: 'capitalize' }}>
            Released On
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

                    </span> :
<Tbody>
{
            notification && notification.map((el, i) => {
            return (
              <Tr key={i}>
                <Td>
                {el?.partnerId?.fullName +" "+ el?.partnerId?.lastName}
                </Td>
                <Td>
                  {el.title}
                </Td>
                <Td>
                  {el.body}
                </Td>

                <Td>
                  {formatDate(el.releaseDate)}
                </Td>



                <Td>
                  <div className={styles.actionDiv}>
                    <span  onClick={() => navigate(`/sendMesage/${el.partnerId && el.partnerId._id}`)} className={styles.blackBtn2}><BsChatDots fontSize={20} />Contact Partner</span>
                    <Link to={`/Notification/ViewDetails/${el._id}`}><span className={styles.blackBtn2}><HiEye fontSize={20} /> View Details</span></Link>

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
      {previousTotal > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={previousTotal}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  )
}

export default Request
