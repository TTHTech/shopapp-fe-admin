import { Button, Col, Divider, Form, Input, Row, Select, Popconfirm } from 'antd';
import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { connect } from 'react-redux';
import { getCategory, insertCategory, clearCategory, updateCategory } from './../../redux/actions/categoryAction';

class AddOrEditCategory extends Component {
    formRef = React.createRef();
    constructor(props) {
      super(props)
    
      this.state = {
        category: {id: '', name: '', status: 'Visible'},
      }
    }
    componentDidMount = () => {
        const {id} = this.props.router.params;
        if(id){
            this.props.getCategory(id);
        }else{
            this.props.clearCategory();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.category && prevState.category.id !== nextProps.category.id) {
            return { 
                ...prevState,
                category: nextProps.category, 
            }
        } else if(!nextProps.category){ 
            return{
                ...prevState, 
                category: {id: '', name: '', status: 'Visible'},
            };
        }
        return null;
    }
    confirmUpdate = () => {
        console.log('update category');
        this.formRef.current.submit();
    }
    onSubmitForm = (values) => {
        console.log(values);
        const { navigate } = this.props.router;
        const {id} = this.state.category;
        if(!id){
            this.props.insertCategory(values, navigate);
        }else{
            this.props.updateCategory(id, values, navigate);
        }
        
    };
    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const {category} = this.state;
        let title = 'Add New Category';
        if(category.id){
            title = 'Update Category';
        }
        return (
            <div>
                <ContentHeader
                    navigate={navigate}
                    title={title}
                    className="site-page-header"
                ></ContentHeader>
                <Form layout="vertical" className="form" onFinish={this.onSubmitForm} key={category.id} ref={this.formRef}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Category ID" name="categoryId" initialValue={category.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" initialValue={category.name} rules={[{ required: true, min: 2 }]}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Status" name="status" initialValue ={category.status === 'Visible' ? '0' : '1'}>
                                <Select>
                                    <Select.Option value="0"> Visible</Select.Option>
                                    <Select.Option value="1"> InVisible</Select.Option>
                                </Select>
                            </Form.Item>
                            <Divider></Divider>
                            {!category.id && (
                                <Button 
                                htmlType="submit" 
                                type="primary" 
                                style={{ float: 'right' }} 
                                loading={isLoading}
                                >
                                Save
                            </Button>)}
                            {category.id && (
                                <Popconfirm 
                                    title="Are you sure update this category?"
                                    onConfirm={this.confirmUpdate}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                <Button 
                            
                                    type="primary" 
                                    style={{ float: 'right' }} 
                                    loading={isLoading}
                                >
                                    Update
                                </Button>
                                </Popconfirm>   
                            )}
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    category: state.categoryReducer.category,
    isLoading: state.categoryReducer.isLoading,
});

const mapDispatchToProps = {
    insertCategory,
    getCategory,
    clearCategory,
    updateCategory,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditCategory));
