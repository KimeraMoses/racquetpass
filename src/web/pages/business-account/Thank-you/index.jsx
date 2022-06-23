import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="mt-[170px] flex flex-col gap-[66px] items-center px-[20px] max-w-[450px] m-[0_auto]">
      <div className="flex flex-col gap-[14px] items-center px-[15px]">
        <div className="text-[#3C3C3C] text-[24px] font-bold">Thank you!</div>
        <div className="text-[#545454] text-[18px] font-normal text-center">
          Thank you for signing up with RacquetPass! We sent you an email to
          help you set up your account.
        </div>
      </div>
      <div className="w-full">
        <button
          className="bg-[#304ffe] rounded-[12px] w-full py-[16px] text-[#fff] text-[18px] font-medium"
          onClick={() => {
            navigate('/inventory?active=tasks');
          }}
        >
          Go to your account
        </button>
      </div>
    </div>
  );
}
export default withNamespaces()(ThankYou);
