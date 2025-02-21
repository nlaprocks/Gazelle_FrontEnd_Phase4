import React, { useState } from 'react'
import { Modal, Upload, Button, Tabs, message, Select, Space, Typography, Radio } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FileSpreadsheet, Download } from 'lucide-react'
import { parseEventData } from '../../../utils/importUtils'
import { PreviewTable } from './PreviewTable'
import { ValidationResults } from './ValidationResults'
import { downloadAdvancedTemplate, downloadSampleTemplate } from '../../../utils/exportUtils'
import type { Event } from '../../../types/event'
import type { UploadFile, RcFile } from 'antd/es/upload/interface'
import { useParams } from 'react-router-dom'

interface ImportEventProps {
    show: boolean
    onClose: () => void
    onImport: (events: Event[]) => Promise<void>
    event_tpo_id: string
    retailerBrandProducts: any
}

const { Dragger } = Upload
const { TabPane } = Tabs
const { Text, Paragraph } = Typography

export const ImportEvent: React.FC<ImportEventProps> = ({ show, onClose, onImport, event_tpo_id, retailerBrandProducts }) => {
    const { project_id, model_id } = useParams()
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewData, setPreviewData] = useState<Event[]>([])
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [importing, setImporting] = useState(false)
    const [activeKey, setActiveKey] = useState('upload')
    const [selectedRetailer, setSelectedRetailer] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [eventTimeframe, setEventTimeframe] = useState<'past' | 'current'>('past')

    const getRetailerProducts = (retailer: string) => {
        return Object?.keys(retailerBrandProducts[retailer]).filter((brand: any) => {
            return retailerBrandProducts[retailer][brand]
        })
    }

    const retailers = Object?.keys(retailerBrandProducts);
    let brands = selectedRetailer
        ? Object?.keys(retailerBrandProducts[selectedRetailer])
        : [];
    let products = selectedBrand ? retailerBrandProducts[selectedRetailer][selectedBrand] : selectedRetailer ? getRetailerProducts(selectedRetailer) : [];


    const handleFileRead = async (file: RcFile) => {
        try {
            if (!project_id || !model_id) {
                message.error('Project ID or Model ID is missing');
                return false;
            }

            // Add loading message
            message.loading('Processing file...', 0);

            const result = await parseEventData(file, event_tpo_id, project_id, model_id, eventTimeframe);

            // Destroy the loading message
            message.destroy();

            if (result && result.events) {
                console.log('Parsed events:', result.events);
                setPreviewData(result.events);
                setActiveKey('preview')
                setValidationErrors(result.errors || []);
            } else {
                message.error('No events data returned');
            }

            return false; // Prevent default upload behavior
        } catch (error) {
            message.destroy(); // Clear loading message if there's an error
            console.error('File reading error:', error);
            message.error('Failed to read file');
            return false;
        }
    }

    const handleImport = async () => {
        if (validationErrors.length > 0) {
            message.error('Please fix validation errors before importing')
            return
        }

        try {
            setImporting(true)
            await onImport(previewData)
            message.success('Events imported successfully')
            onClose()
        } catch (error) {
            message.error('Failed to import events')
        } finally {
            setImporting(false)
        }
    }

    const uploadProps = {
        accept: '.csv',
        maxCount: 1,
        fileList,
        beforeUpload: handleFileRead,
        onChange: (info: any) => {
            setFileList(info.fileList.slice(-1))
        },
        onRemove: () => {
            setFileList([])
            setPreviewData([])
            setValidationErrors([])
        }
    }

    return (
        <Modal
            title="Import Events"
            open={show}
            onCancel={onClose}
            width={1200}
            footer={[
                <Button
                    key="import"
                    type="primary"
                    onClick={handleImport}
                    disabled={previewData.length === 0 || validationErrors.length > 0}
                    loading={importing}
                >
                    Import Events
                </Button>
            ]}
        >
            <Tabs defaultActiveKey="upload" activeKey={activeKey} onChange={setActiveKey}>
                <TabPane
                    tab={
                        <span>
                            <FileSpreadsheet size={16} className="inline-block mr-2" />
                            Upload File
                        </span>
                    }
                    key="upload"
                >
                    <div className="mb-4">
                        <Radio.Group
                            value={eventTimeframe}
                            onChange={(e) => setEventTimeframe(e.target.value)}
                        >
                            {/* In Current Event Dates will be kept as specified in the file */}
                            <Radio.Button value="past">Current Event</Radio.Button>

                            {/* In Past Event Dates will be adjusted to the current year */}
                            <Radio.Button value="current">Past Event</Radio.Button>
                        </Radio.Group>

                        <div className="mt-2 text-sm text-gray-500">
                            {eventTimeframe === 'current'
                                ? "Dates will be adjusted to the current year"
                                : "Dates will be kept as specified in the file"
                            }
                        </div>
                    </div>

                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag CSV file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for CSV files only. Please use the template for correct format.
                        </p>
                    </Dragger>
                </TabPane>

                {previewData.length > 0 && (
                    <TabPane
                        tab="Preview Data"
                        key="preview"
                    >
                        <PreviewTable data={previewData} />
                    </TabPane>
                )}

                {validationErrors.length > 0 && (
                    <TabPane
                        tab={`Validation (${validationErrors.length})`}
                        key="validation"
                    >
                        <ValidationResults errors={validationErrors} />
                    </TabPane>
                )}

                <TabPane
                    tab={
                        <span>
                            <Download size={16} className="inline-block mr-2" />
                            Download Templates
                        </span>
                    }
                    key="templates"
                >
                    <div className="space-y-6">
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <h3 className="text-lg font-medium mb-2">Basic Template</h3>
                            <Paragraph className="text-gray-600 mb-4">
                                Download a blank template with headers only. Use this if you want to:
                                <ul className="list-disc ml-6 mt-2">
                                    <li>Start from scratch</li>
                                    <li>Have your own product data</li>
                                    <li>Manually fill in all information</li>
                                </ul>
                            </Paragraph>
                            <Button
                                icon={<Download size={16} />}
                                onClick={() => downloadSampleTemplate()}
                            >
                                Download Basic Template
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-2">Advanced Template</h3>
                            <Paragraph className="text-gray-600 mb-4">
                                Download a pre-filled template with product data. This includes:
                                <ul className="list-disc ml-6 mt-2">
                                    <li>All available products for selected retailer and brand</li>
                                    <li>Base prices for each product</li>
                                    <li>Product codes and descriptions</li>
                                </ul>
                            </Paragraph>

                            <Space direction="vertical" className="w-full mb-4">
                                <Select
                                    placeholder="Select Retailer"
                                    className="w-full"
                                    onChange={(value) => {
                                        setSelectedRetailer(value);
                                        setSelectedBrand(''); // Reset brand when retailer changes
                                    }}
                                    options={retailers.map(r => ({
                                        value: r,
                                        label: r
                                    }))}
                                />
                                <Select
                                    placeholder="Select Brand (Optional)"
                                    className="w-full"
                                    allowClear
                                    disabled={!selectedRetailer}
                                    onChange={(value) => setSelectedBrand(value)}
                                    options={brands.map(b => ({
                                        value: b,
                                        label: b
                                    }))}
                                />
                            </Space>

                            <Button
                                icon={<Download size={16} />}
                                disabled={!selectedRetailer || !selectedBrand} // Only require retailer selection
                                onClick={() => downloadAdvancedTemplate(products, selectedRetailer, selectedBrand)}
                                type="primary"
                            >
                                Download Advanced Template
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4 bg-blue-50">
                            <h3 className="text-lg font-medium mb-2">Important Notes</h3>
                            <Paragraph className="text-gray-600">
                                <ul className="list-disc ml-6">
                                    <li>All dates should be in YYYY-MM-DD format</li>
                                    <li>Required fields: Start Date, End Date, Product Name</li>
                                    {/* <li>Budget values should be numbers only (no currency symbols)</li> */}
                                    <li>Don't modify column headers</li>
                                    <li>Save file as CSV format before uploading</li>
                                </ul>
                            </Paragraph>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Modal>
    )
}