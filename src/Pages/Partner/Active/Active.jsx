import React, { useState } from "react";
import styles from "../styles.module.css";
import { Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  fetchActivePartnerData,
  updateActivePartnerData,
} from "../../../Redux/Partner/ActivePartnerReducer";
import { Pagination, message } from "antd";
import { Link } from "react-router-dom";
import CancelMembership from "./Cancel/CancelMembership";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';


const Active = ({
  loading,
  partner,
  total,
  setPage,
  setContact,
  setProfile,
  setViewMeatings,
  setProfileId,
  setPartnerId,
  setBusinessId
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  

  const updateData = (data) => {
    dispatch(updateActivePartnerData(data)).then((res) => {
      console.log("res:", res);
      dispatch(fetchActivePartnerData("Active", "", 1));
      message.error("Membership cancel successfully");
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page); 
  };


  function convertDate(dateStr) {
    try {
      const dateObj = new Date(dateStr);
      const formattedDate = `${dateObj.getUTCDate()}.${
        dateObj.getUTCMonth() + 1
      }.${dateObj.getUTCFullYear()}`;
      return formattedDate;
    } catch (error) {
      return null;
    }
  }

  const handleProfile = (profileId) =>{
    setProfile(true)
    setProfileId(profileId)
  }
  const handleContact = (partnerId) =>{
    setContact(true)
    setPartnerId(partnerId)
  }
  const handleView = (businessId) =>{
    setViewMeatings(true)
    setBusinessId(businessId)
  }

  if (!loading && partner.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }

  return (
    <div className={styles.tableDiv}>
         <TableContainer>
<Table variant='simple'>
<Thead>
        <Tr  style={{display:'block'}}>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Location</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Address</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Legal Representative</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>No. of Meetings</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Registered on</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Status</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Cancelled on</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Membership</Th>
          <Th className={styles.tableHead} style={{ textTransform: 'capitalize' }}>Type</Th>
          <Th style={{minWidth:'150px', maxWidth:'150px', textTransform: 'capitalize'}}>Actions</Th>
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
          <div style={{border:'1px solid #D9D9D9', borderRadius:'20px'}}>
          <Tbody>
            {partner.map((el, i) => {
              return (
                <Tr key={i}>
                  <Td className={styles.tableHead}>{el.name}</Td>

                  <Td className={styles.tableHead}>
                    <div className={styles.address}>
                      {el?.address ? el?.address : "..."}
                    </div>
                  </Td>
                  <Td className={styles.tableHead}>
                      <p className={styles.blackBtn}
                      onClick={() => handleContact(el.partnerId._id)}
                      >
                       Contact Details</p>
                    
                  </Td>
                  <Td className={styles.tableHead}>
                    <p
                      className={styles.blackBtn29}
                      onClick={() => handleView(el._id)}
                    >
                      View
                    </p>
                  </Td>
                  <Td className={styles.tableHead}>{convertDate(el.createdAt)}</Td>
                  <Td className={styles.tableHead}>{el.isPartnerActive.toString()}</Td>
                  <Td className={styles.tableHead}>N/A</Td>

                  <Td className={styles.tableHead}>N/A</Td>
                  <Td className={styles.tableHead}>{el.category}</Td>

                  <Td style={{minWidth:'180px', maxWidth:'180px'}}>
                    <div className={styles.actionDiv2}>
                      <p className={styles.blackBtn10}
                         onClick={() =>handleProfile(el.partnerId._id)}
                      >
                        Profile
                      </p>
                      
                      {/* <p
                        className={styles.blackBtn3}
                        style={{
                          padding: "10px 30px 10px 30px",
                        }}
                        onClick={() =>
                          //  updateData({ partnerId: el.partnerId._id, status: "Deleted" })
                          notAvailable()
                        }
                      >
                        Cancel membership
                      </p> */}
                      <CancelMembership partnerId={el.partnerId._id} partnerName={el.name}/>
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          </div>
        )}
      </Table>
      </TableContainer>
      {total > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={total}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Active;
