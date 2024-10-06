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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentVoucherData } from "../../../Redux/Voucher/CurrentVoucherReducer";
import EditPromotion from "./CreatePromotion/CreatePromotion";
import { fetchcurrentPromotionData } from "../../../Redux/Promotion/CurrentPromotionReducer";
import { Helmet } from "react-helmet";
const Promotion = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("Current");
  const dispatch = useDispatch();
  const history =
    useSelector(
      (store) => store?.currentPromotionReducer?.currentPromotionData?.data
    ) || [];
  const loading =
    useSelector((store) => store?.currentPromotionReducer?.isLoading) || false;
  const historyPromotionCount =
    useSelector(
      (store) =>
        store?.currentPromotionReducer?.currentPromotionData?.historyVoucher
    ) || 0;
  const currentPromotionCount =
    useSelector(
      (store) =>
        store?.currentPromotionReducer?.currentPromotionData?.currentVoucher
    ) || 0;

  useEffect(() => {
    dispatch(fetchcurrentPromotionData(type, search));
    // console.log(currentPromotionCount.currentPromotionReducer.currentPromotionData.currentVoucher
    //     , 'historyPromotionCount')
  }, [type, search]);

  if (edit) {
    return <EditPromotion setEdit={setEdit} />;
  }
  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Promotions - NETME </title>
      </Helmet>
      <div className={styles.firstDiv}>
        <h1>Promotion</h1>

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
          <Button bg="#8CC9E9" onClick={() => navigate("/CreatePromotion")}>
            Create New Promotion
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
            <Tab className={styles.tabPanel}>
              Current Promotion
              <span
                id={type === "Current" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {currentPromotionCount}
              </span>
            </Tab>
            <Tab className={styles.tabPanel}>
              History{" "}
              <span
                id={type === "History" ? styles.activeTab : null}
                className={styles.numberSpan}
              >
                {historyPromotionCount}
              </span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Current
                history={history}
                loading={loading}
                setEdit={setEdit}
                type={type}
                key="Promotions"
              />
            </TabPanel>
            <TabPanel>
              <History
                history={history}
                loading={loading}
                setEdit={setEdit}
                type={type}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Promotion;
