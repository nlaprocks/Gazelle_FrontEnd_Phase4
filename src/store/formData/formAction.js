
import { UPDATE_FORM_DATA } from "./formType";

export const updateFormData = (formData) => {
    return {
        type: UPDATE_FORM_DATA,
        payload: formData,
    };
};
