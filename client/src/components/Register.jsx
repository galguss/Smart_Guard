import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

function Register() {
  const [InputObj, setInputObj] = useState({});
  const navigate = useNavigate();

  function changeData(event) {
    setInputObj({ ...InputObj, [event.target.name]: event.target.value });
  }

  function sendData() {
    fetch("http://localhost:4000/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        YishuvCode: InputObj.Yishuv_name,
        LastName: InputObj.last_name,
        PhoneNumber: InputObj.phone_number,
        Email: InputObj.email,
        Password: InputObj.password,
      }),
    });
    navigate("/Login");
  }

  return (
    <div>
      <h2>הרשמה למערכת שומר חכם</h2>
      <div className="form">
        <label>:קוד יישוב</label>
        <input
          type="text"
          name="Yishuv_name"
          onChange={(e) => changeData(e)}
          required
        />
        <label>:משפחה</label>
        <input
          type="text"
          name="last_name"
          onChange={(e) => changeData(e)}
          required
        />
        <label>:פלאפון</label>
        <input
          type="text"
          name="phone_number"
          onChange={(e) => changeData(e)}
          required
        />
        <label>:דואר אלקטרוני</label>
        <input
          type="email"
          name="email"
          onChange={(e) => changeData(e)}
          required
        />
        <label>:סוסמה</label>
        <input
          type="password"
          name="password"
          onChange={(e) => changeData(e)}
          required
        />
        <button onClick={sendData}>הירשם</button>
      </div>
    </div>
  );
}

export default Register;
