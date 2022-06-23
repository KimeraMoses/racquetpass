import './Progress.styles.scss';

export const Progress = ({ steps }) => {
  const small = steps?.content?.length <= 2;
  return (
    <div className={`progress ${small ? 'progress-small' : ''}`}>
      <div className="max-w-[430px] m-[0_auto] flex items-center">
        {steps.content.map((step, index) => {
          console.log(steps?.active);
          console.log(step);
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
                  <img
                    src={
                      small ? '/img/progress-small.png' : '/img/progress.png'
                    }
                    alt="progress-dots"
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
