import { combineReducers } from "redux";
import addModelReducer from "./addModel/addModelReducer";
import addModelWithVersionReducer from "./addModelWithVersion/addModelWithVersionReducer";
import getNodeClickStateReducer from "./getNodeClickState/getNodeClickStateReducer";
import addSlideReducer from "./addSlide/addSlideReducer";
import getAllSlideReducer from "./getAllSlides/getAllSlidesReducer";
import addChartReducer from "./addChart/addChartReducer";
import deleteChartReducer from "./deleteChart/deleteChartReducer";
import updateChartNameReducer from "./updateChartName/updateChartNameReducer";
import addSlideNameReducer from "./addSlideName/addSlideNameReducer";
import updateSlideNameReducer from "./updateSlideName/updateSlideNameReducer";
import deleteSlideNameReducer from "./deleteSlideName/deleteSlideNameReducer";
import addTakeawayReducer from "./addTakeaway/addTakeawayReducer";
import deleteTakeawayReducer from "./deleteTakeaway/deleteTakeawayReducer";
import copyChartReducer from "./copyChart/copyChartReducer";
import addUpdateNoteReducer from "./addUpdateNote/addUpdateNoteReducer";
import deleteSlideReducer from "./deleteSlide/deleteSlideReducer";
import getAllUsersReducer from "./admin/getAllUsers/getAllUsersReducer";
import changeUserStatusReducer from "./admin/changeUserStatus/changeUserStatusReducer";
import deleteUserReducer from "./admin/deleteUser/deleteUserReducer";
import addUserReducer from "./admin/addUser/addUserReducer";
import updateUserReducer from "./admin/updateUser/updateUserReducer";
import filterUserReducer from "./admin/filterUser/filterUserReducer";
import getUserPreferenceReducer from "./getUserPreference/getUserPreferenceReducer";
import addUsersPreferenceReducer from "./addUserPreference/addUserPreferenceReducer";
// Admin Question
import addAdminQuestionReducer from "./admin/questions/addAdminQuestion/addAdminQuestionReducer";
import getAdminQuestionReducer from "./admin/questions/getAdminQuestion/getAdminQuestionReducer";
import getAdminQuestionByModelIdReducer from "./admin/questions/getAdminQuestionByModelId/getAdminQuestionByModelIdReducer";
import updateAdminQuestionReducer from "./admin/questions/updateAdminQuestion/updateAdminQuestionReducer";
import deleteAdminQuestionReducer from "./admin/questions/deleteAdminQuestion/deleteAdminQuestionReducer";
// Admin Design Studio
import getAllOperatorsReducer from "./admin/designStudio/operator/getAllOperators/getAllOperatorsReducer";
import getAllOperatorsWithNodesReducer from "./admin/designStudio/operator/getAllOperatorsWithNodes/getAllOperatorsWithNodesReducer";
import addOperatorReducer from "./admin/designStudio/operator/addOperator/addOperatorReducer";
import updateOperatorReducer from "./admin/designStudio/operator/updateOperator/updateOperatorReducer";
import deleteOperatorReducer from "./admin/designStudio/operator/deleteOperator/deleteOperatorReducer";
import addOperatorNodeReducer from "./admin/designStudio/operatorNodes/addOperatorNode/addOperatorNodeReducer";
import updateOperatorNodeReducer from "./admin/designStudio/operatorNodes/updateOperatorNode/updateOperatorNodeReducer";
import deleteOperatorNodeReducer from "./admin/designStudio/operatorNodes/deleteOperatorNode/deleteOperatorNodeReducer";
// Status Observer
import getEventIdReducer from "./designStudio/statusObserver/getEventId/getEventIdReducer";
import getIsDataFetchedReducer from "./designStudio/statusObserver/getIsDataFetched/getIsDataFetchedReducer";
import getIsModelFetchedReducer from "./designStudio/statusObserver/getIsModelFetched/getIsModelFetchedReducer";
// Admin Categories and products
import getAllCategoriesWithProductsReducer from "./admin/productsAndCategories/categories/getAllCategoriesWithProducts/getAllCategoriesWithProductsReducer";
import addCategoryReducer from "./admin/productsAndCategories/categories/addCategory/addCategoryReducer";
import updateCategoryReducer from "./admin/productsAndCategories/categories/updateCategory/updateCategoryReducer";
import deleteCategoryReducer from "./admin/productsAndCategories/categories/deleteCategory/deleteCategoryReducer";
import addProductReducer from "./admin/productsAndCategories/products/addProduct/addProductReducer";
import updateProductReducer from "./admin/productsAndCategories/products/updateProduct/updateProductReducer";
import deleteProductReducer from "./admin/productsAndCategories/products/deleteProduct/deleteProductReducer";
import getAllCategoriesReducer from "./admin/productsAndCategories/categories/getAllCategories/getAllCategoriesReducer";
import getAllProductsReducer from "./admin/productsAndCategories/products/getAllProducts/getAllProductsReducer";
// Project Management (admin)
import getAllProjectsReducer from "./admin/projectManagement/getAllProjects/getAllProjectsReducer";
import addProjectReducer from "./admin/projectManagement/addProject/addProjectReducer";
import updateProjectReducer from "./admin/projectManagement/updateProject/updateProjectReducer";
import deleteProjectReducer from "./admin/projectManagement/deleteProject/deleteProjectReducer";
// Audit User
import getAllAuditUserReducer from "./admin/auditUser/getAllAuditUser/getAllAuditUserReducer";

