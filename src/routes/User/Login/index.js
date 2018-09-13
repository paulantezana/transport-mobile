import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './index.scss';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: "mobile/login",
                    payload: values
                })
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className={styles.form}>
                    <Form.Item hasFeedback>
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Por favor ingrese su ID!' }],
                            })(
                                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="ID" />
                            )
                        }
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {
                            getFieldDecorator('key', {
                                rules: [{ required: true, message: 'Por favor ingrese su clave!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Clave"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={loading} htmlType="submit" className={styles.submit}>Ingresar</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const LoginPage = Form.create()(LoginForm)

const mapStateToProps = ({ loading }) => {
    return {
        loading: loading.effects['mobile/login'],
    }
}

export default connect(mapStateToProps)(LoginPage);