import React from "react";
import styles from "../style.module.css";
import { RxCrossCircled } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteModel from "../DeleteModel";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

const Upcoming = ({ notification, type, page, loading }) => {
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

    const formattedDate =
      getDayWithSuffix(date.getDate()) +
      " " +
      date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

    return formattedDate;
  }

  if (!loading && notification.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }   

  return (
    <div className={styles.tableDiv}>
       <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Body</Th>
          <Th>Release on</Th>
          <Th>Users</Th>
          <Th>Platform</Th>
          <Th>Actions</Th>
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
                    {notification.map((el, i) => {
          return (
            <Tr key={i}>
              <Td>{el.title}</Td>
              <Td>{el.body}</Td>
              <Td>
                {formatDateFromString(el.releaseDate)},{el.releaseTime}
              </Td>

              <Td>All users</Td>
              <Td>IOS</Td>

              <Td>
                <div className={styles.actionDiv}>
                  <Link to={`/NotificationUser/${el._id}`}>
                    <span className={styles.blackBtn2}>
                      <FaEye /> See Details
                    </span>
                  </Link>
                  <DeleteModel notificationId={el._id} title={el.title} type={type} page={page} />
                </div>
              </Td>
            </Tr>
          );
        })}
                    </Tbody>
 }
      </Table>
      </TableContainer>
    </div>
  );
};

export default Upcoming;
