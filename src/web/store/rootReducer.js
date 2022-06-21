import { combineReducers } from 'redux';
import userReducer from './modules/auth/reducer';
import drawerReducer from './modules/drawer/reducer';
import settlementReport from './modules/settements-reports/reducer';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  auth: userReducer,
  settlementsReports: settlementReport,
  drawer: drawerReducer,
  form: formReducer,
});

export default reducer;
