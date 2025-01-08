import { Button, message } from "antd";
import { Link } from "react-router-dom";
import modelSearchIntroImage from '../../assets/images/model-search-intro-image.png';
import axios from "axios";
import { useEffect, useState } from "react";

export const TpoCard = ({ event, projects, fetchEventTpos }) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    // const user_id = authData?.user_id;
    const [project, setProject] = useState(null);

    useEffect(() => {
        setProject(projects.find(project => project.id === parseInt(event.project_id)));
    }, [projects, event]);

    const getModelVersion = (event) => {
        return projects.find(project => project.id === event.project_id)?.Models.find(model => model.id === parseInt(event.model_id))?.model_version;
    }

    const handleDeleteTpo = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ` + authData.token } };
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${event.id}`;
            let { data } = await axios.delete(api, config);

            if (data) {
                // success message
                message.success('TPO deleted successfully');
                fetchEventTpos();
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (

        <div className="tpo-card bg-white p-4 rounded-md shadow-md m-4" key={event.id}>
            {project && (
                <>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar">
                            {project?.company_logo ? (
                                <img src={project?.company_logo} alt="Company Logo" className="img-fluid" />
                            ) : (
                                <img src={modelSearchIntroImage} alt="Default" className="img-fluid" />
                            )}
                            <h3 className=''>{project?.project_name}</h3>
                            <small className="fst-normal badge-primary rounded">
                                Version: {getModelVersion(event)}
                            </small>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-3" style={{ marginTop: '-10px' }}>
                            <Button onClick={handleDeleteTpo}>
                                <i className="fa-solid fa-trash"></i>
                            </Button>
                        </div>
                    </div>
                    <h4>{event.name}</h4>
                    <p>{project?.project_name}</p>
                    <p>Version {getModelVersion(event)}</p>
                    <Link
                        to={`/tpo/${encodeURIComponent(project?.project_name)}/${event?.project_id}/${event?.model_id}`}
                        className='simulator'
                    >
                        <i className="fa-regular fa-calendar"></i>
                        TPO
                    </Link>
                </>
            )}
        </div>
    )
}