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
  align-items: center;
  flex-direction: column;
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
  width: ${props => (props.length > 8 ? 70 + props.length * 10 : 150)}px;
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
  const [submitComple, setSubmitComple] = useState(false);
  const [inputLength1, setInputLength1] = useState(0);
  const [inputLength2, setInputLength2] = useState(0);

  const firstUserChatChange = ({ target: { value } }) => {
    setUserChat(value);
    setInputLength1(value.length);
  };

  const firstUserChatSubmit = async event => {
    event.preventDefault();

    const url = "https://bluechatbot.ml/AI/sendmessage/";
    // patch
    try {
      let comment;
      const { data } = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ msg: userChat }),
        headers: {
          "Content-Type": "application/json",
          "Access-Contorl-Allow-Origin": "*",
        },
      })
        .then(response => response.json())
        .then(response => (comment = response));
      /* const { data } = await axios.post(url, {
        headers: {
          "Access-Contorl-Allow-Origin": "*",
        },
        msg: userChat,
      }); */
      setBotChat(comment[2]);
    } catch (e) {
      console.log(e);
    }
  };

  const secondUserChatChange = ({ target: { value } }) => {
    setUserChat2(value);
    setInputLength2(value.length);
  };

  const secondUserChatSubmit = async event => {
    event.preventDefault();
    const url = "https://bluechatbot.ml/AI/sendMessage/";
    try {
      const { data } = await axios.post(url, {
        headers: {},
        msg: userChat2,
      });
      setBotChat2(data[2]);
    } catch (e) {
      console.log(e);
    }
  };

  const resultSubmit = async () => {
    console.log("submit");
    setSubmitComple(true);
    const { data } = await axios.post(
      "https://limitless-ridge-83393.herokuapp.com/backend/makemetric",
      {
        headers: {},
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
        <h1>????????? ?????????</h1>
        <h3>
          ???????????? ???????????? ??????????????? ????????? ??? ???????????? ???????????????
          <br />
          ????????? ???????????? ????????? ???????????? ????????????????????????.
        </h3>
        <br />
      </Header>
      {submitComple ? (
        <Header>????????? ?????? ???????????? ???????????????.</Header>
      ) : (
        <Body>
          <form onSubmit={firstUserChatSubmit}>
            <InputContainer>
              <ContainerInput
                placeholder="????????? ??????"
                type="text"
                required=""
                onChange={firstUserChatChange}
                length={inputLength1}
              />
              <Button>????????????</Button>
            </InputContainer>
          </form>
          <Botanswer>{botChat ? `?????????: ${botChat}` : null}</Botanswer>
          <form onSubmit={secondUserChatSubmit}>
            <InputContainer>
              <ContainerInput
                placeholder="????????? ??????"
                type="text"
                required=""
                onChange={secondUserChatChange}
                length={inputLength2}
              />
              <Button>????????????</Button>
            </InputContainer>
          </form>
          <Botanswer>{botChat2 ? `?????????: ${botChat2}` : null}</Botanswer>
          {botChat && botChat2 ? (
            <>
              <div>????????? ?????? ??????????</div>
              <ButtonBox>
                <div>
                  <Input
                    type="radio"
                    id="select"
                    name="shop"
                    onChange={e => setMoodScore("1")}
                  />
                  <Label htmlFor="select">???</Label>
                </div>
                <div>
                  <Input
                    type="radio"
                    id="select2"
                    name="shop"
                    onChange={e => setMoodScore("0")}
                  />
                  <Label htmlFor="select2">?????????</Label>
                </div>
              </ButtonBox>

              <div>????????? ???????????? ????????????????</div>
              <ButtonBox>
                <Input
                  type="radio"
                  id="select3"
                  name="shop2"
                  onChange={e => setRightScore("1")}
                />
                <Label htmlFor="select3">???</Label>

                <Input
                  type="radio"
                  id="select4"
                  name="shop2"
                  onChange={e => setRightScore("0")}
                />
                <Label htmlFor="select4">?????????</Label>
              </ButtonBox>
            </>
          ) : null}
          {userChat &&
          userChat &&
          botChat &&
          botChat2 &&
          moodScore &&
          rightScore ? (
            <SubmitButton onClick={resultSubmit}>??????</SubmitButton>
          ) : null}
        </Body>
      )}
    </>
  );
}

export default App;
