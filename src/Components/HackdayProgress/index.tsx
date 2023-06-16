import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

// import cls from '../Status/style.less';

const HackdayProgress = () => {
    const date = new Date().getTime()/1000;
    const dataList = {
        step1: 1686844800,
        step2: 1688054400,
        step3: 1688140800,
        step4: 1688486400,
        step5: 1688659200,
        step6: 1688832000,
        step7: 1688918400,
    }
    const status1 = date > dataList.step2 ? "finish" : date > dataList.step1? "process" : "wait";
    const status2 = date > dataList.step3 ? "finish" : date > dataList.step2? "process" : "wait";
    const status3 = date > dataList.step4? "finish" : date > dataList.step3? "process" : "wait";
    const status4 = date > dataList.step5? "finish" : date > dataList.step4? "process" : "wait";
    const status5 = date > dataList.step6? "finish" : date > dataList.step5? "process" : "wait";
    const status6 = date > dataList.step7? "finish" : date > dataList.step6? "process" : "wait";

    return (
        <Card bordered={false} title="比赛进程">
            <Steps progressDot={true} direction="vertical">
                <Steps.Step status={status1} title="6月16日" description="开始报名" />
                <Steps.Step status={status2} title="6月16日 - 6月30日" description="筛选简历" />
                <Steps.Step status={status3} title="6月30日" description="结束报名 & 确认参赛队伍" />
                <Steps.Step status={status4} title="7月1日 - 7月5日" description="线上开发" />
                <Steps.Step status={status5} title="7月6日" description="确认线下 Hackday 队伍" />
                <Steps.Step status={status6} title="7月9日" description="线下 Hackday" />
            </Steps>
        </Card>
    );
};

export default HackdayProgress;
