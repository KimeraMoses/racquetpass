import { combineReducers } from 'redux';
import userReducer from './modules/auth/reducer';
import settlementReport from './modules/settements-reports/reducer';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  auth: userReducer,
  settlementsReports: settlementReport,
  form: formReducer,
});

export default reducer;
