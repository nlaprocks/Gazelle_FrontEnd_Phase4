import { useState, useEffect } from 'react'
import { Product } from '../types/index'
import { MOCK_PRODUCTS } from '../utils/mockData'

export const useProductData = (productId: string) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Simulate API call
        const fetchProduct = async () => {
            try {
                // setLoading(true);
                const foundProduct = MOCK_PRODUCTS.find(p => p.id === productId)
                console.log({ "foundProduct": foundProduct })
                if (foundProduct) {
                    setProduct(foundProduct)
                } else {
                    setError('Product not found')
                }
            } catch (err) {
                setError('Failed to fetch product data')
            } finally {
                // setLoading(false);
            }
        }

        if (productId) {
            fetchProduct()
        }
    }, [productId])

    return { product, loading, error }
}