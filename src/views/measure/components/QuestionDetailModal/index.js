import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Space} from "antd";
import store from "../../../../store";
import Util from "../../../../assets/js/Util";
import {updateMeasure} from "../../../../http/service";


class Index extends Component {
    modalRef = React.createRef();

    constructor(props) {
        super(props);

        this.position = ''
        this.state = {
            isShow: false,
            itemModalType: 0,
            isEdit: false,
            questionList: [],
            formItem:{

            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.isQuery !== this.state.isQuery) {
            this.setState({
                isQuery: nextProps.isQuery
            })
        }

        return true;
    }


    back = () => {
        this.props.history.goBack()
    }

    close = () => {
        this.setState({
            isShow: false,
        })
    }

    check = () => {

        this.modalRef.current.submit();


    }

    addItem = (type) => {

        let url = "question/add"

        if (this.isEdit) {
            url = "question/update"
        }
        this.tiaomu.measureId = this.measureId;
        this.tiaomu.type = type;


        if (type === '0') {//问答

            if (!this.tiaomu.name) {
                this.$Message.warning("请输入问答标题！");
                return;
            }

            this.$Message.warning("操作中，请稍等！")
            this.http.post(url, this.tiaomu).then((data) => {

                if (this.isEdit) {
                    this.success()
                } else {
                    this.handleAfterAdd(data.data[0], this.success)
                }


            }).catch(error => {
                this.$Message.error(error)
            })


        } else if (type === '1') { //指导语

            if (!this.tiaomu.name) {
                this.$Message.warning("请输入指导语！");
                return
            }
            this.$Message.warning("操作中，请稍等！")
            this.http.post(url, this.tiaomu).then((data) => {
                if (this.isEdit) {
                    this.success()
                } else {
                    this.handleAfterAdd(data.data[0], this.success)
                }
            }).catch(error => {
                this.$Message.error(error)
            })

        } else if (type === '2') {//条目

            //
            if (this.isEdit) {
                if (!this.tiaomu.name) {
                    this.$Message.warning("请输入选择题标题！");
                    return
                }
                this.tiaomu.name = this.tiaomu.name
            } else {
                if (!this.tiaomu.name) {
                    this.$Message.warning("请输入选择题标题！");
                    return
                }

            }


            if (this.tiaomu.answer.length === 0) {
                this.$Message.warning("请至少添加一条选项！");
                return
            }

            let answer = []
            for (let i = 0; i < this.tiaomu.answer.length; i++) {
                if (!this.tiaomu.answer[i].key) {
                    this.$Message.warning("有选项文字未填写，请检查！！");
                    return
                }

                let key = this.tiaomu.answer[i].key
                let value = this.tiaomu.answer[i].value
                answer.push({
                    key: key,
                    value: value
                })


            }

            let next = () => {
                //此处直接给this.tiaomu.answer赋值，会报错；暂不清楚原因。
                let data = JSON.parse(JSON.stringify(this.tiaomu))
                data.answer = JSON.stringify(answer)


                if (this.isEdit) {
                    this.http.post(url, data).then(() => {
                        this.success()
                    }).catch(error => {
                        this.$Message.error(error)
                    });
                } else {

                    data.questionIndex = this.getNextQuestionIndex();

                    let values = []

                    let tempNameArray = this.tiaomu.name.split('\n')

                    let nameArray = []

                    for (let i = 0; i < tempNameArray.length; i++) {
                        if (tempNameArray[i]) {
                            nameArray.push(tempNameArray[i])
                        }
                    }

                    for (let i = 0; i < nameArray.length; i++) {
                        let temp = JSON.parse(JSON.stringify(data))
                        temp.name = nameArray[i]
                        temp.questionIndex = temp.questionIndex + i;
                        values.push(temp)
                    }

                    this.$Message.warning("操作中，请稍等！")
                    this.http.post('question/addBatch', {
                        values: JSON.stringify(values)
                    }).then((data) => {
                        data = data.data;
                        if (this.position || this.position === 0) {
                            for (let i = 0; i < data.length; i++) {
                                if (i === data.length - 1) {
                                    this.handleAfterAdd(data[i], this.success)
                                } else {
                                    this.handleAfterAdd(data[i], null)
                                }

                            }
                        } else {
                            this.success()
                        }
                    }).catch(error => {
                        this.$Message.error(error)
                    });
                }


                this.hide()
            }

            if (this.hasSameValue(this.tiaomu.answer)) {
                this.$Modal.confirm({
                    title: '分数值有相同项，确认添加吗？',
                    content: '',
                    onOk: () => {
                        next()


                    },
                    onCancel: () => {
                    }
                });
            } else {
                next();
            }


        } else if (type === '3') {//矩阵

            if (!this.tiaomu.name) {
                this.$Message.warning("请输入矩阵标题！");
                return
            }

            if (this.tiaomu.children.length === 0) {
                this.$Message.warning("请至少添加一条子条目！");
                return
            }

            for (let i = 0; i < this.tiaomu.children.length; i++) {
                if (!this.tiaomu.children[i].name) {
                    this.$Message.warning("有子条目标题未填写，请检查！！");
                    return
                }
            }


            if (this.tiaomu.answer.length === 0) {
                this.$Message.warning("请至少添加一条选项！");
                return
            }

            let childrenAnswer = []

            for (let i = 0; i < this.tiaomu.answer.length; i++) {
                if (!this.tiaomu.answer[i].key) {
                    this.$Message.warning("有选项文字未填写，请检查！！");
                    return
                }

                let key = this.tiaomu.answer[i].key
                let value = this.tiaomu.answer[i].value
                childrenAnswer.push({
                    key: key,
                    value: value
                })
            }

            let next = () => {
                //因子计算规则开关开的话才判断以下逻辑


                let rule = ''

                if (this.tiaomu.ruleSwitch) {
                    if (!this.tiaomu.rule.questionNum) {
                        this.$Message.warning("请选择子条目个数！");
                        return
                    }
                    if (!this.tiaomu.rule.questionType) {
                        this.$Message.warning("请选择操作符！");
                        return
                    }
                    if (!this.tiaomu.rule.ruleValue) {
                        this.$Message.warning("请选择分数值！");
                        return
                    }
                    if (!this.tiaomu.rule.realValue) {
                        this.$Message.warning("请选择符合条件真值！");
                        return
                    }
                    if (!this.tiaomu.rule.falseValue) {
                        this.$Message.warning("请选择符合条件假值！");
                        return
                    }
                    rule = JSON.stringify(this.tiaomu.rule)
                }


                this.hide()

                let children = this.tiaomu.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].type = '2'
                    children[i].answer = JSON.stringify(childrenAnswer)

                }

                let data = JSON.parse(JSON.stringify(this.tiaomu))

                data.isParent = 1;
                data.children = JSON.stringify(children);
                data.rule = rule;


                if (!this.isEdit) {
                    data.questionIndex = this.getNextQuestionIndex();
                }
                this.$Message.warning("操作中，请稍等！")

                this.http.post(url, data).then((data) => {
                    if (this.isEdit) {
                        this.success()
                    } else {
                        this.handleAfterAdd(data.data[0], this.success)
                    }
                }).catch(error => {
                    this.$Message.error(error)
                });
            }


            if (this.hasSameValue(this.tiaomu.answer)) {
                this.$Modal.confirm({
                    title: '分数值有相同项，确认添加吗？',
                    content: '',
                    onOk: () => {
                        next()


                    },
                    onCancel: () => {
                    }
                });


            } else {
                next();
            }


        } else if (type === '4') {
            this.tiaomu = JSON.parse(JSON.stringify(this.radioObject))
            this.tiaomu.measureId = this.measureId;
            this.tiaomu.type = type;
            if (!this.tiaomu.name) {
                this.$Message.warning("请输入多媒体矩阵标题！");
                return
            }

            if (!this.file) {
                this.$Message.warning("请上传多媒体！");
                return
            }

            if (this.tiaomu.children.length === 0) {
                this.$Message.warning("请至少添加一条子条目！");
                return
            }

            for (let i = 0; i < this.tiaomu.children.length; i++) {
                if (!this.tiaomu.children[i].name) {
                    this.$Message.warning("有子条目标题未填写，请检查！！");
                    return
                }
            }


            for (let i = 0; i < this.tiaomu.children.length; i++) {

                let theChildren = this.tiaomu.children[i];

                let answerArray = theChildren.answer;

                if (answerArray.length === 0) {
                    this.$Message.warning("有子条目选项为空，请检查！！");
                    return
                }

                for (let j = 0; j < answerArray.length; j++) {
                    if (!answerArray[j].key) {
                        this.$Message.warning("有子条目选项文字为空，请检查！！");
                        return
                    }
                }
            }


            let next = () => {

                this.hide()

                let children = this.tiaomu.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].type = '2'
                    children[i].answer = JSON.stringify(children[i].answer)

                }

