import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/table.css";

function LocalCars({ Id, Token, handleEdit }) {
  const [CarsNum, setCarsNum] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCarsNum();
  }, [])

  async function getCarsNum() {
    let res = await fetch(`http://localhost:4000/LocalCars/List?Id=${Id}`, {
      headers: {
        "Authorization": Token,
      },
    });

    setCarsNum(await res.json());
  }

  console.log(CarsNum);

  return (
    <div>
       {/*Alert && (
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
          )*/}
      <table className="list">
        <thead>
          <tr>
            <th colSpan={3}>
              <Link to={"/Profile/PForm"}>הוספת רכב+</Link>
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
                <td className="btn"><button onClick={() => {handleEdit(item); navigate('/Profile/PForm')}}>ערוך</button></td>
                <td>{item.car_number}</td>
                <td className="btn"><button>מחק</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default LocalCars;
