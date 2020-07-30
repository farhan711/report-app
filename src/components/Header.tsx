import React from 'react';
import { PageHeader, Row, Col } from 'antd'

import logo from '../email-reporting-logo.png'

type HeaderProps = {
    title?: string
    subTitle?: string
}
export const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    return (
        <Row>
            <Col span={24}>
                <PageHeader
                    title={title || "Scheduler"}
                    subTitle= {subTitle ||  "Deliver Reports at Scale"}
                    ghost={false}
                    avatar={{ src: logo, size: 35, shape: 'square' }}
                    className="header-shadow"
                >
                </PageHeader>
            </Col>
        </Row>
    )
}
