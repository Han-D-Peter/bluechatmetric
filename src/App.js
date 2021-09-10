import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import dotenv from "dotenv";

dotenv.config();

const Header = styled.div`
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Body = styled.div`
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div``;

const ContainerInput = styled.input`
  border: 0;
  border-bottom: 1px solid #555;
  background: transparent;
  padding: 8px 0 5px 0;
  font-size: 16px;
  color: #fff;
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #e74c3c;
  }
`;

const Button = styled.button`
  color: #fff;
  background-color: #e74c3c;
  outline: none;
  border: 0;
  color: #fff;
  padding: 7px 20px;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const SubmitButton = styled.button`
  color: #fff;
  background-color: #e74c3c;
  outline: none;
  border: 0;
  color: #fff;
  padding: 7px 20px;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const Label = styled.label`
  display: inline-block;
  cursor: pointer;
  height: 24px;
  width: 90px;
  border: 1px solid #333;
  line-height: 24px;
  text-align: center;
  font-size: 13px;
  background-color: #e74c3c;
  color: white;
`;

const Input = styled.input`
  display: none;
  &:checked + ${Label} {
    background-color: blue;
    color: white;
  }
`;

const Botanswer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
`;

function App() {
  const [userChat, setUserChat] = useState(null);
  const [userChat2, setUserChat2] = useState(null);
  const [botChat, setBotChat] = useState(null);
  const [botChat2, setBotChat2] = useState(null);
  const [moodScore, setMoodScore] = useState(null);
  const [rightScore, setRightScore] = useState(null);

  const firstUserChatChange = ({ target: { value } }) => {
    setUserChat(value);
  };

  const firstUserChatSubmit = async event => {
    event.preventDefault();
    const url = "/api";
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
    const url = "/api";
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

  const resultSubmit = async () => {
    console.log("submit");
    const { data } = await axios.post(
      "http://limitless-ridge-83393.herokuapp.com/backend/makemetric",
      {
        headers: {
          "Access-Contorl-Allow-Origin": "*",
        },
        data: {
          user_first: userChat,
          bot_first: botChat,
          user_second: userChat2,
          bot_second: botChat2,
          mood_score: moodScore,
          compatibility_score: rightScore,
        },
      }
    );
    console.log(data);
  };

  return (
    <>
      <Header>
        <h1>심심이 평가표</h1>
      </Header>
      <Body>
        <form onSubmit={firstUserChatSubmit}>
          <InputContainer>
            <ContainerInput
              placeholder="첫번째 문장"
              type="text"
              required=""
              onChange={firstUserChatChange}
            />
            <Button>대답받기</Button>
          </InputContainer>
        </form>
        <Botanswer>{botChat ? `심심이: ${botChat}` : null}</Botanswer>
        <form onSubmit={secondUserChatSubmit}>
          <InputContainer>
            <ContainerInput
              placeholder="두번째 문장"
              type="text"
              required=""
              onChange={secondUserChatChange}
            />
            <Button>대답받기</Button>
          </InputContainer>
        </form>
        <Botanswer>{botChat2 ? `심심이: ${botChat2}` : null}</Botanswer>
        {botChat && botChat2 ? (
          <>
            <div>문장이 말이 되는가?</div>
            <ButtonBox>
              <div>
                <Input
                  type="radio"
                  id="select"
                  name="shop"
                  onChange={e => setMoodScore("1")}
                />
                <Label htmlFor="select">예</Label>
              </div>
              <div>
                <Input
                  type="radio"
                  id="select2"
                  name="shop"
                  onChange={e => setMoodScore("0")}
                />
                <Label htmlFor="select2">아니오</Label>
              </div>
            </ButtonBox>

            <div>상황에 적합하게 대답하는가?</div>
            <ButtonBox>
              <Input
                type="radio"
                id="select3"
                name="shop2"
                onChange={e => setRightScore("1")}
              />
              <Label htmlFor="select3">예</Label>

              <Input
                type="radio"
                id="select4"
                name="shop2"
                onChange={e => setRightScore("0")}
              />
              <Label htmlFor="select4">아니오</Label>
            </ButtonBox>
          </>
        ) : null}
        {userChat &&
        userChat &&
        botChat &&
        botChat2 &&
        moodScore &&
        rightScore ? (
          <SubmitButton onClick={resultSubmit}>제출</SubmitButton>
        ) : null}
      </Body>
    </>
  );
}

export default App;