// Charts (data)
import getChartDataReducer from "./charts/getChartData/getChartDataReducer";
// charts (cruds)
import editChartDataReducer from "./charts/editChartData/editChartDataReducer";
// Client Data
import databaseRequirementsReducer from "./clientData/databaseRequirements/databaseRequirementsReducer";
import datastructureReducer from "./clientData/datastructure/datastructureReducer";
import saveDatabaseConfigReducer from "./clientData/saveDatabaseConfig/saveDatabaseConfigReducer";
import runModelReducer from "./clientData/runModel/runModelReducer";
import saveModelidReducer from "./clientData/saveModelid/saveModelidReducer";

// internal Data structure
import listOfDatabasesReducer from "./clientData/internalData/listOfDatabases/listOfDatabasesReducer";
import getMobilityDatabaseStructureReducer from "./clientData/internalData/getMobilityDatabaseStructure/getMobilityDatabaseStructureReducer";
import getCompetitorsDatabaseStructureReducer from "./clientData/internalData/getCompetitorsDatabaseStructure/getCompetitorsDatabaseStructureReducer";
import saveMobilityConfigReducer from "./clientData/internalData/saveMobilityConfig/saveMobilityConfigReducer";
import saveCompetitorsConfigReducer from "./clientData/internalData/saveCompetitorsConfig/saveCompetitorsConfigReducer";
import clientCsvFileReducer from "./clientData/internalData/clientCsvFile/clientCsvFileReducer";
// Users Charts
import usersChartsReducer from "./charts/usersCharts/usersChartsReducer";
// Filter Charts
import filterUsersChartReducer from "./charts/filterUsersChart/filterUsersChartReducer";
// insights
// tabs
import getAllQuestionTypesReducer from "./insights/tabs/getAllQuestionTypes/getAllQuestionTypesReducer";
import getQuestionsPerTypeReducer from "./insights/tabs/getQuestionsPerType/getQuestionsPerTypeReducer";
// model Version
import getModelVersionByProjectIdReducer from "./designStudio/getModelVersionByProjectId/getModelVersionByProjectIdReducer";
import getModelByModelIdReducer from "./designStudio/getModelByModelId/getModelByModelIdReducer";
import updateModelVersionReducer from "./designStudio/updateModelVersion/updateModelVersionReducer";
import inputDataCombinationReducer from "./charts/inputDataCombination/inputDataCombinationReducer";
import outputDataCombinationReducer from "./charts/outputDataCombination/outputDataCombinationReducer";
// Send Email
import sendEmailReducer from "./insights/shareInsights/sendEmail/sendEmailReducer";
// Design Studio
// Add Log
import addLogReducer from "./designStudio/modelLogs/addLog/addLogReducer";
import getAllLogReducer from "./designStudio/modelLogs/getAllLog/getAllLogReducer";
// Add insights Version
import getInsightsVersionReducer from "./insights/getInsightsVersion/getInsightsVersionReducer";
import addInsightsVersionReducer from "./insights/addInsightsVersion/addInsightsVersionReducer";

