import React, { useEffect } from "react";

const Alert = ({ msg, type , showAlert, alert }) => {
  useEffect(() => {
    const defaultAlert = setInterval(() => {
      showAlert(false, "", "");
    }, 3000);
    return () => clearInterval(defaultAlert);
  }, [alert]);
  return (
    <div className="alert">
      <p className={`alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
