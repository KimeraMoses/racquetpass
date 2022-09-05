import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Heading, HeadingButton, Description } from "web/components";
import {
  fetchShopDetails,
  getStripeManagementSessionLink,
} from "web/store/Actions/shopActions";
import "./SetupPayment.styles.scss";

export const SetupPayment = ({ t, setDrawer }) => {
  const shopId = useSelector((state) => state?.auth?.user?.shop);
  const { shop } = useSelector((state) => state.shop);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShopDetails(shopId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  const handleStripePayments = async () => {
    setIsLoading(true);
    if (shop?.enabled) {
      await dispatch(getStripeManagementSessionLink(shopId && shopId));
    } else {
      toast.error(
        "Shop not enabled – please contact admin via blue Contact Admin button in Account Status section below"
      );
    }
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
            {isLoading ? "Generating redirect link..." : t("setupStripe")}
          </p>
        </div>
      </div>
    </div>
  );
};
