import React from 'react'
import styles from "../style.module.css"
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase_config';
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';


const Outbox = ({ outbox }) => {
    console.log(outbox, 'outbox');
    const navigate = useNavigate()
    function formatCustomDate(timestamp) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];

        const dateObjUTC = new Date(timestamp);
        const dateObjIST = new Date(dateObjUTC.getTime() + (5.5 * 60 * 60 * 1000)); // Adding 5 hours 30 minutes for IST
        const year = dateObjIST.getUTCFullYear();
        const month = months[dateObjIST.getUTCMonth()];
        const day = dateObjIST.getUTCDate();
        const hours = dateObjIST.getUTCHours();
        const minutes = dateObjIST.getUTCMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';

        const daySuffix = getDaySuffix(day);
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const formattedDate = `${day}${daySuffix} ${month}, ${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;

        return formattedDate;
    }

    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    async function updateMessageSeen(outboxId, chatId) {
        const outboxChatUserRef = collection(db, 'outbox', outboxId, 'chatUser');
        try {
            const querySnapshot = await getDocs(outboxChatUserRef);

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.id === chatId) {
                    const chatDocRef = doc.ref;
                    updateDoc(chatDocRef, {
                        sender: true,
                    })
                        .then(() => {
                            console.log('Message updated to msgSeen: true');
                        })
                        .catch((error) => {
                            console.error('Error updating message:', error);
                        });
                }
            });
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    }

    function sortMessages(messages) {
        const unseenMessages = messages.filter((message) => !message.receiver);
        const seenMessages = messages.filter((message) => message.receiver);
    
        const sortedUnseen = unseenMessages.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const sortedSeen = seenMessages.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
        return [...sortedUnseen, ...sortedSeen];
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
            sortMessages(outbox).map((el, i) => {
                console.log(el.partnerName, "partnersName");
                        return (
                            <Tr key={i} onClick={() => {

updateMessageSeen(el.from, el.id).then(() => {
    navigate(`/Messages/Chat/${el.to}?inbox=false&chatId=${el.id}`)
})

}} className={!el.sender && styles.unseen} >
<Td>
    {el.partnerName}
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
        </div>
    )
}

export default Outbox