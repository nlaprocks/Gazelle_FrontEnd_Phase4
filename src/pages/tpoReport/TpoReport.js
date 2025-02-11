import React from "react";
import TpoReportComponent from "../../layouts/TopReport/TpoReport";
import { useParams } from "react-router";

const TpoReport = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const { projectName, project_id, model_id, id } = useParams();

    return <TpoReportComponent />;
};

export default TpoReport;
