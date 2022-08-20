import { useEffect, useState } from "react";
import { Field } from "redux-form";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Link, useNavigate } from "react-router-dom";
// Custom Components
import { Heading, Description, Modal } from "web/components";

// Styles
import "./ScanSection.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchRacquetDetails } from "web/store/Actions/racquetActions";
import Loader from "web/components/Loader/Loader";
import { useCookies } from "react-cookie";

export function ScanSection({
  t,
  scanForward,
  change,
  setStep,
  backFromReview,
  setBackFromReview,
  backward,
}) {
  const [cookies, setCookie] = useCookies(["_rpo_"]);
  const [qrCode, setQrCode] = useState("");
  const [qrScanner, setQrScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionsDenied, setPermissionsDenied] = useState(false);
  const racquetDetails = useSelector((state) => state.racquet.racquet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };

  const fetchRacquet = async (rac_id) => {
    if (qrCode) {
      setIsLoading(true);
      await dispatch(
        fetchRacquetDetails(rac_id, navigate, !!cookies?._rpo_ ? false : true)
      );
      scanForward(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRacquet(qrCode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCode]);

  useEffect(() => {
    if (!!localStorage.getItem("_rpr_")) scanForward(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [racquetDetails]);

  useEffect(() => {
    if (qrCode) {
      change("raquet-details-from-qr", qrCode);
    }
  }, [qrCode, change, scanForward]);

  return (
    <>
      <div className="scan-section max-w-[450px] m-[0_auto]">
        <div className="scan-section__heading">
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
          <Heading>
            {backFromReview ? "Change Racquet" : t("scanQRHeading")}
          </Heading>
        </div>
        <div className="scan-section__text-container">
          <Description customClass="scan-section__text-container-text">
            {t("scanQRText")}
          </Description>
        </div>
        <div className="scan-section__link">
          <Modal
            showModal={showModal}
            handleShow={handleShow}
            heading="Don't have a QR sticker?"
            text={
              <div className="mt-[13px]">
                <p className="text-[14px] text-[rgba(51,_51,_51,_0.8)]">
                  You can get QR stickers at any pro shop or club that uses
                  RacquetPass.
                </p>
                <p className="mt-[8px]">
                  You can attach the sticker anywhere on your racquet - a good
                  place is on the inside of the throat.
                </p>
              </div>
            }
          />
          <Link
            onClick={() => setShowModal(true)}
            to="#"
            className="scan-section__link-txt"
          >
            {t("scanQRLinkTxt")}
          </Link>
        </div>
        <div
          className="scan-section__image-container"
          onClick={() => {
            setQrScanner((qrScanner) => !qrScanner);
            setPermissionsDenied(false);
          }}
        >
          {qrScanner && !permissionsDenied ? (
            <>
              <BarcodeScannerComponent
                width={500}
                height={500}
                onError={(err) => {
                  if (err.name === "NotAllowedError") {
                    setPermissionsDenied(true);
                  }
                }}
                onUpdate={(err, result) => {
                  if (result) {
                    let code = result.text;
                    if (result.text.includes("http")) {
                      const codeWord = result.text.split("/");
                      code = codeWord[codeWord?.length - 1];
                    }
                    setQrCode(code);
                    setQrScanner(false);
                  } else {
                    setQrCode("");
                  }
                }}
              />
              <Field
                name="raquet-details-from-qr"
                style={{ visibility: "hidden" }}
                component="input"
              />
            </>
          ) : (
            <>
              <div></div>
              {permissionsDenied ? (
                <div className="px-[30px] text-center text-white text-[24px] font-bold">
                  Please allow camera permissions and scan again.
                </div>
              ) : isLoading ? (
                <div className="bg-white rounded-md text-white p-5 h-2/3 flex justify-center items-center w-4/5">
                  <Loader />
                </div>
              ) : (
                <>
                  <img src="img/orderpage/card.png" alt="scan" />
                </>
              )}
              <div className="scan-section__image-container-button">
                {/* <button
                  className="scan-section__image-container-button-btn"
                  onClick={() => {
                    setQrScanner((qrScanner) => !qrScanner);
                  }}
                > */}
                Scan
                {/* </button> */}
              </div>
            </>
          )}
        </div>
        <div
          className={`scan-section__description ${
            !backFromReview ? "mb-[120px]" : ""
          }`}
        >
          <Description>{t("scanQRDesc")}</Description>
        </div>
        {backFromReview ? (
          <div className="mt-[40px]">
            <SubmitButton disabled>Change to this racquet</SubmitButton>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
