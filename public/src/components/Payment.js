import React from "react";
import "./dashboard.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Payment() {
  const [data, setData] = useState([{}]);
  const [Name, setName] = useState([{}]);
  const [committeeAlloted, setCommitteeAlloted] = useState([{}]);
  const [portfolioAlloted, setPortfolioAlloted] = useState([{}]);
  const [committeef1, setCommitteef1] = useState("");
  const [committeef3, setCommitteef3] = useState("");
  const [committeef2, setCommitteef2] = useState("");
  const [Alloted, setAllotedCommittee] = useState("");
  const [institutef, setInstitutef] = useState("");
  const [yearf, setYearf] = useState("");
  const [Allotedmail, setAllotedmail] = useState("");
  const [paid,setPaid]=useState(false);

  function getData() {
    axios
      .get("https://nitmun-xii-backend.onrender.com/api/payments")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data[1].name);
        setData(data);
      });
  }
  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  let datas = data.map((user) => {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.amount}</td>
        <td>{user.paidto}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.institute}</td>
        <td>{user.committeeAlloted}</td>
        <td>{user.portfolioAlloted}</td>
        <td>{user.Date}</td>
        <td>{user.committee1}</td>
        <td>{user.preference1}</td>
        <td>{user.committee2}</td>
        <td>{user.preference2}</td>
        <td>{user.committee3}</td>
        <td>{user.preference3}</td>
      </tr>
    );
  });

  return (
    <div>
      <div class="top">
        <h1>Payment Details</h1>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Paid To</th>
            <th>Email</th>
            <th>Ph. No</th>
            <th>Institute</th>
            <th>Committee</th>
            <th>Portfolio</th>
            <th>Date</th>
            <th>committee1</th>
            <th>Preference1</th>
            <th>committee2</th>
            <th>Preference2</th>
            <th>committee3</th>
            <th>Prefernce3</th>
          </tr>
        </thead>
        <tbody>{datas}</tbody>
      </table>
    </div>
  );
}

export default Payment;
