import { Button, Modal, Space, Table, Tag, Skeleton } from 'antd';
import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { connect } from 'react-redux';

import { 
    getCategories, 
    clearCategoryState,
    deleteCategory
} from '../../redux/actions/categoryAction';
import { 
    EditOutlined, 
    DeleteOutlined, 
    ExclamationCircleOutlined 
} from '@ant-design/icons';

const { Column, ColumnGroup } = Table;

class ListCategory extends Component {
    constructor() {
        super();
        this.state = {
            // dataSource: [
            //     { categoryId: 1, name: 'Computer', status: 0 },
            //     { categoryId: 1, name: 'Computer', status: 0 },
            //     { categoryId: 2, name: 'Laptop', status: 1 },
            //     { categoryId: 3, name: 'Usb', status: 0 },
            //     { categoryId: 4, name: 'PC', status: 1 },
            //     { categoryId: 5, name: 'Mouse', status: 0 },
            //     { categoryId: 6, name: 'Server', status: 1 },
            // ],
            category: {},
        };
    }
    componentDidMount =() => {
        this.props.getCategories();
        console.log('did Mount');
    }
    componentWillUnmount = () => {
        this.props.clearCategoryState();
        console.log('will unmount');   
    }
    editCategory = (category) => {
        console.log(category);
    };
    deleteCategory = (id) => {
        Modal.confirm({
            title: 'Are you sure delete this category?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteCategory(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    openDeleteConfirmModal = (category) => {
        this.setState({ ...this.state, category: category });

        console.log(category);
        const message = 'Do you want to delete the category ' + category.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteCategory,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };
    render() {
        const { navigate } = this.props.router;
        const { categories , isLoading } = this.props;
        if (isLoading) {
            return (<>
                    <ContentHeader navigate={navigate} title="List Categories" className="site-page-header"></ContentHeader>
                    <Skeleton active />
                   </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="List Categories" className="site-page-header"></ContentHeader>
                <Table dataSource={categories} size="small" rowKey="id">
                    <ColumnGroup>
                        <Column
                            title="Category ID"
                            key="id"
                            dataIndex="id"
                            width={40}
                            align="center"
                        ></Column>
                        <Column title="Name" key="name" dataIndex="name"></Column>
                        <Column
                            title="Status"
                            key="status"
                            dataIndex="status"
                            width={80}
                            render={(_, { status }) => {
                                let color = 'volcano';
                                let name = 'In-visible';
                                if (status === 0) {
                                    color = 'green';
                                    name = 'visible';
                                }
                                return <Tag color={color}>{name}</Tag>;
                            }}
                        ></Column>
                        <Column
                            title="Action"
                            key="action"
                            width={150}
                            align="center"
                            render={(_, record) => (
                                <Space size="middle">
                                    <Button
                                        key={record.key}
                                        type="primary"
                                        size="small"
                                        onClick={() => this.editCategory(record)}
                                    >
                                        <EditOutlined style={{ marginRight: 8 }} /> 
                                        Edit
                                    </Button>
                                    <Button
                                        key={record.key}
                                        type="primary"
                                        danger
                                        size="small"
                                        onClick={() => this.deleteCategory(record.id)}
                                    >
                                        <DeleteOutlined style={{ marginRight: 8 }} />
                                        Delete
                                    </Button>
                                </Space>
                            )}
                        ></Column>
                    </ColumnGroup>
                </Table>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getCategories,
    clearCategoryState,
    deleteCategory, // add this line
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ListCategory)
);
