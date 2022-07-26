import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Heading, HeadingButton, Description } from "web/components";
import { getStripeManagementSessionLink } from "web/store/Actions/shopActions";
import "./SetupPayment.styles.scss";

export const SetupPayment = ({ t, setDrawer }) => {
  const shopId = useSelector((state) => state?.auth?.user?.shop);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleStripePayments = async () => {
    setIsLoading(true);
    await dispatch(getStripeManagementSessionLink(shopId && shopId));
    setIsLoading(false);
  };

  return (
    <div className="setup-payment">
      <div className="setup-payment__header">
        <HeadingButton drawer onClick={() => setDrawer()} />
        <Heading>{t("paymentHeading")}</Heading>
      </div>

      <div className="setup-payment__body max-w-[450px]">
        <Description>{t("setupPayTxt")}</Description>
        <ol className="mt-[13px] ml-[13px] flex flex-col gap-[15px] list-none">
          <li className="flex">
            <Description>1.&nbsp;</Description>
            <Description>
              {t("setupPayList1p1")}
              <span className="text-lg font-semibold">
                &nbsp;{t("setupPayList1p2")}&nbsp;
              </span>
              {t("setupPayList1p3")}
            </Description>
          </li>
          <li className="flex">
            <Description>2.&nbsp;</Description>
            <Description>
              {t("setupPayList2p1")}
              <span className="text-lg font-semibold">
                &nbsp;{t("setupPayList2p2")}&nbsp;
              </span>
              {t("setupPayList2p3")}
            </Description>
          </li>
        </ol>
        <div className="flex justify-center mt-[50px]">
          <p
            onClick={handleStripePayments}
            className="text-[#304FFE] font-medium text-lg cursor-pointer"
          >
            {isLoading ? "Generating payment link..." : t("setupStripe")}
          </p>
        </div>
      </div>
    </div>
  );
};
