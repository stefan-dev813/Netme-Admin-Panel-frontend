import React, { useState } from "react";
import styles from "../style.module.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase_config";
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Pagination } from "antd";

const Inbox = ({ inboxArray , total , page , setpage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  function formatCustomDate(timestamp) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateObjUTC = new Date(timestamp);
    const dateObjIST = new Date(dateObjUTC.getTime() + 5.5 * 60 * 60 * 1000); // Adding 5 hours 30 minutes for IST
    const year = dateObjIST.getUTCFullYear();
    const month = months[dateObjIST.getUTCMonth()];
    const day = dateObjIST.getUTCDate();
    const hours = dateObjIST.getUTCHours();
    const minutes = dateObjIST.getUTCMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const daySuffix = getDaySuffix(day);
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedDate = `${day}${daySuffix} ${month}, ${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedDate;
  }

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  function sortMessages(messages) {
    console.log(messages, 'messages');
    const unseenMessages = messages.filter((message) => !message.receiver);
    const seenMessages = messages.filter((message) => message.receiver);

    const sortedUnseen = unseenMessages.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const sortedSeen = seenMessages.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return [...sortedUnseen, ...sortedSeen];
  }

  async function updateMessageSeen(outboxId, chatId) {
    const outboxChatUserRef = collection(db, "inbox", outboxId, "chatUser");

    try {
      const querySnapshot = await getDocs(outboxChatUserRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === chatId) {
          const chatDocRef = doc.ref;
          updateDoc(chatDocRef, {
            receiver: true,
          })
            .then(() => {
              console.log("Message updated to msgSeen: true");
            })
            .catch((error) => {
              console.error("Error updating message:", error);
            });
        }
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setpage(page);
  };

  if (inboxArray.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }

  return (
    <div className={styles.tableDiv}>
    <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'15px'}}>
      <Table variant='simple'>
       {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
       <Thead>
         <Tr>
           <Th style={{ textTransform: 'capitalize' }}>Partner Name</Th>
           <Th style={{ textTransform: 'capitalize' }}>Subject</Th>
           <Th style={{ textTransform: 'capitalize' }}>Message Body</Th>
           <Th style={{ textTransform: 'capitalize' }}>Date & Time</Th>
         </Tr>
       </Thead>
       <Tbody>
        {
           sortMessages(inboxArray).map((el, i) => {
            console.log(el, 'elAllDataIsHere');
                       return (
                           <Tr key={i}  onClick={() => {
                          updateMessageSeen(el.to, el.id).then(() => {
                            navigate(
                              `/Messages/Chat/${el.from}?inbox=true&chatId=${el.id}`)
        })

        }} className={!el.sender && styles.unseen} >
        <Td>
        {el.sender_name}
        </Td>

        <Td>
        {el?.subject}
        </Td>
        <Td>
        {el?.Msg}
        </Td>
        <Td>
        {formatCustomDate(el?.timestamp)}
        </Td>




        </Tr>
               )
               })
      }
     </Tbody>
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
  );
};

export default Inbox;
