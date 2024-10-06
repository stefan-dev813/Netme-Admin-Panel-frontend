import React, { useState } from "react";
import styles from "../styles.module.css";
import { Spinner } from "@chakra-ui/react";
import { Pagination, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchActivePartnerData,
  updateActivePartnerData,
} from "../../../Redux/Partner/ActivePartnerReducer";

const BlackListPartner = ({
  loading,
  partner,
  total,
  setPage,
  setViewMeatings,
  setContact,
  setBusinessId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

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
  const handelUpdate = (data) => {
    try {
      dispatch(updateActivePartnerData(data)).then((res) => {
        dispatch(fetchActivePartnerData("Blacklisted", "", 1));
        if (data.status === "Deleted") {
          message.success("User removed from blacklist");
        } else {
          message.error("User deleted successfully");
        }
      });
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  const handleView = (businessId) => {
    setViewMeatings(true);
    setBusinessId(businessId);
  };

  if (!loading && partner.length === 0) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center', marginTop:'10%'}}>No data available</div>;
  }

  return (
    <div className={styles.tableDiv}>
      <table className={styles.table}>
        <tr style={{display:'block'}}>
          <th className={styles.tableHead}>Location</th>
          <th className={styles.tableHead}>Address</th>
          <th className={styles.tableHead}>Legal Representative</th>
          <th className={styles.tableHead}>No. of Meetings</th>
          <th className={styles.tableHead}>Registered on</th>
          <th className={styles.tableHead}>Status</th>
          <th className={styles.tableHead}>Cancelled on</th>
          <th className={styles.tableHead}>Membership</th>
          <th className={styles.tableHead}>Type</th>

          <th style={{minWidth:'350px', maxWidth:'350px'}}>Actions</th>
        </tr>

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
          <tbody>
            {partner.map((el, i) => {
              return (
                <tr key={i}>
                  <td className={styles.tableHead}>{el.name}</td>

                  <td className={styles.tableHead}>
                    <div className={styles.address}>{el?.address}</div>
                  </td>
                  <td className={styles.tableHead}>
                    <Link to={`/Partners/${el.partnerId._id}`}>
                      <p className={styles.blackBtn}> Contact Details</p>
                    </Link>
                  </td>
                  <td className={styles.tableHead}>
                    <p
                      className={styles.blackBtn29}
                      onClick={() => handleView(el._id)}
                    >
                      View
                    </p>
                  </td>
                  <td className={styles.tableHead}>{convertDate(el.createdAt)}</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>N/A</td>
                  <td className={styles.tableHead}>N/A</td>

                  <td style={{minWidth:'480px', maxWidth:'480px'}}>
                    <div className={styles.actionDiv}>
                      <p
                        className={styles.blackBtn2}
                        onClick={() =>
                          handelUpdate({
                            partnerId: el.partnerId._id,
                            status: "Deleted",
                          })
                        }
                      >
                        Remove from Blacklist
                      </p>
                      <p
                        className={styles.blackBtn3}
                        onClick={() =>
                          handelUpdate({
                            partnerId: el.partnerId._id,
                            deleted: true,
                          })
                        }
                      >
                        Delete Permanently
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </div>
        )}
      </table>
      {total > 10 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            onChange={handlePageChange}
            total={total}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default BlackListPartner;
