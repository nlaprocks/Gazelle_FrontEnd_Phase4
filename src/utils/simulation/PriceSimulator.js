import React from "react";
import { Select } from "antd";
import PriceSimulatorRow from "./PriceSimulatorRow";

export default function PriceSimulator({
  showProductResults,
  showCompetitorResults,
  newPrice,
  competitorNewPrice,
  retailers,
  brands,
  products,
  selectedRetailer,
  selectedBrand,
  competitors,
  filteredSelectedPriceProducts,
  isPriceSimulationLoading,
  totalNewWeeklyDollars,
  totalChangeWeeklyDollars,
  totalPercentageChangeWeeklyDollars,
  competitorSummary,
  isAllProductSelected,
  selectedProducts,
  handleNewPriceOnChange,
  handleRetailerChange,
  handleBrandChange,
  handleProductsChangeForPrice,
}) {
  return (
    <div className="simluation_db">
      <div className="container-fluid">
        <div className="sim_retailer_main mb-4">
          <div className="row">
            <div className="dropdown_box_select sim_drop col-lg-4 mx-3">
              <div className="nla-add-heading-fiend-group select-2 z-index0">
                <div className="price_simulator_dropdowns_wrapper">
                  <Select
                    allowClear={true}
                    showSearch
                    placeholder="Select Retailer"
                    onChange={handleRetailerChange}
                    disabled={isPriceSimulationLoading}
                    style={{
                      minWidth: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive">
                    {retailers?.map((item) => (
                      <Select.Option
                        key={item}
                        value={item}
                        className="custom-tooltip-option"
                        data-tooltip={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                  <Select
                    showSearch
                    placeholder="Select Brand"
                    // value={selectedBrand}
                    value={selectedBrand || undefined}
                    onChange={handleBrandChange}
                    disabled={!selectedRetailer || isPriceSimulationLoading}
                    style={{
                      minWidth: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive">
                    {brands?.map((item) => (
                      <Select.Option
                        key={item}
                        value={item}
                        className="custom-tooltip-option"
                        data-tooltip={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Select Product"
                    value={selectedProducts}
                    onChange={handleProductsChangeForPrice}
                    disabled={!selectedBrand || isPriceSimulationLoading}
                    style={{
                      minWidth: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive">
                    <Select.Option
                      key="select-all"
                      value="select-all"
                      className="text-primary">
                      {!isAllProductSelected ? "Select all" : "Unselect all"}
                    </Select.Option>
                    {products.map((product, index) => (
                      <Select.Option key={index} value={product}>
                        {product}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="text-end">
            <a href="" className="btn btn-primary btn-retailer">
              Update Data{" "}
            </a>
          </div> */}
        </div>
        {/* Summary */}
        <div className="sim_retailer_row1 width_td mb-4">
          <div>
            <div className="left_best_price col-lg-12">
              <table className="best_pr_table">
                <thead>
                  <tr>
                    <th>Summary</th>
                    <th>Total New Wkly Dollar </th>
                    <th>Total Change Wkly Dollar</th>
                    <th>Total % Change Wkly Dollar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{selectedBrand || "Brand"}</p>
                    </td>
                    <td>
                      <p>
                        {totalNewWeeklyDollars
                          ? "$ " + totalNewWeeklyDollars.toFixed(2)
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {totalChangeWeeklyDollars
                          ? "$ " + totalChangeWeeklyDollars.toFixed(2)
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {totalPercentageChangeWeeklyDollars
                          ? totalPercentageChangeWeeklyDollars.toFixed(2) + " %"
                          : "-"}
                      </p>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>
                      <p>Competitors in brand</p>
                    </td>
                    <td>
                      <p>
                        {competitorSummary.totalNewWeeklyDollars
                          ? competitorSummary.totalNewWeeklyDollars.toFixed(2) + " $"
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {competitorSummary.totalChangeWeeklyDollars
                          ? competitorSummary.totalChangeWeeklyDollars.toFixed(2) + " $"
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {competitorSummary.totalPercentageChangeWeeklyDollars
                          ? competitorSummary.totalPercentageChangeWeeklyDollars.toFixed(2) + " %"
                          : "-"}
                      </p>
                    </td>
                  </tr> */}
                  <tr>
                    <td>
                      <p>Competitors outside brand</p>
                    </td>
                    <td>
                      <p>
                        {competitorSummary.totalNewWeeklyDollars
                          ? "$ " +
                            competitorSummary.totalNewWeeklyDollars.toFixed(2)
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {competitorSummary.totalChangeWeeklyDollars
                          ? "$ " +
                            competitorSummary.totalChangeWeeklyDollars.toFixed(
                              2
                            )
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {competitorSummary.totalPercentageChangeWeeklyDollars
                          ? competitorSummary.totalPercentageChangeWeeklyDollars.toFixed(
                              2
                            ) + " %"
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isPriceSimulationLoading ? (
          <div>
            <p>Please wait, while we are fetching the data for you . . .</p>
          </div>
        ) : (
          <>
            {/* Products */}
            <PriceSimulatorRow
              headerColumnName="Product"
              newPrice={newPrice}
              filteredSelectedPriceProducts={filteredSelectedPriceProducts}
              handleNewPriceOnChange={handleNewPriceOnChange}
              type="product"
              showResults={showProductResults}
              selectedProducts={selectedProducts}
            />
            {/* Competitors */}
            <PriceSimulatorRow
              headerColumnName="Relevant Competitors"
              newPrice={competitorNewPrice}
              filteredSelectedPriceProducts={competitors}
              handleNewPriceOnChange={handleNewPriceOnChange}
              type="competitor"
              showResults={showCompetitorResults}
              selectedProducts={selectedProducts}
            />
          </>
        )}
      </div>
    </div>
  );
}