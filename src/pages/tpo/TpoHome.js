import React, { useState, useEffect } from "react";
import "../../css/style.css";
import axios from "axios";
import { Input, Select, Form, Button, message, Typography } from 'antd'
import { Modal } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { TpoCard } from "./TpoCard";
import createImg from "../../assets/images/new_project_create_image.png";


const TpoHome = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const [projects, setProjects] = useState([]);
    const [eventTpos, setEventTpos] = useState([]);
    const [showCancelProject, setShowCancelProject] = useState(false);

    // Fetch event tpos
    const fetchEventTpos = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ` + authData.token, accept: 'application/json' } };
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo-list/${user_id}`;
            let { data } = await axios.get(api, config);

            if (data) {
                setEventTpos(data);
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ` + authData.token } };
                const api = `${process.env.REACT_APP_Base_URL}/api/v1/project/list_view/all_projects/${user_id}/date_created?page=1&limit=100`;
                let { data } = await axios.get(api, config);

                if (data) {
                    setProjects(data?.rows);
                }
            } catch (error) {
                console.log("Error", error);
            }
        }
        fetchProjects();

        fetchEventTpos();
    }, []);

    const [show, setShow] = useState(false);
    const onClose = () => {
        setFormData({
            id: null,
            name: '',
            project_id: '',
            model_id: '',
            user_id: user_id,
        });
        setShow(false);
        setEditTpo(false);
        setUpgradeVersion(false);
        setSubmitAttempted(false);
        setShowCancelProject(true);
    }

    const handleCloseCancel = () => {
        setShowCancelProject(false);
        setShow(true);
    };

    const handleCloseCancelClose = () => {
        setShowCancelProject(false);
      };

    const [editTpo, setEditTpo] = useState(false);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        project_id: '',
        model_id: '',
        user_id: user_id,
        submit_type: 'create',
    });
    const [loading, setLoading] = useState(false);

    // Add new state for tracking form submission attempt
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleCreateTpo = async () => {
        setSubmitAttempted(true);

        // Add validation
        if (!formData.name?.trim() || !formData.project_id || !formData.model_id) {
            if (!formData.name?.trim()) {
                message.error('Please enter Trade Plan name');
            }
            if (!formData.project_id) {
                message.error('Please select a project');
            }
            if (!formData.model_id) {
                message.error('Please select a model');
            }
            return;
        }

        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ` + authData.token } };

            if (editTpo) {
                const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${formData.id}`;
                let { data } = await axios.put(api, formData, config);

                if (data) {
                    setEventTpos([...eventTpos, data]);
                    // success message
                    message.success('TPO updated successfully');
                    setShow(false);
                    setFormData({
                        id: null,
                        name: '',
                        project_id: '',
                        model_id: '',
                        submit_type: 'create',
                        user_id: user_id,
                    });

                    setEditTpo(false);
                    fetchEventTpos();
                }
            } else {
                const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo`;
                let { data } = await axios.post(api, formData, config);

                if (data) {
                    setEventTpos([...eventTpos, data]);
                    // success message
                    message.success('TPO created successfully');
                    setShow(false);
                    setFormData({
                        id: null,
                        name: '',
                        project_id: '',
                        model_id: '',
                        submit_type: 'create',
                        user_id: user_id,
                    });

                    setEditTpo(false);
                    fetchEventTpos();
                }
            }
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEditTpo = async (event) => {
        setShow(true);
        setEditTpo(true);
        setFormData({ ...event, submit_type: 'update' });
    }

    const [upgradeVersion, setUpgradeVersion] = useState(false);
    const handleUpgradeVersion = async (event) => {
        setShow(true);
        setUpgradeVersion(true);
        setFormData({ ...event, submit_type: 'upgrade' });
    }

    const handleDuplicateTpo = async (event) => {
        console.log({ event: event });
        setShow(true);
        setFormData({ ...event, submit_type: 'duplicate' });
    }

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] pt-20 pb-8">
                <div className="mx-auto px-10 pb-6">
                    <div className="flex justify-end flex-wrap items-center h-full">
                        {/* SHow create tpo button */}
                        <div className="nla_add_new_project_btn">
                            <button onClick={() => setShow(true)}>
                                <span className="btn-primary rounded-pill icon-btn me-2"> + </span> Create Trade Plan
                            </button>
                        </div>
                    </div>
                </div>
                {/* Show all tpo cards */}
                <div className="mx-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {eventTpos
                            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((event) => (
                                <div className="w-full" key={event.id}>
                                    <TpoCard
                                        event={event}
                                        projects={projects}
                                        fetchEventTpos={fetchEventTpos}
                                        handleEditTpo={handleEditTpo}
                                        handleDuplicateTpo={handleDuplicateTpo}
                                        handleUpgradeVersion={handleUpgradeVersion}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Add Create TPO Modal */}
            <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{editTpo ? "Edit Trade Plan" : upgradeVersion ? "Upgrade Version" : "Create Trade Plan"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="nla_modal_body_title">
                        <div>
                            <Typography.Title level={5}>Trade Plan Name <span className="text-danger">*</span></Typography.Title>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter Trade Plan name"
                                required
                                status={submitAttempted && !formData.name?.trim() ? 'error' : ''}
                            />
                        </div>
                        <div className="mt-2">
                            <Typography.Title level={5}>Project <span className="text-danger">*</span></Typography.Title>
                            <Select
                                value={{ value: formData.project_id, label: projects.find(project => project.id === parseInt(formData.project_id))?.project_name }}
                                onChange={(value) => setFormData({
                                    ...formData,
                                    project_id: value,
                                    model_id: '', // Reset model when project changes
                                })}
                                disabled={upgradeVersion}
                                options={projects.filter(project => project.is_insight).map(project => ({ value: project.id, label: project.project_name }))}
                                className="w-full"
                                placeholder="Select project"
                                required
                                status={submitAttempted && !formData.project_id ? 'error' : ''}
                            />
                        </div>
                        <div className="mt-2">
                            <Typography.Title level={5}>Model <span className="text-danger">*</span></Typography.Title>
                            <Select
                                value={{
                                    value: formData.model_id,
                                    label: `Version ${projects.find(project => project.id === parseInt(formData.project_id))?.Models.find(model => model.id === parseInt(formData.model_id))?.model_version}`
                                }}
                                onChange={(value) => setFormData({
                                    ...formData,
                                    model_id: value,
                                })}
                                options={projects.find(project => project.id === parseInt(formData.project_id))?.Models.map((model) => ({ value: model.id, label: `Version ${model?.model_version}` }))}
                                className="w-full"
                                placeholder="Select model"
                                disabled={!formData.project_id}
                                required
                                status={submitAttempted && !formData.model_id ? 'error' : ''}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-outline-secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        className="btn btn-primary"
                        onClick={handleCreateTpo}
                        loading={loading}
                        disabled={loading}
                    >
                        {editTpo ? "Update Trade Plan" : upgradeVersion ? "Upgrade Version" : "Create Trade Plan"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <!-- Cancel Project Modal Start --> */}
            <Modal show={showCancelProject} onHide={onClose} id="cancelProject" centered>
                <Modal.Header>
                <Modal.Title>Cancel Trade Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="nla_modal_banenr">
                    <img src={createImg} alt="placeholder" class="img-fluid" />
                </div>
                <div class="nla_modal_body_title text-center">
                    <h5>Are you Sure?</h5>
                    <p>Pressing yes will cancel the Trade Plan</p>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#createNewProject"
                    onClick={handleCloseCancel}
                >
                    No
                </button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleCloseCancelClose}>
                    Yes
                </button>
                </Modal.Footer>
            </Modal>
            {/* <!-- Cancel Project Modal End --> */}
            <Footer />
        </>
    );
};

export default TpoHome;
