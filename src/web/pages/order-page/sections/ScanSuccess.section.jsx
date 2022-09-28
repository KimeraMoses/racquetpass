// Custom Components
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Heading, SubHeading, Description, BackButton } from "web/components";
import { removeRacquetFromState } from "web/store/Slices/racquetSlice";

// Styles
import "./ScanSuccess.styles.scss";

export function ScanSuccess({
  t,
  backward,
  setStep,
  setBackFromReview,
  backFromReview,
  change,
}) {
  const [cookies, setCookie] = useCookies(["_rpo_"]);
  const racquet = useSelector((state) => state.racquet?.racquet);
  const hasRacquet = !!useSelector((state) => state.racquet?.racquet?.id);
  useEffect(() => {
    if (hasRacquet) {
      change("racquetId", racquet && racquet?.id);
      change("racquetSport", racquet && racquet?.sport);
      change("racquetBrand", racquet && racquet?.brand);
      change("racquetModel", racquet && racquet?.model);
      change("ownerName", racquet && racquet?.owner);
    }
    // localStorage.removeItem("_rpr_");

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
      setStep(6);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReturning, cookies, hasRacquet, racquet]);

  const dispatch = useDispatch();

  const racquetRescanHandler = () => {
    dispatch(removeRacquetFromState());
    backward();
  };

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
                  setStep(6);
                  setBackFromReview(false);
                } else {
                  backward();
                  dispatch(removeRacquetFromState());
                }
              }}
            />
            <Heading>
              {!hasRacquet
                ? "Successfully scanned a racquet!"
                : t("scanSuccessHeading")}
            </Heading>
          </div>

          <div className="scan-details-sc__card-continer">
            <div className="scan-details-sc__card-continer-content">
              <div className="scan-details-sc__card-continer-content-racquet">
                <div className="scan-details-sc__card-continer-content-racquet-inner">
                  <img
                    src={
                      racquet?.image_url
                        ? racquet?.image_url
                        : "img/orders/bg-success.png"
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
                        {racquet && racquet.mains?.tension} lbs
                      </Description>
                    </div>
                    {isHybrid && (
                      <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                        <SubHeading>{t("odrTension")}</SubHeading>
                        <Description>
                          {racquet && racquet.crosses?.tension} lbs
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
                        before. Tap{" "}
                        {backFromReview ? "“Choose this racquet”" : "“Next”"} to
                        get started.”
                      </Description>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            className="scan-details-sc__card-continer-content-rescan"
            onClick={racquetRescanHandler}
          >
            {t("ordRescan")}
          </button>
        </div>
      </div>
    </>
  );
}
