import React, { useState, useEffect } from "react";
import "../../css/style.css";
import axios from "axios";
import { Input, Select, Form, Button, message, Flex, Typography } from 'antd'
import { Modal } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { TpoCard } from "./TpoCard";


const TpoHome = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const [projects, setProjects] = useState([]);
    const [eventTpos, setEventTpos] = useState([]);

    // Fetch event tpos
    const fetchEventTpos = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ` + authData.token } };
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo`;
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
        setShow(false);
    }

    const [formData, setFormData] = useState({
        name: '',
        project_id: '',
        model_id: '',
    });
    const [loading, setLoading] = useState(false);
    const handleCreateTpo = async () => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ` + authData.token } };
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo`;
            let { data } = await axios.post(api, formData, config);

            if (data) {
                setEventTpos([...eventTpos, data]);
                // success message
                message.success('TPO created successfully');
                setShow(false);
                setFormData({
                    name: '',
                    project_id: '',
                    model_id: '',
                });
            }
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
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
                                <span className="btn-primary rounded-pill icon-btn me-2"> + </span> Create TPO
                            </button>
                        </div>
                    </div>
                </div>
                {/* Show all tpo cards */}
                <div className="mx-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {eventTpos?.map((event) => (
                            <div className="w-full">
                                <TpoCard event={event} projects={projects} fetchEventTpos={fetchEventTpos} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Create TPO Modal */}
                <Modal show={show} onHide={onClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create TPO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="nla_modal_body_title">
                            <div>                            
                                <Typography.Title level={5}>TPO Name</Typography.Title>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter TPO name"
                                />
                            </div>
                            <div className="mt-2">
                                <Typography.Title level={5}>Project</Typography.Title>
                                <Select
                                    value={formData.project_id}
                                    onChange={(value) => setFormData({
                                        ...formData,
                                        project_id: value,
                                    })}
                                    options={projects.map(project => ({ value: project.id, label: project.project_name }))}
                                    className="w-full"
                                    placeholder="Select project"
                                />
                            </div>
                            <div className="mt-2">
                                <Typography.Title level={5}>Model</Typography.Title>
                                <Select
                                    value={formData.model_id}
                                    onChange={(value) => setFormData({
                                        ...formData,
                                        model_id: value,
                                    })}
                                    options={projects.find(project => project.id === formData.project_id)?.Models.map((model) => ({ value: model.id, label: `Version ${model.model_version}` }))}
                                    className="w-full"
                                    placeholder="Select model"
                                    disabled={!formData.project_id}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="btn btn-outline-secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" className="btn btn-primary" onClick={handleCreateTpo}>
                            Create TPO
                        </Button>
                    </Modal.Footer>
                </Modal>
            <Footer />
        </>
    );
};

export default TpoHome;
