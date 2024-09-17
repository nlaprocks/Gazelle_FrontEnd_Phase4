import addModelAction from "./addModel/addModelAction";
import addModelWithVersionAction from "./addModelWithVersion/addModelWithVersionAction";
import getNodesAction from "./getNodes/getNodesAction";
import getNodeClickStateAction from "./getNodeClickState/getNodeClickStateAction";
import addSlideAction from "./addSlide/addSlideAction";
import getAllSlidesAction from "./getAllSlides/getAllSlidesAction";
import addChartAction from "./addChart/addChartAction";
import deleteChartAction from "./deleteChart/deleteChartAction";
import updateChartNameAction from "./updateChartName/updateChartNameAction";
import addSlideNameAction from "./addSlideName/addSlideNameAction";
import updateSlideNameAction from "./updateSlideName/updateSlideNameAction";
import deleteSlideNameAction from "./deleteSlideName/deleteSlideNameAction";
import addTakeawayAction from "./addTakeaway/addTakeawayAction";
import deleteTakeawayAction from "./deleteTakeaway/deleteTakeawayAction";
import copyChartAction from "./copyChart/copyChartAction";
import addUpdateNoteAction from "./addUpdateNote/addUpdateNoteAction";
import deleteSlideAction from "./deleteSlide/deleteSlideAction";
import getAllUsersAction from "./admin/getAllUsers/getAllUsersAction";
import changeUserStatusAction from "./admin/changeUserStatus/changeUserStatusAction";
import deleteUserAction from "./admin/deleteUser/deleteUserAction";
import addUserAction from "./admin/addUser/addUserAction";
import updateUserAction from "./admin/updateUser/updateUserAction";
import filterUserAction from "./admin/filterUser/filterUserAction";
import getUserPreferenceAction from "./getUserPreference/getUserPreferenceAction";
import addUsersPreferenceAction from "./addUserPreference/addUserPreferenceAction";
// Admin Question
import addAdminQuestionAction from "./admin/questions/addAdminQuestion/addAdminQuestionAction";
import getAdminQuestionAction from "./admin/questions/getAdminQuestion/getAdminQuestionAction";
import getAdminQuestionByModelIdAction from "./admin/questions/getAdminQuestionByModelId/getAdminQuestionByModelIdAction";
import updateAdminQuestionAction from "./admin/questions/updateAdminQuestion/updateAdminQuestionAction";
import deleteAdminQuestionAction from "./admin/questions/deleteAdminQuestion/deleteAdminQuestionAction";
// Admin Design Studio
import getAllOperatorsAction from "./admin/designStudio/operator/getAllOperators/getAllOperatorsAction";
import getAllOperatorsWithNodesAction from "./admin/designStudio/operator/getAllOperatorsWithNodes/getAllOperatorsWithNodesAction";
import addOperatorAction from "./admin/designStudio/operator/addOperator/addOperatorAction";
import updateOperatorAction from "./admin/designStudio/operator/updateOperator/updateOperatorAction";
import deleteOperatorAction from "./admin/designStudio/operator/deleteOperator/deleteOperatorAction";
import addOperatorNodeAction from "./admin/designStudio/operatorNodes/addOperatorNode/addOperatorNodeAction";
import updateOperatorNodeAction from "./admin/designStudio/operatorNodes/updateOperatorNode/updateOperatorNodeAction";
import deleteOperatorNodeAction from "./admin/designStudio/operatorNodes/deleteOperatorNode/deleteOperatorNodeAction";
// Status Observer
import getEventIdAction from "./designStudio/statusObserver/getEventId/getEventIdAction";
import getIsDataFetchedAction from "./designStudio/statusObserver/getIsDataFetched/getIsDataFetchedAction";
import getIsModelFetchedAction from "./designStudio/statusObserver/getIsModelFetched/getIsModelFetchedAction";

