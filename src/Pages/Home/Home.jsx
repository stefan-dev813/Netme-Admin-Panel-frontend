/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { GoPeople } from "react-icons/go";
import Router from "../../Components/Router";
import { IoSettingsOutline } from "react-icons/io5";
import { db } from "../../Firebase_config";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./style.module.css";
import img1 from "../../assets/logo1.svg";
import img2 from "../../assets/logoUser.svg";
import voucher from "../../assets/icons/voucher.svg";
import voucher_white from "../../assets/icons/voucher_white.svg";
import premium from "../../assets/icons/premium.svg";
import Vector from "../../assets/icons/Vector.svg";
import analytics from "../../assets/icons/analytics.svg";
import gear from "../../assets/icons/user-gear 1.svg";
import reports from "../../assets/icons/reports.svg";
import Btw from "../../assets/icons/Btw.svg";
import Wtb from "../../assets/icons/Wtb.svg";
import premium_white from "../../assets/icons/premium_white.svg";
import addLogo from "../../assets/usersDashboard/addIcon.svg";
import addLogoBlack from "../../assets/usersDashboard/analyticsBlack.svg";
import { RxDashboard } from "react-icons/rx";
import { CgArrowsExchangeAlt, CgNotes } from "react-icons/cg";
import { PiBellRingingBold } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// const user="suriya";
// const permissions="suriya";

