import {combineReducers} from 'redux';

import rootSaga from '../saga';
import AppDataReducer from './AppData/Reducer';
import AppsReducer from './Apps/Reducer';
import AuthReducer from './Auth/Reducer';
import configureStore from './CreateStore';
import EnterpriseReducer from './Enterprise/Reducer';
import InvoicesReducer from './Invoices/Reducer';
import PermissionsReducer from './Permissions/Reducer';
import ProfileReducer from './Profile/Reducer';
import StartupReducer from './Startup/Reducer';
import TeamsReducer from './Teams/Reducer';

const createStore = () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    auth: AuthReducer,
    apps: AppsReducer,
    appData: AppDataReducer,
    app: StartupReducer,
    profile: ProfileReducer,
    invoices: InvoicesReducer,
    address: InvoicesReducer,
    accounts: EnterpriseReducer,
    teams: TeamsReducer,
    teamMembers: TeamsReducer,
    changedMember: TeamsReducer,
    permissions: PermissionsReducer,
    teamInfo: TeamsReducer,
  });

  return configureStore(rootReducer, rootSaga);
};

export default createStore;