// Admin Categories and products
import getAllCategoriesWithProductsAction from "./admin/productsAndCategories/categories/getAllCategoriesWithProducts/getAllCategoriesWithProductsAction";
import addCategoryAction from "./admin/productsAndCategories/categories/addCategory/addCategoryAction";
import updateCategoryAction from "./admin/productsAndCategories/categories/updateCategory/updateCategoryAction";
import deleteCategoryAction from "./admin/productsAndCategories/categories/deleteCategory/deleteCategoryAction";
import addProductAction from "./admin/productsAndCategories/products/addProduct/addProductAction";
import updateProductAction from "./admin/productsAndCategories/products/updateProduct/updateProductAction";
import deleteProductAction from "./admin/productsAndCategories/products/deleteProduct/deleteProductAction";
import getAllCategoriesAction from "./admin/productsAndCategories/categories/getAllCategories/getAllCategoriesAction";
import getAllProductsAction from "./admin/productsAndCategories/products/getAllProducts/getAllProductsAction";
// Project Management (admin)
import getAllProjectsAction from "./admin/projectManagement/getAllProjects/getAllProjectsAction";
import addProjectAction from "./admin/projectManagement/addProject/addProjectAction";
import updateProjectAction from "./admin/projectManagement/updateProject/updateProjectAction";
import deleteProjectAction from "./admin/projectManagement/deleteProject/deleteProjectAction";

// Audit User
import getAllAuditUserAction from "./admin/auditUser/getAllAuditUser/getAllAuditUserAction";
// Charts (data)
import getChartDataAction from "./charts/getChartData/getChartDataAction";
// Charts (cruds)
import editChartDataAction from "./charts/editChartData/editChartDataAction";
// Client Data
import databaseRequirementsAction from "./clientData/databaseRequirements/databaseRequirementsAction";
import datastructureAction from "./clientData/datastructure/datastructureAction";
import saveDatabaseConfigAction from "./clientData/saveDatabaseConfig/saveDatabaseConfigAction";
import runModelAction from "./clientData/runModel/runModelAction";
import saveModelidAction from "./clientData/saveModelid/saveModelidAction";
// internal Data structure
import listOfDatabasesAction from "./clientData/internalData/listOfDatabases/listOfDatabasesAction";
import getMobilityDatabaseStructureAction from "./clientData/internalData/getMobilityDatabaseStructure/getMobilityDatabaseStructureAction";
import getCompetitorsDatabaseStructureAction from "./clientData/internalData/getCompetitorsDatabaseStructure/getCompetitorsDatabaseStructureAction";
import saveMobilityConfigAction from "./clientData/internalData/saveMobilityConfig/saveMobilityConfigAction";
import saveCompetitorsConfigAction from "./clientData/internalData/saveCompetitorsConfig/saveCompetitorsConfigAction";
import clientCsvFileAction from "./clientData/internalData/clientCsvFile/clientCsvFileAction";
// Users Charts
import usersChartsAction from "./charts/usersCharts/usersChartsAction";
// Elasticity Charts

// Filter Charts
import filterUsersChartAction from "./charts/filterUsersChart/filterUsersChartAction";
// insights
// tabs
import getAllQuestionTypesAction from "./insights/tabs/getAllQuestionTypes/getAllQuestionTypesAction";
import getQuestionsPerTypeAction from "./insights/tabs/getQuestionsPerType/getQuestionsPerTypeAction";
// model Version
import getModelVersionByProjectIdAction from "./designStudio/getModelVersionByProjectId/getModelVersionByProjectIdAction";
import getModelByModelIdAction from "./designStudio/getModelByModelId/getModelByModelIdAction";
import updateModelVersionAction from "./designStudio/updateModelVersion/updateModelVersionAction";
import inputDataCombinationAction from "./charts/inputDataCombination/inputDataCombinationAction";
import outputDataCombinationAction from "./charts/outputDataCombination/outputDataCombinationAction";
// Send Email
import sendEmailAction from "./insights/shareInsights/sendEmail/sendEmailAction";

// Design Studio
// Add Log
import addLogAction from "./designStudio/modelLogs/addLog/addLogAction";
import getAllLogAction from "./designStudio/modelLogs/getAllLog/getAllLogAction";
// Add insights Version
import getInsightsVersionAction from "./insights/getInsightsVersion/getInsightsVersionAction";
import addInsightsVersionAction from "./insights/addInsightsVersion/addInsightsVersionAction";

