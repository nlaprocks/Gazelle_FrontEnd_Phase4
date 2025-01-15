export class PromotionEvent {
    constructor({
        id,
        productId,
        productName,
        brandName,
        retailerName,
        startDate,
        endDate,
        promotionType,
        discount
    }) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.brandName = brandName;
        this.retailerName = retailerName;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.promotionType = promotionType;
        this.discount = discount;
    }
} 