import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

function App() {
  const [userChat, setUserChat] = useState("hello");
  const [userChat2, setUserChat2] = useState("hello");
  const [botChat, setBotChat] = useState("hello");
  const [botChat2, setBotChat2] = useState("hello");
  const [moodScore, setMoodScore] = useState("hello");
  const [rightScore, setRightScore] = useState("hello");

  const additem = async () => {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        "Description item": {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "Tomatoes",
              },
            },
          ],
        },
        "Value item": {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "asdfasdf",
              },
            },
          ],
        },
        "Status item": {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "asdfasdf",
              },
            },
          ],
        },
      },
    });
    console.log(response);
  };

  const firstUserChatChange = ({ target: { value } }) => {
    setUserChat(value);
  };

  const firstUserChatSubmit = async event => {
    event.preventDefault();
    const url =
      "http://ec2-54-180-203-163.ap-northeast-2.compute.amazonaws.com/AI/sendMessage/";
    try {
      const { data } = await axios.post(url, {
        headers: {
          "Access-Contorl-Allow-Origin": "*",
        },
        msg: userChat,
      });
      setBotChat(data[2]);
    } catch (e) {
      console.log(e);
    }
  };

  const secondUserChatChange = ({ target: { value } }) => {
    setUserChat2(value);
  };

  const secondUserChatSubmit = async event => {
    event.preventDefault();
    const url =
      "http://ec2-54-180-203-163.ap-northeast-2.compute.amazonaws.com/AI/sendMessage/";
    try {
      const { data } = await axios.post(url, {
        headers: {
          "Access-Contorl-Allow-Origin": "*",
        },
        msg: userChat2,
      });
      setBotChat2(data[2]);
    } catch (e) {
      console.log(e);
    }
  };

  const resultSubmit = () => {
    console.log(userChat, botChat, userChat2, botChat2, moodScore, rightScore);
    additem();
  };

  return (
    <>
      <h1>심심이 평가표</h1>
      <form onSubmit={firstUserChatSubmit}>
        <input
          class="userChat"
          type="text"
          name="userChat1"
          onChange={firstUserChatChange}
        />
        <button>첫번째 챗</button>
      </form>
      <div>{botChat}</div>
      <form onSubmit={secondUserChatSubmit}>
        <input
          class="userChat"
          type="text"
          name="userChat2"
          onChange={secondUserChatChange}
        />
        <button>두번째 챗</button>
      </form>
      <div>{botChat2}</div>
      {botChat && botChat2 ? (
        <>
          <div>상황 적합성</div>
          <div>{moodScore}</div>
          <button onClick={e => setMoodScore(e.target.innerHTML)}> 1</button>
          <button onClick={e => setMoodScore(e.target.innerHTML)}> 2</button>
          <div>상황 적합성</div>
          <div>{rightScore}</div>
          <button onClick={e => setRightScore(e.target.innerHTML)}> 1</button>
          <button onClick={e => setRightScore(e.target.innerHTML)}> 2</button>
        </>
      ) : null}
      {userChat &&
      userChat &&
      botChat &&
      botChat2 &&
      moodScore &&
      rightScore ? (
        <button onClick={resultSubmit}>제출</button>
      ) : null}

      {/* <input class="moodScore" type="number" />
      <input class="moodScore" type="button" value="0" />
      <input class="moodScore" type="button" value="1" />
      <input class="moodScore" type="button" value="2" />
      <input class="moodScore" type="button" value="3" />
      <input class="moodScore" type="button" value="4" />
      <input class="rightScore" type="number" />
      <input class="rightScore" type="button" value="0" />
      <input class="rightScore" type="button" value="1" />
      <input class="rightScore" type="button" value="2" />
      <input class="rightScore" type="button" value="3" />
      <input class="rightScore" type="button" value="4" />
      <button>0</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button> */}
    </>
  );
}

export default App;
