import { Button, message, Skeleton, Modal } from "antd";
import { Link } from "react-router-dom";
import modelSearchIntroImage from '../../assets/images/model-search-intro-image.png';
import axios from "axios";
import KebabMenu from '../../components/KebabMenu/KebabMenu';
import { useEffect, useState } from "react";
import Moment from "react-moment";

export const TpoCard = ({ event, projects, fetchEventTpos, handleEditTpo, handleDuplicateTpo, handleUpgradeVersion }) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    // const user_id = authData?.user_id;
    const [project, setProject] = useState(null);

    useEffect(() => {
        setProject(projects.find(project => project.id === parseInt(event.project_id)));
    }, [projects, event]);

    const getModelVersion = (event) => {
        return projects.find(project => project.id === parseInt(event.project_id))?.Models.find(model => model.id === parseInt(event.model_id))?.model_version;
    }

    const handleDeleteTpo = async () => {
        try {
            Modal.confirm({
                title: 'Delete TPO',
                content: 'Are you sure you want to delete this TPO?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                async onOk() {
                    const config = { headers: { Authorization: `Bearer ` + authData.token } };
                    const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${event.id}`;
                    let { data } = await axios.delete(api, config);

                    if (data) {
                        message.success('TPO deleted successfully');
                        fetchEventTpos();
                    }
                },
                onCancel() {
                    // Do nothing
                }
            });
        } catch (error) {
            console.log("Error", error);
            message.error('Failed to delete TPO');
        }
    }

    return (

        <div className="tpo-card bg-white p-4 pb-2 rounded-2xl shadow-md" key={event.id}>
            {project ? (
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
                            elem={event}
                            duplicateProjectHandler={() => handleDuplicateTpo(event)}
                            handleEditProjectModal={() => handleEditTpo(event)}
                            deleteProjectHandler={handleDeleteTpo}
                            handleUpgradeVersion={() => handleUpgradeVersion(event)}
                        />
                    </div>

                    <div className="flex gap-2 py-4 text-lg">
                        <label className="font-semibold">Project:</label> <p>{project?.project_name}</p>
                    </div>
                    {/* <p>Version {getModelVersion(event)}</p> */}
                    <Link
                        to={`/tpo/${encodeURIComponent(project?.project_name)}/${event?.project_id}/${event?.model_id}/${event?.id}`}
                        className='simulator gap-2 bg-primary px-4 py-2 inline-flex items-center text-white rounded hover:no-underline hover:bg-[#009bcc]'
                    >
                        <i className="fa-regular fa-calendar"></i>
                        Event
                    </Link>

                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200 -mx-6">
                        <p className="font-bold pl-6">
                            <span className="font-normal block">Created at:</span> <Moment format="MM/DD/YYYY">{event.created_at}</Moment><br />
                            {" "} <Moment format="HH:mm">{event.created_at}</Moment>
                        </p>
                        <p className="font-bold pr-6">
                            <span className="font-normal block">Updated at:</span> <Moment format="MM/DD/YYYY">{event.updated_at}</Moment><br />
                            {" "} <Moment format="HH:mm">{event.updated_at}</Moment>
                        </p>
                    </div>
                </>
            ) : (<>
                <div className="flex items-center justify-between">
                    <div className="d-flex justify-start items-center">
                        <div className="avatar">
                            <Skeleton.Image active={true} />
                            <h3 className=''>
                                <Skeleton.Input active={true} />
                            </h3>
                        </div>

                        <div>
                            <h4 className="text-lg"><Skeleton.Input active={true} /></h4>

                        </div>
                    </div>
                </div>

                <div className="flex gap-2 py-4 text-lg">
                    <label className="font-semibold">Project:</label> <p><Skeleton.Input active={true} /></p>
                </div>

                <div
                    className='simulator gap-2 bg-primary px-4 py-2 inline-flex items-center text-white rounded hover:no-underline hover:bg-[#009bcc]'
                >
                    <i className="fa-regular fa-calendar"></i>
                    Event
                </div>

                <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200 -mx-6">
                    <p className="font-bold pl-6">
                        <span className="font-normal block">Created at:</span> <Skeleton.Input size="small" active={true} />
                    </p>
                    <p className="font-bold pr-6">
                        <span className="font-normal block">Updated at:</span> <Skeleton.Input size="small" active={true} />
                    </p>
                </div>
            </>
            )}
        </div>
    )
}