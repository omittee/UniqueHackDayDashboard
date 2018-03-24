// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
// import { connect } from 'react-redux';
// import { RootState } from '../../redux/reducers';
// import throttle from 'lodash-es/throttle';

import Form, { FormComponentProps } from 'antd/es/form';
import Card from 'antd/es/card';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import DatePicker from 'antd/es/date-picker';
// import Tabs from 'antd/es/tabs';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
// import Checkbox from 'antd/es/checkbox';
// import Row from 'antd/es/row';
// import Col from 'antd/es/col';

import 'antd/lib/form/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style/index.css';
// import 'antd/lib/checkbox/style/index.css';
// import 'antd/lib/row/style/css';
// import 'antd/lib/col/style/css';

// For upload progress
import 'antd/lib/progress/style/index.css';

import { patterns } from '../../redux/sagas/validate';

class DetailView extends React.Component<FormComponentProps> {
  state = {
    isUploadingResume: false,
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        // console.log('Received values of form: ', JSON.stringify(values));
      }
    });
  };

  eventToFileId = (e: UploadChangeParam) => {
    this.setState({ isUploadingResume: true });
    const uploaded = e.fileList.filter(file => file.status === 'done');

    if (e.fileList.length === uploaded.length) {
      this.setState({ isUploadingResume: false });
    }

    if (uploaded.length > 0) {
      return uploaded.map(file => file.response.fileId);
    }
    return null;
  };

  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Card bordered={false} className="detail">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="真实姓名:">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入真实姓名',
                },
              ],
            })(
              <Input
                placeholder="请输入真实姓名"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="性别:">
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <Select placeholder="请选择性别">
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
                <Select.Option value="其他">其他</Select.Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="出生日期">
            {getFieldDecorator('birthday', {
              rules: [
                {
                  required: true,
                  message: '请输入出生日期',
                },
              ],
            })(<DatePicker />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="T-shirt尺寸:">
            {getFieldDecorator('tShirtSize', {
              rules: [
                {
                  required: true,
                  message: '请输入T-shirt尺寸:',
                },
              ],
            })(
              <Select placeholder="请选择尺寸">
                <Select.Option value="XS">XS</Select.Option>
                <Select.Option value="S">S</Select.Option>
                <Select.Option value="M">M</Select.Option>
                <Select.Option value="L">L</Select.Option>
                <Select.Option value="XL">XL</Select.Option>
                <Select.Option value="XXL">XXL</Select.Option>
                <Select.Option value="XXXL">XXXL</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="所在城市:">
            {getFieldDecorator('city', {
              rules: [
                {
                  required: true,
                  message: '请输入你所在城市',
                },
              ],
            })(
              <Input
                placeholder="请输入你所在的城市"
                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="支付宝:">
            {getFieldDecorator('alipay', {
              rules: [
                {
                  required: true,
                  message: '请输入真实支付宝账号',
                },
              ],
            })(
              <Input
                placeholder="请输入你的支付宝账号，报销时用"
                prefix={<Icon type="alipay" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="学校:">
            {getFieldDecorator('school', {
              rules: [
                {
                  required: true,
                  message: '请输入你所在学校',
                },
              ],
            })(
              <Input
                placeholder="请输入你所在的大学"
                prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="专业:">
            {getFieldDecorator('major', {
              rules: [
                {
                  required: true,
                  message: '请输入你就读的专业',
                },
              ],
            })(
              <Input
                placeholder="请输入你就读的专业"
                prefix={<Icon type="desktop" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="年级:">
            {getFieldDecorator('grade', {
              rules: [
                {
                  required: true,
                  message: '请选择你的年级',
                },
              ],
            })(
              <Select placeholder="请选择年级">
                <Select.Option value="1">大一</Select.Option>
                <Select.Option value="2">大二</Select.Option>
                <Select.Option value="3">大三</Select.Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="紧急联系人姓名:">
            {getFieldDecorator('urgentConcat.name', {
              rules: [
                {
                  required: true,
                  message: '请输入紧急联系人姓名',
                },
              ],
            })(
              <Input
                placeholder="输入紧急联系人姓名"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="紧急联系人电话:">
            {getFieldDecorator('urgentConcat.phone', {
              rules: [
                {
                  required: true,
                  message: '请输入紧急联系人电话',
                },
                {
                  pattern: patterns.phone,
                  message: '不是有效的电话号码',
                },
              ],
            })(
              <Input
                placeholder="输入紧急联系人电话"
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="与紧急联系人关系:">
            {getFieldDecorator('urgentConcat.relationship', {
              rules: [
                {
                  required: true,
                  message: '请输入你与紧急联系人关系',
                },
              ],
            })(
              <Input
                placeholder="输入你和紧急联系人关系"
                prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="特殊需要:">
            {getFieldDecorator('specialNeeds', {
              rules: [
                {
                  pattern: /[\u4e00-\u9fa5]{5,}/,
                  message: '请输入至少五个汉字',
                },
              ],
            })(<Input.TextArea placeholder="在饮食、出行等方面的特殊需要" rows={4} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Github:">
            {getFieldDecorator('github', {
              rules: [
                {
                  message: '请输入真实姓名',
                },
              ],
            })(
              <Input
                placeholder="输入你的 Github 账号"
                prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} required={false} label="LinkedIn:">
            {getFieldDecorator('linkedIn', {
              rules: [
                {
                  message: '请输入真实姓名',
                },
              ],
            })(
              <Input
                placeholder="输入你的 LinkedIn 账号"
                prefix={<Icon type="linkedin" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} required={false} label="Coding.Net:">
            {getFieldDecorator('codingDotNet', {
              rules: [
                {
                  message: '请输入真实姓名',
                },
              ],
            })(
              <Input
                placeholder="输入你的 Coding.Net 账号"
                prefix={<Icon type="laptop" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} required={false} label="个人博客">
            {getFieldDecorator('blog', {
              rules: [
                {
                  message: '请输入真实姓名',
                },
              ],
            })(
              <Input
                placeholder="输入你的个人博客的地址"
                prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="你的角色:">
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: '请输入你担任的角色',
                },
              ],
            })(
              <Select placeholder="请选择你的角色" mode="multiple">
                <Select.Option value="前端">前端</Select.Option>
                <Select.Option value="产品">产品</Select.Option>
                <Select.Option value="设计">设计</Select.Option>
                <Select.Option value="后端">后端</Select.Option>
                <Select.Option value="机器学习">机器学习</Select.Option>
                <Select.Option value="硬件开发">硬件开发</Select.Option>
                <Select.Option value="其他">其他</Select.Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="你的技能:">
            {getFieldDecorator('skills', {
              rules: [
                {
                  required: true,
                  message: '请输入真实姓名',
                },
              ],
            })(
              <Select placeholder="请选择你的技能" mode="multiple">
                <Select.Option value="C/C++">C/C++</Select.Option>
                <Select.Option value="PhotoShop">PhotoShop</Select.Option>
                <Select.Option value="JavaScript">JavaScript</Select.Option>
                <Select.Option value="Go">Go</Select.Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="参加过几次hackday">
            {getFieldDecorator('hackdayTime', {})(
              <Input
                placeholder="参加过几次hackday"
                prefix={<Icon type="trophy" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />,
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            hasFeedback={false}
            // avoid flash when uploading
            validateStatus={this.state.isUploadingResume ? 'warning' : undefined}
            help={this.state.isUploadingResume ? '正在上传...' : undefined}
            label="上传你的简历"
          >
            {getFieldDecorator('resume', {
              rules: [
                {
                  required: true,
                  message: '请上传简历',
                },
              ],
              getValueFromEvent: this.eventToFileId,
            })(
              <Upload multiple={false} name="resume" action="/v1/file/files" listType="picture">
                <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
                  <Icon type="upload" /> 点击上传简历
                </Button>
              </Upload>,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} hasFeedback={false} label="上传你的作品集">
            {getFieldDecorator('collection', {
              getValueFromEvent: this.eventToFileId,
            })(
              <Upload multiple={false} name="collection" action="/v1/file/files" listType="picture">
                <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
                  <Icon type="upload" /> 点击上传作品集
                </Button>
              </Upload>,
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xl: { push: 4, span: 8 },
              lg: { push: 6, span: 10 },
              md: { push: 7, span: 12 },
              xs: 24,
              sm: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(DetailView);