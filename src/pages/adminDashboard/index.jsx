import React, { useEffect, useState } from "react";
import styles from "./adminDashboard.module.css";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [chargeCustomer, setChargeCustomer] = useState(false);
  const [category6, setCategory6] = useState(null);
  const [category7, setCategory7] = useState(null);
  const [category8, setCategory8] = useState(null);
  const [category9, setCategory9] = useState(null);
  const [category10, setCategory10] = useState(null);
  const [barGraphData, setBarGraphData] = useState([]);
  const [allCategoriesData, setAllCategoriesData] = useState({});
  const [message, setMessage] = useState("");

  const [queryParameters] = useSearchParams();
  console.log(queryParameters.get("id"));

  const isSaveBtnDisabled =
    !chargeCustomer ||
    category6 < 99 ||
    category7 < 79 ||
    category8 < 59 ||
    category9 < 39 ||
    category10 < 19 ||
    (category6 === allCategoriesData.category_6 &&
      category7 === allCategoriesData.category_7 &&
      category8 === allCategoriesData.category_8 &&
      category9 === allCategoriesData.category_9 &&
      category10 === allCategoriesData.category_10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://stg.dhunjam.in/account/admin/${queryParameters.get("id")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const adminResponse = await response.json();
      console.log("adminResponse :", adminResponse);

      if (adminResponse.status === 200) {
        setName(adminResponse.data?.name);
        setLocation(adminResponse.data?.location);
        setChargeCustomer(adminResponse.data?.charge_customers);
        setCategory6(adminResponse.data?.amount?.category_6);
        setCategory7(adminResponse.data?.amount?.category_7);
        setCategory8(adminResponse.data?.amount?.category_8);
        setCategory9(adminResponse.data?.amount?.category_9);
        setCategory10(adminResponse.data?.amount?.category_10);
        setAllCategoriesData(adminResponse.data?.amount);

        const graphData = [
          {
            name: "Custom",
            y: adminResponse.data?.amount?.category_6,
          },
          {
            name: "Category1",
            y: adminResponse.data?.amount?.category_7,
          },
          {
            name: "Category2",
            y: adminResponse.data?.amount?.category_8,
          },
          {
            name: "Category3",
            y: adminResponse.data?.amount?.category_9,
          },
          {
            name: "Category4",
            y: adminResponse.data?.amount?.category_10,
          },
        ];

        setBarGraphData(graphData);
      }
    };
    fetchData();
  }, []);

  async function clickSaveBtn(event) {
    event.preventDefault();
    console.log("clicked");

    const requestBody = { amount: {} };

    if (category6 !== allCategoriesData.category_6) {
      requestBody.amount.category_6 = category6;
    }
    if (category7 !== allCategoriesData.category_7) {
      requestBody.amount.category_7 = category7;
    }
    if (category8 !== allCategoriesData.category_8) {
      requestBody.amount.category_8 = category8;
    }
    if (category9 !== allCategoriesData.category_9) {
      requestBody.amount.category_9 = category9;
    }
    if (category10 !== allCategoriesData.category_10) {
      requestBody.amount.category_10 = category10;
    }

    const response = await fetch(
      `https://stg.dhunjam.in/account/admin/${queryParameters.get("id")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const updateResponse = await response.json();
    console.log("updateResponse :", updateResponse);
    if (updateResponse.status === 200) {
      setMessage("Data updated successfully!");
    } else {
      setMessage("Failed to update.");
    }
  }
  return (
    <div className="container">
      <h1>
        {" "}
        {name}, {location} on Dhun Jam
      </h1>
      <form className={styles.form}>
        <div className={styles.rows}>
          <div className={styles.row}>
            <div className={styles.ques}>
              <label>
                Do you want to charge your customers for requesting songs?
              </label>
            </div>
            <div className={styles.options}>
              <input
                type="radio"
                id="yesBtn"
                value="Yes"
                checked={chargeCustomer}
              ></input>
              <label for="yesBtn">Yes</label>
              <br></br>
              <input
                type="radio"
                id="noBtn"
                value="No"
                checked={!chargeCustomer}
              ></input>
              <label for="noBtn">No</label>
              <br></br>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.ques}>
              <label>Custom song request amount- </label>
            </div>
            <div className={styles.options}>
              <input
                style={{
                  border: isSaveBtnDisabled
                    ? "1px solid grey"
                    : "1px solid white",
                }}
                type="number"
                placeholder="Enter amount"
                className={styles.optionsAmount}
                disabled={!chargeCustomer}
                min={99}
                value={category6}
                onChange={(event) => setCategory6(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.ques}>
              Regular song request amount, from high to low-{" "}
            </label>
            <div className={styles.options}>
              <input
                style={{
                  border: isSaveBtnDisabled
                    ? "1px solid grey"
                    : "1px solid white",
                }}
                type="number"
                className={styles.optionsNumber}
                disabled={!chargeCustomer}
                value={category7}
                min={79}
                onChange={(event) => setCategory7(event.target.value)}
              />
              <input
                style={{
                  border: isSaveBtnDisabled
                    ? "1px solid grey"
                    : "1px solid white",
                }}
                type="number"
                className={styles.optionsNumber}
                disabled={!chargeCustomer}
                value={category8}
                min={59}
                onChange={(event) => setCategory8(event.target.value)}
              />
              <input
                style={{
                  border: isSaveBtnDisabled
                    ? "1px solid grey"
                    : "1px solid white",
                }}
                type="number"
                className={styles.optionsNumber}
                disabled={!chargeCustomer}
                value={category9}
                min={39}
                onChange={(event) => setCategory9(event.target.value)}
              />
              <input
                style={{
                  border: isSaveBtnDisabled
                    ? "1px solid grey"
                    : "1px solid white",
                }}
                type="number"
                className={styles.optionsNumber}
                disabled={!chargeCustomer}
                value={category10}
                min={19}
                onChange={(event) => setCategory10(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.barChart}>
          {chargeCustomer && (
            <BarChart
              width={720}
              height={300}
              data={barGraphData}
              barSize={20}
              // barGap={1}
              margin={{ top: 20, right: 50, left: 10, bottom: 20 }}
            >
              <XAxis dataKey="name" />
              <YAxis tick={() => null} />
              <Tooltip />
              <Bar dataKey="y" fill="#8884d8" />
            </BarChart>
          )}
        </div>
        <span style={{ color: "greenyellow" }}>{message}</span>
        <button
          style={{
            backgroundColor: isSaveBtnDisabled ? "grey" : "#6741d9",
            border: isSaveBtnDisabled ? "1px solid grey" : "1px solid #6741d9",
          }}
          className={styles.saveBtn}
          onClick={clickSaveBtn}
          disabled={isSaveBtnDisabled}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
