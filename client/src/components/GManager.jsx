import React, { useState, useEffect } from "react";
import "../styles/form.css";
import "../styles/table.css";

function GManager() {
  const [Count, setCount] = useState(0);
  const [Name, setName] = useState("");
  const [List, setList] = useState([]);
  const [CE, setCE] = useState("create");
  const [Item, SetItem] = useState({});
  const [Alert, setAlert] = useState(false);

  useEffect(() => {
    getList();
  }, [Count]);

  async function getList() {
    const res = await fetch("http://localhost:4000/yishuvs/List");
    setList(await res.json());
  }

  async function sendData() {
    let method = CE === "create" ? "Add" : "Edit";
    const res = await fetch("http://localhost:4000/yishuvs/" + method, {
      method: CE === "create" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
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
    fetch("http://localhost:4000/yishuvs/Delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
