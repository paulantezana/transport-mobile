import React, { Component } from "react";
import { connect } from "dva";
import { Button, Input, Card } from 'antd';

import styles from './index.scss';
import List from './List';
import ModalForm from './Form';

const Search = Input.Search;

class Mobile extends Component{
    constructor(props){
        super(props);
        this.onQueryAll = this.onQueryAll.bind(this);
    }
    componentDidMount(){
        this.onQueryAll();
    }
    onQueryAll(clear){
        const { dispatch, mobile: {searchText} } = this.props;
        dispatch({
            type: 'mobile/all',
            payload: {
                search: clear ? '' : searchText,
            }
        });
    }
    render(){
        const { dispatch, setting, mobile, loadingAll, loadingUpdate} = this.props;
        const { onQueryAll } = this;
        const {
            list,
            total,
            current,
            searchText,
            currentItem,
        } = mobile;

        const mobileListProps = {
            current,
            total,
            pageSize: setting.item,
            dataSource: list,
            loadingAll: loadingAll,
            loadingUpdate: loadingUpdate,
            onPageChange(page){
                dispatch({
                    type:'mobile/all',
                    payload:{
                        current_page: page,
                        search: searchText,
                    }
                });
            },
            onClear(){
                // Limpiar el campo search text
                dispatch({
                    type: 'mobile/setSearchText',
                    payload: '',
                });
                // Query para mostrar todo los mobileos
                onQueryAll(true);
            },
            onUpdate(param){
                dispatch({
                    type: 'mobile/update',
                    payload: param
                });
            },
            onShowModalEdit(type, currentItem){
                onShowModal(type, currentItem)
            },
            onDelete(param){
                dispatch({
                    type: 'mobile/delete',
                    payload: param,
                });
            },
        }

        const onShowModal = (modalType, currentItem = {})=>{
            dispatch({
                type: 'mobile/showModal',
                payload: { currentItem, modalType },
            });
        }

        const onSearchText = (search)=>{
            dispatch({
                type: 'mobile/setSearchText',
                payload: search
            });
        }

        return (
            <Card bordered={false}>
                <div className={styles.header}>
                    <Button icon="plus" type="primary" onClick={()=>onShowModal('create')}>Nuevo</Button>
                    <Button icon="reload" onClick={()=>this.onQueryAll()}></Button>
                    <Search placeholder="Buscar mobileo" value={searchText} onChange={e=>onSearchText(e.target.value)} onSearch={value => this.onQueryAll()} style={{ width: 200 }}/>
                    <ModalForm/>
                </div>
                <List {...mobileListProps}/>
            </Card>
        )
    }
}

const mapStateToProps = ({mobile, global, loading}) => {
    return {
        mobile,
        setting: global.setting,
        loadingAll: loading.effects['mobile/all'],
        loadingUpdate: loading.effects['mobile/update'],
    }
}

export default connect(mapStateToProps)(Mobile);