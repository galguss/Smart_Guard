import React, { useState, useEffect } from "react";
import "../styles/form.css";
import "../styles/table.css";

function decodeJwt(token) {
  const base64Url = token.split('.')[1]; // Extract the payload (middle part of the token)
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace characters
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')); // Decode base64 and convert to JSON string

  const decoded = JSON.parse(jsonPayload); // Parse JSON to JavaScript object
  return decoded;
}

function GManager() {
  const token = localStorage.getItem('token');
  const [Count, setCount] = useState(0);
  const [Name, setName] = useState("");
  const [List, setList] = useState([]);
  const [CE, setCE] = useState("create");
  const [Item, SetItem] = useState({});
  const [Alert, setAlert] = useState(false);
  let adminID = decodeJwt(token).id;
  
  useEffect(() => {
    getList();
  }, [Count]);

  async function getList() {
    const res = await fetch(`http://localhost:4000/yishuvs/List?ID=${adminID}`,{
      headers: {
        "Authorization": token
      },
    });
    setList(await res.json());
  }

  async function sendData() {
    let method = CE === "create" ? "Add" : "Edit";
    const res = await fetch(`http://localhost:4000/yishuvs/${method}?ID=${adminID}`, {
      method: CE === "create" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        Name: Name,
        ID: Item.Yishuv_id,
      }),
    });

    const data = await res.json();
    console.log(data.code);
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/yishuvs/Delete?ID=${adminID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    setCount(Count + 1);
  }

  return (
    <div>
      {Alert && (
        <div className="popup-message">
          <h3>?אתה בטוח שאתה רוצה למחוק</h3>
          <button
            className="alertBtn green"
            onClick={() => {
              handleDelete(Item.Yishuv_id);
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
      <h2>{CE === "create" ? "הוספת יישובים חדשים" : "עריכת יישובים"}</h2>
      <div className="form">
        <label>:שם יישוב</label>
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            sendData();
            setCount(Count + 1);
            setName("");
            setCE("create");
          }}
        >
          {CE === "create" ? "צור יישוב חדש" : "ערוך יישוב"}
        </button>
      </div>

      <h2>יישובים שכבר קיימים במערכת</h2>
      <table className="list">
        <thead>
          <tr>
            <th></th>
            <th>מס' מזהה</th>
            <th>שם יישוב</th>
            <th>קוד יישוב</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {List.map((obj) => {
            return (
              <tr key={obj.Yishuv_id}>
                <td className="btn">
                  <button
                    onClick={() => {
                      SetItem(obj);
                      setCE("Edit");
                      setName(obj.Yishuv_name);
                    }}
                  >
                    ערוך
                  </button>
                </td>
                <td>{obj.Yishuv_id}</td>
                <td>{obj.Yishuv_name}</td>
                <td>{obj.Yishuv_code}</td>
                <td className="btn">
                  <button
                    onClick={() => {
                      SetItem(obj);
                      setAlert(true);
                    }}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GManager;
