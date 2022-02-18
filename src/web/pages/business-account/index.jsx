import React from 'react';
import { withNamespaces } from 'react-i18next';
import { CustomButton } from 'web/components';
import './index.styles.scss';

function BusinessAccount({ t }) {
  return (
    <div className='business-account-container'>
			<div className='header-row'>
				<h1 className='header-row-heading'>{t('accountCreate')}</h1>
				<CustomButton size='sm' btn='white'><a href='/BusinessAccount'>{t('accountSignIn')}</a></CustomButton>
			</div>
			<div className='business-account-body'>
				<div className='choose-account player'>
					<div className='account-info'>
						<div>
							<div className='card-title'>{t('accountPlayer')}</div>	
							<div className='card-desc'>{t('accountPlayerDescription')}</div>	
						</div>
						<CustomButton size='sm' btn='white'><a href='/BusinessAccount'>{t('accountGetStarted')}</a></CustomButton>
					</div>
					<div className='img-container'>
						<img alt="Menu Icon" src="img/businessaccount/player.png" />
					</div>
				</div>
				<div className='choose-account stringer'>
					<div className='account-info'>
						<div>
							<div className='card-title'>{t('accountStringer')}</div>	
							<div className='card-desc'>{t('accountStringerDescription')}</div>	
						</div>
						<CustomButton size='sm' btn='white'><a href='/BusinessAccount/create'>{t('accountGetStarted')}</a></CustomButton>
					</div>
					<div className='img-container'>
						<img alt="Menu Icon" src="img/businessaccount/stringer.png" />
					</div>
				</div>
			</div>
    </div>
  );
}

export default withNamespaces()(BusinessAccount);
