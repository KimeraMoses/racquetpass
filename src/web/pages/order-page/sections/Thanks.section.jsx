import { useNavigate } from "react-router-dom";

export const Thanks = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-[170px] flex flex-col gap-[66px] items-center px-[20px]">
      <div className="flex flex-col gap-[14px] items-center px-[15px]">
        <div className="text-[#3C3C3C] text-[24px] font-bold">Thank you!</div>
        <div className="text-[#545454] text-[18px] font-normal text-center">
          We'll let you know when this shop is on RacquetPass.
        </div>
      </div>
      <div className="w-full">
        <button
          className="bg-[#304ffe] rounded-[12px] w-full py-[16px] text-[#fff] text-[18px] font-medium"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};
