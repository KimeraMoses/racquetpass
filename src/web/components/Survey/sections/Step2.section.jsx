import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

export const Step2 = ({ setStep }) => {
  return (
    <div>
      <div className="mb-[30px] text-[#545454] text-[18px]">
        Do you have a competitive tennis rating?
      </div>
      <SubmitButton
        onClick={() => {
          setStep(4);
        }}
        className="mb-[12px]"
      >
        Yes
      </SubmitButton>
      <SubmitButton
        onClick={() => {
          setStep(3);
        }}
        outlined
      >
        No
      </SubmitButton>
    </div>
  );
};
