import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Field, reset } from "redux-form";
import { toast } from "react-toastify";
import {
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
  Modal,
  Description,
  CustomSwitch,
} from "web/components";

import "./EditForm.styles.scss";
import { deleteString, editNewString } from "web/store/Actions/racquetActions";

const required = (value) => (value ? undefined : "This field is required");

export function EditForm({ t, setCurrentScreen, change, initialValues }) {
  const errors = useSelector((state) => state?.form?.inventory?.syncErrors);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(initialValues.in_stock);
  const [price, setPrice] = useState(initialValues.itemPrice);
  const [activeIndex, setActiveIndex] = useState(
    initialValues.type === "Reel" ? 0 : initialValues.type === "Packet" ? 1 : 2
  );
  const [selectedType, setSelectedType] = useState(initialValues.type);
  const handleOnClick = (el, index) => {
    setActiveIndex(index);
    setSelectedType(el);
  };

  const handleCheck = () => setCheck(!check);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const btns = ["Reel", "Packet", "Both"];

  const handleShow = () => setShow(!show);
  const handleShowInfo = () => setShowInfo(!showInfo);
  const values = useSelector((state) => state?.form?.inventory?.values);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const stringName = `${values["edit-brand"]} ${values["edit-model"]}`;
    try {
      await dispatch(
        editNewString(
          initialValues.string_id,
          stringName,
          // values["edit-type"],
          values["edit-brand"],
          values["edit-model"],
          parseInt(values.itemPrice),
          // values?.size,
          // values?.tension,
          selectedType,
          check
        )
      );
      setIsLoading(false);
      setCurrentScreen("inventory");
      dispatch(reset("inventory"));
    } catch (err) {
      setIsLoading(false);
      if (!window.navigator.onLine) {
        return toast.error(
          "Failed to save changes, Please check your internet!"
        );
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteString(initialValues.string_id));
      setIsLoading(false);
      setShow(false);
      setCurrentScreen("inventory");
    } catch (error) {
      setIsLoading(false);
      if (!window.navigator.onLine) {
        return toast.error(
          "Failed to delete string, Please check your internet!"
        );
      }
    }
  };

  return (
    <>
      <Modal
        showModal={show}
        handleShow={handleShow}
        heading={`Delete “${initialValues.string_id}”?`}
        text={
          <div className="">
            <p>This will permanently delete this item.</p>
          </div>
        }
        closeText={
          <div className="flex justify-end items-center gap-[24px]">
            <button onClick={handleShow} type="button">
              Cancel
            </button>
            <button
              className="text-[#EA5353]"
              type="button"
              onClick={handleDelete}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        }
      />
      <Modal
        showModal={showInfo}
        handleShow={handleShowInfo}
        heading="Type specifies how you store this item."
        text={
          <div className="mt-[25px] flex flex-col gap-[25px]">
            <p>
              This matters when hybrid stringing, since each packet won't be
              fully used.
            </p>

            <p>
              <b>If using reels</b>, players will pay half the price for this
              item (since half as much will be used).
            </p>

            <p>
              <b>If using packets</b>, players will pay full price but will
              recieve the extra string when they pick up their order.
            </p>

            <p>
              <b>If using both</b>, players will get to choose which type you
              string with.
            </p>
          </div>
        }
        closeText="Got it"
      />
      <div className="edit-form">
        <div>
          <div className="edit-form__header">
            <BackButton onClick={() => setCurrentScreen("detail")} />
            <Heading>{t("profileFormEdit")}</Heading>
          </div>
          <div className="edit-form__form">
            {/* <Field
              name="edit-type"
              label="Type"
              type="text"
              component={CustomInput}
              validate={required}
            /> */}
            <Field
              name="edit-brand"
              label="Brand"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <Field
              name="edit-model"
              label="Model"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <CustomInput
              // pattern="\d*"
              value={price}
              customOnChange={(e) => {
                const value = e.target.value;
                if (value.charAt(0) === "$") {
                  const substr = value?.substring(1);
                  if (!isNaN(Number(substr))) {
                    setPrice(`${substr}`);
                  }
                } else {
                  if (!isNaN(Number(value))) {
                    setPrice(value);
                  }
                }
              }}
              label="Price"
              name="itemPrice"
              hidePostFix
              customOnBlur={(e) => {
                const value = e?.target?.value;
                if (value?.charAt(0) === "$") {
                  const substr = value?.substring(1);
                  setPrice(`$${Number(substr)?.toFixed(2)}`);
                } else {
                  setPrice(`$${Number(e?.target?.value).toFixed(2)}`);
                }
                change("itemPrice", e?.target?.value);
              }}
            />

            <div className="edit-form__form-types">
              <div className="edit-form__form-types-heading">
                <Description>{t("inventoryAddItemString")}</Description>

                <img
                  onClick={handleShowInfo}
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5OTIgMS42NjYzNEM1LjQxNjU4IDEuNjY2MzQgMS42NjY1OCA1LjQxNjM0IDEuNjY2NTggOS45OTk2N0MxLjY2NjU4IDE0LjU4MyA1LjQxNjU4IDE4LjMzMyA5Ljk5OTkyIDE4LjMzM0MxNC41ODMzIDE4LjMzMyAxOC4zMzMzIDE0LjU4MyAxOC4zMzMzIDkuOTk5NjdDMTguMzMzMyA1LjQxNjM0IDE0LjU4MzMgMS42NjYzNCA5Ljk5OTkyIDEuNjY2MzRaIiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwIDEzLjMzM1Y5LjE2NjM0IiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwLjAwNDYgNi42NjY5OUg5Ljk5NzE1IiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                  alt="info-button"
                  className="cursor-pointer"
                />
              </div>
              <div className="edit-form__form-types-btns">
                {btns.map((el, index) => {
                  return (
                    <>
                      <button
                        key={index}
                        onClick={() => handleOnClick(el, index)}
                        type="button"
                        className={
                          activeIndex === index
                            ? "edit-form__form-types-btns-btn-active"
                            : "edit-form__form-types-btns-btn"
                        }
                      >
                        {el}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
            {/* <div className="item-form__half">
              <Field
                name="size"
                label="Size"
                type="number"
                component={CustomInput}
              />
              <Field
                name="tension"
                label="Tension(lb)"
                type="number"
                component={CustomInput}
              />
            </div> */}
            <div className="edit-form__form-switch">
              <Description>In Stock</Description>
              <CustomSwitch handleChange={handleCheck} checked={check} />
            </div>
          </div>
          <div className="edit-form__delete-button flex justify-center">
            <button
              className="edit-form__delete-button-btn"
              type="button"
              onClick={handleShow}
            >
              {t("profileItemDelete")}
            </button>
          </div>
          <div className="edit-form__button">
            <SubmitButton
              disabled={errors || !price}
              onClick={formSubmitHandler}
              className="w-full"
              type="submit"
            >
              {isLoading ? "Saving..." : t("profileButtonSave")}
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
}
