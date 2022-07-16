import React, { useEffect } from "react";
import { withNamespaces } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import {
  HeadingButton,
  CustomButton,
  TaskCard,
  // CustomDrawer,
} from "web/components";
import { Link } from "react-router-dom";
import "./index.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "web/store/Actions/businessActions";

const dueToday = [];
for (let i = 0; i <= 3; i++) {
  dueToday.push({
    title: `Order # 12${i}`,
    description: `Wilson Prostaff 6.1`,
    player: `Player ${i}`,
  });
}

const dueThisWeek = [];
for (let i = 4; i <= 9; i++) {
  dueThisWeek.push({
    title: `Order # 12${i}`,
    description: `Wilson Prostaff 6.1`,
    player: `Player ${i}`,
  });
}

const completed = [];
for (let i = 0; i <= 9; i++) {
  completed.push({
    title: `Order # 1${i}`,
    description: `Wilson Prostaff 6.1`,
    player: `Player ${i}`,
  });
}

function Tasks({ t }) {
  // const [showDrawer, setShowDrawer] = useState(false);
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders(authToken));
  }, [authToken]);
  return (
    <div className="tasks-container">
      {/* <CustomDrawer show={showDrawer} setShow={setShowDrawer} /> */}
      <div className="header-row">
        <HeadingButton
          drawer
          onClick={() => dispatch({ type: "SHOW_DRAWER" })}
        />
        <h1 className="header-row-heading">{t("taskHeading")}</h1>
        <CustomButton size="sm" btn="white">
          <Link to="/Tasks/Scan">{t("taskScan")}</Link>
        </CustomButton>
      </div>
      <div className="tasks-body">
        <div id="due-tasks">
          <div className="task-row">
            <p className="title">Your Orders</p>
            <p className="link" onClick={showCompletedTasks}>
              {t("taskShowCompleted")}
            </p>
          </div>
          <p className="mb-[35px] text-[#545454] text-[18px]">
            To complete an order or view its details, scan the racquet the order
            is associated with.
          </p>
          <div className="task-row">
            <p className="tasks-info">{t("taskDueToday")}</p>
            <div className="badge">{dueToday?.length}</div>
          </div>
          <div className="cards-container">
            {dueToday?.map((task) => {
              return (
                <TaskCard
                  key={task.title}
                  title={task?.title}
                  desc={task?.description}
                  name={task?.player}
                />
              );
            })}
          </div>
          <div className="task-row">
            <p className="tasks-info">{t("taskDueWeek")}</p>
            <div className="badge">{dueThisWeek?.length}</div>
          </div>
          <div className="cards-container">
            {dueThisWeek?.map((task) => {
              return (
                <TaskCard
                  key={task.title}
                  title={task?.title}
                  desc={task?.description}
                  name={task?.player}
                />
              );
            })}
          </div>
        </div>
        <div id="completed-tasks">
          <div className="task-row">
            <p className="title">{t("taskCompleted")}</p>
            <div className="link" onClick={showDueTasks}>
              {t("taskHideCompleted")}
            </div>
          </div>
          <p className="mb-[35px] text-[#545454] text-[18px]">
            To complete an order or view its details, scan the racquet the order
            is associated with.
          </p>
          <div className="task-row">
            <p className="tasks-info">Completed</p>
            <div className="badge">{completed?.length}</div>
          </div>
          <div className="cards-container">
            {completed?.map((task) => {
              return (
                <TaskCard
                  title={task?.title}
                  desc={task?.description}
                  name={task?.player}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function showCompletedTasks() {
  document.getElementById("due-tasks").style.display = "none";
  document.getElementById("completed-tasks").style.display = "block";
}
function showDueTasks() {
  document.getElementById("due-tasks").style.display = "block";
  document.getElementById("completed-tasks").style.display = "none";
}

export default withNamespaces()(Tasks);
