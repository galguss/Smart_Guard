import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

import { Context, CarsList } from "./Profile";

function PForm({ user, Token, CNum = "", Approvals = "", type }) {
  const [CarNum, setCarNum] = useState(IsCreate() ? "" : CNum);

  const [CarsNum, setCarsNum] = useContext(CarsList);
  const [Message, setMessage] = useContext(Context);
  const navigate = useNavigate();

  function IsCreate() {
    return type === "create";
  }

  async function sendData() {
    let method = IsCreate() ? "POST" : "PATCH";
    let api = IsCreate() ? "Add" : "Edit";
    let res = await fetch("http://localhost:4000/LocalCars/" + api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      body: JSON.stringify({
        Id: user.id,
        carNum: CarNum,
        ApprovalsId: Approvals,
      }),
    });

    let data = await res.json();
    setMessage({ message: data.message, status: res.status, isVisible: true });

    if (IsCreate()) {
      setCarsNum([...CarsNum, data.carNumber]);
    } else {
      setCarsNum(
        CarsNum.map((item) =>
          item.approvals_id === data.approvals_id
            ? { ...item, car_number: CarNum }
            : item
        )
      );
    }
  }

  return (
    <div>
      <h2>{IsCreate() ? "הוספת רכב" : "עריכת רכב"}</h2>
      <div className="form">
        <label>:מספר רכב</label>
        <input
          type="text"
          max={8}
          value={CarNum}
          onChange={(e) => setCarNum(e.target.value)}
          required
        />
        <button
          onClick={() => {
            sendData();
            navigate("/Profile/LocalCars");
          }}
        >
          {IsCreate() ? "הוספת רכב" : "עריכת רכב"}
        </button>
      </div>
    </div>
  );
}

export default PForm;
