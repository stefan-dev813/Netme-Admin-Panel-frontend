import React from "react";
import styles from "../style.module.css";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const HistoryAd = ({ ad, page, loading }) => {
  
  if (!loading && ad.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }   

  function convertDate(dateStr) {
    try {
      const dateObj = new Date(dateStr);
      const formattedDate = `${dateObj.getUTCDate()}.${
        dateObj.getUTCMonth() + 1
      }.${dateObj.getUTCFullYear()}`;
      return formattedDate;
    } catch (error) {
      // If the input date string is not in the correct format, handle the error
      return null;
    }
  }
  return (
    <div className={styles.tableDiv}>
       <TableContainer style={{border:'1px solid #D9E1E7', borderRadius:'20px'}}>
      <Table variant='simple'>
      <Thead>
        <Tr>
          <Th style={{ textTransform: 'capitalize' }}>Partner Name</Th>
          <Th style={{ textTransform: 'capitalize' }}>Ad Name</Th>
          <Th style={{ textTransform: 'capitalize' }}>Ad Title</Th>
          <Th style={{ textTransform: 'capitalize' }}>Ad body</Th>
          {/* <Th>Ad Type</Th> */}
          <Th style={{ textTransform: 'capitalize' }}>Release on</Th>
          <Th style={{ textTransform: 'capitalize' }}>Created on</Th>
          {/* <Th style={{ textTransform: 'capitalize' }}>status</Th> */}
          <Th style={{ textTransform: 'capitalize' }}>Action</Th>
        </Tr>
        </Thead>
        {loading ? (
          <span className={styles.spin}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          </span>
        ) : (
          <Tbody>
            {ad.map && ad.map((el, i) => {
              return (
                <Tr key={i}>
                  <Td>{el?.legalRepresentative?.firstName}</Td>

                  <Td>{el.title}</Td>
                  <Td>{el.title}</Td>
                  <Td>{el.body}</Td>
                  {/* <Td>{el.adType}</Td> */}
                  <Td>{el.releaseDate}</Td>
                  <Td>{convertDate(el.createdAt)}</Td>
                  {/* <Td>
                    <span className={styles.blackBtn5}>{el.status}</span>
                  </Td> */}
                  <div className={styles.actionDiv}>
                    <Link to={`/ExternalAd/ExternalAdsStas/${el._id}`}>
                      <span className={styles.blackBtn311}>
                        <AiFillEye /> View Stats
                      </span>
                    </Link>
                  </div>
                </Tr>
              );
            })}
          </Tbody>
        )}
      </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryAd;
