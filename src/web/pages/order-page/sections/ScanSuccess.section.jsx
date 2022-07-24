// Custom Components
import { useEffect } from "react";
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
  const racquet = useSelector((state) => state.racquet?.racquet);
  const hasRaquet = !!useSelector((state) => state.racquet?.racquet?.id);
  console.log("rac details", hasRaquet, racquet);
  useEffect(() => {
    if (hasRaquet) {
      change("racquetId", racquet && racquet?.id);
      change("racquetSport", racquet && racquet?.sport);
      change("racquetBrand", racquet && racquet?.brand);
      change("racquetModel", racquet && racquet?.model);
      change("ownerName", racquet && racquet?.owner);
    }
  }, [hasRaquet]);

  const dispatch = useDispatch();

  const racquetRescanHandler = () => {
    dispatch(removeRacquetFromState());
    backward();
  };

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
              {!hasRaquet
                ? "Racquet not found, Start creating your racquet to complete order"
                : t("scanSuccessHeading")}
            </Heading>
          </div>

          <div className="scan-details-sc__card-continer">
            <div className="scan-details-sc__card-continer-content">
              <div className="scan-details-sc__card-continer-content-racquet">
                <div className="scan-details-sc__card-continer-content-racquet-inner">
                  <img
                    src="img/orders/bg-success.png"
                    alt="racquet"
                    className="scan-details-sc__card-continer-content-racquet-img"
                  />
                  <div className="scan-details-sc__card-continer-content-racquet-text">
                    <SubHeading>
                      {/* {t("scanSuccessTennis")} */}
                      {!hasRaquet
                        ? "LET'S CREATE YOUR "
                        : racquet && racquet.sport?.toUpperCase()}{" "}
                      RACQUET
                    </SubHeading>
                    <Description>
                      {racquet && racquet.id}
                      {/* {t("scanSuccessRacName")} */}
                    </Description>
                  </div>
                </div>
              </div>
              {hasRaquet && (
                <div className="scan-details-sc__card-continer-content-inner-card">
                  <div className="scan-details-sc__card-continer-content-inner-card-txt">
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>{t("scanSuccessMains")}</SubHeading>
                      {`${racquet && racquet.mains?.string_id?.name}(${
                        racquet && racquet.mains?.string_id?.hybrid_type
                      })`}
                      {/* <Description>{t("scanSuccessMainsTxt")}</Description> */}
                    </div>
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>{t("scanSuccessCrosses")}</SubHeading>
                      {`${racquet && racquet.crosses?.string_id?.name}(${
                        racquet && racquet.crosses?.string_id?.hybrid_type
                      })`}
                      {/* <Description>{t("scanSuccessCrossesTxt")}</Description> */}
                    </div>
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>{t("scanSuccessOwner")}</SubHeading>
                      {racquet?.owner ? racquet?.owner : "No Name set"}
                      {/* <Description>{t("scanSuccessOwnerName")}</Description> */}
                    </div>
                  </div>
                  <div className="scan-details-sc__card-continer-content-inner-card-txt">
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>{t("odrTension")}</SubHeading>
                      <Description>
                        {racquet && racquet.mains?.tension} lbs
                      </Description>
                    </div>
                    <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                      <SubHeading>{t("odrTension")}</SubHeading>
                      <Description>
                        {racquet && racquet.crosses?.tension} lbs
                      </Description>
                    </div>
                  </div>
                </div>
              )}
              <div>
                {/* <Description customClass="scan-details-sc__card-continer-content-success">
                  {t('odrsuccess')}
                </Description> */}
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
