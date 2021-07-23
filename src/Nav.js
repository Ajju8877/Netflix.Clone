import React, { useEffect, useState } from "react";
import "./Nav.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails
} from "./features/user/userSlice";
import { auth } from "./firebase";

export default function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const [show, handleshow] = useState(false);

  const handleSingOut = () => {
    if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true);
      } else handleshow(false);
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

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
<>
{!userName ? <Redirect to="/" /> : <Redirect to="/home" />}

    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="images/netflix-logo-png-2562.png"
        alt={userName}
      />

      {!userName ? (
        <UserImg
          className="nav_logo2"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
          alt="userName"
        />
      ) : (
        <UserImg src={userPhoto} alt={userName} />
      )}

      <Logout onClick={handleSingOut}>
        {" "}
        <span> Logout </span>{" "}
      </Logout>
    </div>
    </>
  );
}

const Logout = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: #111;
  border-radius: 3px;
  padding: 10px;
  right: 0;
  margin-top: 70px;
`;

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  &:hover {
    ${Logout} {
      align-items: center;
      display: flex;
      justify-content: center;
      opacity: 1;
    }
  }
`;
