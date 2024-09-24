import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/table.css";
import { Context, GuestsList } from "./Profile";

function Guests({ Id, Token, handleEdit, handleType }) {
  const [IdGuest, setIdGuest] = useState("");
  const [Alert, setAlert] = useState(false);
  
  const [Guests, setGuests] = useContext(GuestsList);
  const [Message, setMessage] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    getGuests();
  }, []);

  async function getGuests() {
    let res = await fetch(`http://localhost:4000/guests/List?Id=${Id}`, {
      headers: {
        Authorization: Token,
      },
    });

    setGuests(await res.json());
  }

  async function handleDelete(id) {
    let res = await fetch("http://localhost:4000/guests/Delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let data = await res.json();
    setMessage({ message: data.message, status: res.status, isVisible: true });
    if (res.status === 200)
      setGuests(Guests.filter((item) => item.guest_id !== id));
  }

  return (
    <div>
      {Alert && (
        <div className="popup-message">
          <h3>?אתה בטוח שאתה רוצה למחוק</h3>
          <button
            className="alertBtn green"
            onClick={() => {
              handleDelete(IdGuest.guest_id);
              setAlert(false);
            }}
          >
            מחק
          </button>
          <button className="alertBtn red" onClick={() => setAlert(false)}>
            ביטול
          </button>
        </div>
      )}
      <table className="list">
        <thead>
          <tr>
            <th colSpan={6}>
              <Link
                className="btnTable"
                onClick={() => handleType("create")}
                to={"/Profile/GForm"}
              >
                הוספת אורח+
              </Link>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>שם משפחה</th>
            <th>שם פרטי</th>
            <th>מס' פלאפון</th>
            <th>מס' רכב</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Guests.map((item, index) => {
            return (
              <tr key={"guest" + index}>
                <td className="btn">
                  <button
                    className="btnTable"
                    onClick={() => {
                      handleEdit(item);
                      handleType("Edit");
                      navigate("/Profile/GForm");
                    }}
                  >
                    ערוך
                  </button>
                </td>
                <td>{item.guest_last_name}</td>
                <td>{item.guest_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.car_id}</td>
                <td
                  className="btn"
                  onClick={() => {
                    setIdGuest(item);
                    setAlert(true);
                  }}
                >
                  <button className="btnTable">מחק</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Guests;
