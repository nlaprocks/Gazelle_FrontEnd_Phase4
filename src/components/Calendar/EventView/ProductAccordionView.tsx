import React from 'react';
import { Collapse, type CollapseProps } from 'antd';
import { Product } from '../../../types/product';
import { EventProduct } from '../../../types/event';
import { EventFinancialInfo } from './sections/EventFinancialInfo';
import { EventFinancialResults } from './sections/EventFinancialResults';

interface ProductAccordionViewProps {
  products: Product[];
  eventProducts: EventProduct[];
}

const ProductAccordionView: React.FC<ProductAccordionViewProps> = ({
  products,
  eventProducts,
}) => {
  const items: CollapseProps['items'] = products.map(product => {
    const eventProduct = eventProducts.find(ep => ep.productId === product.id);
    if (!eventProduct) return null;

    return {
      key: product.id,
      label: product.name,
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EventFinancialInfo product={product} financialData={eventProduct.financialData} />
          <EventFinancialResults financialData={eventProduct.financialData} />
        </div>
      )
    };
  }).filter(Boolean) as CollapseProps['items'];

  return <Collapse items={items} className="mb-4" />;
};

export default ProductAccordionView;