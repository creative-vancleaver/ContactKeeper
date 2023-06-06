import React, { useContext } from 'react'

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {

  const alertContext = useContext(AlertContext);
  console.log('alert context === ', alertContext.alerts);

  return (

    alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
      // console.log('map single alert = ', alert)

      <div key={ alert.id } className={`alert alert-${ alert.type }`}>
        <i className="fas fa-info-circle"></i> { alert.msg }
      </div>

    ))
  );
};

export default Alerts