const Home = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [outboxArray, setOutbox] = useState([]);
  const [inboxArray, setInbox] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || false;
  const permissions = JSON.parse(localStorage.getItem("permissions")) || false;

  const location = useLocation().pathname;
  //   const dispatch = useDispatch();
  const Logout = () => {
    localStorage.setItem("user", JSON.stringify(!user));

    navigate("/");
  };
  const fetchAndSetMessages = async (collectionRef, setState) => {
    try {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        const sortedMessages = messages.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setState(sortedMessages);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };

  const fetchMessages = async (collectionName, userId, setState) => {
    const collectionRef = collection(db, collectionName, userId, "chatUser");
    const unsubscribe = await fetchAndSetMessages(collectionRef, setState);
    return unsubscribe;
  };

  // Usage in your component
  useEffect(() => {
    fetchMessages("outbox", userId, setOutbox);
    fetchMessages("inbox", userId, setInbox);
  }, [userId]);

  function getInboxCount() {
    const unseenInboxMessages = inboxArray.filter(
      (message) => !message.receiver
    );
    const unseenOutboxMessages = outboxArray.filter(
      (message) => !message.sender
    );

    return unseenInboxMessages.length + unseenOutboxMessages.length;
  }

  return (
        <div className={!user ? styles.mainContainer : styles.mainContainerUser}>
      <div className={styles.sideContainer}>
        <img src={user ? img2 : img1} alt="" className={styles.image} />

        <div
          className={!user ? styles.listContainer : styles.listContainerUser}
          id={permissions !== "BOTH" && styles.listContainer}
        >
          <Link to="/Dashboard">
            <div id={location === "/Dashboard" ? styles.active : null}>
              <RxDashboard className={styles.sideIcons} /> Dashboard
            </div>
          </Link>
          {user ? (
            <Link to="/Users">
              <div
                id={
                  location === "/Users" || location.includes("/Users")
                    ? styles.active
                    : null
                }
              >
                <GoPeople className={styles.sideIcons} /> Users
              </div>
            </Link>
          ) : (
            <Link to="/Partners">
              <div
                id={
                  location === "/Partners" || location.includes("/Partners")
                    ? styles.active
                    : null
                }
              >
                <GoPeople className={styles.sideIcons} /> Partners
              </div>
            </Link>
          )}
          {user ? (
            <Link to="/Feedback">
              <div
                id={
                  location === "/Feedback" || location === "/Feedback"
                    ? styles.active
                    : null
                }
              >
                <span className={styles.msg}>
                  <img src={reports} alt="" />
                  Feedback
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/Messages">
              <div
                id={
                  location === "/Messages" ||
                  location === "/CreateMessages" ||
                  location.startsWith("/Messages/")
                    ? styles.active
                    : null
                }
              >
                <span className={styles.msg}>
                  <CgNotes className={styles.sideIcons} /> Messages
                </span>
                {getInboxCount() !== 0 && (
                  <span className={styles.numberSpan}>{getInboxCount()}</span>
                )}
              </div>
            </Link>
          )}

          {user ? (
            <Link to="/NotificationUser">
              <div
                id={
                  location === "/NotificationUser" ||
                  location.startsWith("/NotificationUser/")
                    ? styles.active
                    : null
                }
              >
                <PiBellRingingBold className={styles.sideIcons} />
                Notification
              </div>
            </Link>
          ) : (
            <Link to="/Notification">
              <div
                id={
                  location === "/Notification" ||
                  location.startsWith("/Notification/")
                    ? styles.active
                    : null
                }
              >
                <PiBellRingingBold className={styles.sideIcons} /> Push
                Notification
              </div>
            </Link>
          )}
          {!user && (
            <>
              <div
                className={styles.AddDiv}
                id={
                  location === "/Partner" || location === "/External"
                    ? styles.AddDiv
                    : null
                }
              >
                <div onClick={() => navigate("/Partner")}>
                  {location === "/Partner" || location === "/External" ? (
                    <img src={addLogo} alt="" />
                  ) : (
                    <img src={addLogoBlack} alt="" />
                  )}
                  Advertisement <FiChevronDown fontSize={25} />
                </div>

                {(location === "/Partner" || location === "/External") && (
                  <div
                    className={styles.subDiv}
                    // id={location === "/Advertisement" ? styles.active : null}
                  >
                    <div style={{ paddingLeft: "0", paddingTop: "2px" }}>
                      <img
                        src={location === "/Partner" ? Wtb : Btw}
                        alt=""
                        className={styles.AdSideImg}
                      />
                    </div>

                    <div className={styles.adInnerDiv}>
                      <div
                        style={{ marginLeft: "0px" }}
                        onClick={() => navigate("/Partner")}
                        id={
                          location === "/Partner"
                            ? styles.activeAd
                            : styles.inactiveAd
                        }
                      >
                        Partner ad
                      </div>
                      <div
                        style={{ marginLeft: "5px", marginTop: "-5px" }}
                        onClick={() => navigate("/External")}
                        id={
                          location === "/External"
                            ? styles.activeAd
                            : styles.inactiveAd
                        }
                      >
                        External ad
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/Voucher">
                <div
                  id={
                    location === "/CreateVoucher" ||
                    location === "/Voucher" ||
                    location.startsWith("/Voucher/")
                      ? styles.active
                      : null
                  }
                >
                  {location === "/CreateVoucher" ||
                  location === "/Voucher" ||
                  location.startsWith("/Voucher/") ? (
                    <img src={voucher_white} alt="" />
                  ) : (
                    <img src={voucher} alt="" />
                  )}{" "}
                  Voucher
                </div>
              </Link>
              <Link to="/Subscription">
                <div
                  id={
                    location === "/Subscription" ||
                    location === "/CreatePlan" ||
                    location.startsWith("/Subscription/")
                      ? styles.active
                      : null
                  }
                >
                  {location === "/Subscription" ||
                  location === "/CreatePlan" ||
                  location.startsWith("/Subscription/") ? (
                    <img src={premium_white} alt="" />
                  ) : (
                    <img src={premium} alt="" />
                  )}{" "}
                  Partner Subscription
                </div>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/SubscriptionUser">
                <div
                  id={
                    location === "/SubscriptionUser" ||
                    location === "/CreatePlan" ||
                    location.startsWith("/SubscriptionUser/")
                      ? styles.active
                      : null
                  }
                >
                  <img
                    src={premium_white}
                    alt=""
                    className={styles.sideIcons}
                  />{" "}
                  Premium Subscription
                </div>
              </Link>

              <Link to="/Promotions">
                <div
                  id={
                    location === "/Promotions" ||
                    location === "/CreatePromotion"
                      ? styles.active
                      : null
                  }
                >
                  <img src={Vector} alt="" />
                  Promotions
                </div>
              </Link>

              <Link to="/Analysis">
                <div id={location === "/Analysis" ? styles.active : null}>
                  <img src={analytics} alt="" /> Analysis
                </div>
              </Link>
              <Link to="/Roles">
                <div
                  id={
                    location === "/Roles" || location.startsWith("/colleges/")
                      ? styles.active
                      : null
                  }
                >
                  <img src={gear} alt="" />
                  Roles & Permissions
                </div>
              </Link>
            </>
          )}

          <Link to="/Settings">
            <div
              id={
                location === "/Settings" || location.startsWith("/colleges/")
                  ? styles.active
                  : null
              }
            >
              <IoSettingsOutline className={styles.sideIcons} /> Settings
            </div>
          </Link>
        </div>
        {permissions === "BOTH" && (
          <div
            className={!user ? styles.logout : styles.logoutUser}
            onClick={Logout}
          >
            <span className={!user ? styles.icons : styles.iconsUser}>
              <CgArrowsExchangeAlt />
            </span>
            Switch to {user ? "Partner" : "User"} Panel
          </div>
        )}
      </div>
      <div>
        <Router />
      </div>
    </div>
  );
};

export default Home;
