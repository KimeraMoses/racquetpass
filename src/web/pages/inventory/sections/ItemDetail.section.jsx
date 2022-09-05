import { useSelector } from "react-redux";
import {
  BackButton,
  Heading,
  HeadingButton,
  Description,
} from "web/components";
import { SubHeading } from "web/components/atoms/SubHeading.atom";

import "./ItemDetail.styles.scss";

export function ItemDetails({ t, setCurrentScreen, change }) {
  const string = useSelector(
    (state) => state?.form?.inventory?.values?.current_string
  );
  return (
    <>
      <div className="item-details-inventory">
        <div className="item-details-inventory__header">
          <div className="flex items-center gap-[16px]">
            <BackButton onClick={() => setCurrentScreen("inventory")} />
            <Heading>{string && string?.name}</Heading>
          </div>
          <div>
            <HeadingButton
              text="Edit"
              onClick={() => {
                setCurrentScreen("edit");
                change("edit-name", string?.name);
                change("edit-type", string?.type);
                change("edit-brand", string?.brand);
                change("edit-model", string?.model);
                change("itemPrice", string?.price);
                change("size", string?.size);
                change("tension", string?.tension);
              }}
            />
          </div>
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px] max-w-[450px] m-[0_auto]">
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>String Name</SubHeading>
            <Description>{string && string?.name}</Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t("odrBrnd")}</SubHeading>
            <Description>{string && string?.brand}</Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t("ordModel")}</SubHeading>
            <Description>{string && string?.model}</Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t("inventoryItemPrice")}</SubHeading>
            <Description>
              ${string && string?.price?.toFixed(2)}&nbsp;{" "}
              {/* <span className="text-[#8E8E8E]">
                {t("inventoryItemRSDetail")}
              </span> */}
            </Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t("inventoryType")}</SubHeading>
            <Description>
              {string && string?.hybrid_type ? string?.hybrid_type : "Not set"}
            </Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t("inStock")}</SubHeading>
            <Description>
              {string && string?.in_stock ? "Yes" : "No"}
            </Description>
          </div>
        </div>
      </div>
    </>
  );
}
