import './ServiceOrderStatus.styles.scss';

const OrderStatus = ({children,status,state, t})=>{
	return state === "full" ? 
		(<div className={`state-full ${status ? 'completed' : "uncompleted"} `}>
			<div className='row'><p>{t('viewOrderReady')}</p><p>{t('viewOrderDetails')}</p></div>
			<div className='msg'>{t('viewOrderDetailsMsg')}<b>{t('viewOrderDetailsName')}</b></div>
		</div>): 
		(<div className={`state-half ${status ? 'completed' : "uncompleted"} `}>			
			<div className='icon'>
				{children}
			</div>
			{t('viewOrderReady')}
		</div>)
}

export const ServiceOrderStatus = ({state,status,t,children}) => {

	return ( 
	<div className="service-order-status">			  
		<OrderStatus children={children} status={status} state={state} t={t}/>
	</div>
	);
};
  
ServiceOrderStatus.defaultProps = {
	status: false,
};
  