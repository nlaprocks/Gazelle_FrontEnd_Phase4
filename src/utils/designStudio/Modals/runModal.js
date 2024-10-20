import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import "./connectionConfirm.css";
import "../../designStudio/Modals/modal.css";
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { Input } from "antd";
import { DatePicker } from 'antd';

const MyVerticallyCenteredModal = ({ onRun, ...props }) => {
    const { RangePicker } = DatePicker;

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='ms-auto'>
                    Run
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ overflow: "auto" }}>
                <div className="nla_modal_banenr">
                    <img
                        src={require("../../../assets/images/create-new-model-intro-image.png")}
                        alt="placeholder"
                        className="img-fluid"
                    />
                </div>
                <div className="nla-add-heading-block">
                    <form>
                        <div className="relative nla_form_project_name position-relative nla_form_field_block mb-4">
                            <i className="fa-regular fa-calendar-plus"></i>
                            <Input size="large" value="" placeholder="Enter Market share" prefix={<CalendarOutlined />} />
                        </div>
                        <div className="relative nla_form_project_name position-relative nla_form_field_block mb-4">
                            <i className="fa-regular fa-calendar-plus"></i>
                            <Input size="large" value="" placeholder="Sales Revenue" prefix={<DollarOutlined />} />
                        </div>
                        <div className="relative nla_form_project_name position-relative nla_form_field_block">
                            <i className="fa-regular fa-calendar-plus"></i>
                            <RangePicker className="w-full" />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                <Button type="button" className="btn btn-primary" onClick={onRun}>Run</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;