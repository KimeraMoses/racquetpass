import './Progress.styles.scss';

export const Progress = ({ steps }) => {
  return (
    <div className="progress">
      {steps.content.map((step, index) => {
        return (
          <>
            <div
              className={`progress__step ${
                steps?.active === step ? 'progress__step-active' : ''
              }`}
            >
              <div className="progress__step-number">{index + 1}</div>
              <div className="progress__step-text">{step}</div>
            </div>
            {index + 1 === steps.content.length ? (
              <></>
            ) : (
              <div className="progress__step-dots">
                <img src="/img/progress.png" alt="progress-dots" />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
