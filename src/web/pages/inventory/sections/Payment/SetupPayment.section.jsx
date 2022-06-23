import { Heading, HeadingButton, Description } from 'web/components';
import { Link } from 'react-router-dom';
import './SetupPayment.styles.scss';

export const SetupPayment = ({ t, setDrawer }) => {
  return (
    <div className="setup-payment">
      <div className="setup-payment__header">
        <HeadingButton drawer onClick={() => setDrawer()} />
        <Heading>{t('paymentHeading')}</Heading>
      </div>

      <div className="setup-payment__body max-w-[450px]">
        <Description>{t('setupPayTxt')}</Description>
        <ol className="mt-[13px] ml-[13px] flex flex-col gap-[15px] list-none">
          <li className="flex">
            <Description>1.&nbsp;</Description>
            <Description>
              {t('setupPayList1p1')}
              <span className="text-lg font-semibold">
                &nbsp;{t('setupPayList1p2')}&nbsp;
              </span>
              {t('setupPayList1p3')}
            </Description>
          </li>
          <li className="flex">
            <Description>2.&nbsp;</Description>
            <Description>
              {t('setupPayList2p1')}
              <span className="text-lg font-semibold">
                &nbsp;{t('setupPayList2p2')}&nbsp;
              </span>
              {t('setupPayList2p3')}
            </Description>
          </li>
        </ol>
        <div className="flex justify-center mt-[50px]">
          <Link to="#" className="text-[#304FFE] font-medium text-lg">
            {t('setupStripe')}
          </Link>
        </div>
      </div>
    </div>
  );
};
