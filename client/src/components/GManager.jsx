import React, { useState, useEffect } from "react";
import "../styles/form.css";
import "../styles/table.css";

function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const decoded = JSON.parse(jsonPayload);
  return decoded;
}

function GManager() {
  const token = localStorage.getItem("token");
  let adminID = decodeJwt(token).id;

  const [Name, setName] = useState("");
  const [List, setList] = useState([]);
  const [CE, setCE] = useState("create");
  const [Item, SetItem] = useState({});
  const [Alert, setAlert] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [Message, setMessage] = useState({});

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }
  }, [isVisible]);

  function IsCreate() {
    return CE === "create";
  }

  async function getList() {
    const res = await fetch(
      `http://localhost:4000/yishuvs/List?ID=${adminID}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setList(await res.json());
  }

  async function sendData() {
    let method = IsCreate() ? "Add" : "Edit";
    const res = await fetch(
      `http://localhost:4000/yishuvs/${method}?ID=${adminID}`,
      {
        method: IsCreate() ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          Name: Name,
          ID: Item.Yishuv_id,
        }),
      }
    );

    let data = await res.json();
    if (IsCreate()) {
      setList([...List, data.yishuv]);
    } else {
      setList(
        List.map((item) =>
          item.Yishuv_id === data.yishuv.Yishuv_id
            ? { ...item, Yishuv_name: Name }
            : item
        )
      );
    }
    setName("");
    setCE("create");
    setMessage({ message: data.message, status: res.status });
    setIsVisible(true);
  }

  async function handleDelete(id) {
    let res = await fetch(
      `http://localhost:4000/yishuvs/Delete?ID=${adminID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );

    if (res.ok) {
      setList(List.filter((item) => item.Yishuv_id !== id));
    }

    let data = await res.json();
    setMessage({ message: data.message, status: res.status });
    setIsVisible(true);
  }

  return (
    <div>
      {isVisible && (
        <div
          className={Message.status === 200 ? "popup success" : "popup failure"}
        >
          <p>{Message.message}</p>
        </div>
      )}

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
      <h2>{IsCreate() ? "הוספת יישובים חדשים" : "עריכת יישובים"}</h2>
      <div className="form">
        <label>:שם יישוב</label>
        <input
          type="text"
          value={Name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            sendData();
          }}
        >
          {IsCreate() ? "צור יישוב חדש" : "ערוך יישוב"}
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
                    className="btnTable"
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
                    className="btnTable"
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
