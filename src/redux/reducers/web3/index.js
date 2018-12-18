import { combineReducers } from "redux";

import transactions from "./transactions";
import contracts from "./contracts";
import network from "./network";
import account from "./account";
import chain from "./chain";
import subscription from "./subscription";

export default combineReducers({
    transactions,
    contracts,
    network,
    account,
    chain,
    subscription
});