// V3
import chart1Reducer from "./insights/phase3Charts/chart1/chart1Reducer";
import chart2Reducer from "./insights/phase3Charts/chart2/chart2Reducer";
import chart3Reducer from "./insights/phase3Charts/chart3/chart3Reducer";
import chart4Reducer from "./insights/phase3Charts/chart4/chart4Reducer";
import chart5Reducer from "./insights/phase3Charts/chart5/chart5Reducer";
import chart6Reducer from "./insights/phase3Charts/chart6/chart6Reducer";
import chart7Reducer from "./insights/phase3Charts/chart7/chart7Reducer";
import chart8Reducer from "./insights/phase3Charts/chart8/chart8Reducer";
import chart9Reducer from "./insights/phase3Charts/chart9/chart9Reducer";
import productsReducer from "./insights/phase3Charts/filters/products/productsReducer";
import brandsReducer from "./insights/phase3Charts/filters/brands/brandsReducer";
import retailersReducer from "./insights/phase3Charts/filters/retailers/retailersReducer";
import getFiltersReducer from "./insights/globalFilters/getFilters/getFiltersReducer";
import addFiltersReducer from "./insights/globalFilters/addFilters/addFiltersReducer";
import resetFiltersReducer from "./insights/globalFilters/resetFilters/resetFiltersReducer";
import retailerBrandsProductsReducer from "./insights/phase3Charts/filters/retailerBrandsProducts/retailerBrandsProductsReducer";
// User Charts
import combinedColumnsReducer from "./insights/phase3Charts/userCharts/combinedColumns/combinedColumnsReducer";
import userChartsDataReducer from "./insights/phase3Charts/userCharts/userChartsData/userChartsDataReducer";

// Local filters
import filterChartReducer from "./insights/localFilters/chartFilteration/filterChartReducer";
import formReducer from "./formData/formReducer";
import tableReducer from "./tableData/tableReducer";

const rootReducer = combineReducers({
  addModelReducer,
  addModelWithVersionReducer,
  getNodeClickStateReducer,
  addSlideReducer,
  getAllSlideReducer,
  addChartReducer,
  deleteChartReducer,
  updateChartNameReducer,
  addSlideNameReducer,
  updateSlideNameReducer,
  deleteSlideNameReducer,
  addTakeawayReducer,
  deleteTakeawayReducer,
  copyChartReducer,
  addUpdateNoteReducer,
  deleteSlideReducer,
  getAllUsersReducer,
  changeUserStatusReducer,
  deleteUserReducer,
  addUserReducer,
  updateUserReducer,
  filterUserReducer,
  getUserPreferenceReducer,
  addUsersPreferenceReducer,
  // Admin Question
  addAdminQuestionReducer,
  getAdminQuestionReducer,
  getAdminQuestionByModelIdReducer,
  updateAdminQuestionReducer,
  deleteAdminQuestionReducer,
  // Admin Design Studio
  getAllOperatorsReducer,
  getAllOperatorsWithNodesReducer,
  addOperatorReducer,
  updateOperatorReducer,
  deleteOperatorReducer,
  addOperatorNodeReducer,
  updateOperatorNodeReducer,
  deleteOperatorNodeReducer,
  // Status Observer
  getEventIdReducer,
  getIsDataFetchedReducer,
  getIsModelFetchedReducer,
  // Admin Categories and products
  getAllCategoriesWithProductsReducer,
  addCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
  addProductReducer,
  updateProductReducer,
  deleteProductReducer,
  getAllCategoriesReducer,
  getAllProductsReducer,
  // Project Management (admin)
  getAllProjectsReducer,
  addProjectReducer,
  updateProjectReducer,
  deleteProjectReducer,
  // Audit User
  getAllAuditUserReducer,
  // Charts (data)
  getChartDataReducer,
  // Charts (cruds)
  editChartDataReducer,
  // Client Data
  databaseRequirementsReducer,
  datastructureReducer,
  saveDatabaseConfigReducer,
  runModelReducer,
  saveModelidReducer,
  // internal Data structure
  listOfDatabasesReducer,
  getMobilityDatabaseStructureReducer,
  getCompetitorsDatabaseStructureReducer,
  saveMobilityConfigReducer,
  saveCompetitorsConfigReducer,
  clientCsvFileReducer,
  // User Charts
  usersChartsReducer,
  // Filter Charts
  filterUsersChartReducer,
  // insights
  // tabs
  getAllQuestionTypesReducer,
  getQuestionsPerTypeReducer,
  // Model Version
  getModelVersionByProjectIdReducer,
  getModelByModelIdReducer,
  updateModelVersionReducer,
  inputDataCombinationReducer,
  outputDataCombinationReducer,
  sendEmailReducer,
  // Design Studio
  // Add Log
  addLogReducer,
  getAllLogReducer,
  // Add insights Version
  getInsightsVersionReducer,
  addInsightsVersionReducer,
  chart1Reducer,
  chart2Reducer,
  chart3Reducer,
  chart4Reducer,
  chart5Reducer,
  chart6Reducer,
  chart7Reducer,
  chart8Reducer,
  chart9Reducer,
  productsReducer,
  brandsReducer,
  retailersReducer,
  getFiltersReducer,
  addFiltersReducer,
  resetFiltersReducer,
  filterChartReducer,
  retailerBrandsProductsReducer,
  combinedColumnsReducer,
  userChartsDataReducer,
  formReducer,
  tableReducer,
});
export default rootReducer;
