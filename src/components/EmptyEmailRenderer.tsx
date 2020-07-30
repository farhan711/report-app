import React from "react";
import { WarningOutlined } from "@ant-design/icons";

export const EmptyEmailRenderer = () => (
    <div style={{ textAlign: 'center' }}>
        <WarningOutlined />
        <p>No Emails Selected</p>
    </div>
)
