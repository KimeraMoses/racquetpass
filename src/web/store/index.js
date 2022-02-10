import {createStore, applyMiddleware} from "redux"
import reducer from "./rootReducer"
import {createLogger} from "redux-logger";


 function configureState() {
    const middleware = []
    if (process.env.NODE_ENV === "development") {
        middleware.push(createLogger({collapsed: true}))
    }
    const store = createStore(reducer, applyMiddleware(...middleware))

    return {
        ...store
    }
}

export const store = configureState()
