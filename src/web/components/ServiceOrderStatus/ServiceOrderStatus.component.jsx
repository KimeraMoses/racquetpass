import './ServiceOrderStatus.styles.scss';

const OrderStatus = ({status,state, t})=>{
	return state === "full" ? 
		(<div className={`state-full ${status ? 'completed' : "uncompleted"} `}>
			<div className='row'><p>{t('viewOrderReady')}</p><p>{t('viewOrderDetails')}</p></div>
			<div className='msg'>{t('viewOrderDetailsMsg')}<b>{t('viewOrderDetailsName')}</b></div>
		</div>): 
		(<div className={`state-half ${status ? 'completed' : "uncompleted"} `}>			
			<div className='icon'>     
				<svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
					<path d="M1.3645 4.49966L4.78408 7.91924L11.6353 1.08008" stroke="#304FFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>
			{t('viewOrderReady')}
		</div>)
}

export const ServiceOrderStatus = ({state,status,t,children}) => {

	return ( 
	<div className="service-order-status">			  
		<OrderStatus status={status} state={state} t={t}/>
	</div>
	);
};
  
ServiceOrderStatus.defaultProps = {
	status: false,
};
  