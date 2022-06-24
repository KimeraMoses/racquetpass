// Custom Components
import {
  Heading,
  Description,
  // HeadingButton,
  SummaryCard,
  // PaymentButton,
  SubHeading,
  SearchCard,
} from 'web/components';

// Styles
import './ReviewOrder.styles.scss';
import { BackButton } from 'web/components/Buttons/BackButton.component';

const orderDetails = {
  // done: true,
  expectedPickup: 'Jan 7 - Jan 9',
  shopName: `Jimmy's Pro Shop`,
  shopAddress: '123 Main Street, Seattle, Washington',
  orderDate: 'Jan 7, 2021',
  completionDate: 'Jan 9, 2021',
  orderNumber: '1255',
  name: 'Bryan Song',
  phone: '(123) 456-4567',
  racquetName: 'Wilson Hyper Prostaff 6.1',
  racquetSport: 'Tennis Racquet',
};

export function OrderDetails({ t, setStep, setDone }) {
  return (
    <>
      <div className="review-order-odr max-w-[450px] m-[0_auto]">
        <div className="review-order-odr__heading">
          <BackButton
            onClick={() => {
              setStep(7);
              setDone(true);
            }}
          />
          <Heading customClass="review-order-odr__heading-text">
            Order Details
          </Heading>
        </div>
        {/* Status */}
        <div
          className={`mt-[15px] py-[10px] px-[16px] rounded-[12px] w-[fit-content] flex items-center font-medium ${
            orderDetails?.done
              ? 'text-[#008d3b] bg-[#E5FAEE]'
              : 'text-[#D78700] bg-[#FFF6E5] gap-[50px]'
          }`}
        >
          {orderDetails?.done ? (
            <>
              <img src="/img/tick-circle.png" alt="tick" />
              Order complete
            </>
          ) : (
            <>
              Expected Pickup: {orderDetails?.expectedPickup}{' '}
              <img src="/svg/calenderOD.svg" alt="calender" />
            </>
          )}
        </div>
        {/* Description */}
        <div className="mt-[15px] text-[18px]">
          {orderDetails?.done ? (
            <>
              Pickup this racquet at{' '}
              <span className="font-bold">{orderDetails?.shopName}.</span> When
              you arrive, show the attendant this screen to verify your order.
            </>
          ) : (
            <>
              Your order is{' '}
              <span className="text-[#DF9D2E] font-bold">in progress</span>.
              You'll be notified when your racquet is ready for pickup.
            </>
          )}
        </div>
        {/* Order Details (Dates + Order Number) */}
        <div className="grid grid-cols-2 gap-[20px] mt-[20px]">
          {/* Order Date */}
          <div className="flex flex-col gap-[12px]">
            <div className="text-[#8e8e8e] text-[12px] font-semibold">
              Order Date
            </div>
            <div className="text-[#3C3C3C] text-[18px] font-medium">
              {orderDetails?.orderDate}
            </div>
          </div>
          {/* Completion Date */}
          {orderDetails?.done ? (
            <>
              <div className="flex flex-col gap-[12px]">
                <div className="text-[#8e8e8e] text-[12px] font-semibold">
                  Completion Date
                </div>
                <div className="text-[#3C3C3C] text-[18px] font-medium">
                  {orderDetails?.completionDate}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* Order Number */}
          <div className="flex flex-col gap-[12px]">
            <div className="text-[#8e8e8e] text-[12px] font-semibold">
              Order Number
            </div>
            <div className="text-[#3C3C3C] text-[18px] font-medium">
              {orderDetails?.orderNumber}
            </div>
          </div>
        </div>
        <div className="review-order-odr__shop-heading">
          <Heading customClass="review-order-odr__shop-heading-text">
            {t('ShopContactHeading')}
          </Heading>
        </div>
        <div className="review-order-odr__contact">
          <div className="review-order-odr__contact-details">
            <SubHeading>{t('reviewOdrName')}</SubHeading>
            <Description>{orderDetails?.name}</Description>
          </div>
          <div className="review-order-odr__contact-details">
            <SubHeading>{t('taskOpenedPlayerPhoneHeading')}</SubHeading>
            <Description>{orderDetails?.phone}</Description>
          </div>
        </div>

        <div className="review-order-odr__shop">
          <div className="review-order-odr__shop-heading">
            <Heading customClass="review-order-odr__shop-heading-text">
              {t('odrReviewShop')}
            </Heading>
            <a
              href="tel:(123) 456-4567"
              className="text-[12px] text-[#304FFE] font-semibold"
            >
              Call Shop
            </a>
          </div>
          <div className="review-order-odr__shop-card">
            <SearchCard
              shop={{
                name: orderDetails?.shopName,
                address: orderDetails?.shopAddress,
              }}
            />
          </div>
        </div>
        <div className="review-order-odr__raquet">
          <div className="review-order-odr__raquet-heading">
            <Heading customClass="review-order-odr__shop-heading-text">
              {t('odrRacquet')}
            </Heading>
          </div>
          <div className="review-order-odr__shop-card">
            <SearchCard
              raquet={{
                img: '/img/raquet.png',
                name: 'Wilson Hyper Prostaff 6.1',
                model: 'Tennis Racquet',
              }}
            />
          </div>
        </div>
        <div className="review-order-odr__summary">
          <div className="review-order-odr__summary-heading">
            <Heading customClass="review-order-odr__summary-heading-text">
              {t('odrSummary')}
            </Heading>
          </div>
          <div className="review-order-odr__summary-card mb-[116px]">
            <SummaryCard />
          </div>
        </div>
      </div>
    </>
  );
}
