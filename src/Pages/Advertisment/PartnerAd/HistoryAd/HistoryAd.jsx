import React from "react";
import styles from "../style.module.css";
import { AiFillEye } from "react-icons/ai";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const HistoryAd = ({ ads, total, page, setPage,loading }) => {
  
  if (!loading && ads.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
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
          <Th style={{ textTransform: 'capitalize' }}>Ad Type</Th>
          <Th style={{ textTransform: 'capitalize' }}>Release on</Th>
          <Th style={{ textTransform: 'capitalize' }}>Created on</Th>
          <Th style={{ textTransform: 'capitalize' }}>status</Th>
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
        {ads.map && ads.map((el, i) => {
          return (
            <Tr key={i}>
              
              <Td>
                {el.partnerId?.fullName} {el.partnerId?.lastName}
              </Td>
              <Td>{el.name}</Td>
              <Td>{el.title}</Td>
              <Td>{el.body}</Td>
              <Td>{el.adType}</Td>
              <Td>{formatDate(el.releaseDate)}</Td>
              <Td>{formatDate(el.createdAt)}</Td>
              <Td>
                <span className={styles.blackBtn5}>{el.status}</span>
              </Td>
              <div className={styles.actionDiv}>
              <Link to={`/Partner/viewstat/${el._id}`}>
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
      {total > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={(e) => setPage(e)}
            showSizeChanger={false}
          />
        </div>
      )}
      
    </div>
  );
};

export default HistoryAd;

function formatDate(dateStr) {
  try {
    const dateObj = new Date(dateStr);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  } catch (error) {
    return null;
  }
}
