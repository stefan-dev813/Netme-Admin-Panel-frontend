import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
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
import { BiSearch } from "react-icons/bi";
import Current from "./Current/Current";
import History from "./History/History";
import { Helmet } from "react-helmet";
// import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentSubscriptionData } from '../../Redux/Subscription/CurrentSubscriptionReducer';
import CreateSubscription from "./CreateSubscription/CreateSubscription";
import { fetchSubscriptionData } from "../../../Redux/Subscription/subscriptionReducer";
import { fetchPremiumSubscriptionData } from "../../../Redux/Subscription/premiumReducer";

const Subscription = () => {
  // const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState(false);
  const [type, setType] = useState("Current");
  const dispatch = useDispatch();

  const countSubscriptionData =
    useSelector(
      (store) => store?.SubscriptionReducer?.subscriptionData?.data
    ) || [];
  const countPremiumSubscriptionData =
    useSelector(
      (store) =>
        store?.PremiumSubscriptionReducer?.premiumSubscriptionData?.data
    ) || [];

  // console.log("countPremiumSubscriptionData" , countPremiumSubscriptionData?.length)
  //   console.log("countSubscriptionData##" ,countSubscriptionData.length)

  useEffect(() => {
    dispatch(fetchSubscriptionData(search, "USER"));
  }, [search, dispatch, type]);

  // fetching premium subscription data
  useEffect(() => {
    dispatch(fetchPremiumSubscriptionData(search, "USER"));
  }, [search, dispatch, type]);

  if (create) {
    return <CreateSubscription setCreate={setCreate} />;
  }

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Premium Subscription - NETME </title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Premium Subscription</h1>

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
          <Button bg="#8CC9E9" onClick={() => setCreate(true)}>
            Create New Subscription
          </Button>
        </div>
      </div>
      <div>
        <Tabs
          onChange={() =>
            setType((prev) => (prev === "Current" ? "History" : "Current"))
          }
        >
          <TabList>
            {/* counting length of listing subscription and premium subscription */}
            <Tab className={styles.tabPanel}>
              App Premium Plans
              <span
                id={type === "Current" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {countSubscriptionData?.length}
              </span>
            </Tab>
            <Tab className={styles.tabPanel}>
              Premium User{" "}
              <span
                id={type === "History" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {countPremiumSubscriptionData?.length}
              </span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Current search={search} type={type} />
            </TabPanel>
            <TabPanel>
              <History type={type} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Subscription;
