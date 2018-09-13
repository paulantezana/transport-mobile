import React, { PureComponent, Fragment } from 'react';
import styles from './index.scss';
import { Table, Alert } from 'antd';
import { Resizable } from 'react-resizable';

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;
  
    if (!width) {
        return <th {...restProps} />;
    }
  
    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};


class StandardTable extends PureComponent {
    constructor(props){
        super(props)
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange (pagination, filters, sorter) {
        const { onChange } = this.props;
        onChange(pagination, filters, sorter);
    };
    
    render(){
        const {
            dataSource,
            loading,
            columns,
            rowKey,
            rowSelection,
            pagination,
            rowClassName,
            components,
            minWidth = '700',
        } = this.props;


        const customHeaderComponents = {
            header: {
                cell: ResizeableTitle,
            },
        };

        const handleResize = index => (e, { size }) => {
            this.setState(({ columns }) => {
                const nextColumns = [...columns];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width,
                };
                return { columns: nextColumns };
            });
        };


        const newColumns = columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: handleResize(index),
            }),
        }));

        const newComponents = {...customHeaderComponents, ...components}

        return (
            <div className={styles.standardTable}>
                {/* <div className={styles.tableAlert}>
                    <Alert
                        message = {
                            <Fragment>
                                <a  style={{ marginLeft: 24 }}> vaciado</a>
                            </Fragment>
                        }
                        type="info"
                        showIcon
                    />
                </div> */}
                
                <Table
                    loading={loading}
                    rowKey={rowKey || 'key'}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    components={components}
                    columns={columns}
                    size="small"
                    style={{minWidth: `${minWidth}px`}}
                    bordered
                    rowClassName={rowClassName}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default StandardTable;