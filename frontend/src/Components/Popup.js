// Popup.js
import React from 'react';

const Popup = ({ data, position, onClose, backgroundColor }) => {
  const style = {
    position: 'absolute',
    top: `${position.y - 20}px`, // Adjusting position slightly upwards
    left: `${position.x}px`,
    backgroundColor: backgroundColor, // Use the provided background color
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    zIndex: 9999, // Ensure the popup appears above the chart
    maxWidth: '300px', // Limit the width of the popup
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'white',
  };

  const xMarkStyle = {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    border: '1px solid white',
    borderRadius: '50%',
  };

  return (
    <div className="popup" style={style}>
      <button className="close-btn" style={closeButtonStyle} onClick={onClose}>
        <span style={xMarkStyle}>X</span> {/* X mark with border */}
      </button>
      <div className="popup-content">
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {data.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px', color: 'white' }}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
