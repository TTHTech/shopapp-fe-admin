import { PageHeader } from '@ant-design/pro-components';
import { Divider } from 'antd';
import React, { Component } from 'react';

export default class ContentHeader extends Component {
    render() {
        const { navigate, title, className } = this.props;

        return (
            <>
                <PageHeader
                    className={className}
                    style={{ marginLeft: 0 }}
                    title={title}
                    onBack={() => navigate(-1)}
                ></PageHeader>
                <Divider></Divider>
            </>
        );
    }
}
