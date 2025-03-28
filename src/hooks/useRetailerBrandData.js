import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRetailerBrandData = (project_id, model_id) => {
    const [retailerBrandProducts, setRetailerBrandProducts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRetailerBrandProductData = async () => {
            if (!project_id || !model_id) return;

            try {
                setIsLoading(true);
                setError(null);
                const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
                const response = await axios.get(api);

                if (response.status === 200) {
                    setRetailerBrandProducts(response?.data?.data);
                }
            } catch (error) {
                console.error("Error in fetching retailers", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRetailerBrandProductData();
    }, [project_id, model_id]);

    // Get retailers list
    const retailers = Object.keys(retailerBrandProducts);

    // Get brands for a specific retailer
    const getBrandsForRetailer = (retailer) => {
        return retailer ? Object.keys(retailerBrandProducts[retailer] || {}) : [];
    };

    // Get products for a specific retailer and brand
    const getProductsForBrand = (retailer, brand) => {
        return (retailer && brand) ? retailerBrandProducts[retailer]?.[brand] || [] : [];
    };

    return {
        retailerBrandProducts,
        retailers,
        getBrandsForRetailer,
        getProductsForBrand,
        isLoading,
        error
    };
}; 