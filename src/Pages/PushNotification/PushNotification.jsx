import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { BiFilter, BiSearch } from "react-icons/bi";
import Upcoming from "./Upcoming/Upcoming";
import Request from "./Requests/Request";
import Previous from "./Previous/Previous";
import CreateNotification from "./CreateNotification/CreateNotification";
import ContactPartner from "./ContactPartner/CreateMassage/ContactPartner";
import { fetchNotificationData } from "../../Redux/PushNotification/NotificationReducer";
import { useDispatch, useSelector } from "react-redux";
import AdFilter from "./Components/AdFilter/AdFilter";
const PushNotification = () => {
  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();
  const notification =
    useSelector((store) => store.NotificationReducer.Notification.data) || [];
  const upcomingTotal = useSelector(
    (store) => store?.NotificationReducer?.Notification?.overViewCount
  );
  const requestTotal = useSelector(
    (store) => store?.NotificationReducer?.Notification?.pendingCount
  );
  const previousTotal = useSelector(
    (store) => store?.NotificationReducer?.Notification?.historyCount
  );
  const loading = useSelector((store) => store?.NotificationReducer?.isLoading);
  const { pendingCount, historyCount, overViewCount } = useSelector(
    (store) => store.NotificationReducer.Notification
  );
  const [contact, setContact] = useState(false);
  const [type, setType] = useState("Overview");
  const [search, setSearch] = useState();
  const [page, setpage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [releasStartDate, setReleasStartDate] = useState("");
  const [releaseEndDate, setReleaseEndDate] = useState("");
  const [city, setCity] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    setpage(1);
  };

  useEffect(() => {
    dispatch(
      fetchNotificationData(
        type,
        search,
        page,
        releasStartDate,
        releaseEndDate,
        city
      )
    );
  }, [page, search, type, dispatch]);

  if (create) {
    return (
      <CreateNotification
        setCreate={setCreate}
        type={type}
        search={search}
        page={page}
      />
    );
  }
  if (contact) {
    return <ContactPartner setContact={setContact} />;
  }

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Push Notifiications - NETME</title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Push Notification</h1>

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
          {/* <Button>Filter  <BiFilter fontSize={20} marginLeft={10} /></Button> */}
          <AdFilter
            releasStartDate={releasStartDate}
            releaseEndDate={releaseEndDate}
            city={city}
            setCity={setCity}
            setReleasStartDate={setReleasStartDate}
            setReleaseEndDate={setReleaseEndDate}
            setFilterApplied={setFilterApplied}
            filterApplied={filterApplied}
            search={search}
            type={type}
            page={page}
          />
          <Button bg="#8CC9E9" onClick={() => setCreate(true)}>
            Create New Notification
          </Button>
        </div>
      </div>
      <div>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab
              className={styles.tabPanel}
              onClick={() => setType("Overview")}
            >
              Upcoming{" "}
              <span
                id={type === "Overview" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {overViewCount}
              </span>
            </Tab>
            &nbsp; &nbsp; &nbsp;
            <Tab className={styles.tabPanel} onClick={() => setType("Pending")}>
              Requests{" "}
              <span
                id={type === "Pending" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {pendingCount}
              </span>
            </Tab>
            &nbsp; &nbsp; &nbsp;
            <Tab className={styles.tabPanel} onClick={() => setType("History")}>
              Previous{" "}
              <span
                id={type === "History" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {historyCount}
              </span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Upcoming
                notification={notification}
                type={type}
                setCreate={setCreate}
                upcomingTotal={upcomingTotal}
                setpage={setpage}
                setContact={setContact}
                page={page}
                loading={loading}
              />
            </TabPanel>
            <TabPanel>
              <Request
                notification={notification}
                setContact={setContact}
                requestTotal={requestTotal}
                setpage={setpage}
                setCreate={setCreate}
                type={type}
                page={page}
                loading={loading}
              />
            </TabPanel>
            <TabPanel>
              <Previous
                notification={notification}
                type={type}
                page={page}
                setpage={setpage}
                previousTotal={previousTotal}
                loading={loading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default PushNotification;
