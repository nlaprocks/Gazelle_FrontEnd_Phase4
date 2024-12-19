import React from 'react';
import { Event } from '../../../../types/event';
import { Tags, Box, Building2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../../../utils/mockData';

interface EventAdditionalInfoProps {
    event: Event;
}

export const EventAdditionalInfo: React.FC<EventAdditionalInfoProps> = ({ event }) => {
    const products = event.products
        .map(ep => MOCK_PRODUCTS.find(p => p.id === ep.productId))
        .filter((p): p is NonNullable<typeof p> => p !== undefined);

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Tags size={16} className="text-gray-500" />
                        <h4 className="font-medium">Channels</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {event.channels.map(channel => (
                            <span key={channel} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                {channel}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Box size={16} className="text-gray-500" />
                        <h4 className="font-medium">Products</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {products.map(product => (
                            <span key={product.id} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                {product.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Building2 size={16} className="text-gray-500" />
                        <h4 className="font-medium">Brand & Retailer</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                            Brand ID: {event.brandId}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                            Retailer ID: {event.retailerId}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};