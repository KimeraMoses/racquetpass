import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

export const Step1 = ({ next }) => {
  return (
    <div>
      <div className="mb-[67px] text-[#545454] text-[18px]">
        Complete this quick survey to continue with your order.
      </div>
      <SubmitButton onClick={next}>Start Survey</SubmitButton>
    </div>
  );
};
