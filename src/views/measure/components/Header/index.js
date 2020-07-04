import React, {Component} from 'react';
import {Button, Col, Row, Space} from "antd";
import store from "../../../../store";
import Util from "../../../../assets/js/Util";
import {updateMeasure} from "../../../../http/service";


class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQuery:false,
            status : '',
            measureId : null,
            role:'',
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.isQuery!==this.state.isQuery){
            this.setState({
                isQuery:nextProps.isQuery
            })
        }
        if(nextProps.status!==this.state.status){
            this.setState({
                status:nextProps.status
            })
        }
        if(nextProps.measureId!==this.state.measureId){
            this.setState({
                measureId:nextProps.measureId
            })
        }

        if(nextProps.role!==this.state.role){
            this.setState({
                role:nextProps.role
            })
        }
        return true;
    }

    showQuestionDetailModal=(type)=> {

        this.props.onShowQuestionDetailModal(type)

    }



    //提交后量表状态设置为完成，只有完成了才能设置计算规则
    commit=()=>{
        Util.confirm({
            title: '提交后内容将无法修改，您确定提交吗？',
            content: '',
            onOk: () => {
                updateMeasure({
                    id: this.state.measureId,
                    status: '1'
                }).then(data => {
                    Util.success("提交成功！")

                    this.props.onCommit();
                })
            },
            onCancel: () => {
            }
        });

    }

    render() {
        return (
            <Row >
                <Col span={4}>
                    <Button type="default" onClick={this.props.onBack}>返回</Button>
                </Col>
                {
                    this.state.role===store.getState().role ?
                        <Col span={20} style={{textAlign:'right'}}>
                            {
                                this.state.isQuery ?
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
                                        {
                                            this.state.status !== '1' ?
                                                <Button type="dashed" onClick={this.commit}>提交</Button>
                                                :
                                                null
                                        }
                                        <Button type="danger">已完成</Button>
                                    </Space>
                                    :
                                    null
                            }
                        </Col>
                        :
                        null
                }

            </Row>
        );
    }
}

export default Index;
