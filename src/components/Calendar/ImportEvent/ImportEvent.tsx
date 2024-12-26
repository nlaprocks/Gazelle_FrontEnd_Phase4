import React, { useState } from 'react'
import { Modal, Upload, Button, Tabs, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FileSpreadsheet, Download } from 'lucide-react'
import { parseEventData } from '../../../utils/importUtils'
import { PreviewTable } from './PreviewTable'
import { ValidationResults } from './ValidationResults'
import { downloadSampleTemplate } from '../../../utils/exportUtils'
import type { Event } from '../../../types/event'
import type { UploadFile, RcFile } from 'antd/es/upload/interface'

interface ImportEventProps {
    show: boolean
    onClose: () => void
    onImport: (events: Event[]) => Promise<void>
}

const { Dragger } = Upload
const { TabPane } = Tabs

export const ImportEvent: React.FC<ImportEventProps> = ({ show, onClose, onImport }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewData, setPreviewData] = useState<Event[]>([])
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [importing, setImporting] = useState(false)

    const handleFileRead = async (file: RcFile) => {
        try {
            const { events, errors } = await parseEventData(file)
            setPreviewData(events)
            setValidationErrors(errors)
            return false // Prevent default upload behavior
        } catch (error) {
            message.error('Failed to read file')
            return false
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
                    key="download"
                    icon={<Download size={16} />}
                    onClick={downloadSampleTemplate}
                >
                    Download Template
                </Button>,
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
            <Tabs defaultActiveKey="upload">
                <TabPane
                    tab={
                        <span>
                            <FileSpreadsheet size={16} className="inline-block mr-2" />
                            Upload File
                        </span>
                    }
                    key="upload"
                >
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
            </Tabs>
        </Modal>
    )
}