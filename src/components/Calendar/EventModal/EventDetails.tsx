import React from 'react';
import { Input, Select, DatePicker, ColorPicker } from 'antd';
import { Channel, Retailer, Brand, Product } from '../../../types';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface EventDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  channels: Channel[];
  retailers: Retailer[];
  brands: Brand[];
  products: Product[];
}

const EventDetails: React.FC<EventDetailsProps> = ({
  formData,
  setFormData,
  channels,
  retailers,
  brands,
  products,
}) => {
  const filteredBrands = brands.filter(brand => brand.retailerId === formData.retailerId);
  const filteredProducts = products.filter(product => 
    filteredBrands.some(brand => brand.id === product.brandId)
  );

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Event Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter event name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <Select
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            options={statusOptions}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <ColorPicker
            value={formData.color}
            onChange={(color) => setFormData({ ...formData, color: color.toHexString() })}
            className="w-full"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <RangePicker
            className="w-full"
            value={[
              formData.startDate ? dayjs(formData.startDate) : null,
              formData.endDate ? dayjs(formData.endDate) : null
            ]}
            onChange={(dates) => {
              if (dates) {
                setFormData({
                  ...formData,
                  startDate: dates[0]?.format('YYYY-MM-DD'),
                  endDate: dates[1]?.format('YYYY-MM-DD')
                });
              }
            }}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <TextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Enter event description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Channels</label>
          <Select
            mode="multiple"
            value={formData.channels}
            onChange={(values) => setFormData({ ...formData, channels: values })}
            options={channels.map(channel => ({ value: channel.id, label: channel.name }))}
            className="w-full"
            placeholder="Select channels"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Retailer</label>
          <Select
            value={formData.retailerId}
            onChange={(value) => setFormData({ 
              ...formData, 
              retailerId: value,
              brandId: '',
              products: []
            })}
            options={retailers.map(retailer => ({ value: retailer.id, label: retailer.name }))}
            className="w-full"
            placeholder="Select retailer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <Select
            value={formData.brandId}
            onChange={(value) => setFormData({ 
              ...formData, 
              brandId: value,
              products: []
            })}
            options={filteredBrands.map(brand => ({ value: brand.id, label: brand.name }))}
            className="w-full"
            placeholder="Select brand"
            disabled={!formData.retailerId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
          <Select
            mode="multiple"
            value={formData.products}
            onChange={(values) => setFormData({ ...formData, products: values })}
            options={filteredProducts.map(product => ({ value: product.id, label: product.name }))}
            className="w-full"
            placeholder="Select products"
            disabled={!formData.brandId}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;