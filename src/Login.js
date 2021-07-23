import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { provider, auth } from "./firebase";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails
} from "./features/user/userSlice";

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const handleAuth = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      })
    );
  };

  return (
    <Container>
      <img
        src="https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg?region=0%2C0%2C800%2C1200"
        alt="pic"
      />
      <Content>
        {!userName ? <Redirect to="/" /> : <Redirect to="/home" />}

        <Nav>
          <div>
            <img
              src="https://pngimg.com/uploads/netflix/netflix_PNG10.png"
              alt="login_logo"
            />
          </div>

          <div>
            <button> PRIVACY </button>
            <button onClick={handleAuth}> SIGN IN </button>
            <button>
              <MoreVertIcon />
            </button>
          </div>
        </Nav>
        <Button>
          {" "}
          <button> GET STARTED </button>{" "}
        </Button>

        <Tag>
          {" "}
          <p> Unlimited entertainment one low prie </p>
          <p>
            {" "}
            All of Netflix, starting at just <br /> र 199{" "}
          </p>
        </Tag>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 9999;
  img {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: auto;
    opacity: 0.5;
  }
`;

const Content = styled.div``;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  z-index: 9999;

  img {
    width: 30px;
    height: 30px !important;
    opacity: 1;
  }
  div {
    display: flex;
    align-items: center;

    button {
      cursor: pointer;
      color: white;
      background-color: transparent;
      border: none;
      outline: none;
      margin-right: 15px;
      opacity: 1;
      z-index: 9999;

      :nth-child(3) {
        color: gray;
      }
    }
  }
`;

const Button = styled.button`
  width: 100%;
  position: fixed;
  bottom: 2%;
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  button {
    color: #fff;
    background-color: red;
    border: none;
    outline: none;
    width: 320px;
    padding: 10px;
  }
`;

const Tag = styled.div`
  z-index: 9999;
  position: fixed;
  bottom: 10%;

  p {
    font-size: 42px;
    text-align: center;
    padding: 10px;
    font-weight: 700;
    :nth-child(2) {
      margin-top: 10px;
      text-align: center;
      font-size: 18px;
    }
  }
`;

export default Login;
