import {combineReducers} from "redux";
import userReducer from "./modules/auth/reducer"
import settlementReport from "./modules/settements-reports/reducer"
const reducer = combineReducers({
    auth:userReducer,
    settlementsReports:settlementReport
})

export default reducer