                let data = JSON.parse(JSON.stringify(this.tiaomu))

                data.isParent = 1;
                data.children = JSON.stringify(children);
                data.url = this.fileUrl;

                if (!this.isEdit) {
                    data.questionIndex = this.getNextQuestionIndex();
                }
                this.$Message.warning("操作中，请稍等！")
                this.http.post(url, data).then((data) => {
                    if (this.isEdit) {
                        this.success()
                    } else {
                        this.handleAfterAdd(data.data[0], this.success)
                    }
                }).catch(error => {
                    this.$Message.error(error)
                });
            }


            let sameCount = 0
            for (let i = 0; i < this.tiaomu.children.length; i++) {
                if (this.hasSameValue(this.tiaomu.children[i].answer)) {
                    sameCount++;
                }
            }

            if (sameCount > 0) {
                this.$Modal.confirm({
                    title: '分数值有相同项，确认添加吗？',
                    content: '',
                    onOk: () => {
                        next()
                    },
                    onCancel: () => {
                    }
                });


            } else {
                next();
            }

        } else if (type === '5') {//测谎

            //
            if (this.isEdit) {
                if (!this.tiaomu.name) {
                    this.$Message.warning("请输入测谎选择题标题！");
                    return
                }
                this.tiaomu.name = this.tiaomu.name
            } else {
                if (!this.tiaomu.name) {
                    this.$Message.warning("请输入测谎选择题标题！");
                    return
                }

            }

            if (!this.tiaomu.lieRule) {
                this.$Message.warning("请选择计分规则！");
                return
            }


            let answer = []
            for (let i = 0; i < this.tiaomu.answer.length; i++) {
                if (!this.tiaomu.answer[i].key) {
                    this.$Message.warning("有选项文字未填写，请检查！！");
                    return
                }

                let key = this.tiaomu.answer[i].key
                let value = this.tiaomu.answer[i].value
                answer.push({
                    key: key,
                    value: value
                })


            }

            let next = () => {
                //此处直接给this.tiaomu.answer赋值，会报错；暂不清楚原因。
                let data = JSON.parse(JSON.stringify(this.tiaomu))
                data.answer = JSON.stringify(answer)


                if (this.isEdit) {
                    this.http.post(url, data).then(() => {
                        this.success()
                    }).catch(error => {
                        this.$Message.error(error)
                    });
                } else {

                    data.questionIndex = this.getNextQuestionIndex();

                    let values = []

                    let tempNameArray = this.tiaomu.name.split('\n')

                    let nameArray = []

                    for (let i = 0; i < tempNameArray.length; i++) {
                        if (tempNameArray[i]) {
                            nameArray.push(tempNameArray[i])
                        }
                    }

                    if (nameArray.length !== 2) {
                        this.$Message.warning("只能输入两条标题！！！")
                        return;
                    }

                    let uuid = Util.uuid();
                    for (let i = 0; i < nameArray.length; i++) {
                        let temp = JSON.parse(JSON.stringify(data))
                        temp.name = nameArray[i]
                        temp.lieDetect = uuid;
                        temp.questionIndex = temp.questionIndex + i;
                        values.push(temp)
                    }

                    this.$Message.warning("操作中，请稍等！")
                    this.http.post('question/addBatch', {
                        values: JSON.stringify(values)
                    }).then((data) => {
                        data = data.data;
                        if (this.position || this.position === 0) {
                            for (let i = 0; i < data.length; i++) {
                                if (i === data.length - 1) {
                                    this.handleAfterAdd(data[i], this.success)
                                } else {
                                    this.handleAfterAdd(data[i], null)
                                }

                            }
                        } else {
                            this.success()
                        }
                    }).catch(error => {
                        this.$Message.error(error)
                    });
                }


                this.hide()
            }

            if (this.hasSameValue(this.tiaomu.answer)) {
                this.$Modal.confirm({
                    title: '分数值有相同项，确认添加吗？',
                    content: '',
                    onOk: () => {
                        next()


                    },
                    onCancel: () => {
                    }
                });
            } else {
                next();
            }


        }
    }

    render() {
        return (
            <Modal
                title={this.state.itemModalType === '1' ? '指导语' : this.state.itemModalType === '0' ? '问答' : this.state.itemModalType === '2' ? '选择题' : this.state.itemModalType === '3' ? '矩阵' : this.state.itemModalType === '4' ? '多媒体矩阵' : '测谎选择题'}
                visible={this.state.isShow}
                onOk={this.check}
                onCancel={this.close}
            >
                <Form ref={this.modalRef}
                      onFinish={this.addItem}

                >
                    {
                        !this.state.isEdit ?
                            <Row>
                                <Col span="2" offset="2">
                                    <p title="在所选题目后边添加">添加位置：</p>
                                </Col>
                                <Col span="20">
                                    <Form.Item name="position" label="添加位置">
                                        <Select
                                            value={this.state.formItem.position}
                                        >
                                            {
                                                this.state.questionList.map((item, index) => {
                                                    return <Option key={index}
                                                                   value={index}>{(index + 1) + '、' + item.name}</Option>
                                                })
                                            }

                                        </Select>
                                    </Form.Item>

                                </Col>
                            </Row>
                            :
                            null
                    }

                    {
                        this.state.itemModalType==='0'?
                            <Form.Item name={'name'} label="请输入问答标题" rules={[
                                {
                                    required: true,
                                    message: '标题不能为空!',
                                },
                            ]}>
                                <Input.TextArea rows={5} placeholder={'请输入问答标题'}></Input.TextArea>
                            </Form.Item>
                            :
                            null
                    }



                </Form>
            </Modal>
        );
    }
}

export default Index;