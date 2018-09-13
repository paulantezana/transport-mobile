import React, { Component } from "react";
import { connect } from 'dva';
import { Button, Form, Input, InputNumber } from 'antd';

const SettingForm = Form.create()(
    class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                loading: false,
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(e){
            e.preventDefault();
            const { setting } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.props.dispatch({
                        type: "global/updateSetting",
                        payload: { ...values, id: setting.id },
                    })
                }
            });
        }

        render(){
            const { getFieldDecorator } = this.props.form;
            const { setting } = this.props;
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item hasFeedback label="RUC" help="RUC de la empresa">
                        {getFieldDecorator('identification', {
                            initialValue: setting.identification,
                            rules: [
                                { required: true, message: '¡Por favor ingrese su identification!' },
                                { pattern: /^[0-9]{11}$/, message: '¡Ingrese una identification válido!' }
                            ],
                        })(
                            <Input placeholder="RUC"/>
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback label="Email" help="Email de la empresa">
                        {getFieldDecorator('email', {
                            initialValue: setting.email,
                            rules: [
                                { type: 'email', message: '¡Ingrese un correo valido!' },
                                { required: true, message: '¡Por favor ingrese su correo!' }
                            ],
                        })(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback label="Nombre de la empresa" help="Nombre de la empresa">
                        {getFieldDecorator('company', {
                            initialValue: setting.company,
                            rules: [{ required: true, message: '¡Ingrese un nombre válido!' }],
                        })(
                            <Input placeholder="Nombre de la empresa"/>
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback label="Dirección completa" help="Ubicacion geografica de la empresa">
                        {getFieldDecorator('address', {
                            initialValue: setting.address,
                        })(
                            <Input placeholder="Dirección completa"/>
                        )}
                    </Form.Item>
                    <Form.Item label="Item" help="Número de items a mostrar en cada página de una tabla">
                        {getFieldDecorator('item', {
                            initialValue: setting.item,
                            rules: [
                                { pattern: /^([3-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/, message: '¡Solo se permiten valores numéricos de 3 a 255!' },
                                { required: true, message: '¡Por favor ingrese un número!' }
                            ],
                        })(
                            <InputNumber min={3} max={255} step={1}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Guardar cambios</Button>
                    </Form.Item>
                </Form>
            )
        }
    }
)

const mapStateToProps = ({global}) => {
    return {
        setting: global.setting,
    }
}

export default connect(mapStateToProps)(SettingForm);