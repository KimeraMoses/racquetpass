import { useEffect, useMemo, useState } from "react";
import Drawer from "react-modern-drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Custom Components
import { Avatar, HeadingButton, Heading, Tabs } from "web/components";
import { Tick, Shop, Inventory, Payment, Logout } from "web/icons";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "web/store/Slices/authSlice";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const CustomDrawer = () => {
  const query = useQuery();
  const activeLink = query.get("active");
  const [active, setActive] = useState("");
  const { show } = useSelector((state) => state?.drawer);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.pathname === "/tasks") {
      setActive("1");
    } else if (activeLink === "inventory") {
      setActive("3");
    } else if (activeLink === "proshop") {
      setActive("2");
    } else if (activeLink === "payment") {
      setActive("4");
    }
  }, [location?.pathname, activeLink]);

  const dispatch = useDispatch();

  const LogoutHandler = async () => {
    await dispatch(logout());
    navigate("/");
    toast.success("You have logged out successfuly");
  };

  return (
    <>
      <Drawer
        open={show}
        onClose={() => dispatch({ type: "HIDE_DRAWER" })}
        direction="left"
        className="bla bla bla"
        size={`${80}vw`}
      >
        <div className="inventory-dashboard mt-[40px]">
          <div className="inventory-dashboard__profile">
            <div className="inventory-dashboard__profile-avatar">
              <Avatar
                height={102}
                width={102}
                img="/img/player/14.png"
                name={user && user?.full_name}
              />
              <div className="inventory-dashboard__profile-avatar-text">
                <Heading customClass="inventory-dashboard__profile-avatar-text-heading">
                  {user && user?.full_name}
                </Heading>
              </div>
            </div>
            <div className="inventory-dashboard__profile-close">
              <HeadingButton
                close
                height="48px"
                width="48px"
                onClick={() => dispatch({ type: "HIDE_DRAWER" })}
              />
            </div>
          </div>

          <div className="inventory-dashboard__menu">
            <Tabs
              tabs={[
                {
                  title: "Your Orders",
                  Icon: Tick,
                  active: active === "1",
                  onClick: () => {
                    setActive("1");
                    navigate("/tasks");
                    dispatch({ type: "HIDE_DRAWER" });
                  },
                },
                {
                  title: "Shop Settings",
                  Icon: Shop,
                  active: active === "2",
                  onClick: () => {
                    setActive("2");
                    navigate("/inventory?active=proshop");
                    dispatch({ type: "HIDE_DRAWER" });
                  },
                },
                {
                  title: "Inventory",
                  Icon: Inventory,
                  active: active === "3",
                  onClick: () => {
                    setActive("3");
                    navigate("/inventory?active=inventory");
                    dispatch({ type: "HIDE_DRAWER" });
                  },
                },
                {
                  title: "Payment Methods",
                  Icon: Payment,
                  active: active === "4",
                  onClick: () => {
                    setActive("4");
                    navigate("/inventory?active=payment");
                    dispatch({ type: "HIDE_DRAWER" });
                  },
                },
                {
                  title: "Logout",
                  Icon: Logout,
                  active: active === "5",
                  onClick: () => {
                    LogoutHandler();
                    dispatch({ type: "HIDE_DRAWER" });
                  },
                },
              ]}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
