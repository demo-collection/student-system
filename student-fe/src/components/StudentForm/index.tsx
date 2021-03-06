import React, { FC } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import { get, isEmpty, toString } from 'lodash';
import moment from 'moment';
import { FORM_ITEM_LAYOUT, FormType } from '@src/consts';
import { StudentFormProps, StudentFormWrapperProps } from './interface';
import styles from './style.less';
import { postStudentApi, putStudentApi } from '@src/server';

const { Option } = Select;

const StudentForm: FC<StudentFormProps> = props => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = () => {
    const { validateFieldsAndScroll, resetFields } = props.form;
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // 特殊处理日期
        if (values.birthday) values.birthday = moment(values.birthday).valueOf();

        if (props.userType === FormType.add) {
          // 提交
          const res = await postStudentApi(values);
          if (!isEmpty(res)) resetFields();
        } else if (props.studentId) {
          const res = await putStudentApi(props.studentId, values);
          if (!isEmpty(res) && props.history) props.history.replace('/');
        }
      }
    });
  };

  const handleRest = () => {
    const { resetFields } = props.form;
    resetFields();
  };

  return (
    <Form {...FORM_ITEM_LAYOUT}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="学号">
            {getFieldDecorator('number', {
              initialValue: get(props.currentStudentInfo, 'number'),
              rules: [
                {
                  required: true,
                  message: '请填写学号',
                },
                {
                  validator: (_: any, value: number, callback) => {
                    if (toString(value).length !== 10) return callback('学生学号必须为十位数');
                    return callback();
                  },
                },
              ],
            })(<InputNumber placeholder={'请填写学号'} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: get(props.currentStudentInfo, 'name'),
              rules: [
                {
                  required: true,
                  message: '请填写姓名',
                },
              ],
            })(<Input placeholder={'请填写姓名'} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              initialValue: get(props.currentStudentInfo, 'gender'),
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <Select placeholder={'请选择性别'}>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="电话号码">
            {getFieldDecorator('phone', {
              initialValue: get(props.currentStudentInfo, 'phone'),
              rules: [
                {
                  required: true,
                  message: '请填写电话号码',
                },
                {
                  validator: (_: any, value: string, callback) => {
                    if (!/^((1[3-9]\d{9})|(\d{3,4}-\d{7,10}))$/.test(value)) return callback('电话号码要合规');
                    return callback();
                  },
                },
              ],
            })(<Input placeholder="请输入电话号码" />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="年级">
            {getFieldDecorator('grade', {
              initialValue: get(props.currentStudentInfo, 'grade', undefined)
                ? toString(get(props.currentStudentInfo, 'grade'))
                : undefined,
            })(
              <Select placeholder="请选择年级">
                <Option value="1">大一</Option>
                <Option value="2">大二</Option>
                <Option value="3">大三</Option>
                <Option value="4">大四</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="班级">
            {getFieldDecorator('classNumber', {
              initialValue: get(props.currentStudentInfo, 'classNumber'),
            })(<InputNumber placeholder={'请输入班级'} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              initialValue: get(props.currentStudentInfo, 'email'),
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                },
              ],
            })(<Input placeholder="请输入邮箱地址" />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="家庭地址">
            {getFieldDecorator('address', {
              initialValue: get(props.currentStudentInfo, 'address'),
            })(<Input placeholder="请输入家庭地址" />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="出生日期">
            {getFieldDecorator('birthday', {
              initialValue: get(props.currentStudentInfo, 'birthday') ? moment(get(props.currentStudentInfo, 'birthday')) : undefined,
            })(<DatePicker style={{ width: '100%' }} placeholder="请选择出生日期" />)}
          </Form.Item>
        </Col>
      </Row>

      <div className={styles['submit-container']}>
        <Button type="primary" onClick={handleSubmit}>
          {props.userType === FormType.update ? '更新' : '添加'}
        </Button>

        {props.userType === FormType.add && (
          <Button type="danger" ghost className="ml24" onClick={handleRest}>
            重置
          </Button>
        )}
      </div>
    </Form>
  );
};

export default (Form.create()(StudentForm) as unknown) as FC<StudentFormWrapperProps>;
