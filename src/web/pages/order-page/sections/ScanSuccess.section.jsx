// Custom Components
import { useSelector } from "react-redux";
import { Heading, SubHeading, Description, BackButton } from "web/components";

// Styles
import "./ScanSuccess.styles.scss";

export function ScanSuccess({
  t,
  backward,
  setStep,
  setBackFromReview,
  backFromReview,
}) {
  const racquet = useSelector((state) => state.racquet?.racquet);
  console.log("rac details", racquet);
  return (
    <>
      <div className="scan-details-sc max-w-[450px] m-[0_auto]">
        <div>
          {/* <BackButton /> */}
          <div className="scan-details-sc__heading">
            <BackButton
              onClick={() => {
                if (backFromReview) {
                  setStep(6);
                  setBackFromReview(false);
                } else {
                  backward();
                }
              }}
            />
            <Heading>{t("scanSuccessHeading")}</Heading>
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
                      {racquet && racquet.sport?.toUpperCase()} RACQUET
                    </SubHeading>
                    <Description>
                      {racquet && racquet.id}
                      {/* {t("scanSuccessRacName")} */}
                    </Description>
                  </div>
                </div>
              </div>
              <div className="scan-details-sc__card-continer-content-inner-card">
                <div className="scan-details-sc__card-continer-content-inner-card-txt">
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t("scanSuccessMains")}</SubHeading>
                    {racquet && racquet.mains?.string_type}
                    {/* <Description>{t("scanSuccessMainsTxt")}</Description> */}
                  </div>
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t("scanSuccessCrosses")}</SubHeading>
                    {racquet && racquet.crosses?.string_type}
                    {/* <Description>{t("scanSuccessCrossesTxt")}</Description> */}
                  </div>
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t("scanSuccessOwner")}</SubHeading>
                    {racquet && racquet?.account?.full_name}
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
              <div>
                {/* <Description customClass="scan-details-sc__card-continer-content-success">
                  {t('odrsuccess')}
                </Description> */}
              </div>
            </div>
          </div>
          <button
            className="scan-details-sc__card-continer-content-rescan"
            onClick={backward}
          >
            {t("ordRescan")}
          </button>
        </div>
      </div>
    </>
  );
}
