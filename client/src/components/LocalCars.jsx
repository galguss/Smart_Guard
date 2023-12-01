import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/table.css";

function LocalCars({ Id, Token, handleEdit, handleType }) {
  const [CarsNum, setCarsNum] = useState([]);
  const [IdApprovals, setIdApprovals] = useState('');
  const [Count, setCount] = useState(0);
  const [Alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCarsNum();
  }, [Count])

  async function getCarsNum() {
    let res = await fetch(`http://localhost:4000/LocalCars/List?Id=${Id}`, {
      headers: {
        "Authorization": Token,
      },
    });

    setCarsNum(await res.json());
  }

  function handleDelete(id) {
    fetch("http://localhost:4000/LocalCars/Delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Token
      },
      body: JSON.stringify({
        id: id,
      }),
    });
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
              setCount(Count + 1);
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
              <Link onChange={handleType('create')} to={"/Profile/PForm"}>הוספת רכב+</Link>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>מספר רכב</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            CarsNum.map((item, index) => {
              return <tr key={'car' + index}>
                <td className="btn"><button onClick={() => {handleEdit(item); handleType('Edit'); navigate('/Profile/PForm')}}>ערוך</button></td>
                <td>{item.car_number}</td>
                <td className="btn" onClick={() => {setIdApprovals(item); setAlert(true); }}><button>מחק</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default LocalCars;
