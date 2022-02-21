import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';
          
function CreateOrderDetails({ t }) {
  return (
    <div className='order-details-container'>
      <div>
        <div className='header-row'>
          <MenuButton>
            <a href="/CreateOrder/Locker"><img alt="Menu Icon" src="../svg/arrowLeft.svg" /></a>
          </MenuButton>
          <h1 className='header-row-heading'>{t('createOrderHeading')}</h1>
        </div>
        <div className='detail-body-container'>
          <div className='racquet-info'>
            <img className='img' alt="racquet" src='../img/tasks/racquet.png'/>
            <div className='brand'>
							<div>
								<div className='model'>{t('createOrderRacquetNameHeading')}</div>
								<div className='title'>{t('createOrderRacquetName')}</div>
							</div>
							<CustomButton size="sm" btn="white"><a href="/ServiceOrder/Details">{t('createOrderEdit')}</a></CustomButton>
            </div>
          </div>
          <div className='racquet-details'>
            <div className='racquet-label'>{t('createOrderBrandLabel')}</div>
            <div className='racquet-desc'>{t('createOrderBrandName')}</div>
            <div className='racquet-label'>{t('createOrderModelLabel')}</div>
            <div className='racquet-desc'>{t('createOrderModelName')}</div>
            <div className='racquet-label'>{t('createOrderStringLabel')}</div>
            <div className='racquet-desc'>{t('createOrderStringName')}</div>
            <div className='racquet-label'>{t('createOrderDateLabel')}</div>
            <div className='racquet-desc'>{t('createOrderDate')}</div>
						<div onClick={modalShow} className='test delete-request'>{t('createOrderDelete')}</div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
				<CustomButton size="lg" btn="primary"><a href="/CreateOrder/Payment">{t('orderScannedComplete')}</a></CustomButton>
      </div>
			
			<div id="delete-modal" className="modal">
				<div className="modal-content">
					<div className='title'>{t('createOrderDeleteHeading')}</div>
					<div className='desc'>{t('createOrderDeleteDescription')}</div>
					<div className='row'>
						<p onClick={modalHide} className='btn-delete'>{t('createOrderDeletebtn')}</p>
						<p onClick={modalHide} className='btn-cancel'>{t('createOrderCancelbtn')}</p>
					</div>
				</div>
			</div>
    </div>
  );
}
const modalShow = () =>{
	document.getElementById("delete-modal").style.display = "flex";
}
const modalHide = () =>{
	document.getElementById("delete-modal").style.display = "none";
}

export default withNamespaces()(CreateOrderDetails);
