import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ state: false, msg: "", type: "" });

  const showAlert = (state, msg, type) => {
    setAlert({ state, msg, type });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display Alert
      showAlert(true, "False Value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setIsEditing(false);
      setName("");
      setEditID(null);
      showAlert(true, "Value Changed", "success");
    } else {
      //show alert
      showAlert(true, "Item Added To The List", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const removeItem = (id) => {
    showAlert(true, "Item Deleted From The List", "danger");
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => {
      return item.id === id;
    });
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const clearListHandler = () => {
    if (list.length > 0) {
      setList([]);
      setName("");
      showAlert(true, "List Has Been Cleared", "success");
    } else {
      showAlert(true, "List Is Already Empty", "danger");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.state && <Alert {...alert} showAlert={showAlert} alert={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. pizza"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} editItem={editItem} removeItem={removeItem} />
        <button className="clear-btn" onClick={clearListHandler}>
          clear items
        </button>
      </div>
    </section>
  );
}

export default App;
