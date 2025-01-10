import { Button, message } from "antd";
import { Link } from "react-router-dom";
import modelSearchIntroImage from '../../assets/images/model-search-intro-image.png';
import axios from "axios";
import KebabMenu from '../../components/KebabMenu/KebabMenu';
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

        <div className="tpo-card bg-white p-4 pb-2 rounded-2xl shadow-md" key={event.id}>
            {project && (
                <>
                    <div className="flex items-center justify-between">
                        <div className="d-flex justify-start items-center">
                            <div className="avatar">
                                {project?.company_logo ? (
                                    <img src={project?.company_logo} alt="Company Logo" className="img-fluid" />
                                ) : (
                                    <img src={modelSearchIntroImage} alt="Default" className="img-fluid" />
                                )}
                                <h3 className=''>{project?.project_name}</h3>
                            </div>

                            <div>
                                <h4 className="text-lg">{event.name}</h4>
                                <small className="fst-normal badge-primary rounded">
                                    Version {getModelVersion(event)}
                                </small>
                            </div>
                        </div>
                        <KebabMenu
                            // elem={elem}
                            // duplicateProjectHandler={duplicateProjectHandler}
                            // handleEditProjectModal={handleEditProjectModal}
                            deleteProjectHandler={handleDeleteTpo}
                        />
                    </div>
                    
                    <div className="flex gap-2 py-4 text-lg">
                        <lable className="font-semibold">Project:</lable> <p>{project?.project_name}</p>
                    </div>
                    {/* <p>Version {getModelVersion(event)}</p> */}
                    <Link
                        to={`/tpo/${encodeURIComponent(project?.project_name)}/${event?.project_id}/${event?.model_id}`}
                        className='simulator gap-2 bg-primary px-4 py-2 inline-flex items-center text-white rounded hover:no-underline hover:bg-[#009bcc]'
                    >
                        <i className="fa-regular fa-calendar"></i>
                        Event
                    </Link>

                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200 -mx-6">
                        <p className="font-bold pl-6">
                            <span className="font-normal block">Created at:</span> 10/01/2025<br />
                            12:33
                        </p>
                        <p className="font-bold pr-6">
                            <span className="font-normal block">Updated at:</span> 10/01/2025<br />
                            12:33
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}