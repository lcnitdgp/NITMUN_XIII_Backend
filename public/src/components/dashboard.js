import React from "react";
import "./dashboard.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Children, useState, useEffect } from "react";
//import { param } from "../../../backend/routes/auth";

function Dashboard() {
  const params = useParams();
  
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
  const[paymentupdate,setPaymentupdate]=useState("");
  const [paid,setPaid]=useState(false);
  const [paidto, setPaidto] = useState([{}]);
  const [amount, setAmount] = useState([{}]);
  const [hall, setHall] = useState([{}]);
  


  const getData = () => {
    axios
      .get("https://nitmun-xii-backend.onrender.com/api/dashboard")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data[1].name);
        setData(data);
      });
  }
  useEffect(() => {
    getData();
    console.log(data)
  }, []);

  function payFunction() {
    window.location = "/api/payments";
    console.log("Clicked");
  }

  if(committeef1=="ALL"||committeef2=="ALL"||committeef3=="ALL"||yearf=="ALL"||institutef=="ALL"||Alloted=="ALL"){
    window.location("/");
  }
  
  let datas = data.map((user) => {
    const handleSubmit = async (e) => {
      e.preventDefault();

      await axios
        .post(`https://nitmun-xii-backend.onrender.com/api/updatecommittee/${user._id}`, {
          committeeAlloted: committeeAlloted,
        })
        .then((res) => {
          console.log("Submitted, thank you!");
        });
    };
    const handleSubmit1 = async (e) => {
      e.preventDefault();

      await axios
        .post(`https://nitmun-xii-backend.onrender.com/api/updateportfolio/${user._id}`, {
          portfolioAlloted: portfolioAlloted,
        })
        .then((res) => {
          console.log("Submitted, thank you!");
        });
    };
    const handleSubmit2 = async (e) => {
      e.preventDefault();

      await axios
        .post(`https://nitmun-xii-backend.onrender.com/api/allotmentmail/${user._id}`, {
          Allotedmail:true,  
        })
        .then((res) => {
          setAllotedmail(true);
          console.log("sent mail, thank you!");
        });
    };
    const handleSubmit3 = async (e) => {
      e.preventDefault();

      await axios
        .post(`https://nitmun-xii-backend.onrender.com/api/updatepaid/${user._id}`, {
          paid: true,  
        })
        .then((res) => {
          setPaymentupdate(true);
          console.log("Submitted, thank you!");
        });
    };
    const handleSubmit4 = async (e) => {
      e.preventDefault();

      await axios
        .post(`https://nitmun-xii-backend.onrender.com/api/paymentmail/${user._id}`, {
          paid: true,  
        })
        .then((res) => {
          setPaymentupdate(true);
          console.log(res)
          console.log("confirmation email sent");
        });
    };
    const handleSubmit5 = async (e) => {
      e.preventDefault();

      await axios
        .post(`https://nitmun-xii-backend.onrender.com/api/payments/${user._id}`, {
        paidto : paidto,
        amount : amount
        })
        .then((res) => {
          setPaymentupdate(true);
          console.log("Paisa aa gaya, thank you!");
        });
    };


    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.institute}</td>
        <td>{user.year}</td>
        <td>{user.roll}</td>
        <td>{user.hall}</td>
        <td>{user.committee1}</td>
        <td>{user.preference1}</td>
        <td>{user.committee2}</td>
        <td>{user.preference2}</td>
        <td>{user.committee3}</td>
        <td>{user.preference3}</td>
        <td>{user.committeeAlloted}</td>
        <td>{user.portfolioAlloted}</td>
        <td>{user.experience}</td>
        <td>
          <form class="">
            <select
              name="committeeAlloted"
              id="committee"
              className="input"
              onChange={(e) => {
                setCommitteeAlloted(e.target.value);
              }}
            >
              <option value="">Committees</option>
              <option value="AIPPM">AIPPM</option>
              <option value="UNGA">UNGA</option>
              <option value="UNSC">UNSC</option>
              <option value="IP">IP</option>
            </select>
            <button type="submit" id="save" onClick={handleSubmit}>
              Save
            </button>
          </form>
        </td>
        
        {/* ()=> {handleSubmit() && setName(user.name)}   */}
        <td>
          <input
            type="text"
            value={portfolioAlloted}
            onChange={(e) => {
              setPortfolioAlloted(e.target.value);
            }}
            name="portfolioAlloted"
            id="portfolioAlloted"
          />
          <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
        </td>
        <td></td>
        <td>
          <button type="submit" id="save" onClick={handleSubmit2} style={
                  user.Allotedmail !==true
                    ? { display: "block" }
                    : { display: "none" }
                }>
           Allotment mail 
          </button>
          <button type="submit" id="save" onClick={handleSubmit4} style={
                  user.Allotedmail ==true && user.paymentupdate!=true
                    ? { display: "block" }
                    : { display: "none" }
                }>

           Confirmation mail 
          </button>
          
          <button type="submit" id="save" onClick={handleSubmit4} style={
                  user.Paymentupdate == true && user.paid != true
                    ? { display: "block" }
                    : { display: "none" }
                }>
           Confirm payment 
          </button>
          <button type="submit" id="save"  style={
                  user.paid==true
                    ? { display: "block" }
                    : { display: "none" }
                }>
           Registration Complete
          </button>
        </td>
        <td>
          <form>
            <label>Amount</label>
            <input type="number"  name=  "amount" required value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}></input>
            <label>Paid To</label>
            <input type="text" name= "paidto" id=""
            value={paidto}
            onChange={(e) => {
              setPaidto(e.target.value);
            }}></input>
            <button class="saveBtn" onClick={handleSubmit5}>save</button>
          </form>
        </td>
      </tr>
    );
  });
  if (committeef1) {
    datas = data
      .filter((data) => data.committee1 == committeef1)
      .map((user) => {
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatecommittee/${user._id}`, {
              committeeAlloted: committeeAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit1 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updateportfolio/${user._id}`, {
              portfolioAlloted: portfolioAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit2 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/allotmentmail/${user._id}`, {
              Allotedmail: true,  
            })
            .then((res) => {
              // setAllotedmail(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit3 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatepaid/${user._id}`, {
              paymentupdate: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit4 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/paymentmail/${user._id}`, {
              paid: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit5 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/payments/${user._id}`, {
            paidto : paidto,
            amount : amount
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
    
    
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.institute}</td>
            <td>{user.year}</td>
            <td>{user.roll}</td>
            <td>{user.committee1}</td>
            <td>{user.preference1}</td>
            <td>{user.committee2}</td>
            <td>{user.preference2}</td>
            <td>{user.committee3}</td>
            <td>{user.preference3}</td>
            <td>{user.committeeAlloted}</td>
            <td>{user.portfolioAlloted}</td>
            <td>{user.experience}</td>
            <td>
              <form class="">
                <select
                  name="committeeAlloted"
                  id="committee"
                  className="input"
                  onChange={(e) => {
                    setCommitteeAlloted(e.target.value);
                  }}
                >
                  <option value="">Committees</option>
                  <option value="AIPPM">AIPPM</option>
                  <option value="UNGA">UNGA</option>
                  <option value="UNSC">UNSC</option>
                  <option value="IP">IP</option>
                </select>
                <button type="submit" id="save" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </td>
            
            {/* ()=> {handleSubmit() && setName(user.name)}   */}
            <td>
              <input
                type="text"
                value={portfolioAlloted}
                onChange={(e) => {
                  setPortfolioAlloted(e.target.value);
                }}
                name="portfolioAlloted"
                id="portfolioAlloted"
              />
              <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
            </td>
            <td></td>
            <td>
              <button type="submit" id="save" onClick={handleSubmit2} style={
                      user.Allotedmail != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Allotment mail 
              </button>
              <button type="submit" id="save" onClick={handleSubmit3} style={
                      user.Allotedmail == true && user.paymentupdate!=true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
    
               Allotment mail 
              </button>
              
              <button type="submit" id="save" onClick={handleSubmit4} style={
                      user.Paymentupdate == true && user.paid != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Confirm payment 
              </button>
              <button type="submit" id="save"  style={
                      user.paid==true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Registration Complete
              </button>
            </td>
            <td>
              <form>
                <label>Amount</label>
                <input type="number"  name=  "amount" required value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}></input>
                <label>Paid To</label>
                <input type="text" name= "paidto" id=""
                value={paidto}
                onChange={(e) => {
                  setPaidto(e.target.value);
                }}></input>
                <button class="saveBtn" onClick={handleSubmit5}>save</button>
              </form>
            </td>
          </tr>
        );
      });
  }
 
  if (committeef2) {
    datas = data
      .filter((data) => data.committee2 == committeef2)
      .map((user) => {
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatecommittee/${user._id}`, {
              committeeAlloted: committeeAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit1 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updateportfolio/${user._id}`, {
              portfolioAlloted: portfolioAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit2 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/allotmentmail/${user._id}`, {
              Allotedmail: true,  
            })
            .then((res) => {
              // setAllotedmail(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit3 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatepaid/${user._id}`, {
              paymentupdate: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit4 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/paymentmail/${user._id}`, {
              paid: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit5 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/payments/${user._id}`, {
            paidto : paidto,
            amount : amount
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
    
    
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.institute}</td>
            <td>{user.year}</td>
            <td>{user.roll}</td>
            <td>{user.committee1}</td>
            <td>{user.preference1}</td>
            <td>{user.committee2}</td>
            <td>{user.preference2}</td>
            <td>{user.committee3}</td>
            <td>{user.preference3}</td>
            <td>{user.committeeAlloted}</td>
            <td>{user.portfolioAlloted}</td>
            <td>{user.experience}</td>
            <td>
              <form class="">
                <select
                  name="committeeAlloted"
                  id="committee"
                  className="input"
                  onChange={(e) => {
                    setCommitteeAlloted(e.target.value);
                  }}
                >
                  <option value="">Committees</option>
                  <option value="AIPPM">AIPPM</option>
                  <option value="UNGA">UNGA</option>
                  <option value="UNSC">UNSC</option>
                  <option value="IP">IP</option>
                </select>
                <button type="submit" id="save" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </td>
            
            {/* ()=> {handleSubmit() && setName(user.name)}   */}
            <td>
              <input
                type="text"
                value={portfolioAlloted}
                onChange={(e) => {
                  setPortfolioAlloted(e.target.value);
                }}
                name="portfolioAlloted"
                id="portfolioAlloted"
              />
              <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
            </td>
            <td></td>
            <td>
              <button type="submit" id="save" onClick={handleSubmit2} style={
                      user.Allotedmail != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Allotment mail 
              </button>
              <button type="submit" id="save" onClick={handleSubmit3} style={
                      user.Allotedmail == true && user.paymentupdate!=true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
    
               Allotment mail 
              </button>
              
              <button type="submit" id="save" onClick={handleSubmit4} style={
                      user.Paymentupdate == true && user.paid != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Confirm payment 
              </button>
              <button type="submit" id="save"  style={
                      user.paid==true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Registration Complete
              </button>
            </td>
            <td>
              <form>
                <label>Amount</label>
                <input type="number"  name=  "amount" required value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}></input>
                <label>Paid To</label>
                <input type="text" name= "paidto" id=""
                value={paidto}
                onChange={(e) => {
                  setPaidto(e.target.value);
                }}></input>
                <button class="saveBtn" onClick={handleSubmit5}>save</button>
              </form>
            </td>
          </tr>
        );
      });
  }
  if (Alloted) {
    datas = data
      .filter((data) => data.committeeAlloted == Alloted)
      .map((user) => {
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatecommittee/${user._id}`, {
              committeeAlloted: committeeAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit1 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updateportfolio/${user._id}`, {
              portfolioAlloted: portfolioAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit2 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/allotmentmail/${user._id}`, {
              Allotedmail: true,  
            })
            .then((res) => {
              // setAllotedmail(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit3 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatepaid/${user._id}`, {
              paymentupdate: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit4 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/paymentmail/${user._id}`, {
              paid: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit5 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/payments/${user._id}`, {
            paidto : paidto,
            amount : amount
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
    
    
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.institute}</td>
            <td>{user.year}</td>
            <td>{user.roll}</td>
            <td>{user.committee1}</td>
            <td>{user.preference1}</td>
            <td>{user.committee2}</td>
            <td>{user.preference2}</td>
            <td>{user.committee3}</td>
            <td>{user.preference3}</td>
            <td>{user.committeeAlloted}</td>
            <td>{user.portfolioAlloted}</td>
            <td>{user.experience}</td>
            <td>
              <form class="">
                <select
                  name="committeeAlloted"
                  id="committee"
                  className="input"
                  onChange={(e) => {
                    setCommitteeAlloted(e.target.value);
                  }}
                >
                  <option value="">Committees</option>
                  <option value="AIPPM">AIPPM</option>
                  <option value="UNGA">UNGA</option>
                  <option value="UNSC">UNSC</option>
                  <option value="IP">IP</option>
                </select>
                <button type="submit" id="save" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </td>
            
            {/* ()=> {handleSubmit() && setName(user.name)}   */}
            <td>
              <input
                type="text"
                value={portfolioAlloted}
                onChange={(e) => {
                  setPortfolioAlloted(e.target.value);
                }}
                name="portfolioAlloted"
                id="portfolioAlloted"
              />
              <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
            </td>
            <td></td>
            <td>
              <button type="submit" id="save" onClick={handleSubmit2} style={
                      user.Allotedmail != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Allotment mail 
              </button>
              <button type="submit" id="save" onClick={handleSubmit3} style={
                      user.Allotedmail == true && user.paymentupdate!=true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
    
               Allotment mail 
              </button>
              
              <button type="submit" id="save" onClick={handleSubmit4} style={
                      user.Paymentupdate == true && user.paid != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Confirm payment 
              </button>
              <button type="submit" id="save"  style={
                      user.paid==true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Registration Complete
              </button>
            </td>
            <td>
              <form>
                <label>Amount</label>
                <input type="number"  name=  "amount" required value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}></input>
                <label>Paid To</label>
                <input type="text" name= "paidto" id=""
                value={paidto}
                onChange={(e) => {
                  setPaidto(e.target.value);
                }}></input>
                <button class="saveBtn" onClick={handleSubmit5}>save</button>
              </form>
            </td>
          </tr>
        );
      });
  }
  if (yearf) {
    datas = data
      .filter((data) => data.year == yearf)
      .map((user) => {
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatecommittee/${user._id}`, {
              committeeAlloted: committeeAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit1 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updateportfolio/${user._id}`, {
              portfolioAlloted: portfolioAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit2 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/allotmentmail/${user._id}`, {
              Allotedmail: true,  
            })
            .then((res) => {
              // setAllotedmail(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit3 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatepaid/${user._id}`, {
              paymentupdate: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit4 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/paymentmail/${user._id}`, {
              paid: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit5 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/payments/${user._id}`, {
            paidto : paidto,
            amount : amount
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
    
    
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.institute}</td>
            <td>{user.year}</td>
            <td>{user.roll}</td>
            <td>{user.committee1}</td>
            <td>{user.preference1}</td>
            <td>{user.committee2}</td>
            <td>{user.preference2}</td>
            <td>{user.committee3}</td>
            <td>{user.preference3}</td>
            <td>{user.committeeAlloted}</td>
            <td>{user.portfolioAlloted}</td>
            <td>{user.experience}</td>
            <td>
              <form class="">
                <select
                  name="committeeAlloted"
                  id="committee"
                  className="input"
                  onChange={(e) => {
                    setCommitteeAlloted(e.target.value);
                  }}
                >
                  <option value="">Committees</option>
                  <option value="AIPPM">AIPPM</option>
                  <option value="UNGA">UNGA</option>
                  <option value="UNSC">UNSC</option>
                  <option value="IP">IP</option>
                </select>
                <button type="submit" id="save" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </td>
            
            {/* ()=> {handleSubmit() && setName(user.name)}   */}
            <td>
              <input
                type="text"
                value={portfolioAlloted}
                onChange={(e) => {
                  setPortfolioAlloted(e.target.value);
                }}
                name="portfolioAlloted"
                id="portfolioAlloted"
              />
              <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
            </td>
            <td></td>
            <td>
              <button type="submit" id="save" onClick={handleSubmit2} style={
                      user.Allotedmail != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Allotment mail 
              </button>
              <button type="submit" id="save" onClick={handleSubmit3} style={
                      user.Allotedmail == true && user.paymentupdate!=true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
    
               Allotment mail 
              </button>
              
              <button type="submit" id="save" onClick={handleSubmit4} style={
                      user.Paymentupdate == true && user.paid != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Confirm payment 
              </button>
              <button type="submit" id="save"  style={
                      user.paid==true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Registration Complete
              </button>
            </td>
            <td>
              <form>
                <label>Amount</label>
                <input type="number"  name=  "amount" required value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}></input>
                <label>Paid To</label>
                <input type="text" name= "paidto" id=""
                value={paidto}
                onChange={(e) => {
                  setPaidto(e.target.value);
                }}></input>
                <button class="saveBtn" onClick={handleSubmit5}>save</button>
              </form>
            </td>
          </tr>
        );
      });
  }
  if (institutef) {
    datas = data
      .filter((data) => data.institute == institutef)
      .map((user) => {
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatecommittee/${user._id}`, {
              committeeAlloted: committeeAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit1 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updateportfolio/${user._id}`, {
              portfolioAlloted: portfolioAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit2 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/allotmentmail/${user._id}`, {
              Allotedmail: true,  
            })
            .then((res) => {
              // setAllotedmail(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit3 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatepaid/${user._id}`, {
              paymentupdate: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit4 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/paymentmail/${user._id}`, {
              paid: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit5 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/payments/${user._id}`, {
            paidto : paidto,
            amount : amount
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
    
    
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.institute}</td>
            <td>{user.year}</td>
            <td>{user.roll}</td>
            <td>{user.committee1}</td>
            <td>{user.preference1}</td>
            <td>{user.committee2}</td>
            <td>{user.preference2}</td>
            <td>{user.committee3}</td>
            <td>{user.preference3}</td>
            <td>{user.committeeAlloted}</td>
            <td>{user.portfolioAlloted}</td>
            <td>{user.experience}</td>
            <td>
              <form class="">
                <select
                  name="committeeAlloted"
                  id="committee"
                  className="input"
                  onChange={(e) => {
                    setCommitteeAlloted(e.target.value);
                  }}
                >
                  <option value="">Committees</option>
                  <option value="AIPPM">AIPPM</option>
                  <option value="UNGA">UNGA</option>
                  <option value="UNSC">UNSC</option>
                  <option value="IP">IP</option>
                </select>
                <button type="submit" id="save" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </td>
            
            {/* ()=> {handleSubmit() && setName(user.name)}   */}
            <td>
              <input
                type="text"
                value={portfolioAlloted}
                onChange={(e) => {
                  setPortfolioAlloted(e.target.value);
                }}
                name="portfolioAlloted"
                id="portfolioAlloted"
              />
              <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
            </td>
            <td></td>
            <td>
              <button type="submit" id="save" onClick={handleSubmit2} style={
                      user.Allotedmail != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Allotment mail 
              </button>
              <button type="submit" id="save" onClick={handleSubmit3} style={
                      user.Allotedmail == true && user.paymentupdate!=true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
    
               Allotment mail 
              </button>
              
              <button type="submit" id="save" onClick={handleSubmit4} style={
                      user.Paymentupdate == true && user.paid != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Confirm payment 
              </button>
              <button type="submit" id="save"  style={
                      user.paid==true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Registration Complete
              </button>
            </td>
            <td>
              <form>
                <label>Amount</label>
                <input type="number"  name=  "amount" required value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}></input>
                <label>Paid To</label>
                <input type="text" name= "paidto" id=""
                value={paidto}
                onChange={(e) => {
                  setPaidto(e.target.value);
                }}></input>
                <button class="saveBtn" onClick={handleSubmit5}>save</button>
              </form>
            </td>
          </tr>
        );
      });
  }
  if (committeef3) {
    datas = data
      .filter((data) => data.committee3 == committeef3)
      .map((user) => {
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatecommittee/${user._id}`, {
              committeeAlloted: committeeAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit1 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updateportfolio/${user._id}`, {
              portfolioAlloted: portfolioAlloted,
            })
            .then((res) => {
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit2 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/allotmentmail/${user._id}`, {
              Allotedmail: true,  
            })
            .then((res) => {
              // setAllotedmail(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit3 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/updatepaid/${user._id}`, {
              paymentupdate: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit4 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/paymentmail/${user._id}`, {
              paid: true,  
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
        const handleSubmit5 = async (e) => {
          e.preventDefault();
    
          await axios
            .post(`https://nitmunbackend.lcnitd.co.in/api/payments/${user._id}`, {
            paidto : paidto,
            amount : amount
            })
            .then((res) => {
              // setPaymentupdate(true);
              console.log("Submitted, thank you!");
            });
        };
    
    
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.institute}</td>
            <td>{user.year}</td>
            <td>{user.roll}</td>
            <td>{user.committee1}</td>
            <td>{user.preference1}</td>
            <td>{user.committee2}</td>
            <td>{user.preference2}</td>
            <td>{user.committee3}</td>
            <td>{user.preference3}</td>
            <td>{user.committeeAlloted}</td>
            <td>{user.portfolioAlloted}</td>
            <td>{user.experience}</td>
            <td>
              <form class="">
                <select
                  name="committeeAlloted"
                  id="committee"
                  className="input"
                  onChange={(e) => {
                    setCommitteeAlloted(e.target.value);
                  }}
                >
                  <option value="">Committees</option>
                  <option value="AIPPM">AIPPM</option>
                  <option value="UNGA">UNGA</option>
                  <option value="UNSC">UNSC</option>
                  <option value="IP">IP-</option>
                </select>
                <button type="submit" id="save" onClick={handleSubmit}>
                  Save
                </button>
              </form>
            </td>
            
            {/* ()=> {handleSubmit() && setName(user.name)}   */}
            <td>
              <input
                type="text"
                value={portfolioAlloted}
                onChange={(e) => {
                  setPortfolioAlloted(e.target.value);
                }}
                name="portfolioAlloted"
                id="portfolioAlloted"
              />
              <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
            </td>
            <td></td>
            <td>
              <button type="submit" id="save" onClick={handleSubmit2} style={
                      user.Allotedmail != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Allotment mail 
              </button>
              <button type="submit" id="save" onClick={handleSubmit3} style={
                      user.Allotedmail == true && user.paymentupdate!=true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
    
               Allotment mail 
              </button>
              
              <button type="submit" id="save" onClick={handleSubmit4} style={
                      user.Paymentupdate == true && user.paid != true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Confirm payment 
              </button>
              <button type="submit" id="save"  style={
                      user.paid==true
                        ? { display: "block" }
                        : { display: "none" }
                    }>
               Registration Complete
              </button>
            </td>
            <td>
              <form>
                <label>Amount</label>
                <input type="number"  name=  "amount" required value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}></input>
                <label>Paid To</label>
                <input type="text" name= "paidto" id=""
                value={paidto}
                onChange={(e) => {
                  setPaidto(e.target.value);
                }}></input>
                <button class="saveBtn" onClick={handleSubmit5}>save</button>
              </form>
            </td>
          </tr>
        );
      });
  }
  return (
    <div>
      <div class="top">
        <h1>All Participants</h1>
        <button id="myButton" onClick={payFunction}>
          Payment Details
        </button>
        <script src="../public/paydet.js"></script>
      </div>
      <div class="body-wrapper">
        <div class="table-wrapper">
          <table id="emp-table">
            {/* <thead> */}
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone no.</th>
            <th>
              Institute
              <select class="table-filter"
              value={institutef}
              onChange={(e) => {
                setInstitutef(e.target.value);
              }}>
                <option value="ALL">ALL</option>
                <option value="NIT Durgapur">NIT Durgapur</option>
                <option value="other">other</option>
              </select>
            </th>
            <th>
              Year
              <select class="table-filter"
              value={yearf}
              onChange={(e) => {
                setYearf(e.target.value);
              }}>
                <option value="ALL">ALL</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </th>
            <th>Roll Number</th>
            <th>
              Hall
              <select class="table-filter"
              value={hall}
              onChange={(e) => {
                setHall(e.target.value);
              }}>
                <option value="ALL">ALL</option>
                <option value="Hall 14">Hall 14</option>
                <option value="Hall 10">Hall 10</option>
              </select>
            </th>
            <th>
              Committee 1
              <select
                class="table-filter"
                value={committeef1}
                onChange={(e) => {
                  setCommitteef1(e.target.value);
                }}
              >
                <option value="ALL">ALL</option>
                <option value="UNGA-DISEC">UNGA-DISEC</option>
                <option value="UNGA-SPECPOL">UNGA-SPECPOL</option>
                <option value="AIPPM">AIPPM</option>
                <option value="IP">IP</option>
              </select>
            </th>
            <th>Preferance 1</th>
            <th>
              Committee 2
              <select
                class="table-filter"
                value={committeef2}
                onChange={(e) => {
                  setCommitteef2(e.target.value);
                }}
              >
                
                <option value="ALL">ALL</option><option value="UNGA-DISEC">UNGA-DISEC</option>
                <option value="UNGA_SPECPOL">UNGA-SPECPOL</option>
                <option value="AIPPM">AIPPM</option>
                <option value="IP">IP</option>
              </select>
            </th>
            <th>Preferance 1</th>
            <th>
              Committee 3
              <select
                class="table-filter"
                value={committeef3}
                onChange={(e) => {
                  setCommitteef3(e.target.value);
                }}
              >
                <option value="ALL">ALL</option>
                <option value="UNGA-DISEC">UNGA-DISEC</option>
                <option value="UNGA-SPECPOL">UNGA-SPECPOL</option>
                <option value="AIPPM">AIPPM</option>
                <option value="IP">IP</option>
              </select>
            </th>
            <th>Preferance 1</th>
            <th>
              Committee Alloted
              <select
                class="table-filter"
                value={Alloted}
                onChange={(e) => {
                  setAllotedCommittee(e.target.value);
                }}
              >
                
                <option value="ALL">ALL</option>
                <option value="UNGA-DISEC">UNGA-DISEC</option>
                <option value="UNGA_SPECPOL">UNGA-SPECPOL</option>
                <option value="AIPPM">AIPPM</option>
                <option value="IP">IP</option>
              </select>
            </th>
            <th>portfolioAlloted</th>
            <div className="experience">
              <th>Experience</th>
            </div>
            <th>Allot Committee</th>
            <th>Allot Portfolio</th>
            <th>
              Status
              <select class="table-filter">
                <option value="all">Alloted</option>
                <option value="all">Not Alloted</option>
              </select>
            </th>
            <th>Payment Mail</th>
            <th>
              Paid to
            </th>
            <th>Confirmation mail</th>

            <tbody>{datas}</tbody>
          </table>
        </div>
      </div>
    </div>
  );


}

export default Dashboard;