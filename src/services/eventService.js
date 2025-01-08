import axios from 'axios'

export const eventService = {
    async getEvents() {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            const config = { headers: { Authorization: `Bearer ` + auth.token } }
            const response = await axios.get(`${process.env.REACT_APP_Base_URL}/api/v1/events`, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async createImportedEvent(event) {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            let eventData = {
                ...event,
                // brand_id: event.brand_id,
                // retailer_id: event.retailer_id,
                // user_id: auth.user_id,
                status: event.status.toUpperCase(), // Uppercase only
            }
            const config = { headers: { Authorization: `Bearer ` + auth.token } }
            const response = await axios.post(`${process.env.REACT_APP_Base_URL}/api/v1/events`, eventData, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async createEvent(event) {
        try {
            console.log({ saveEvent: event });

            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            let eventData = {
                ...event,
                // brand_id: event.brand_id,
                // // end_date: event.endDate,
                // // start_date: event.startDate,
                // project_id: event.project_id,
                // model_id: event.model_id,
                // retailer_id: event.retailer_id,
                user_id: auth.user_id,
                status: event.status.toUpperCase(), // Uppercase only
            }
            const config = { headers: { Authorization: `Bearer ` + auth.token } }
            const response = await axios.post(`${process.env.REACT_APP_Base_URL}/api/v1/events`, eventData, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async updateEvent(event) {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            const config = { headers: { Authorization: `Bearer ` + auth.token, 'Content-Type': 'application/json' } }
            const response = await axios.put(`${process.env.REACT_APP_Base_URL}/api/v1/events/${event.id}`, event, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
        // return event
    },

    async deleteEvent(id) {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            const config = { headers: { Authorization: `Bearer ` + auth.token, 'Content-Type': 'application/json' } }
            const response = await axios.delete(`${process.env.REACT_APP_Base_URL}/api/v1/events/${id}`, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async fetchProductData(products, selectedProject, selectedModel, selectedRetailer) {
        let productDataArray = [];
        try {
            for (const product of products) {
                const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${selectedProject}&model_id=${selectedModel}&Retailer=${selectedRetailer}&Product=${product}`;
                const response = await axios.get(api);
                if (response.status === 200) {
                    // setTimeout(() => {
                    let SingleproductData = response?.data?.data[0];
                    const basePrice = !isNaN(
                        response?.data?.data[0]?.Price_avg_last_4_weeks
                    )
                        ? response?.data?.data[0]?.Price_avg_last_4_weeks
                        : 0;

                    SingleproductData = {
                        id: SingleproductData._id,
                        name: SingleproductData.Product,
                        brand_id: SingleproductData.Brand,
                        retailer_id: SingleproductData.Retailer,
                        totalUnits: SingleproductData.total_units_sum / 52,
                        promoPriceElasticity:
                            SingleproductData?.Promo_Price_Elasticity,
                        basePrice: basePrice,
                        // total_units_sum: SingleproductData?.total_units_sum / 52,
                    };

                    productDataArray.push(SingleproductData);
                }
            }
            return productDataArray;
        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
        }
    },
}