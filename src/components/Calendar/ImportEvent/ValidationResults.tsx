import React from 'react'
import { Alert, List, Tag } from 'antd'

interface ValidationResultsProps {
    errors: string[]
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({ errors }) => {
    console.log({ errors });

    const categorizeError = (error: string) => {
        console.log({ error });
        if (error.includes('Missing required field')) return 'required'
        if (error.includes('Invalid date')) return 'date'
        if (error.includes('Invalid status')) return 'status'
        if (error.includes('Invalid format')) return 'format'
        if (error.includes('Cannot read properties of undefined')) return 'product not found'
        return 'other'
    }

    const getTagColor = (category: string) => {
        switch (category) {
            case 'required': return 'red'
            case 'date': return 'orange'
            case 'status': return 'purple'
            case 'format': return 'blue'
            case 'product not found': return 'red'
            default: return 'default'
        }
    }

    return (
        <div className="space-y-4">
            <Alert
                message="Validation Errors"
                description="Please fix the following errors in your CSV file before importing:"
                type="error"
                showIcon
            />
            <List
                size="small"
                bordered
                dataSource={errors}
                renderItem={(error) => {
                    const category = categorizeError(error)
                    return (
                        <List.Item>
                            <div className="flex items-center gap-2">
                                <Tag color={getTagColor(category)}>
                                    {category.toUpperCase()}
                                </Tag>
                                <span className="text-red-600">{error}</span>
                            </div>
                        </List.Item>
                    )
                }}
            />
            <Alert
                message="How to fix"
                type="info"
                showIcon
                description={
                    <ul className="list-disc pl-4 mt-2">
                        <li>Download the sample template to see the correct format</li>
                        <li>Ensure all required fields are filled</li>
                        <li>Use valid date formats (YYYY-MM-DD)</li>
                        <li>Status must be one of: draft, active, completed</li>
                        <li>Numbers should not include currency symbols</li>
                    </ul>
                }
            />
        </div>
    )
}