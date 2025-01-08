import React, { useState, useEffect } from "react";
import "../../css/style.css";
import axios from "axios";
import { Input, Select, Form, Button, Modal, message } from 'antd'
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
            <div className="min-h-[calc(100vh-40px)] bg-[rgb(249,249,249)] pt-20 pb-8">
                <div className="mx-auto px-12">
                    <div className="flex justify-between flex-wrap items-center h-full">
                        {/* SHow create tpo button */}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setShow(true)}>Create TPO</button>
                    </div>
                </div>
                {/* Show all tpo cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eventTpos?.map((event) => (
                        <div className="w-full">
                            <TpoCard event={event} projects={projects} fetchEventTpos={fetchEventTpos} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Create TPO Modal */}
            <Modal open={show} onCancel={onClose} width={700} footer={[
                <Button
                    key="cancle"
                    onClick={onClose}
                >
                    Cancel
                </Button>,
                <Button
                    key="import"
                    type="primary"
                    onClick={handleCreateTpo}
                >
                    Create TPO
                </Button>
            ]}>
                <h3 className="text-lg font-semibold mb-4">Create TPO</h3>

                <div className="mt-4">
                    <Form.Item label="TPO Name" required>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter TPO name"
                        />
                    </Form.Item>
                </div>
                <div className="mt-4">
                    <Form.Item label="Project" required>
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
                    </Form.Item>
                </div>

                <div className="mt-4">
                    <Form.Item label="Model" required>
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
                    </Form.Item>
                </div>
            </Modal>
            <Footer />
        </>
    );
};

export default TpoHome;
