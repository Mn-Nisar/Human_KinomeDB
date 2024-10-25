import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <React.Fragment>
      <div className="main-container">
        <div className="loading-container">
          <svg
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Central Carbon (Cα) */}
            <circle cx="50" cy="50" r="4" fill="#000" />
            {/* Amine group (—NH₂) */}
            <circle cx="50" cy="30" r="4" fill="#00f">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Carboxyl group (—COOH) */}
            <circle cx="50" cy="70" r="4" fill="#f00">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="-360 50 50"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Side chain (R-group) */}
            <rect x="50" y="10" width="8" height="8" fill="#0f0">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loading;
