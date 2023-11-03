import React from "react";
import loading from "../../SVG/loadingc.gif";
import './style/Loading.css'


const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;