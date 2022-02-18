import './TaskStatus.styles.scss';

export const TaskStatus = ({status,children,...props}) => {

	return ( 
	<div className="task-status">
		<div
			{...props}
			disabled={status}
			className={`state ${status ? 'completed' : "uncompleted"} `}
		>
			{children}
		</div>
	</div>
	);
};
  
TaskStatus.defaultProps = {
	status: false,
};
  