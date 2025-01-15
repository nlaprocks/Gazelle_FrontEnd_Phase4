import React from 'react'
import { Product } from '../../../../types/product'
import { FinancialData } from '../../../../types/financial'
import { DollarSign, Package } from 'lucide-react'
import { InfoSection } from '../ui/InfoSection'
import { InfoRow } from '../ui/InfoRow'
import { formatCurrency } from '../../../../utils/formatters'

interface EventFinancialInfoProps {
    product: Product
    financialData: FinancialData
}

export const EventFinancialInfo: React.FC<EventFinancialInfoProps> = ({
    product,
    financialData,
}) => {

    console.log({ product });
    return (
        <InfoSection title="Financial Details">
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Base Price"
                value={formatCurrency(product.basePrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Promo Price"
                value={formatCurrency(financialData.promoPrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Discount"
                value={`${financialData.discount.toFixed(2)}%`}
            />
            <InfoRow
                icon={<Package size={16} />}
                label="Units"
                value={financialData.units.toLocaleString()}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="List Price"
                value={formatCurrency(financialData.listPrice)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="EDLP Per Unit Rate"
                value={formatCurrency(financialData.edlpPerUnitRate)}
            />
            <InfoRow
                icon={<DollarSign size={16} />}
                label="Promo Per Unit Rate"
                value={formatCurrency(financialData.promoPerUnitRate)}
            />
        </InfoSection>
    )
}