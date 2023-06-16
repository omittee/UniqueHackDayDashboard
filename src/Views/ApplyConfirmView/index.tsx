// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import Alert from 'antd/es/alert';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import { connect } from 'react-redux';
import Icon from 'antd/es/icon';

import { RootState } from '../../redux/reducers/index';
import delay from '../../lib/delay';
import { APPLY_CONFIRM_SUBMIT } from '../../redux/actions/index';

export interface ApplyConfirmViewProps {
    handleConfirm: () => void;
    ing: boolean;
    error: any;
}

class ApplyConfirmView extends React.Component<
    ApplyConfirmViewProps,
    { confirmButtonDisabled: boolean; showMessage: boolean }
> {
    state = {
        confirmButtonDisabled: true,
        showMessage: false,
    };

    handleCheckbox = () => {
        this.setState(({ confirmButtonDisabled }) => ({
            confirmButtonDisabled: !confirmButtonDisabled,
        }));
    };

    handleMessageClose = async () => {
        await delay(1000);
        this.setState({
            showMessage: false,
        });
    };

    render() {
        return (
            <div style={{ margin: '40px 0 24px' }}>
                <Row>
                    <Col
                        {...{
                            xl: { push: 7, span: 10 },
                            lg: { push: 6, span: 12 },
                            md: { push: 5, span: 14 },
                            xs: 24,
                            sm: 24,
                        }}
                    >
                        <Alert
                            showIcon={true}
                            type="warning"
                            description="我们已经收集到了所有需要的信息，请确认是否报名参加 Unique Hackday。你只有确认报名才能继续后续流程。"
                            message="注意"
                        />

                        {this.state.showMessage && (
                            <Alert
                                message={`确认失败：${this.props.error.value}`}
                                showIcon={true}
                                type="error"
                                closable={true}
                                onClose={this.handleMessageClose}
                            />
                        )}

                        <br />

                        <Button
                            type="primary"
                            style={{ marginTop: '10px' }}
                            onClick={this.props.handleConfirm}
                        >
                            {this.props.ing ? <Icon type="loading" /> : '确认参赛'}
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    componentWillReceiveProps(nextProps: ApplyConfirmViewProps) {
        const { error = { time: 0 } } = this.props;
        const { error: nextError } = nextProps;
        if (nextError && nextError.value && nextError.time !== error.time) {
            if (!this.state.showMessage) {
                this.setState({ showMessage: true });
            }
        }
    }
}

export default connect(
    ({ confirmApplyStatus: { isSubmitting: ing, error } }: RootState) => ({ ing, error }),
    dispatch => ({
        handleConfirm() {
            dispatch({ type: APPLY_CONFIRM_SUBMIT._ });
        },
    }),
)(ApplyConfirmView);
