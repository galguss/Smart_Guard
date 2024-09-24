import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { Context, GuestsList } from "./Profile";

function GForm({ IdResident, Token, guest, type }) {
  const [InputObj, setInputObj] = useState(IsCreate() ? "" : guest);
  const navigate = useNavigate();

  const [Guests, setGuests] = useContext(GuestsList);
  const [Message, setMessage] = useContext(Context);

  function IsCreate() {
    return type === "create";
  }

  function changeData(event) {
    setInputObj({ ...InputObj, [event.target.name]: event.target.value });
  }

  async function sendData() {
    let method = IsCreate() ? "POST" : "PATCH";
    let api = IsCreate() ? "Add" : "Edit";
    let res = await fetch("http://localhost:4000/guests/" + api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      body: JSON.stringify({
        LastName: InputObj.guest_last_name,
        Name: InputObj.guest_name,
        Phone: InputObj.phone_number,
        CarNum: InputObj.car_id,
        IdResident,
        IdGuest: guest.guest_id,
      }),
    });

    let data = await res.json();
    setMessage({ message: data.message, status: res.status, isVisible: true });
    if (IsCreate()) {
      setGuests([...Guests, data.guest]);
    } else {
      setGuests(
        Guests.map((item) =>
          item.guest_id === InputObj.guest_id ? InputObj : item
        )
      );
    }
  }
  return (
    <div>
      <h2>{IsCreate() ? "הוספת אורח" : "עריכת אורח"}</h2>
      <div className="form">
        <label>:שם משפחה</label>
        <input
          type="text"
          name="guest_last_name"
          value={InputObj.guest_last_name || ""}
          onChange={(e) => changeData(e)}
        />
        <label>:שם פרטי</label>
        <input
          type="text"
          name="guest_name"
          value={InputObj.guest_name || ""}
          onChange={(e) => changeData(e)}
        />
        <label>:מספר פלאפון</label>
        <input
          type="text"
          name="phone_number"
          value={InputObj.phone_number || ""}
          onChange={(e) => changeData(e)}
        />
        <label>:מספר רכב</label>
        <input
          type="text"
          name="car_id"
          value={InputObj.car_id || ""}
          onChange={(e) => changeData(e)}
        />
        <button
          onClick={() => {
            sendData();
            navigate("/Profile/Guests");
          }}
        >
          {IsCreate() ? "הוספת אורח" : "עריכת אורח"}
        </button>
      </div>
    </div>
  );
}

export default GForm;
