import { combineReducers } from "redux";
import drawerReducer from "./modules/drawer/reducer";
import settlementReport from "./modules/settements-reports/reducer";
import { reducer as formReducer } from "redux-form";
import userReducer from "./Slices/authSlice";
import businessReducer from "./Slices/businessSlice";

const reducer = combineReducers({
  auth: userReducer,
  business: businessReducer,
  settlementsReports: settlementReport,
  drawer: drawerReducer,
  form: formReducer,
});

export default reducer;
