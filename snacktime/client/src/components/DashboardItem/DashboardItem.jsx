import React from 'react';
import { Link } from 'react-router-dom';

const DashboardItem = props => {
  // if (props.notifications) {
  //   return (
  //     <div className="dashboard__item">
  //       <div className="dashboard__notifications">{props.notifications}</div>
  //       <Link to={props.destination}>
  //         <img
  //           alt={props.title}
  //           className="dashboard__picture"
  //           src={props.image}
  //         />
  //       </Link>
  //       <div className="dashboard__title">
  //         <Link to={props.destination}>{props.title}</Link>
  //       </div>
  //     </div>
  //   );
  // } else {

  return (
    <div className="dashboard__item">
      <Link to={{
            pathname: props.destination,
            state: { id: props.id },
          }}>
        <img
          alt={props.title}
          className="dashboard__picture"
          src={props.image}
          width="70"
          height="70"
        />
      </Link>
      <div className="dashboard__title">
        <Link
          to={{
            pathname: props.destination,
            state: { id: props.id},
           
          }}
        >
          {props.title}
        </Link>
      </div>
    </div>
  );
};

export default DashboardItem;
