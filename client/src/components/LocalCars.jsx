import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/table.css";
import { Context, CarsList } from "./Profile";

function LocalCars({ Id, Token, handleEdit, handleType }) {
  const [IdApprovals, setIdApprovals] = useState("");
  const [Alert, setAlert] = useState(false);

  const [CarsNum, setCarsNum] = useContext(CarsList);
  const [Message, setMessage] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    getCarsNum();
  }, []);

  async function getCarsNum() {
    let res = await fetch(`http://localhost:4000/LocalCars/List?Id=${Id}`, {
      headers: {
        Authorization: Token,
      },
    });

    setCarsNum(await res.json());
  }

  async function handleDelete(id) {
    let res = await fetch("http://localhost:4000/LocalCars/Delete", {
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
      setCarsNum(CarsNum.filter((item) => item.approvals_id !== id));
  }

  return (
    <div>
      {Alert && (
        <div className="popup-message">
          <h3>?אתה בטוח שאתה רוצה למחוק</h3>
          <button
            className="alertBtn green"
            onClick={() => {
              handleDelete(IdApprovals.approvals_id);
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
            <th colSpan={3}>
              <Link
                className="btnTable"
                onChange={handleType("create")}
                to={"/Profile/PForm"}
              >
                הוספת רכב+
              </Link>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>מספר רכב</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {CarsNum.map((item, index) => {
            return (
              <tr key={"car" + index}>
                <td className="btn">
                  <button
                    className="btnTable"
                    onClick={() => {
                      handleEdit(item);
                      handleType("Edit");
                      navigate("/Profile/PForm");
                    }}
                  >
                    ערוך
                  </button>
                </td>
                <td>{item.car_number}</td>
                <td
                  className="btn"
                  onClick={() => {
                    setIdApprovals(item);
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

export default LocalCars;
