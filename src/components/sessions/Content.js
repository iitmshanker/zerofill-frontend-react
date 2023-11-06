import React from 'react';
import UpperSection from './UpperSection';
import LowerSection from './LowerSection';


const Content = (props) => {
  return (
    <div className="content">
      <div className="upper-section">
      <UpperSection {...props}/>
      </div>
      <div className="lower-section">
        <LowerSection {...props} />
      </div>
    </div>
  );
};

export default Content;