import React from 'react';
import './OrderCard.styles.scss';

export const OrderCard = ({ title, description, status }) => {
  const statusClass =
    status === 'Ready for pickup'
      ? 'order-card__status-ready'
      : 'order-card__status-in-progress';
  return (
    <div
      className={`order-card ${
        status === 'Ready for pickup'
          ? 'order-card-ready'
          : 'order-card-in-progress'
      }`}
    >
      <div className="order-card__text">
        <div className="order-card__text-heading">{title}</div>
        <div className="order-card__text-description">{description}</div>
      </div>
      <div className="order-card__status">
        <div className="order-card__status-text">{status}</div>
      </div>
    </div>
  );
};
