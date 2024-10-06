import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { BiFilter, BiSearch } from "react-icons/bi";
import { Helmet } from "react-helmet";
import Inbox from "./Inbox/Inbox";
import Outbox from "./Outbox/Outbox";
import inbox from "../../assets/usersDashboard/in.svg";
import outbox from "../../assets/usersDashboard/out.svg";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase_config";
import MessageFilter from "./MessageFilter/MessageFilter";
const Massage = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("Inbox");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [outboxArray, setOutbox] = useState([]);
  const [inboxArray, setInbox] = useState([]);
  const [chatId, setChatId] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [search, setSearch] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setpage] = useState(1);
  const handleTabsChange = (index) => {
    setTabIndex(index);
    setpage(1);
  };
  const fetchAndSetMessages = async (collectionRef, setState) => {
    try {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        // const messages = snapshot.docs.map((doc) => doc.data());
        const messages = snapshot.docs
          .map((doc) => doc.data())
          .filter((message) => {
            const timestamp = new Date(message.timestamp).getTime();
            const isWithinDateRange =
              (!startDate || timestamp >= startDate) &&
              (!endDate || timestamp <= endDate);
            const matchesSearch =
              !search ||
              ((message.Msg?.toLowerCase()?.includes(search.toLowerCase()) ||
                message.subject
                  ?.toLowerCase()
                  ?.includes(search.toLowerCase())) ??
                false);
            return isWithinDateRange && matchesSearch;
          });

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

  // const fetchMessages = async (collectionName, userId, setState,startDate, endDate) => {
  //   const collectionRef = collection(db, collectionName, userId, "chatUser");
  //   const unsubscribe = await fetchAndSetMessages(collectionRef, setState);
  //   return unsubscribe;
  // };

  const fetchMessages = async (
    collectionName,
    userId,
    setState,
    startDate,
    endDate,
    searchKeyword
  ) => {
    const collectionRef = collection(db, collectionName, userId, "chatUser");
    const unsubscribe = await fetchAndSetMessages(
      collectionRef,
      setState,
      startDate,
      endDate,
      searchKeyword
    );
    return unsubscribe;
  };

  // Usage in your component
  useEffect(() => {
    generateChatID();
    fetchMessages("outbox", userId, setOutbox, startDate, endDate, search);
    fetchMessages("inbox", userId, setInbox, startDate, endDate, search);
  }, [filterApplied, search]);

  function generateChatID() {
    const timestamp = new Date().getTime(); // Current timestamp in milliseconds
    const randomString = Math.random().toString(36).substr(2, 10); // Random string of length 10

    setChatId(`${timestamp}${randomString}`);
  }
  function getInboxCount(messages) {
    const unseenMessages = messages.filter((message) => message.receiver);

    return unseenMessages.length;
  }
  function getOutboxCount(messages) {
    console.log(messages, "messages");
    const unseenMessages = messages.filter((message) => message.sender);

    return unseenMessages.length;
  }
  const totalOutBox = getOutboxCount(outboxArray);
  const totalInBox = getInboxCount(inboxArray);
  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Messages - NETME </title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Messages</h1>

        <div className={styles.filterDiv}>
          <InputGroup w={200}>
            <Input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <BiSearch color="green.500" />
            </InputRightElement>
          </InputGroup>
          <MessageFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setFilterApplied={setFilterApplied}
            filterApplied={filterApplied}
          />
          <Button
            bg="#8CC9E9"
            onClick={() => navigate(`/CreateMessages?chatId=${chatId}`)}
          >
            Create New Message
          </Button>
        </div>
      </div>
      <div>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab className={styles.tabPanel} onClick={() => setType("Inbox")}>
              {" "}
              <img src={inbox} alt="" /> &nbsp; Inbox{" "}
              <span
                id={type === "Inbox" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {getInboxCount(inboxArray)}
              </span>
            </Tab>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Tab className={styles.tabPanel} onClick={() => setType("Outbox")}>
              {" "}
              <img src={outbox} alt="" /> &nbsp; Outbox{" "}
              <span
                id={type === "Outbox" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {getOutboxCount(outboxArray)}
              </span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Inbox
                inboxArray={inboxArray}
                page={page}
                setpage={setpage}
                total={totalInBox}
              />
            </TabPanel>
            <TabPanel>
              <Outbox
                outbox={outboxArray}
                page={page}
                setpage={setpage}
                total={totalOutBox}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Massage;
