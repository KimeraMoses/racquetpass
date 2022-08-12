import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { MenuButton } from "web/components";
import { TaskStatus } from "web/components";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { Modal } from "web/components/index";
import { Link } from "react-router-dom";
import "./index.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "web/store/Actions/shopActions";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "web/components/Loader/Loader";
import { axios, completeOrderRoute } from "lib/index";
import { toast } from "react-toastify";
import { getShopOrder } from "web/store/Slices/shopSlice";

function Details({ t }) {
  const order = useSelector((state) => state.shop?.order);
  const [show, setShow] = useState(false);
  const completed =
    order && order?.status?.toLowerCase() === "completed" ? true : false;

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const orderId = query.get("order");

  useEffect(() => {}, [order]);

  //COMPLETE ORDER
  const completeOrder = (reverse) => {
    return async (dispatch) => {
      setIsCompleting(true);
      const data = {
        order_id: order && order.id,
        action: reverse ? "reverse" : "complete",
      };
      if (data) {
        const { url } = completeOrderRoute();
        try {
          const res = await axios.post(url, data);
          if (res.status === 200) {
            dispatch(getShopOrder(res.data?.order));
            setIsCompleting(false);
            if (reverse) {
              setShow(false);
              return toast.success("Order status changed to Processing");
            }
            toast.success("Order Completed Successfuly");
          }
          setIsCompleting(false);
        } catch (error) {
          setIsCompleting(false);
          if (error?.response?.status === 400) {
            return toast.error("Pending order can not be completed!");
          }
          toast.error(
            `Failed to complete order#${order && order?.order_number}!`
          );
        }
      }
    };
  };

  const fetchOrderDetails = async (order_id) => {
    setIsLoading(true);
    const type = order_id?.split("-")?.length > 1 ? "uuid" : "id";
    if (order_id) {
      await dispatch(getOrder(order_id, navigate, type));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      ) : (
        <div className="task-detail-container">
          <Modal
            heading="Reopen this task to fix your mistake"
            showModal={show}
            text={
              <div className="mt-[20px] mb-[32px] flex flex-col gap-[20px]">
                <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
                  If you made a mistake, reopen this task to give yourself time
                  to fix it. This will text the player that their order is still
                  in progress.
                </p>

                <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
                  Once you are done fixing your mistake, mark the task as
                  completed.
                </p>
              </div>
            }
            customButtons={
              <div className="flex justify-between gap-[12px] items-center">
                <div
                  className="text-[#EA5353] text-[18px] font-medium cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </div>
                <div
                  className="text-[#304FFE] text-[18px] font-medium cursor-pointer"
                  onClick={() => dispatch(completeOrder(true))}
                >
                  {isCompleting ? "Reopening..." : "Reopen Task"}
                </div>
              </div>
            }
          />
          <div className="header-row">
            <MenuButton>
              <Link to="/tasks/scan">
                <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
              </Link>
            </MenuButton>
            <h1 className="header-row-heading">
              Order #{order && order?.order_number}
            </h1>
          </div>
          <div className="detail-body-container">
            <div className="status-container">
              {completed ? (
                <TaskStatus status>
                  <img className="icon" alt="tick" src="../svg/tick.svg" />
                  {t("taskCompleted")}
                </TaskStatus>
              ) : (
                <TaskStatus>
                  <img
                    className="icon"
                    alt="calender"
                    src="../svg/calender.svg"
                  />
                  {/* {t("taskScannedDueDate")} */}
                  Due on {new Date().toDateString(order && order?.due_on)}
                </TaskStatus>
              )}
            </div>
            <div className="racquet-info">
              <img
                className="img"
                alt="racquet"
                src="../img/tasks/racquet.png"
              />
              <div className="brand">
                <div className="model">{t("taskOpenedBrand")}</div>
                <div className="title">{`${order && order?.racquet?.brand}, ${
                  order && order?.racquet?.model
                }`}</div>
              </div>
            </div>

            <div className="string-details-details">
              <div className="font-semibold text-[24px] text-[#3c3c3c]">
                Desired String Settings
              </div>
              <div className="grid grid-cols-[3fr_1fr] mb-[0px]">
                <div>
                  <div className="string-label">
                    {t("taskScannedMainsHeading")}
                  </div>
                  <div className="string-desc-details">
                    {order &&
                      `${order?.racquet?.mains?.string_id?.name}(${
                        order?.racquet?.mains?.string_id?.hybrid_type
                      }) ${order && order?.racquet?.mains?.string_id?.size} G `}
                  </div>
                </div>
                <div>
                  <div className="string-label">Tension</div>
                  <div className="string-desc-details">{`${
                    order && order?.racquet?.mains?.string_id?.tension
                  } lbs`}</div>
                </div>
                {/* <div className="col-span-full text-[12px] text-[#545454] font-medium mt-[5px] mb-[20px]">
              This player should've brought these strings. Contact them if they
              forgot to or didn't bring enough.
            </div> */}
                <div>
                  <div className="string-label">
                    {t("taskScannedCrossesHeading")}
                  </div>
                  <div className="string-desc-details">
                    {order &&
                      `${order?.racquet?.crosses?.string_id?.name}(${
                        order?.racquet?.crosses?.string_id?.hybrid_type
                      }) ${
                        order && order?.racquet?.crosses?.string_id?.size
                      } G `}
                  </div>
                </div>
                <div>
                  <div className="string-label">Tension</div>
                  <div className="string-desc-details">{`${
                    order && order?.racquet?.crosses?.string_id?.tension
                  } lbs`}</div>
                </div>
                {/* <div className="col-span-full text-[12px] text-[#545454] font-medium mt-[5px] mb-[20px]">
              This player should've brought these strings. Contact them if they
              forgot to or didn't bring enough.
            </div> */}
              </div>
            </div>

            <div className="player-details">
              <div className="title-row">
                <div className="title">{t("taskOpenedPlayerTitle")}</div>
              </div>
              <div className="player-label">
                {t("taskOpenedPlayerNameHeading")}
              </div>
              <div className="player-desc-details">
                {order &&
                  `${order.delivery_address?.first_name} ${order.delivery_address?.last_name}`}
              </div>
              <div className="mt-[8px] text-[#545454] text-[12px] font-medium">
                If this is missing from the racquet's QR sticker, make sure to
                write it in.
              </div>
              <div className="player-label mt-[14px]">
                {t("taskOpenedPlayerPhoneHeading")}
              </div>
              <div className="player-desc text-[#304FFE]">
                <a
                  href={`tel:${order && order?.delivery_address?.phone_number}`}
                >
                  {order && order?.delivery_address?.phone_number}
                </a>
              </div>
            </div>

            <div className="string-details-details">
              <div className="font-semibold text-[24px] text-[#3c3c3c]">
                Order Details
              </div>
              <div className="grid grid-cols-[1fr_1fr] mb-[0px]">
                <div>
                  <div className="string-label">Order Number</div>
                  <div className="string-desc-details">
                    {order && order?.order_number}
                  </div>
                </div>

                <div>
                  <div className="string-label">Price</div>
                  <div className="string-desc-details">
                    ${order && order?.amount}
                  </div>
                </div>
              </div>
            </div>

            <div>
              {completed ? (
                <div
                  className="text-[16px] text-[#304fee] font-semibold text-center mt-[40px] cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  Tap here if you made a mistake stringing this racquet
                </div>
              ) : (
                <SubmitButton
                  className="mt-[40px]"
                  onClick={() => dispatch(completeOrder())}
                >
                  {isCompleting ? "Completing Order..." : "Complete Order"}
                </SubmitButton>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withNamespaces()(Details);
