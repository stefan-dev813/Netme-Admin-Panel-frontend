import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Chart from "react-google-charts";
import img1 from "../../../assets/img1.png";
import { TbRectangleFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { LuRectangleHorizontal } from "react-icons/lu";
import { userRequest } from "../../../requestMethod";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/AuthReducer";
import { Avatar } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
const Analysis = () => {
  const dispatch = useDispatch();
  const newArray = [...Array(10)];

  const [monthType, setMonthType] = useState("year");
  const [obj, setData] = useState({
    tp: 0,
    pr: 0,
    ageRanges: [],
  });
  const [mapData, setMapData] = useState({
    ageRanges: false,
    genders: false,
    topCities: false,
    invites: false,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("YEARLY");
  const [allInvitesData, setAllInvitesData] = useState([]);

  const filteredData = async (startDate, endDate) => {
    try {
      const dataAnalysis = await userRequest.get(
        `/admin/analysis/getAnalysis`,
        {
          params: {
            topStartDate: startDate,
            endStartDate: endDate,
          },
        }
      );
      const modifiedTopCities = dataAnalysis.data.topCities.map((item) => {
        const cityWords = item.city.split(" "); // Split the city name by spaces
        const lastWord = cityWords[cityWords.length - 1]; // Get the last word
        return [lastWord, parseFloat(item.count)]; // Return an array with the last word and count
      });
      setMapData({
        ...mapData,
        ageRanges: [
          ["Age Range", "Percentage"],
          ...dataAnalysis.data.ageRanges.map((item) => [
            item.ageRange,
            parseFloat(item.percentage),
          ]),
        ],
        genders: [
          ["Gender", "Count"],
          ...dataAnalysis.data.genders.map((item) => [
            item.gender,
            parseFloat(item.count),
          ]),
        ],
        topCities: [["City", "Count"], ...modifiedTopCities],
      });
      setData(dataAnalysis.data);
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };

  const handleDateSelection = (type) => {
    const currentDate = moment();
    let start, end;

    switch (type) {
      case "day":
        filteredData(moment().startOf("day"), moment().endOf("day"));
        start = moment().startOf("day");
        end = moment().endOf("day");
        break;
      case "week":
        filteredData(currentDate.clone().subtract(6, "days"), currentDate);
        start = moment().startOf("week");
        end = currentDate;
        break;
      case "month":
        filteredData(
          moment().subtract(1, "months").startOf("month"),
          currentDate
        );
        start = moment().subtract(1, "months").startOf("month");
        end = currentDate;
        break;
      case "year":
        filteredData(
          moment().subtract(1, "years").startOf("year"),
          currentDate
        );
        start = moment().subtract(1, "years").startOf("year");
        end = currentDate;
        break;
      default:
        start = moment().startOf("year");
        end = currentDate;
        break;
    }
    setMonthType(type);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataAnalysis = await userRequest.get(
          `/admin/analysis/getAnalysis?graphFilter=${selectedFilter}`
        );
        const modifiedTopCities = dataAnalysis.data.topCities.map((item) => {
          const cityWords = item.city.split(" "); // Split the city name by spaces
          const lastWord = cityWords[cityWords.length - 1]; // Get the last word
          return [lastWord, parseFloat(item.count)]; // Return an array with the last word and count
        });
        let updatedInvitesData = [["", "", ""]];
        if (selectedFilter === "YEARLY") {
          dataAnalysis.data.invites.forEach((item) => {
            updatedInvitesData.push([
              item.month,
              item.currentYearCount,
              item.previousYearCount,
            ]);
          });
        } else if (selectedFilter === "MONTHLY") {
          dataAnalysis.data.invites.forEach((item) => {
            updatedInvitesData.push([
              item.weekNumber,
              item.currentCount,
              item.lastCount,
            ]);
          });
        } else if (selectedFilter === "WEEKLY") {
          dataAnalysis.data.invites.forEach((item) => {
            updatedInvitesData.push([
              item.day,
              item.currentWeek,
              item.lastWeek,
            ]);
          });
        }
        setMapData({
          ...mapData,
          ageRanges: [
            ["Age Range", "Percentage"],
            ...dataAnalysis.data.ageRanges.map((item) => [
              item.ageRange,
              parseFloat(item.percentage),
            ]),
          ],
          genders: [
            ["Gender", "Count"],
            ...dataAnalysis.data.genders.map((item) => [
              item.gender,
              parseFloat(item.count),
            ]),
          ],
          topCities: [["City", "Count"], ...modifiedTopCities],
          invites: updatedInvitesData,
        });
        setData(dataAnalysis.data);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      }
    };

    fetchData();
  }, [selectedFilter]);

  const handleFilterChange = (value) => {
    console.log(value, "valuesDataAreHere");
    setSelectedFilter(value); // Update selected filter state
  };

  // useEffect(() => {
  //     filteredData(startDate, endDate);
  // }, [startDate, endDate]);

  const options = {
    title: "Age",
    titleTextStyle: {
      fontSize: 15,
      fontWeight: "bold",
    },
    chartArea: { left: 10, top: 40, right: 20 },
    colors: ["#8CC9E9", "#8CE9DB", "#E9D58C", "#E98CE0", "#DB3B53", "#333333"],
  };
  const options1 = {
    title: "Gender",
    titleTextStyle: {
      fontSize: 15,
      fontWeight: "bold",
    },
    chartArea: { left: 10, top: 40, right: 20 },
    colors: ["#8CE9DB", "#8CC9E9", "#333333"],
  };
  const options2 = {
    title: "Top Origin",
    titleTextStyle: {
      fontSize: 15,
      fontWeight: "bold",
    },
    chartArea: { left: 10, top: 40, right: 20 },
    colors: [
      "#8CC9E9",
      "#8CE9DB",
      "#AA8CE9",
      "#D1E98C",
      "#E98CD5",
      "#DB3B53",
      "#333333",
    ],
  };
  const options3 = {
    title: "",
    legend: { position: "none" },
    hAxis: { textPosition: "none" },
    vAxis: { textPosition: "none" },
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    series: {
      0: { color: "#333333", bar: { groupWidth: "10%" } },
      1: { color: "#8CC9E9", bar: { groupWidth: "10%" } },
    },
  };

  const invitesData = [["Month", "currentYear", "previousYear"]];

  const items = [
    {
      label: (
        <div className={styles.profileDetails}>
          <Avatar name="Name" bg="blue.300" size="md" />
          <div className={styles.profilePic}>
            <p style={{ fontWeight: "700" }}>Admin</p>
            <p style={{ fontWeight: "500" }}>admin@gmail.com</p>
          </div>
        </div>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <span
          className={styles.logout}
          onClick={() => {
            dispatch(logout());
            window.location.reload();
          }}
        >
          {" "}
          <FiLogOut />
          Log Out
        </span>
      ),
      key: "1",
    },
  ];

  return (
    <div className={styles.MainContainer}>
      <Helmet>
        <title>Analysis - NETME </title>
      </Helmet>
      <div className={styles.firstContainer}>
        <h1>Analysis</h1>

        <div>
          <div className={styles.dateDiv}>
            <div className={styles.date}>
              <AiOutlineCalendar />
              <ReactDatePicker
                placeholderText="Start date"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  filteredData(date, endDate);
                }}
              />
            </div>
            <div className={styles.date}>
              <AiOutlineCalendar />
              <ReactDatePicker
                placeholderText="End date"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  filteredData(startDate, date);
                }}
              />
            </div>
          </div>
          <div className={styles.selectMonth}>
            <p
              onClick={() => handleDateSelection("day")}
              id={monthType === "day" ? styles.activeMonth : ""}
              className={styles.month}
            >
              Day
            </p>
            <p
              onClick={() => handleDateSelection("week")}
              id={monthType === "week" ? styles.activeMonth : ""}
              className={styles.month}
            >
              Week
            </p>
            <p
              onClick={() => handleDateSelection("month")}
              id={monthType === "month" ? styles.activeMonth : ""}
              className={styles.month}
            >
              Month
            </p>
            <p
              onClick={() => handleDateSelection("year")}
              id={monthType === "year" ? styles.activeMonth : ""}
              className={styles.month}
            >
              Year
            </p>
          </div>
          <span>
            <img src={img1} alt="" />
          </span>
        </div>
      </div>

      <div className={styles.cards}>
        {mapData.ageRanges && mapData.ageRanges.length && (
          <div className={styles.card}>
            <Chart
              chartType="PieChart"
              data={mapData.ageRanges}
              options={options}
              width={"100%"}
              height={"200px"}
            />
          </div>
        )}
        {mapData.genders && mapData.genders.length && (
          <div className={styles.card}>
            <Chart
              chartType="PieChart"
              data={mapData.genders}
              options={options1}
              width={"100%"}
              height={"200px"}
            />
          </div>
        )}
        {mapData.topCities && mapData.topCities.length && (
          <div className={styles.card}>
            <Chart
              chartType="PieChart"
              data={mapData.topCities}
              options={options2}
              width={"100%"}
              height={"200px"}
            />
          </div>
        )}
      </div>
      <div className={styles.chartDiv}>
        <div className={styles.chart}>
          <div className={styles.chartHead}>
            <h2>Invites</h2>
            <div className={styles.innerChartHead}>
              <div className={styles.thisYear}>
                {" "}
                <span
                  style={{
                    backgroundColor: "#8CC9E9",
                    width: "30px",
                    borderRadius: "8px",
                  }}
                >
                  {" "}
                  <TbRectangleFilled color="transparent" />{" "}
                </span>
                This year
              </div>
              <div className={styles.previous}>
                {" "}
                <span
                  style={{
                    backgroundColor: "#333333",
                    width: "30px",
                    borderRadius: "8px",
                  }}
                >
                  <LuRectangleHorizontal color="transparent" />{" "}
                </span>
                Previous year
              </div>
              <select onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="YEARLY">Yearly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="WEEKLY">Weekly</option>
              </select>
            </div>
          </div>
          {mapData.invites && mapData.invites.length && (
            <Chart
              chartType="Bar"
              width="100%"
              height="93%"
              data={mapData.invites}
              options={options3}
            />
          )}
        </div>
        <div className={styles.sideTable}>
          <div className={styles.tableHead}>
            <h2>App Data</h2>
            {/* <select> */}
            {/* <option value="">This week</option>
                            <option value="">This week</option>
                            <option value="">This week</option>
                            <option value="">This week</option> */}
            {/* </select> */}
          </div>
          <div className={styles.tableDiv}>
            <table className={styles.roundedTable}>
              <tr>
                <th>Category</th>
                <th>1-1 Invite</th>
                <th>Group Invite</th>
              </tr>
              <tr>
                <td>Total Invitaion</td>
                <td className={styles.tab2}>{obj.totalInvitesAccepted1On1}</td>
                <td>{obj.totalGroupInvites}</td>
              </tr>
              <tr>
                <td>Avg Invite</td>
                <td className={styles.tab2}>{obj.totalInvites1On1}</td>
                <td>{obj.totalGroupInvites}</td>
              </tr>
              <tr>
                <td>Total invites accepted</td>
                <td className={styles.tab2}>{obj.totalInvitesAccepted1On1}</td>
                <td>{obj.totalInvitesAcceptedGroup}</td>
              </tr>
              <tr>
                <td>Avg Invites send</td>
                <td className={styles.tab2}>{obj.totalInvitesAccepted1On1}</td>
                <td>{obj.totalInvitesAcceptedGroup}</td>
              </tr>
              <tr>
                <td>Overall invites since lanch</td>
                <td className={styles.tab2}>{obj.totalInvites1On1}</td>
                <td>{obj.totalGroupInvites}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
