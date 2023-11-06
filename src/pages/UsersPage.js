import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Content from "../components/users/Content";
import "./Page.css";
import CircularProgress from "@mui/material/CircularProgress";
import ImagesModal from "../components/users/ImagesModal";

function App() {
  const [sessionApiData, setApiData] = useState(null);
  const [statsApiData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const fetchSessionData = async (
    machine_id = "",
    phone_numbe = "",
    start_date = "",
    end_date = "",
    filterCall = false
  ) => {
    try {
      const response = await fetch(
        "https://zerofill-webapp02.azurewebsites.net/api/session/query?limit=1000000000000",
        {
          method: "POST",
          headers: {
            Authorization: "Token 97906891eae54f1478f808e6e313cabaae773fc8",
          },
          body: new URLSearchParams({
            machine_id: machine_id,
            phone_number: phone_numbe,
            start_date: start_date,
            end_date: end_date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && filterCall) {
        console.log("hiiii");
        fetchStatsData(machine_id, phone_numbe, start_date, end_date);
      }
      if (data && !filterCall) {
        fetchStatsData((machine_id = data?.results[0]?.machine));
      }
      console.log(data, "data");
      setApiData(data);
      if (!data) {
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchStatsData = async (
    machine_id = "",
    phone_numbe = "",
    start_date = "",
    end_date = ""
  ) => {
    try {
      const response = await fetch(
        "https://zerofill-webapp02.azurewebsites.net/api/session/query/stats",
        {
          method: "POST",
          headers: {
            Authorization: "Token 97906891eae54f1478f808e6e313cabaae773fc8",
          },
          body: new URLSearchParams({
            machine_id: machine_id,
            phone_number: phone_numbe,
            start_date: start_date,
            end_date: end_date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "statsData");
      setStatsData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);
  const applyButtonAction = (machine_id, phone_numbe, start_date, end_date) => {
    console.log("hiii", machine_id, phone_numbe, start_date, end_date);
    setIsLoading(true);
    let filterCall = true;
    fetchSessionData(machine_id, phone_numbe, start_date, end_date, filterCall);
  };
  const openModal = (sessionId) => {
    setIsModalOpen(true);
    setSessionId(sessionId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="app">

      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="main-content">
        <div style={{ margin: 20 }}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : error ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <p>Something bad happened Please reload the page </p>
              {/* <Button variant="contained" color="primary" onClick={fetchSessionData('','','','')}>
      Retry
    </Button> */}
            </div>
          ) : (
            <Content
              data={sessionApiData}
              fetchSessionData={fetchSessionData}
              statsApiData={statsApiData}
              apply={applyButtonAction}
              openModal={openModal}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <ImagesModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          session_id={sessionId}
        />
      )}
    </div>
  );
}

export default App;