// v3
import chart1Action from "./insights/phase3Charts/chart1/chart1Action";
import chart2Action from "./insights/phase3Charts/chart2/chart2Action";
import chart3Action from "./insights/phase3Charts/chart3/chart3Action";
import chart4Action from "./insights/phase3Charts/chart4/chart4Action";
import chart5Action from "./insights/phase3Charts/chart5/chart5Action";
import chart6Action from "./insights/phase3Charts/chart6/chart6Action";
import chart7Action from "./insights/phase3Charts/chart7/chart7Action";
import chart8Action from "./insights/phase3Charts/chart8/chart8Action";
import chart9Action from "./insights/phase3Charts/chart9/chart9Action";
import productsAction from "./insights/phase3Charts/filters/products/productsAction";
import brandsAction from "./insights/phase3Charts/filters/brands/brandsAction";
import retailersAction from "./insights/phase3Charts/filters/retailers/retailersAction";
import getFiltersAction from "./insights/globalFilters/getFilters/getFiltersAction";
import addFiltersAction from "./insights/globalFilters/addFilters/addFiltersAction";
import resetFiltersAction from "./insights/globalFilters/resetFilters/resetFiltersAction";
import retailerBrandsProductsAction from "./insights/phase3Charts/filters/retailerBrandsProducts/retailerBrandsProductsAction";
// User Charts
import combinedColumnsAction from "./insights/phase3Charts/userCharts/combinedColumns/combinedColumnsAction";
import userChartsDataAction from "./insights/phase3Charts/userCharts/userChartsData/userChartsDataAction";
// Local filters
import filterChartAction from "./insights/localFilters/chartFilteration/filterChartAction";
const allActions = {
  addModelAction,
  addModelWithVersionAction,
  getNodesAction,
  getNodeClickStateAction,
  addSlideAction,
  getAllSlidesAction,
  addChartAction,
  deleteChartAction,
  updateChartNameAction,
  addSlideNameAction,
  updateSlideNameAction,
  deleteSlideNameAction,
  addTakeawayAction,
  deleteTakeawayAction,
  copyChartAction,
  addUpdateNoteAction,
  deleteSlideAction,
  getAllUsersAction,
  changeUserStatusAction,
  deleteUserAction,
  addUserAction,
  updateUserAction,
  filterUserAction,
  getUserPreferenceAction,
  addUsersPreferenceAction,
  // Admin Question
  addAdminQuestionAction,
  getAdminQuestionAction,
  getAdminQuestionByModelIdAction,
  updateAdminQuestionAction,
  deleteAdminQuestionAction,
  // Admin Design Studio
  getAllOperatorsAction,
  getAllOperatorsWithNodesAction,
  addOperatorAction,
  updateOperatorAction,
  deleteOperatorAction,
  addOperatorNodeAction,
  updateOperatorNodeAction,
  deleteOperatorNodeAction,
  // Status Observer
  getEventIdAction,
  getIsDataFetchedAction,
  getIsModelFetchedAction,
  // Admin Categories and products
  getAllCategoriesWithProductsAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
  getAllCategoriesAction,
  getAllProductsAction,
  // Project Management (admin)
  getAllProjectsAction,
  addProjectAction,
  updateProjectAction,
  deleteProjectAction,
  // Audit User
  getAllAuditUserAction,
  // Charts (data)
  getChartDataAction,
  // Charts (cruds)
  editChartDataAction,
  // Client Data
  databaseRequirementsAction,
  datastructureAction,
  saveDatabaseConfigAction,
  runModelAction,
  saveModelidAction,
  // internal Data structure
  listOfDatabasesAction,
  getMobilityDatabaseStructureAction,
  getCompetitorsDatabaseStructureAction,
  saveMobilityConfigAction,
  saveCompetitorsConfigAction,
  clientCsvFileAction,
  // User Charts
  usersChartsAction,
  // Filter Charts
  filterUsersChartAction,
  // insights
  // tabs
  getAllQuestionTypesAction,
  getQuestionsPerTypeAction,
  // model Version
  getModelVersionByProjectIdAction,
  getModelByModelIdAction,
  updateModelVersionAction,
  inputDataCombinationAction,
  outputDataCombinationAction,
  sendEmailAction,
  // Design Studio
  // Add Log
  addLogAction,
  getAllLogAction,
  // Add insights Version
  getInsightsVersionAction,
  addInsightsVersionAction,
  chart1Action,
  chart2Action,
  chart3Action,
  chart4Action,
  chart5Action,
  chart6Action,
  chart7Action,
  chart8Action,
  chart9Action,
  productsAction,
  brandsAction,
  retailersAction,
  getFiltersAction,
  addFiltersAction,
  resetFiltersAction,
  filterChartAction,
  retailerBrandsProductsAction,
  combinedColumnsAction,
  userChartsDataAction,
};
export default allActions;
