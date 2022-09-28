// Custom Components
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Heading, SubHeading, Description, BackButton } from "web/components";
import { getRacquetSuccess } from "web/store/Slices/racquetSlice";
import { withNamespaces } from "react-i18next";
// Styles
import "./ScanSuccess.styles.scss";
import { reduxForm } from "redux-form";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { setBackFromPreview } from "web/store/Slices/shopSlice";

function ScanSuccess({ t, change }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["_rpo_"]);
  const hybrid = useSelector((state) => state.racquet?.hybrid);
  const backFromReview = useSelector((state) => state?.shop?.backFromPreview);
  const normalFlow = useSelector((state) => state?.shop?.normalFlow);
  const racquet = useSelector((state) => state.racquet?.racquet);
  const hasRacquet = !!useSelector((state) => state.racquet?.racquet?.qr_code);
  useEffect(() => {
    if (hasRacquet) {
      change("racquetId", racquet && racquet?.id);
      change("racquetSport", racquet && racquet?.sport);
      change("racquetBrand", racquet && racquet?.brand);
      change("racquetModel", racquet && racquet?.model);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRacquet]);

  const isReturning = !!cookies?._rpo_;

  useEffect(() => {
    if (
      hasRacquet &&
      isReturning &&
      racquet.id === cookies?._rpo_?.racquet_id
    ) {
      setCookie("_rprr_", true, {
        maxAge: 30, // Will expire after 30 seconds
      });
      navigate("/order-flow/review");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReturning, cookies, hasRacquet, racquet]);

  const dispatch = useDispatch();
  const isNewRac = !!localStorage.getItem("_qrc_");
  const order = JSON.parse(localStorage.getItem("_rapo_"));

  useEffect(() => {
    if (!hasRacquet && !isNewRac && Object.keys(order?.racquet).length !== 0) {
      dispatch(getRacquetSuccess(order?.racquet));
    }
  }, []);

  const isHybrid =
    racquet?.mains?.string_id?.id === racquet?.crosses?.string_id?.id
      ? false
      : true;

  return (
    <>
      <div className="scan-details-sc max-w-[450px] m-[0_auto]">
        <div>
          <div className="scan-details-sc__heading">
            <BackButton
              onClick={() => {
                if (backFromReview) {
                  dispatch(setBackFromPreview(false));
                  navigate("/order-flow/review");
                } else {
                  navigate("/order-flow/scan");
                }
              }}
            />
            <Heading>Successfully scanned a racquet!</Heading>
          </div>

          <div className="scan-details-sc__card-continer">
            <div className="scan-details-sc__card-continer-content">
              <div className="scan-details-sc__card-continer-content-racquet">
                <div className="scan-details-sc__card-continer-content-racquet-inner">
                  <img
                    src={
                      racquet?.image_url
                        ? racquet?.image_url
                        : "/img/orders/bg-success.png"
                    }
                    alt="racquet"
                    className="scan-details-sc__card-continer-content-racquet-img"
                  />
                  <div className="scan-details-sc__card-continer-content-racquet-text">
                    <SubHeading>
                      {!hasRacquet
                        ? "UNKNOWN RACQUET TYPE "
                        : racquet && racquet.sport?.toUpperCase() + " RACQUET"}
                    </SubHeading>
                    <Description>
                      {hasRacquet
                        ? `${racquet?.brand + " " + racquet?.model}`
                        : "Unconfigured Racquet"}
                    </Description>
                  </div>
                </div>
              </div>
              {hasRacquet && (
                <div className="scan-details-sc__card-continer-content-inner-card">
                  <div className="scan-details-sc__card-continer-content-inner-card-txt">
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>
                        Last strung with {isHybrid && "(mains)"}
                      </SubHeading>
                      {`${racquet && racquet.mains?.string_id?.name}`}
                    </div>
                    {isHybrid && (
                      <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                        <SubHeading>{t("scanSuccessCrosses")}</SubHeading>
                        {`${racquet && racquet.crosses?.string_id?.name}`}
                      </div>
                    )}
                  </div>
                  <div className="scan-details-sc__card-continer-content-inner-card-txt">
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>{t("odrTension")}</SubHeading>
                      <Description>
                        {racquet &&
                          parseInt(racquet.mains?.tension)?.toFixed(2)}{" "}
                        lbs
                      </Description>
                    </div>
                    {isHybrid && (
                      <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                        <SubHeading>{t("odrTension")}</SubHeading>
                        <Description>
                          {racquet &&
                            parseInt(racquet.crosses?.tension)?.toFixed(2)}{" "}
                          lbs
                        </Description>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div>
                {!hasRacquet && (
                  <div className="scan-details__card-continer-content-inner-card">
                    <div className="scan-details__card-continer-content-inner-card-txt">
                      <Description>
                        It looks you haven’t placed an order on this racquet
                        before. Tap “Choose this racquet” to get started.”
                      </Description>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="order-page__button-container max-w-[450px] w-full mr-[auto] ml-[auto]">
        {!hasRacquet && (
          <div className="mb-2 text-center">Need this racquet restrung?</div>
        )}
        <SubmitButton
          onClick={() => {
            const repeatCustomer = JSON.parse(localStorage.getItem("_rpr_"));
            if (backFromReview) return navigate("/order-flow/review");
            if (
              !!repeatCustomer?.shop &&
              racquet?.qr_code === repeatCustomer?.racquet?.qr_code
            ) {
              localStorage.setItem("_rapo_", JSON.stringify(repeatCustomer));
              navigate("/order-flow/review?status=returning");
            } else if (normalFlow) {
              const orderState = {
                ...order,
                racquet: racquet,
                hybrid: hybrid,
              };
              localStorage.setItem("_rapo_", JSON.stringify(orderState));
              navigate("/order-flow/strings");
            } else {
              const orderState = {
                ...order,
                racquet: racquet,
                hybrid: hybrid,
              };
              localStorage.setItem("_rapo_", JSON.stringify(orderState));
              navigate("/order/select-shop");
            }
          }}
        >
          {normalFlow || backFromReview
            ? "Choose this racquet"
            : "Start your order now"}
        </SubmitButton>
        {!hasRacquet && (
          <div className="mt-2">
            <SubmitButton
              outlined
              onClick={() => {
                dispatch(setBackFromPreview(true));
                navigate("/order-flow/scan");
              }}
            >
              Edit Racquet
            </SubmitButton>
          </div>
        )}
      </div>
    </>
  );
}

ScanSuccess = reduxForm({
  form: "order-flow-scanned",
  // onSubmit,
})(ScanSuccess);

export default withNamespaces()(ScanSuccess);
