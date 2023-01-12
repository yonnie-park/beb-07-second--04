import { React } from "react";
import "./style.css";
import "./Main.css";
import Write from "../components/Write";
import TweetList from "../components/TweetList";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Main() {
  const [userConnected, setUserConnect] = useState(false);
  const [userId, setUserId] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      const userId = location.state.account.user_id;
      setUserId(userId);
      setUserConnect(true);
    }
  }, []);

  return (
    <div className="container">
      <div>
        {userConnected ? (
          <div id="write">
            <Write user_id={userId} />
          </div>
        ) : (
          <div id="write">
            <Write />
          </div>
        )}
      </div>
      <div id="contentBox">
        <TweetList />
      </div>
    </div>
  );
}
