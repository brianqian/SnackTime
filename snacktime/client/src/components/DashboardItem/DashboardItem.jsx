import React from 'react';

const DashboardItem = props => {
  if (props.notifications) {
    return (
      <div className="dashboard__item">
        <div className="dashboard__notifications">{props.notifications}</div>
        <Link to={props.destination}>
          <img className="dashboard__picture" src={props.image} />
        </Link>
        <div className="dashboard__title">
          <Link to={props.destination}>{props.title}</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard__item">
        <Link to={props.destination}>
          <img className="dashboard__picture" src={props.image} />
        </Link>
        <div className="dashboard__title">
          <Link to={props.destination}>{props.title}</Link>
        </div>
      </div>
    );
  }
};

export default DashboardItem;
