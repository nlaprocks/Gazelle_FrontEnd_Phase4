import React from 'react';
import { Collapse, type CollapseProps } from 'antd';
import { Product } from '../../../types/product';
import { EventProduct } from '../../../types/event';
import FinancialFields from './FinancialFields';
import FinancialResults from './FinancialResults';

interface ProductAccordionProps {
  products: Product[];
  eventProducts: EventProduct[];
  onProductDataChange: (productId: string, financialData: EventProduct['financialData']) => void;
}

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  products,
  eventProducts,
  onProductDataChange,
}) => {
  const items: CollapseProps['items'] = products.map(product => {
    const eventProduct = eventProducts.find(ep => ep.productId === product.id);
    if (!eventProduct) return null;

    return {
      key: product.id,
      label: product.name,
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-4">Financial Details</h4>
            <FinancialFields
              productId={product.id}
              financialData={eventProduct.financialData}
              onChange={(data) => onProductDataChange(product.id, data)}
              basePrice={product.basePrice}
              totalUnits={product.totalUnits}
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Results</h4>
            <FinancialResults financialData={eventProduct.financialData} />
          </div>
        </div>
      )
    };
  }).filter(Boolean) as CollapseProps['items'];

  return <Collapse items={items} className="mb-4" />;
};

export default ProductAccordion;