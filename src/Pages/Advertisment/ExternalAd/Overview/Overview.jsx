import React from "react";
import styles from "../style.module.css";
import DeleteModel from "../../PartnerAd/DeleteModel2";
import { Spinner } from "@chakra-ui/react";
import Terminate from "../../PartnerAd/Terminate";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Overview = ({ ad, page, loading, type }) => {

  if (!loading && ad.length === 0) {
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
          {/* <Th>Ad Type</Th> */}
          <Th style={{ textTransform: 'capitalize' }}>Release on</Th>
          <Th style={{ textTransform: 'capitalize' }}>Created on</Th>
          <Th style={{ textTransform: 'capitalize' }}>Status</Th>
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

                  <Td>{el.name}</Td>
                  <Td>{el.title}</Td>
                  <Td>{el.body}</Td>
                  {/* <Td>{el.adType}</Td> */}
                  <Td>{formatDate(el.releaseDate)}</Td>
                  <Td>{formatDate(el.createdAt)}</Td>
                  <Td>
                    <p className={styles.blackBtn21}>{getStatus(el)}</p>
                  </Td>
                  <div className={styles.actionDiv}>
                  {getStatus(el) === "Running" ? (
                      <Terminate el={el} type={type} page={page} partnerAd={false}/>
                    ) : (
                      <DeleteModel el={el} type={type} page={page} partnerAd={false}/>
                    )}
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

export default Overview;


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

const getStatus = (el) => {
  const currentDate = new Date();
  const releaseDateOnly = el.releaseDate.split("T")[0];
  const releaseDateTime = new Date(`${releaseDateOnly}`);
  if (currentDate < releaseDateTime) {
    return "Starting Soon";
  } else {
    return "Running";
  }
};