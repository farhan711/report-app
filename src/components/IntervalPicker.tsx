import React from 'react';
import { Row, Radio, Col, TimePicker, Divider } from 'antd';
import { useRecoilValue, useRecoilState } from 'recoil'

import {isSendingAtom, timeAtom, intervalAtom} from '../store/report_actions/atoms'

export const IntervalPicker: React.FC<{}> = () => {

    const [time, setTime] = useRecoilState(timeAtom)
    const [timeInterval, setTimeInterval] = useRecoilState(intervalAtom)
    const isSendingValue = useRecoilValue(isSendingAtom)

    return (
        <>
            <Row justify="center" align="middle" style={{ marginTop: 15 }}>
                <Col span={5}>
                    <Radio.Group disabled={isSendingValue} defaultValue={undefined} onChange={e => setTimeInterval(e.target.value)}>
                        <Radio.Button value="daily">Daily</Radio.Button>
                        <Radio.Button value="weekly">Weekly</Radio.Button>
                        <Radio.Button value="monthly">Monthly</Radio.Button>
                        <Radio.Button value={undefined}>None</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={6}>
                <Divider plain>OR</Divider>
                </Col>
            </Row>
            <Row justify="center" align="middle" style={{ marginBottom: 30 }}>
                    <TimePicker disabled={timeInterval ? true : false} value={time} onChange={t => setTime(t)} />
            </Row>
        </>
    )
}
