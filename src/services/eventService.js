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
                brand_id: event.brandId,
                retailer_id: event.retailerId,
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

    async createEvent(event) {
        try {
            console.log({ saveEvent: event });

            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            let eventData = {
                ...event,
                brand_id: event.brandId,
                // end_date: event.endDate,
                // start_date: event.startDate,
                retailer_id: event.retailerId,
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
        // TODO: Replace with actual API call
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            const config = { headers: { Authorization: `Bearer ` + auth.token, 'Content-Type': 'application/json' } }
            const response = await axios.put(`${process.env.REACT_APP_Base_URL}/api/v1/events`, event, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
        // return event
    },

    async deleteEvent(id) {
        // TODO: Replace with actual API call
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || '{}')
            const config = { headers: { Authorization: `Bearer ` + auth.token, 'Content-Type': 'application/json' } }
            const response = await axios.delete(`${process.env.REACT_APP_Base_URL}/api/v1/events/${id}`, config)
            return response.data || []
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}