import React, {Component} from 'react';
import Util from "../../../../assets/js/Util";
import {Input, Row, Col, Radio} from "antd";


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lieObjIndex: this.props.lieObjIndex || {},
            item: this.props.item || {},
        }
    }


    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <Row>

                {
                    // 问答
                    this.state.item.type === '0' ?
                        (
                            <Col span={16} offset={4} style={{marginBottom: '20px'}}>
                                <div>{this.state.item.name}</div>
                                <Input.TextArea rows={3}/>
                            </Col>
                        )
                        :
                        (
                            // 指导语
                            this.state.item.type === '1' ?
                                (
                                    <Col span={16} offset={4} style={{marginBottom: '20px'}}>
                                        <div>
                                            <Input.TextArea rows={3} value={this.state.item.name}/>
                                        </div>
                                    </Col>
                                )
                                :
                                (
                                    // 条目
                                    this.state.item.type === '2' ?
                                        (
                                            <Col span={16} offset={4} style={{marginBottom: '20px'}}>
                                                <div style={{marginBottom: "2px"}}>
                                                    {(this.state.item.questionIndex) + '、' + this.state.item.name}
                                                </div>
                                                <Radio.Group>
                                                    {
                                                        this.state.item.answer.map((item, index) => {
                                                            return <Radio style={radioStyle} value={index}>
                                                                {item.key}
                                                            </Radio>
                                                        })
                                                    }

                                                </Radio.Group>


                                                <div>
                                                    <Input.TextArea rows={3} value={this.state.name}/>
                                                </div>
                                            </Col>
                                        )
                                        :
                                        (
                                            // 矩阵
                                            this.state.item.type === '3' ?
                                                (
                                                    <Col span={16} offset={4} style={{marginBottom: '20px'}}>
                                                        <div style={{marginBottom: "2px"}}>
                                                            {(this.state.item.questionIndex) + '、' + this.state.item.name}
                                                        </div>
                                                        {
                                                            this.state.item.children.map((child, childIndex) => {
                                                                return <div style={{marginLeft:'1em'}}>
                                                                    <p>{((childIndex + 1)) + '、' + child.name}</p>
                                                                    <Radio.Group>
                                                                        {
                                                                            this.state.item.answer.map((item, index) => {
                                                                                return <Radio style={radioStyle}
                                                                                              value={index}>
                                                                                    {item.key}
                                                                                </Radio>
                                                                            })
                                                                        }

                                                                    </Radio.Group>
                                                                </div>
                                                            })
                                                        }

                                                        <Input.TextArea rows={3}/>
                                                    </Col>
                                                )
                                                :
                                                (

                                                    // 矩阵
                                                    this.state.item.type === '3' ?
                                                        (
                                                            <Col span={16} offset={4} style={{marginBottom: '20px'}}>
                                                                <div style={{marginBottom: "2px"}}>
                                                                    {(this.state.item.questionIndex) + '、' + this.state.item.name}
                                                                </div>
                                                                {
                                                                    this.state.item.children.map((child, childIndex) => {
                                                                        return <div style={{marginLeft:'1em'}}>
                                                                            <p>{((childIndex + 1)) + '、' + child.name}</p>
                                                                            <Radio.Group>
                                                                                {
                                                                                    this.state.item.answer.map((item, index) => {
                                                                                        return <Radio style={radioStyle}
                                                                                                      value={index}>
                                                                                            {item.key}
                                                                                        </Radio>
                                                                                    })
                                                                                }

                                                                            </Radio.Group>
                                                                        </div>
                                                                    })
                                                                }

                                                                <Input.TextArea rows={3}/>
                                                            </Col>
                                                        )
                                                        :
                                                        (

                                                            // 矩阵
                                                            this.state.item.type === '5' ?
                                                                (
                                                                    <Col span={16} offset={4} style={{marginBottom: '20px'}}>
                                                                        <div style={{marginBottom: "2px"}}>
                                                                            {(this.state.item.questionIndex)+'、'+this.state.item.name}<span style={{color:'#19be6b'}}>(与条目{this.state.lieObjIndex[this.state.item.id]["questionIndex"]}为测谎对)</span>
                                                                        </div>
                                                                        <Radio.Group>
                                                                            {
                                                                                this.state.item.answer.map((item, index) => {
                                                                                    return <Radio style={radioStyle} value={index}>
                                                                                        {item.key}
                                                                                    </Radio>
                                                                                })
                                                                            }

                                                                        </Radio.Group>
                                                                    </Col>
                                                                )
                                                                :
                                                                (

                                                                    null
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                }
            </Row>
        );
    }
}

export default Index;