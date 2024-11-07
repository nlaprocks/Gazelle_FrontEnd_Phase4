import { UPDATE_FORM_DATA } from "./formType";

const initialState = {
    formData: {},
    // formData: {
    //     cumulativeShare: "",
    //     minDollarSales: "",
    //     weeks: "",
    // },
    // cumulativeShare:"",
    // minDollarSales:"",
    // weeks:"",
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FORM_DATA:
            return {
                ...state,
                formData: action.payload,
            };
        default:
            return state;
    }
};

export default formReducer;
