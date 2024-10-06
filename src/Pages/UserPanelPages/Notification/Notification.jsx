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
import { BiFilter, BiSearch } from "react-icons/bi";
import Upcoming from "./Upcoming/Upcoming";
import Previous from "./Previous/Previous";
import CreateNotification from "./CreateNotification/CreateNotification";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNotificationData } from "../../../Redux/User/UserNotificationReducer";
import NotificationFilter from "./Filter/NotificationFilter";
import { Helmet } from "react-helmet";
const Notification = () => {
  const [create, setCreate] = useState(false);
  const [type, setType] = useState("Overview");
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [releasStartDate, setReleasStartDate] = useState("");
  const [releaseEndDate, setReleaseEndDate] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const notification =
    useSelector((store) => store.UserNotificationReducer.Notification.data) ||
    [];
  const total = useSelector(
    (store) => store?.UserNotificationReducer?.Notification?.totalCount
  );
  const loading = useSelector(
    (store) => store.UserNotificationReducer.isLoading
  );
  const { historyCount, overViewCount } = useSelector(
    (store) => store.UserNotificationReducer.Notification
  );

  useEffect(() => {
    dispatch(
      fetchUserNotificationData(
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
        page={page}
        setType={setType}
      />
    );
  }

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Notification - NETME </title>
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
          <NotificationFilter
            releasStartDate={releasStartDate}
            releaseEndDate={releaseEndDate}
            city={city}
            setCity={setCity}
            setReleasStartDate={setReleasStartDate}
            setReleaseEndDate={setReleaseEndDate}
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
        <Tabs>
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
            <Tab className={styles.tabPanel} onClick={() => setType("History")}>
              Previous{" "}
              <span
                id={type === "History" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {historyCount}
              </span>
            </Tab>
            &nbsp; &nbsp; &nbsp;
          </TabList>

          <TabPanels>
            <TabPanel>
              <Upcoming
                notification={notification}
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
                setPage={setPage}
                total={total}
                loading={loading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Notification;
