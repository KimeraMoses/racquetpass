import { Field, reduxForm } from "redux-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Custom Components
import {
  Heading,
  Description,
  CustomInputNumber,
  InfoButton,
  CustomOrderSelect,
  CustomSwitch,
  CustomInput,
  CustomSelect,
} from "web/components";
import { withNamespaces } from "react-i18next";
// Styles
import "./SelectStringWithMainCross.styles.scss";
import { FileInput } from "web/components/formFields/index";
import { useState } from "react";
import { Modal } from "web/components/index";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { useEffect } from "react";
import {
  getRacquetSuccess,
  setIsHybrid,
  setStringBrand,
  setStringCross,
  setStringMain,
} from "web/store/Slices/racquetSlice";
import { useDispatch } from "react-redux";
import {
  createNewRacquet,
  editRacquetDetails,
} from "web/store/Actions/racquetActions";
import { setBackFromPreview } from "web/store/Slices/shopSlice";

const required = (value) => (value ? undefined : "Required");

const convertPoundsToKilograms = (value, unit) => {
  let result;
  if (unit === "kg") {
    result = value * 0.453592;
  } else {
    result = value / 0.453592;
  }
  return result;
};

function SelectString({ t, change }) {
  const backFromReview = useSelector((state) => state?.shop?.backFromPreview);
  const main = useSelector((state) => state.racquet?.main);
  const cross = useSelector((state) => state.racquet?.cross);
  const brand = useSelector((state) => state.racquet?.brand);
  const [mainsTension, setMainsTension] = useState(main?.tension);
  const [crossesTension, setCrossesTension] = useState(cross?.tension);
  const [brandTension, setBrandTension] = useState(brand?.tension);
  const [options, setOptions] = useState([
    { label: "You must select a sport first", value: "" },
  ]);
  const racquet = useSelector((state) => state.racquet?.racquet);
  const hybrid = useSelector((state) => state.racquet?.hybrid);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [unit, setUnit] = useState("lbs");
  const hasRacquet = !!useSelector((state) => state.racquet?.racquet?.qr_code);
  const racquetSport = useSelector(
    (state) => state?.form?.strings?.values?.racquetSport
  );
  const racquetBrand = useSelector(
    (state) => state?.form?.strings?.values?.racquetBrand
  );
  const values = useSelector((state) => state?.form?.strings?.values);
  const dispatch = useDispatch();

  const order = JSON.parse(localStorage.getItem("_rapo_"));

  useEffect(() => {
    if (
      !hasRacquet &&
      order?.racquet &&
      Object.keys(order?.racquet).length !== 0
    ) {
      dispatch(getRacquetSuccess(order?.racquet));
    }
    if (
      Object.keys(brand).length === 0 &&
      Object.keys(main).length === 0 &&
      Object.keys(cross).length === 0
    ) {
      const mains = {
        shop_id: order?.racquet?.mains?.string_id?.shop,
        string_id: order?.racquet?.mains?.string_id?.id,
        name: order?.racquet?.mains?.string_id?.name,
        in_stock: order?.racquet?.mains?.string_id?.in_stock,
        price: order?.racquet?.mains?.string_id?.price,
        tension: order?.racquet?.mains?.tension,
      };
      const crosses = {
        shop_id: order?.racquet?.crosses?.string_id?.shop,
        string_id: order?.racquet?.crosses?.string_id?.id,
        name: order?.racquet?.crosses?.string_id?.name,
        in_stock: order?.racquet?.crosses?.string_id?.in_stock,
        price: order?.racquet?.crosses?.string_id?.price,
        tension: order?.racquet?.crosses?.tension,
      };
      dispatch(setStringMain(mains));
      dispatch(setStringCross(crosses));
      dispatch(setStringBrand(mains));
      if (order?.hybrid) {
        dispatch(setIsHybrid(true));
      } else {
        dispatch(setIsHybrid(false));
      }
    }
  }, []);

  useEffect(() => {
    if (hasRacquet) {
      change("racquetId", racquet && racquet?.id);
      change("racquetSport", racquet && racquet?.sport);
      change("racquetBrand", racquet && racquet?.brand);
      change("racquetModel", racquet && racquet?.model);
      change("racquetImage", racquet && racquet?.image_url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRacquet]);

  const NewRacquetHandler = async () => {
    // setIsLoading(true);
    const EditData = {
      qr_code: racquet?.qr_code
        ? racquet?.qr_code
        : localStorage.getItem("_qrc_"),
      id: racquet?.id,
      brand: values?.racquetBrand,
      model: values?.racquetModel,
      image_url: values?.racquetImage ? values?.racquetImage : "",
      mains: {
        string_id: hybrid
          ? { ...main, id: main?.string_id }
          : { ...brand, id: brand?.string_id },
        tension: !hybrid ? parseInt(brandTension) : parseInt(mainsTension),
      },
      crosses: {
        string_id: hybrid
          ? { ...cross, id: cross?.string_id }
          : { ...brand, id: brand?.string_id },
        tension: !hybrid ? parseInt(brandTension) : parseInt(crossesTension),
      },
      sport: values?.racquetSport,
    };
    try {
      await dispatch(getRacquetSuccess(EditData));
      const orderState = {
        ...order,
        racquet: EditData,
        hybrid: hybrid,
      };
      localStorage.setItem("_rapo_", JSON.stringify(orderState));
      // localStorage.removeItem("_qrc_");
      // setIsLoading(false);
      if (backFromReview) {
        navigate("/order-flow/review");
      } else {
        navigate("/order-flow/contacts");
      }
    } catch (error) {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    let Options = [{ label: "You must select a sport first", value: "" }];
    if (racquetSport === "Tennis") {
      Options = [
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
      ];
    } else if (racquetSport === "Squash") {
      Options = [
        { label: "Head", value: "Head" },
        { label: "Prince", value: "Prince" },
        { label: "Eye", value: "Eye" },
        { label: "Harrow", value: "Harrow" },
        { label: "Dunlop", value: "Dunlop" },
        { label: "Technifibre", value: "Technifibre" },
        { label: "Black Knight", value: "Black Knight" },
        { label: "Karakal", value: "Karakal" },
        { label: "Manta", value: "Manta" },
        { label: "Ashaway", value: "Ashaway" },
        { label: "Unsquashable", value: "Unsquashable" },
      ];
    } else {
      Options = [{ label: "You must select a sport first", value: "" }];
    }
    setOptions(Options);
  }, [racquetSport]);

  // console.log("brand", brand);
  // console.log("cross", cross);
  // console.log("main", main);
  // console.log("order state", order);
  console.log("current rac", racquet, values?.racquetBrand);
  // console.log(mainsTension, crossesTension, brandTension);

  return (
    <div>
      <Modal
        showModal={modal}
        handleShow={() => setModal(!modal)}
        heading="Use hybrid strings for further customization"
        text={
          <div className="flex flex-col gap-[24px] mt-[18px]">
            <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
              Enable “use hybrid strings” to use different strings for mains and
              crosses.
            </p>
            <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
              Mains are the vertical strings and crosses are the horizontal
              strings.
            </p>
          </div>
        }
        closeText="Got it"
      />
      <div className="select-string-mc max-w-[450px] m-[0_auto]">
        <div className="select-string-mc__heading justify-start gap-[16px]">
          <BackButton
            onClick={() => {
              if (backFromReview) {
                dispatch(setBackFromPreview(false));
                navigate("/order-flow/review");
              } else {
                navigate("/order-flow/scanned");
              }
            }}
          />
          <Heading customClass="select-string-mc__heading-text">
            {backFromReview ? "Strings" : t("odrSelect")}
          </Heading>
        </div>
        <div className="select-string-mc__text-container">
          {backFromReview ? (
            <></>
          ) : (
            <Description customClass="select-string-mc__text-container-text">
              Select the strings you want your racquet restrung with.
            </Description>
          )}
        </div>
        {!hybrid ? (
          <div className="select-string-odr__main-info">
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
                onSelectClick={() =>
                  navigate("/order/select-strings?type=brand")
                }
              />
            </div>
            <div className="select-string-odr__main-info-number">
              <CustomInputNumber
                label="Tension"
                value={brandTension}
                placeholder="10.00"
                onChange={(e) => {
                  const t = e.target.value;
                  const newV =
                    t.indexOf(".") >= 0
                      ? t.substr(0, t.indexOf(".")) +
                        t.substr(t.indexOf("."), 3)
                      : t;
                  setBrandTension(newV);
                }}
                link={{
                  text: `Change units to ${unit === "kg" ? "lbs" : "kg"}`,
                  path: "#",
                  onClick: () => {
                    if (unit === "kg") {
                      setUnit("lbs");
                    } else {
                      setUnit("kg");
                    }
                  },
                }}
                postFix={unit}
                type="number"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="select-string-mc__main-info">
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
                  // onSelectClick={() => {
                  //   setMain(true);
                  //   setCross(false);
                  //   setMainCross({ current: "search" });
                  // }}
                  onSelectClick={() =>
                    navigate("/order/select-strings?type=main")
                  }
                  value={main?.name}
                />
              </div>
              <div className="select-string-mc__main-info-number">
                <CustomInputNumber
                  label="Tension"
                  placeholder="10.00"
                  value={mainsTension}
                  onChange={(e) => {
                    const t = e.target.value;
                    const newV =
                      t.indexOf(".") >= 0
                        ? t.substr(0, t.indexOf(".")) +
                          t.substr(t.indexOf("."), 3)
                        : t;
                    setMainsTension(newV);
                  }}
                  link={{
                    text: `Change units to ${unit === "kg" ? "lbs" : "kg"}`,
                    path: "#",
                    onClick: () => {
                      if (unit === "kg") {
                        setUnit("lbs");
                      } else {
                        setUnit("kg");
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
                  // onSelectClick={() => {
                  //   setMain(false);
                  //   setCross(true);
                  //   setMainCross({ current: "search" });
                  // }}
                  onSelectClick={() =>
                    navigate("/order/select-strings?type=cross")
                  }
                />
              </div>
              <div className="select-string-mc__crosses-info-number">
                <CustomInputNumber
                  label="Tension"
                  value={crossesTension}
                  placeholder="10.00"
                  onChange={(e) => {
                    const t = e.target.value;
                    const newV =
                      t.indexOf(".") >= 0
                        ? t.substr(0, t.indexOf(".")) +
                          t.substr(t.indexOf("."), 3)
                        : t;
                    setCrossesTension(newV);
                  }}
                  link={{
                    text: `Change units to ${unit === "kg" ? "lbs" : "kg"}`,
                    path: "#",
                    onClick: () => {
                      if (unit === "kg") {
                        setUnit("lbs");
                      } else {
                        setUnit("kg");
                      }
                    },
                  }}
                  postFix={unit}
                  type="number"
                />
              </div>
            </div>
          </>
        )}
        <div className="select-string-mc__hybrid-settings">
          <div className="select-string-mc__hybrid-settings-text">
            Use Hybrid Settings
          </div>
          <div className="select-string-mc__hybrid-settings-switch">
            <CustomSwitch
              handleChange={() => {
                dispatch(setIsHybrid(!hybrid));
              }}
              checked={hybrid}
            />
            <InfoButton onClick={() => setModal(!modal)} />
          </div>
        </div>
        {backFromReview ? (
          <> </>
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
                        change("racquetBrand", "");
                      }}
                      placeholder="Select brand"
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
                ]}
              />
              <Field
                name="racquetBrand"
                label="Brand"
                placeholder="Select a racquet brand"
                validate={required}
                component={(props) => {
                  return (
                    <CustomSelect
                      {...props}
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
                options={options?.sort((a, b) =>
                  a?.label?.toUpperCase() < b?.label?.toUpperCase()
                    ? -1
                    : a?.label?.toUpperCase() > b?.label?.toUpperCase()
                    ? 1
                    : 0
                )}
              />
              <Field
                name="racquetModel"
                label="Model"
                validate={required}
                type="text"
                component={CustomInput}
              />

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
      <div className="order-page__button-container max-w-[450px] w-full mr-[auto] ml-[auto]">
        <SubmitButton
          disabled={
            (!racquetBrand && !backFromReview) ||
            (!racquetSport && !backFromReview) ||
            (!values?.racquetModel && !backFromReview) ||
            (!hybrid && !brandTension) ||
            (hybrid && !mainsTension) ||
            (hybrid && !crossesTension)
          }
          onClick={NewRacquetHandler}
        >
          {backFromReview ? "Save Changes" : "Next"}
        </SubmitButton>
      </div>
    </div>
  );
}
SelectString = reduxForm({
  form: "strings",
})(SelectString);

export default withNamespaces()(SelectString);
