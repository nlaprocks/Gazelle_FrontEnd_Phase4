import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'

function PromoModal ({ show, setShow }) {
  const handleClose = () => setShow(false)
  const { Dragger } = Upload

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange (info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop (e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='ml-auto'>Import Events</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-1'>
          <div className='grid grid-cols-1'>
            <Dragger {...props}>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined style={{ color: '#009bcc' }} />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-center pb-3'>
          <Button variant='outline-primary'>Download Sample Formate</Button>
          <Button variant='primary'>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PromoModal
