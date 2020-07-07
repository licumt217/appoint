import React, {Component} from 'react';
import {Button, Col, Row, Space} from "antd";
import store from "../../../../store";


class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id:this.props.user_id
        }
    }


    showQuestionDetailModal=(type)=> {

        this.props.onShowQuestionDetailModal(type)

    }


    render() {
        return (
            <Row >
                <Col span={4}>
                    <Button type="default" onClick={this.props.onBack}>返回</Button>
                </Col>
                {
                    this.state.user_id===store.getState().user_id ?
                        <Col span={20} style={{textAlign:'right'}}>
                            <Space>
                                <Button type="primary"
                                        onClick={this.showQuestionDetailModal.bind(this, '1')}>指导语</Button>
                                <Button type="primary"
                                        onClick={this.showQuestionDetailModal.bind(this, '0')}>问答</Button>
                                <Button type="primary"
                                        onClick={this.showQuestionDetailModal.bind(this, '2')}>选择题</Button>
                                <Button type="primary"
                                        onClick={this.showQuestionDetailModal.bind(this, '3')}>矩阵</Button>
                                <Button type="primary"
                                        onClick={this.showQuestionDetailModal.bind(this, '4')}>多媒体矩阵</Button>
                                <Button type="primary"
                                        onClick={this.showQuestionDetailModal.bind(this, '5')}>测谎选择题</Button>
                            </Space>
                        </Col>
                        :
                        null
                }

            </Row>
        );
    }
}

export default Index;
