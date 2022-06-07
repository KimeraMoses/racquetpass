import { useState } from 'react';
import { BackButton } from 'web/components/Buttons/BackButton.component';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

const Input = ({ label, onChange, placeholder, value, type, error }) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <div className="text-[12px] text-[#969696] font-semibold">{label}</div>
        {error && (
          <div className="text-[12px] text-[#E53935] font-semibold">
            {error}
          </div>
        )}
      </div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={`h-[58px] border-[1px] px-[16px] rounded-[12px] placeholder:text-[#bababa] text-[#3C3C3C]
          ${error ? 'border-[#E40000] bg-[#FFF0F0]' : 'border-[#E8E8E8]'}
        `}
      />
    </div>
  );
};

export const Step4 = ({ back, onExit, setShow }) => {
  const [ntrp, setNtrp] = useState('');
  const [ntrpError, setNtrpError] = useState('');
  const [utr, setUtr] = useState('');
  const [utrError, setUtrError] = useState('');
  return (
    <div>
      <div className="flex gap-[20px] items-center mb-[18px]">
        <BackButton onClick={back} />
        <div className="text-[#545454] text-[18px] ">What is your rating?</div>
      </div>
      {/* Inputs */}
      <Input
        label="NTRP Rating"
        onChange={(e) => {
          if (e.target.value < 1.5 || e.target.value > 7.0) {
            setNtrp(e.target.value);
            setNtrpError('Please enter a valid NTRP rating');
            setUtr('');
          } else {
            setNtrpError('');
            setNtrp(e.target.value);
            setUtr('');
          }
        }}
        type="number"
        error={ntrpError}
        value={ntrp}
        placeholder="NTRP Rating (1.5 - 7.0)"
      />
      <div class="relative flex items-center mt-[24px] mb-[12px]">
        <div class="flex-grow border-t border-[#e8e8e8]"></div>
        <span class="flex-shrink mx-4 text-[#3C3C3C]">Or</span>
        <div class="flex-grow border-t border-[#e8e8e8]"></div>
      </div>
      <Input
        label="UTR Rating"
        onChange={(e) => {
          if (e.target.value < 1 || e.target.value > 16.5) {
            setUtr(e.target.value);
            setUtrError('Please enter a valid NTRP rating');
            setNtrp('');
          } else {
            setUtrError('');
            setUtr(e.target.value);
            setNtrp('');
          }
        }}
        error={utrError}
        type="number"
        value={utr}
        placeholder="UTR Rating (1.0 - 16.50)"
      />
      <div className="mt-[45px]">
        <SubmitButton
          disabled={(!ntrp && !utr) || ntrpError || utrError}
          onClick={() => {
            setShow(false);
            onExit();
          }}
        >
          Complete Survey
        </SubmitButton>
      </div>
    </div>
  );
};
