import { Modal, Input, message } from "antd";
import axios from "axios";

interface TargetUpdateProps {
    isEditingTargets: boolean
    tempTargets: any
    setTempTargets: (tempTargets: any) => void
    targetValues: any
    setTargetValues: (targetValues: any) => void
    setIsEditingTargets: (isEditingTargets: boolean) => void
    event_tpo_id: string
}

export const TargetUpdate = ({ isEditingTargets, tempTargets, setTempTargets, targetValues, setTargetValues, setIsEditingTargets, event_tpo_id }: TargetUpdateProps) => {
    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
    const user_id = authData?.user_id;

    const handleUpdateTargets = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${authData.token}` } };
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${event_tpo_id}/target`;

            await axios.put(api, tempTargets, config);

            setTargetValues(tempTargets);
            setIsEditingTargets(false);
            message.success('Target values updated successfully');
        } catch (error) {
            console.error('Failed to update targets:', error);
            message.error('Failed to update target values');
        }
    };

    return (
        <Modal
            title="Edit Target Values"
            open={isEditingTargets}
            onOk={handleUpdateTargets}
            onCancel={() => setIsEditingTargets(false)}
            okText="Save"
            cancelText="Cancel"
        >
            <div className="space-y-4" >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                        Target Volume
                    </label>
                    <Input
                        type="text"
                        value={tempTargets.volume?.toLocaleString() || '0'}
                        onChange={(e) => {
                            const value = e.target.value.replace(/,/g, '');
                            const numValue = parseInt(value) || 0;
                            setTempTargets({
                                ...tempTargets,
                                volume: numValue
                            });
                        }}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                        Target Spend
                    </label>
                    <Input
                        type="text"
                        value={tempTargets.spend?.toLocaleString() || '0'}
                        onChange={(e) => {
                            const value = e.target.value.replace(/,/g, '');
                            const spendValue = parseInt(value) || 0;
                            setTempTargets({
                                ...tempTargets,
                                spend: spendValue
                            });
                        }}
                        prefix="$"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                        Target Revenue
                    </label>
                    <Input
                        type="text"
                        value={tempTargets.revenue?.toLocaleString() || '0'}
                        onChange={(e) => {
                            const value = e.target.value.replace(/,/g, '');
                            const revenueValue = parseInt(value) || 0;
                            setTempTargets({
                                ...tempTargets,
                                revenue: revenueValue
                            });
                        }}
                        prefix="$"
                    />
                </div>
            </div>
        </Modal>
    )
}
