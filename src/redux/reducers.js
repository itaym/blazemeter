import { GET_DATA } from "./actions"

export default (state, action) => {

    switch (action.type) {
        case GET_DATA :
            return {
                ...state,
                reports: action.payload,
            };
        default:
            return {
                reports: [],
            };
    }
}