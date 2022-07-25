import { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import { Link } from 'react-router-dom';
// Custom Components
import { Heading, Description } from "web/components";

// Styles
import { BackButton } from "web/components/Buttons/BackButton.component";
import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./index.styles.scss";

let Scan = ({ t, scanForward, change }) => {
  const [qrCode, setQrCode] = useState("");
  const [qrScanner, setQrScanner] = useState(false);
  const [permissionsDenied, setPermissionsDenied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (qrCode) {
      change("order-details-id", qrCode);
      navigate(`/Tasks/Details?order=${qrCode}`);
    }
  }, [qrCode, change, scanForward]);

  console.log(permissionsDenied);

  return (
    <>
      <div className="task-scan-section">
        <div className="task-scan-section__heading">
          <BackButton onClick={() => navigate("/tasks")} />
          <Heading>Scan QR Code</Heading>
        </div>
        <div className="max-w-[450px] m-[0_auto]">
          <div
            className="task-scan-section__image-container"
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
                    console.log(err?.name);
                    if (err.name === "NotAllowedError") {
                      setPermissionsDenied(true);
                    }
                  }}
                  onUpdate={(err, result) => {
                    if (result) {
                      setQrCode(result.text);
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
                ) : (
                  <img src="/img/orderpage/card.png" alt="scan" />
                )}
                <div className="task-scan-section__image-container-button">
                  {/* <button
                  className="task-scan-section__image-container-button-btn"
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
          <div className="task-scan-section__description">
            <Description>{t("scanQRDesc")}</Description>
          </div>
        </div>
      </div>
    </>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

Scan = reduxForm({
  // a unique name for the form
  form: "task-scan",
  onSubmit,
})(Scan);

export default withNamespaces()(Scan);
