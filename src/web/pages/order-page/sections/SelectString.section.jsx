import { useState } from "react";
import { Field } from "redux-form";
import { useSelector } from "react-redux";
// Custom Components
import {
  Heading,
  Description,
  CustomSelect,
  CustomInputNumber,
  InfoButton,
  CustomOrderSelect,
  CustomSwitch,
  CustomInput,
  Modal,
  BackButton,
  FileInput,
} from "web/components";

// Styles
import "./SelectString.styles.scss";
import { useEffect } from "react";

const convertPoundsToKilograms = (value, unit) => {
  let result;
  if (unit === "kg") {
    result = value * 0.453592;
  } else {
    result = value / 0.453592;
  }
  return result;
};

const required = (value) => (value ? undefined : "Required");

export function SelectString({
  t,
  backward,
  setStringsCurrent,
  setStep,
  change,
  setMainCross,
  setMain,
  setCross,
  backFromReview,
  setBackFromReview,
}) {
  const [modal, setModal] = useState(false);
  const [unit, setUnit] = useState("lbs");
  const racquet = useSelector((state) => state.racquet?.racquet);
  const handleShow = () => {
    setModal((modal) => !modal);
  };
  // const [mainsTension, setMainsTension] = useState(main?.tension);
  const brand = useSelector((state) => state?.form?.signup?.values?.brand);
  const main = useSelector((state) => state?.form?.signup?.values?.main);
  const cross = useSelector((state) => state?.form?.signup?.values?.cross);
  const [mainsTension, setMainsTension] = useState(brand?.tension);
  const [crossesTension, setCrossesTension] = useState(cross?.tension);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (racquet) {
      if (checked) {
        change("main", {
          shop_id: racquet?.mains?.string_id?.shop,
          string_id: racquet?.mains?.string_id?.id,
          tension: racquet?.mains?.tension,
          name: `${racquet?.mains?.string_id?.name}(${racquet?.mains?.string_id?.hybrid_type})`,
          description: `${racquet?.mains?.string_id?.brand}, ${racquet?.mains?.string_id?.model}`,
          price: `$${racquet?.mains?.string_id?.price}`,
          size: racquet?.mains?.string_id?.size,
        });
        change("cross", {
          shop_id: racquet?.crosses?.string_id?.shop,
          string_id: racquet?.crosses?.string_id?.id,
          tension: racquet?.crosses?.tension,
          name: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type})`,
          description: `${racquet?.crosses?.string_id?.brand}, ${racquet?.crosses?.string_id?.model}`,
          price: `$${racquet?.crosses?.string_id?.price}`,
          size: racquet?.crosses?.string_id?.size,
        });
      } else {
        change("brand", {
          shop_id: racquet?.crosses?.string_id?.shop,
          string_id: racquet?.crosses?.string_id?.id,
          tension: racquet?.crosses?.tension,
          name: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type})`,
          description: `${racquet?.crosses?.string_id?.brand}, ${racquet?.crosses?.string_id?.model}`,
          price: `$${racquet?.crosses?.string_id?.price}`,
          size: racquet?.crosses?.string_id?.size,
        });
      }
    }
  }, [racquet, checked]);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    if (nextChecked) {
      change("brand", {});
    }
  };

  const racquetSport = useSelector(
    (state) => state?.form?.signup?.values?.racquetSport
  );
  const racquetBrand = useSelector(
    (state) => state?.form?.signup?.values?.racquetBrand
  );

  return (
    <>
      <div className="select-string-odr max-w-[450px] m-[0_auto]">
        <Modal
          showModal={modal}
          handleShow={handleShow}
          heading="Use hybrid strings for further customization"
          text={
            <div className="flex flex-col gap-[24px] mt-[18px]">
              <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
                Enable “use hybrid strings” to use different strings for mains
                and crosses.
              </p>
              <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
                Mains are the vertical strings and crosses are the horizontal
                strings.
              </p>
            </div>
          }
          closeText="Got it"
        />
        <div className="select-string-odr__heading">
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
          <Heading>{backFromReview ? "Strings" : t("odrSelect")}</Heading>
        </div>
        {backFromReview ? (
          <></>
        ) : (
          <div className="select-string-odr__text-container">
            <Description customClass="select-string-odr__text-container-text">
              {t("selectStringDesc")}
            </Description>
          </div>
        )}
        <div className="select-string-odr__main-info">
          {checked ? (
            <>
              <div className="select-string-odr__main-info-select">
                <div className="select-string-mc__main-info-heading">
                  <Heading>{t("odrMain")}</Heading>
                </div>
                <div className="select-string-mc__main-info-select">
                  <CustomOrderSelect
                    label="String Type"
                    placeholder="Select a String Type"
                    placeholderBold
                    link={
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4IDYuNDY2NjdMOS40MzMzIDEwLjgxMzNDOC45MTk5NyAxMS4zMjY3IDguMDc5OTcgMTEuMzI2NyA3LjU2NjY0IDEwLjgxMzNMMy4yMTk5NyA2LjQ2NjY3IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                        alt="down-arrow"
                      />
                    }
                    onSelectClick={() => {
                      setMain(true);
                      setCross(false);
                      setMainCross({ current: "search" });
                    }}
                    value={main?.name}
                  />
                </div>
                <div className="select-string-mc__main-info-number">
                  <CustomInputNumber
                    label="Tension"
                    value={mainsTension}
                    onChange={(e) => {
                      setMainsTension(e.target.value);
                      const newTension = {
                        tension: parseInt(e.target.value),
                      };
                      const newMain = { ...main, ...newTension };
                      change("main", newMain);
                    }}
                    link={{
                      text: `Change units to ${unit === "kg" ? "lbs" : "kg"}`,
                      path: "#",
                      onClick: () => {
                        if (unit === "kg") {
                          setUnit("lbs");
                          setMainsTension(50);
                          setCrossesTension(50);
                        } else {
                          setUnit("kg");
                          setMainsTension(25);
                          setCrossesTension(25);
                        }
                      },
                    }}
                    postFix={unit}
                    type="number"
                  />
                </div>
              </div>
              <div className="select-string-mc__crosses-info">
                <div className="select-string-mc__crosses-info-heading">
                  <Heading>{t("odrcross")}</Heading>
                </div>
                <div className="select-string-mc__crosses-info-select">
                  <CustomOrderSelect
                    label="String Type"
                    placeholder="Select a String Type"
                    placeholderBold
                    link={
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4IDYuNDY2NjdMOS40MzMzIDEwLjgxMzNDOC45MTk5NyAxMS4zMjY3IDguMDc5OTcgMTEuMzI2NyA3LjU2NjY0IDEwLjgxMzNMMy4yMTk5NyA2LjQ2NjY3IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                        alt="down-arrow"
                      />
                    }
                    value={cross?.name}
                    onSelectClick={() => {
                      setMain(false);
                      setCross(true);
                      // setMainCross({ current: "search" });
                      setStringsCurrent("search");
                    }}
                  />
                </div>
                <div className="select-string-mc__crosses-info-number">
                  <CustomInputNumber
                    label="Tension"
                    value={crossesTension}
                    onChange={(e) => {
                      setCrossesTension(e.target.value);
                      const newTension = {
                        tension: parseInt(e.target.value),
                      };
                      const newCross = { ...cross, ...newTension };
                      change("cross", newCross);
                    }}
                    link={{
                      text: `Change units to ${unit === "kg" ? "lbs" : "kg"}`,
                      path: "#",
                      onClick: () => {
                        if (unit === "kg") {
                          setUnit("lbs");
                          setMainsTension(50);
                          setCrossesTension(50);
                        } else {
                          setUnit("kg");
                          setMainsTension(25);
                          setCrossesTension(25);
                        }
                      },
                    }}
                    postFix={unit}
                    type="number"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="select-string-odr__main-info-select">
                <CustomOrderSelect
                  label="String Type"
                  placeholder="Select a String Type"
                  placeholderBold
                  link={
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4IDYuNDY2NjdMOS40MzMzIDEwLjgxMzNDOC45MTk5NyAxMS4zMjY3IDguMDc5OTcgMTEuMzI2NyA3LjU2NjY0IDEwLjgxMzNMMy4yMTk5NyA2LjQ2NjY3IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                      alt="down-arrow"
                    />
                  }
                  value={brand?.name}
                  onSelectClick={() => setStringsCurrent("search")}
                />
              </div>
              <div className="select-string-odr__main-info-number">
                <CustomInputNumber
                  label="Tension"
                  placeholder=" "
                  value={mainsTension}
                  pattern="\d*"
                  onChange={(e) => {
                    setMainsTension(e.target.value);
                    const newTension = {
                      tension: parseInt(e.target.value),
                    };
                    const newString = { ...brand, ...newTension };
                    change("brand", newString);
                  }}
                  link={{
                    text: `Change units to ${unit === "kg" ? "lbs" : "kg"}`,
                    path: "#",
                    onClick: () => {
                      if (unit === "kg") {
                        setUnit("lbs");
                        setMainsTension(
                          convertPoundsToKilograms(mainsTension, "lbs")
                        );
                      } else {
                        setUnit("kg");
                        setMainsTension(
                          convertPoundsToKilograms(mainsTension, "kg")
                        );
                      }
                    },
                  }}
                  postFix={unit}
                  type="number"
                />
              </div>
            </>
          )}
        </div>

        <div className="select-string-odr__hybrid-settings">
          <div className="select-string-odr__hybrid-settings-text">
            Use Hybrid Settings
          </div>
          <div className="select-string-odr__hybrid-settings-switch">
            <CustomSwitch
              handleChange={() => {
                setStep(3);
                setStringsCurrent("initial");
                change("brand", {});
              }}
              // handleChange={handleChange}
              checked={false}
              // checked={hybrid}
              // handleChange={(e) => setHybrid(e.target.checked)}
            />
            <InfoButton onClick={handleShow} />
          </div>
        </div>

        {backFromReview ? (
          <></>
        ) : (
          <>
            <div className="select-string-odr__recquet-heading">
              <Heading>{t("odrdetailHeading")}</Heading>
              <Description>{t("orderRecquetDesc")}</Description>
            </div>
            <div className="select-string-odr__recquet-form">
              <Field
                name="racquetSport"
                label="Sport"
                placeholder="Select a sport"
                component={(props) => {
                  return (
                    <CustomSelect
                      {...props}
                      customOnChange={(option) => {
                        change("racquetSport", option?.value);
                      }}
                      value={
                        racquetSport
                          ? { label: racquetSport, value: racquetSport }
                          : null
                      }
                    />
                  );
                }}
                validate={required}
                options={[
                  { label: "Tennis", value: "Tennis" },
                  { label: "Squash", value: "Squash" },
                  // { label: "Badminton", value: "Badminton" },
                  // { label: "Other", value: "Other" },
                ]}
              />
              <Field
                name="racquetBrand"
                label="Brand"
                validate={required}
                component={(props) => {
                  return (
                    <CustomSelect
                      {...props}
                      placeholder="Select a racquet brand"
                      customOnChange={(option) => {
                        change("racquetBrand", option?.value);
                      }}
                      value={
                        racquetBrand
                          ? { label: racquetBrand, value: racquetBrand }
                          : null
                      }
                    />
                  );
                }}
                options={[
                  { label: "Babolat", value: "Babolat" },
                  { label: "Wilson", value: "Wilson" },
                  { label: "Head", value: "Head" },
                  { label: "Prince", value: "Prince" },
                  { label: "Yonex", value: "Yonex" },
                  { label: "Volkl", value: "Volkl" },
                  { label: "Dunlop", value: "Dunlop" },
                  { label: "Technifibre", value: "Technifibre" },
                  { label: "Prokennex", value: "Prokennex" },
                  { label: "Solinco", value: "Solinco" },
                  { label: "Gamma", value: "Gamma" },
                  { label: "Lacoste", value: "Lacoste" },
                  { label: "Donnay", value: "Donnay" },
                  { label: "Other", value: "Other" },
                ]}
              />
              <Field
                name="racquetModel"
                label="Model"
                validate={required}
                type="text"
                component={CustomInput}
              />
              {/* <Field
                name="ownerName"
                label="Racquet Owner"
                validate={required}
                type="text"
                component={CustomInput}
              /> */}
              <div className="select-string-odr__recquet-form-pic-box">
                <FileInput
                  name="racquetImage"
                  label="Picture (optional)"
                  change={change}
                  accept="image/*"
                  background={racquet?.image_url}
                />
                <Description>
                  Adding a picture makes it easy for your stringer to pick out
                  your racquet from others.
                </Description>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
