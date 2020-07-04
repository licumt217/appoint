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
                            <Col span={20} offset={1} style={{marginBottom: '20px'}}>
                                <div>{this.state.item.name}</div>
                                <Input.TextArea rows={3}/>
                            </Col>
                        )
                        :
                        (
                            // 指导语
                            this.state.item.type === '1' ?
                                (
                                    <Col span={20} offset={1} style={{marginBottom: '20px'}}>
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
                                            <Col span={20} offset={1} style={{marginBottom: '20px'}}>
                                                <div style={{marginBottom: "2px"}}>
                                                    {(this.state.item.questionIndex) + '、' + this.state.item.name}
                                                </div>
                                                <Radio.Group>
                                                    {
                                                        this.state.item.answer.map((item, index) => {
                                                            return <Radio key={index} style={radioStyle} value={index}>
                                                                {item.key}
                                                            </Radio>
                                                        })
                                                    }

                                                </Radio.Group>


                                            </Col>
                                        )
                                        :
                                        (
                                            // 矩阵
                                            this.state.item.type === '3' ?
                                                (
                                                    <Col span={20} offset={1} style={{marginBottom: '20px'}}>
                                                        <div style={{marginBottom: "2px"}}>
                                                            {(this.state.item.questionIndex) + '、' + this.state.item.name}
                                                        </div>
                                                        {
                                                            this.state.item.children.map((child, childIndex) => {
                                                                return <div key={childIndex} style={{marginLeft:'1em'}}>
                                                                    <p>{((childIndex + 1)) + '、' + child.name}</p>
                                                                    <Radio.Group>
                                                                        {
                                                                            this.state.item.answer.map((item, index) => {
                                                                                return <Radio key={index} style={radioStyle}
                                                                                              value={index}>
                                                                                    {item.key}
                                                                                </Radio>
                                                                            })
                                                                        }

                                                                    </Radio.Group>
                                                                </div>
                                                            })
                                                        }

                                                    </Col>
                                                )
                                                :
                                                (

                                                    // 多媒体
                                                    this.state.item.type === '4' ?
                                                        (
                                                            <Col span={20} offset={1} style={{marginBottom: '20px'}}>
                                                                <div style={{marginBottom: "2px"}}>
                                                                    {(this.state.item.questionIndex) + '、' + this.state.item.name}
                                                                </div>
                                                                {
                                                                    Util.suffixArrayOfMusic.indexOf(this.state.item.url.split('.')[this.state.item.url.split('.').length-1])>-1?
                                                                        <audio controls src={Util.backendUrl+this.state.item.url}>
                                                                            您的浏览器不支持 audio 标签。
                                                                        </audio>
                                                                        :
                                                                        <img style={{maxHeight: "10em"}} src={Util.backendUrl+this.state.item.url}/>
                                                                }
                                                                {
                                                                    this.state.item.children.map((child, childIndex) => {
                                                                        return <div key={childIndex} style={{marginLeft:'1em'}}>
                                                                            <p>{((childIndex + 1)) + '、' + child.name}</p>
                                                                            <Radio.Group>
                                                                                {
                                                                                    this.state.item.answer.map((item, index) => {
                                                                                        return <Radio key={index} style={radioStyle}
                                                                                                      value={index}>
                                                                                            {item.key}
                                                                                        </Radio>
                                                                                    })
                                                                                }

                                                                            </Radio.Group>
                                                                        </div>
                                                                    })
                                                                }

                                                            </Col>
                                                        )
                                                        :
                                                        (

                                                            // 测谎
                                                            this.state.item.type === '5' ?
                                                                (
                                                                    <Col span={20} offset={1} style={{marginBottom: '20px'}}>
                                                                        <div style={{marginBottom: "2px"}}>
                                                                            {(this.state.item.questionIndex)+'、'+this.state.item.name}<span style={{color:'#19be6b'}}>(与条目{this.state.lieObjIndex[this.state.item.id]["questionIndex"]}为测谎对)</span>
                                                                        </div>
                                                                        <Radio.Group>
                                                                            {
                                                                                this.state.item.answer.map((item, index) => {
                                                                                    return <Radio key={index} style={radioStyle} value={index}>
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
