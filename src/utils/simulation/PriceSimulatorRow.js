import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function PriceSimulatorRow({
  headerColumnName,
  newPrice,
  filteredSelectedPriceProducts,
  handleNewPriceOnChange,
  type,
  showResults,
  selectedProducts,
}) {
  return (
    <div className="sim_retailer_row width_td mb-4">
      <div className="left_best_price">
        {selectedProducts.length !== 0 && (
          <table className="best_pr_table animate__animated animate__fadeInUp">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>{headerColumnName}</th>
                <th style={{ width: "8%" }}>
                  Latest
                  <br />
                  Price
                </th>
                <th style={{ width: "10%" }}>
                  Total Units <br />
                  (Last 52 Weeks)
                </th>
                <th style={{ width: "7%" }}>
                  Total <br />
                  Dollars
                </th>
                {/* 2nd section */}
                <th style={{ width: "12%" }}>
                  Enter New <br />
                  Price
                </th>
                {/* 3rd section */}
                <th style={{ width: "8%" }}>New Units</th>
                <th style={{ width: "7%" }}>Change in Units</th>
                <th style={{ width: "8%" }}>% Change in Units</th>
                <th style={{ width: "7%" }}>New Dollars</th>
                <th style={{ width: "7%" }}>Change in Dollars</th>
                <th style={{ width: "8%" }}>% Change in Dollars</th>
              </tr>
            </thead>
            <tbody>
              {filteredSelectedPriceProducts.length ? (
                <>
                  {filteredSelectedPriceProducts?.map((product, index) => {
                    const { Price_avg_last_4_weeks, total_units_sum } = product;
                    const totalVolumeSum = parseFloat(total_units_sum);
                    const totalVolume = totalVolumeSum * Price_avg_last_4_weeks;
                    return (
                      <tr key={index}>
                        <td>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 250 }}
                            overlay={
                              <Tooltip id="overlay-example">
                                {product.Product}
                              </Tooltip>
                            }>
                            <p>{product.Product}</p>
                          </OverlayTrigger>
                        </td>
                        <td>
                          <p>
                            {!isNaN(Price_avg_last_4_weeks)
                              ? Price_avg_last_4_weeks.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {!isNaN(total_units_sum)
                              ? total_units_sum.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {!isNaN(totalVolume) ? totalVolume.toFixed(2) : "-"}
                          </p>
                        </td>

                        <td>
                          <div className="sim_input_fild">
                            <input
                              type="number"
                              inputMode="decimal"
                              value={newPrice[index] || ""}
                              placeholder="Enter new price:($)"
                              className="simu_input"
                              onChange={(event) =>
                                handleNewPriceOnChange(
                                  index,
                                  event,
                                  product,
                                  type
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === "-") {
                                  e.preventDefault();
                                }
                              }}
                              min={1}></input>
                          </div>
                        </td>
                        <td>
                          <p>
                            {/* {product?.competitorNewVolumn ? product?.competitorNewVolumn?.toFixed(2) : "-"} */}
                            {newPrice[index] && !showResults
                              ? parseFloat(product?.newVolume).toFixed(2)
                              : showResults && product?.percentageChangeInVolume
                              ? product?.newVolume?.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {newPrice[index] && !showResults
                              ? product?.changeInVolume?.toFixed(2)
                              : showResults && product?.changeInVolume
                              ? product?.changeInVolume?.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {newPrice[index] && !showResults
                              ? product?.percentageChangeInVolume?.toFixed(2) +
                                "%"
                              : showResults && product?.percentageChangeInVolume
                              ? product?.percentageChangeInVolume?.toFixed(2) +
                                "%"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {newPrice[index] && !showResults
                              ? "$" + product?.newDollars?.toFixed(2)
                              : showResults && product?.percentageChangeInVolume
                              ? "$" + product?.newDollars?.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {newPrice[index] && !showResults
                              ? "$" + product?.changeInDollars?.toFixed(2)
                              : showResults && product?.percentageChangeInVolume
                              ? "$" + product?.changeInDollars?.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {newPrice[index] && !showResults
                              ? product?.percentageChangeInDollars?.toFixed(2) +
                                "%"
                              : showResults && product?.percentageChangeInVolume
                              ? product?.percentageChangeInDollars?.toFixed(2) +
                                "%"
                              : "-"}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    {/* 2nd section */}
                    <td>
                      <div className="sim_input_fild">
                        <input
                          type="number"
                          inputMode="decimal"
                          placeholder="Enter new price:($)"
                          className="simu_input"
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                          min={1}></input>
                      </div>
                    </td>
                    {/* 3rd section */}
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                    <td>
                      <p>-</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}