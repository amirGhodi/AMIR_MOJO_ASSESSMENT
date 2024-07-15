import React, { useState } from "react";
import FacebookLoginButton from "./components/FacebookLoginButton";
import UserProfile from "./components/UserProfile";
import PageListDropdown from "./components/PageListDropdown";
import PageInsights from "./components/PageInsights";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [dateRange, setDateRange] = useState({ since: "", until: "" });
  const backendURL =
    process.env.REACT_APP_BACKEND_URL || "https://localhost:5000";

  const responseFacebook = async (response) => {
    setUser(response);
    try {
      const res = await axios.post(`${backendURL}/api/facebook/pages`, {
        accessToken: response.accessToken,
      });
      if (Array.isArray(res.data.data)) {
        setPages(res.data.data);
      } else {
        console.error("Expected an array but received:", res.data.data);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const selectedPageAccessToken = await getPageAccessToken(selectedPage);
      const res = await axios.post(`${backendURL}/api/facebook/insights`, {
        pageId: selectedPage,
        accessToken: selectedPageAccessToken,
        since: dateRange.since,
        until: dateRange.until,
      });
      const extractedData = extractInsightsData(res.data);
      setInsights(extractedData);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const getPageAccessToken = async (pageId) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v12.0/${pageId}`,
        {
          params: {
            fields: "access_token",
            access_token: user.accessToken,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching page access token:", error);
      throw new Error("Page access token not found");
    }
  };

  const extractInsightsData = (apiResponse) => {
    const insights = {
      totalFans: null,
      totalEngagement: null,
      totalImpressions: null,
      totalReactions: null,
    };

    apiResponse.forEach((insightGroup) => {
      insightGroup.data.forEach((insight) => {
        switch (insight.name) {
          case "page_fans":
            insights.totalFans = insight.values[0]?.value;
            break;
          case "page_post_engagements":
            insights.totalEngagement = insight.values[0]?.value;
            break;
          case "page_impressions":
            insights.totalImpressions = insight.values[0]?.value;
            break;
          case "page_actions_post_reactions_total":
            insights.totalReactions = Object.keys(
              insight.values[0]?.value || {}
            ).reduce((sum, key) => {
              return sum + (insight.values[0].value[key] || 0);
            }, 0);
            break;
          default:
            break;
        }
      });
    });
    return insights;
  };

  return (
    <div className="App">
      {!user ? (
        <FacebookLoginButton responseFacebook={responseFacebook} />
      ) : (
        <>
          <UserProfile user={user} />
          <PageListDropdown pages={pages} handleChange={handlePageChange} />
          <div>
            <label>
              Since:
              <input
                type="date"
                name="since"
                value={dateRange.since}
                onChange={handleDateChange}
              />
            </label>
            <label>
              Until:
              <input
                type="date"
                name="until"
                value={dateRange.until}
                onChange={handleDateChange}
              />
            </label>
          </div>
          <button onClick={handleSubmit}>Get Insights</button>
          <PageInsights insights={insights} />
        </>
      )}
    </div>
  );
}

export default App;
