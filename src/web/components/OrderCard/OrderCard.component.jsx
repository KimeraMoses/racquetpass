import React from 'react';
import './OrderCard.styles.scss';

export const OrderCard = ({ title, description, status, price, shop }) => {
  return (
    <div
      className={`order-card ${
        status === 'Ready for pickup'
          ? 'order-card-ready'
          : status === 'previous'
          ? 'order-card-previous'
          : 'order-card-in-progress'
      }`}
    >
      <div className="order-card__text">
        <div className="order-card__text-heading">{title}</div>
        <div className="order-card__text-description">{description}</div>
      </div>
      <div className="order-card__status">
        <div className="order-card__status-text">
          {status === 'previous' ? price : status}
        </div>
        {status === 'previous' && shop ? (
          <div className="order-card__status-shop">{shop}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
