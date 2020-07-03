import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Checkbox, Radio} from "antd";
import store from "../../../../store";
import Util from "../../../../assets/js/Util";
import {addQuestion, updateQuestion, updateBatchQuestion,addBatchQuestion} from "../../../../http/service";

class Index extends Component {


    constructor(props) {
        super(props);

        this.modalRef = React.createRef();
        this.state = {
            measureId: this.props.measureId,
            item: this.props.item,
            filtedQuestionList:this.getFiltedQuestionList(this.props.item,this.props.questionList)
        }


    }

    getFiltedQuestionList=(item,questionList)=>{
        if(questionList&&questionList.length>0){
            var newquestionList=[]
            for(let i=0;i<questionList.length;i++){
                if(questionList[i]["type"]=="2"&&questionList[i]["id"]!=item.id){
                    newquestionList.push(questionList[i])
                }
            }
            return newquestionList
        }
        return []
    }




    back = () => {
        this.props.history.goBack()
    }

    check = () => {

        this.modalRef.current.submit();


    }




    addItem=(values)=>{
        let questionIndex=values.questionIndex;
        let lieRule=values.lieRule;


        let uuid = Util.uuid();
        var lieObj=this.state.filtedQuestionList[questionIndex]
        var params=[]
        params.push({id:this.state.item.id,type:5,lieDetect:uuid,lieRule:lieRule})
        params.push({id:lieObj.id,type:5,lieDetect:uuid,lieRule:lieRule})

        updateBatchQuestion({
            values:JSON.stringify(params)
        }).then(data => {
            Util.success("操作成功！")

            this.props.onClose();

        }).catch(err => {
            Util.error(err)
        })
    }


    render() {


        return (
            <Modal
                title="设置测谎对"
                width={800}
                visible={true}
                onOk={this.check}
                onCancel={this.freshParent}
            >
                <Form ref={this.modalRef}
                      labelCol={{span: 6}}
                      onFinish={this.addItem}

                >
                    <Form.Item name="questionIndex" label="测谎对" rules={[{required: true, message: '请选择'}]}>
                        <Select
                            placeholder="请选择"
                            value={this.state.item.value}
                        >
                            {
                                this.state.filtedQuestionList.map((item, index) => {
                                    return <Select.Option key={index}
                                                          value={index}>{(item.questionIndex)+'、'+item.name}</Select.Option>
                                })
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item name="lieRule" label="计分规则"  rules={[
                        {
                            required: true,
                            message: '请选择计分规则!',
                        },
                    ]}>
                        <Radio.Group>
                            <Radio value={0}>相同选项计分</Radio>
                            <Radio value={1}>不同选项计分</Radio>
                        </Radio.Group>
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}

export default Index;