import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Checkbox} from "antd";
import store from "../../../../store";
import Util from "../../../../assets/js/Util";
import {addQuestion, updateQuestion, updateBatchQuestion,addBatchQuestion} from "../../../../http/service";
import Wenda from "./questions/Wenda";
import Zhidaoyu from "./questions/Zhidaoyu";
import Xuanzheti from "./questions/Xuanzheti";
import Matrix from "./questions/Matrix";
import Huang from "./questions/Huang";
import Multi from "./questions/Multi";

class Index extends Component {


    constructor(props) {
        super(props);

        this.modalRef = React.createRef();
        this.position = ''
        this.state = {
            tiaomu:{},
            questionType: this.props.questionType,
            questionList: this.props.questionList,
            isEdit: this.props.isEdit,
            measureId: this.props.measureId,
            data: this.props.data,
        }




    }

    componentDidMount() {
        this.show({
            type: this.state.questionType,
            isEdit: this.state.isEdit,
            data: this.state.data,

        })

    }

    show = (obj) => {

        this.resetItemModalInfo()

        if(obj.data){
            this.setState({
                tiaomu:obj.data
            })
        }

        this.position = ''
    }

    resetItemModalInfo = () => {
        this.file = null;
        this.setState({
            tiaomu:{
                name: '',
                answer: [{
                    name: '',
                    value: 0
                }],
                children: [],
                measureId: this.state.measureId


            }
        })


    }





    back = () => {
        this.props.history.goBack()
    }

    check = () => {

        this.modalRef.current.submit();


    }

    success = () => {
        if (this.state.isEdit) {
            Util.success("修改成功！")
        } else {
            Util.success("新增成功！")
        }

        this.freshParent()
    }

    freshParent = (data) => {
        this.props.onClose();
    }

    hasNoQuestionIndexFromPosition2Bottom = (position) => {
        let flag = false;
        let questionList = this.state.questionList
        for (let i = position; i < questionList.length - 1; i++) {
            if (questionList[i].type === '2' || questionList[i].type === '3' || questionList[i].type === '4' || questionList[i].type === '5') {
                flag = true;
                break;
            }
        }

        return !flag;
    }
    handleOnlyHaveIndexSort = (position) => {
        let temp = Util.clone(this.state.questionList[position + 1]).indexSort;
        for (let i = position + 1; i < this.state.questionList.length - 1; i++) {
            this.state.questionList[i].indexSort = Util.clone(this.state.questionList[i + 1]).indexSort;
        }

        let questionList = this.state.questionList

        questionList[questionList.length - 1].indexSort = temp;

        this.setState({
            questionList
        })
    }

    moveFromBottom2GivenPosition = async (position, callback) => {

        let bottomData = this.state.questionList[this.state.questionList.length - 1]
        let questionList = this.state.questionList;
        if ((bottomData.type === '0' || bottomData.type === '1') || this.hasNoQuestionIndexFromPosition2Bottom(position + 1)) {//只需要换indexSort
            this.handleOnlyHaveIndexSort(position)
        } else {
            this.handleOnlyHaveIndexSort(position)


            let newList = []
            for (let i = position + 1; i < questionList.length; i++) {
                if (questionList[i].type === '2' || questionList[i].type === '3' || questionList[i].type === '4' || questionList[i].type === '5') {
                    newList.push(questionList[i])
                }

            }
            if (newList.length > 0) {

                let temp = Util.clone(newList[0]).questionIndex;

                for (let i = 0; i < newList.length - 1; i++) {
                    newList[i].questionIndex = Util.clone(newList[i + 1]).questionIndex;
                }

                newList[newList.length - 1].questionIndex = temp;

            }
        }

        let last = questionList.pop()
        questionList.splice(position + 1, 0, last)

        this.setState({
            questionList
        })


        if (callback) {
            let list = [];

            for (let i = position + 1; i < (this.state.questionList.length); i++) {
                let temp = {
                    id: this.state.questionList[i].id,
                    indexSort: this.state.questionList[i].indexSort,
                    questionIndex: this.state.questionList[i].questionIndex
                }
                list.push(temp);
            }

            updateBatchQuestion({
                values: JSON.stringify(list),
            }).then(data => {
                callback()
            }).catch(error => {
                Util.error(error)
            })

        }


    }


    handleAfterAdd = (data, callback) => {
        if (this.position || this.position === 0) {
            let questionList = this.state.questionList;
            questionList.push(data)
            this.setState({
                questionList
            })
            this.moveFromBottom2GivenPosition(this.position, callback)
        } else {
            callback()
        }
    }

    getNextQuestionIndex=()=> {
        let maxIndex = 0;
        for (let i = 0; i < this.state.questionList.length; i++) {
            let q = this.state.questionList[i];
            if (q.questionIndex) {
                maxIndex++;
            }
        }

        return maxIndex + 1;
    }


    hasSameValue=(array)=> {
        let set = new Set();
        array.forEach(item => {
            set.add(item.value)
        })

        return set.size < array.length;
    }

    addItem = (values) => {

        this.position=values.position;



        let type = this.state.questionType

        this.setState({
            tiaomu:Object.assign(this.state.tiaomu, values,{type})
        })

        let isEdit=this.state.isEdit

        let method = isEdit ? updateQuestion : addQuestion

        if (type === '0') {//问答

            if (!this.state.tiaomu.name) {
                Util.warning("请输入问答标题！");
                return;
            }

            Util.warning("操作中，请稍等！")
            method(this.state.tiaomu).then((data) => {

                if (isEdit) {
                    this.success()
                } else {
                    this.handleAfterAdd(data.data[0], this.success)
                }


            }).catch(error => {
                Util.error(error)
            })


        } else if (type === '1') { //指导语

            if (!this.state.tiaomu.name) {
                Util.warning("请输入指导语！");
                return
            }
            Util.warning("操作中，请稍等！")
            method(this.state.tiaomu).then((data) => {
                if (isEdit) {
                    this.success()
                } else {
                    this.handleAfterAdd(data.data[0], this.success)
                }
            }).catch(error => {
                Util.error(error)
            })

        } else if (type === '2') {//条目

            if (!this.state.tiaomu.answer || this.state.tiaomu.answer.length === 0) {
                Util.warning("请至少添加一条选项！");
                return
            }

            let answer = []
            for (let i = 0; i < this.state.tiaomu.answer.length; i++) {
                if (!this.state.tiaomu.answer[i].key) {
                    Util.warning("有选项文字未填写，请检查！！");
                    return
                }

                let key = this.state.tiaomu.answer[i].key
                let value = this.state.tiaomu.answer[i].value
                answer.push({
                    key: key,
                    value: value
                })


            }

            let next = () => {
                //此处直接给this.tiaomu.answer赋值，会报错；暂不清楚原因。
                let data = JSON.parse(JSON.stringify(this.state.tiaomu))
                data.answer = JSON.stringify(answer)


                if (isEdit) {
                    method(data).then(() => {
                        this.success()
                    }).catch(error => {
                        Util.error(error)
                    });
                } else {

                    data.questionIndex = this.getNextQuestionIndex();

                    let values = []

                    let tempNameArray = this.state.tiaomu.name.split('\n')

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

                    Util.warning("操作中，请稍等！")

                    addBatchQuestion( {
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
                        Util.error(error)
                    });
                }


            }

            if (this.hasSameValue(this.state.tiaomu.answer)) {
                Util.confirm({
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


            let childrenAnswer = []

            for (let i = 0; i < this.state.tiaomu.answer.length; i++) {

                let key = this.state.tiaomu.answer[i].key
                let value = this.state.tiaomu.answer[i].value
                childrenAnswer.push({
                    key: key,
                    value: value
                })
            }

            let next = () => {
                //因子计算规则开关开的话才判断以下逻辑


                let rule = ''


                let children = this.state.tiaomu.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].type = '2'
                    children[i].answer = JSON.stringify(childrenAnswer)
                    children[i].isReverse = children[i].isReverse?1:0

                }

                let data = JSON.parse(JSON.stringify(this.state.tiaomu))

                data.isParent = 1;
                data.children = JSON.stringify(children);
                data.rule = rule;


                if (!isEdit) {
                    data.questionIndex = this.getNextQuestionIndex();
                }
                Util.warning("操作中，请稍等！")

                method(data).then((data) => {
                    if (isEdit) {
                        this.success()
                    } else {
                        this.handleAfterAdd(data.data[0], this.success)
                    }
                }).catch(error => {
                    Util.error(error)
                });
            }


            if (this.hasSameValue(this.state.tiaomu.answer)) {
                Util.confirm({
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

            let tiaomu=this.state.tiaomu;
            tiaomu.type=type;

            this.setState({
                tiaomu:tiaomu
            })

            if (!this.state.tiaomu.url) {
                Util.warning("请上传多媒体！");
                return
            }

            let next = () => {

                let children = this.state.tiaomu.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].type = '2'
                    children[i].answer = JSON.stringify(children[i].answer)

                }

                let data = JSON.parse(JSON.stringify(this.state.tiaomu))

                data.isParent = 1;
                data.children = JSON.stringify(children);

                if (!isEdit) {
                    data.questionIndex = this.getNextQuestionIndex();
                }
                Util.warning("操作中，请稍等！")
                method(data).then((data) => {
                    if (isEdit) {
                        this.success()
                    } else {
                        this.handleAfterAdd(data.data[0], this.success)
                    }
                }).catch(error => {
                    Util.error(error)
                });
            }


            let sameCount = 0
            for (let i = 0; i < this.state.tiaomu.children.length; i++) {
                if (this.hasSameValue(this.state.tiaomu.children[i].answer)) {
                    sameCount++;
                }
            }

            if (sameCount > 0) {
                Util.confirm({
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



            if(!this.state.tiaomu.answer || this.state.tiaomu.answer.length!==2){
                Util.warning('有且只能有两条选项')
                return;
            }

            let answer = []
            for (let i = 0; i < this.state.tiaomu.answer.length; i++) {


                let key = this.state.tiaomu.answer[i].key
                let value = this.state.tiaomu.answer[i].value
                answer.push({
                    key: key,
                    value: value
                })


            }

            let next = () => {
                //此处直接给this.tiaomu.answer赋值，会报错；暂不清楚原因。
                let data = JSON.parse(JSON.stringify(this.state.tiaomu))
                data.answer = JSON.stringify(answer)


                if (isEdit) {
                    updateQuestion(data).then(() => {
                        this.success()
                    }).catch(error => {
                        Util.error(error)
                    });
                } else {

                    data.questionIndex = this.getNextQuestionIndex();

                    let values = []

                    let tempNameArray = this.state.tiaomu.name.split('\n')

                    let nameArray = []

                    for (let i = 0; i < tempNameArray.length; i++) {
                        if (tempNameArray[i]) {
                            nameArray.push(tempNameArray[i])
                        }
                    }

                    if (nameArray.length !== 2) {
                        Util.warning("只能输入两条标题！！！")
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

                    Util.warning("操作中，请稍等！")
                    addBatchQuestion({
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
                        Util.error(error)
                    });
                }


                this.hide()
            }

            if (this.hasSameValue(this.state.tiaomu.answer)) {
                Util.confirm({
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


        let Question=null;
        let title=null;

        switch (this.state.questionType) {
            case "0":
                Question=Wenda;
                title="问答";
                break;
            case "1":
                Question=Zhidaoyu;
                title="指导语";
                break;
            case "2":
                Question=Xuanzheti;
                title="选择题";
                break;
            case "3":
                Question=Matrix;
                title="矩阵";
                break;
            case "4":
                Question=Multi;
                title="多媒体矩阵";
                break;
            case "5":
                Question=Huang;
                title="测谎选择题";
                break;

        }

        return (
            <Modal
                title={title}
                width={800}
                visible={true}
                onOk={this.check}
                onCancel={this.freshParent}
            >
                <Form ref={this.modalRef}
                      labelCol={{span: 6}}
                      wrapperCol={{span: 18}}
                      onFinish={this.addItem}

                >
                    {
                        !this.state.isEdit ?
                            <Form.Item name="position" label="添加位置" >
                                <Select >
                                    {
                                        this.state.questionList.map((item, index) => {
                                            return <Select.Option key={index}
                                                           value={index}>{(index + 1) + '、' + item.name}</Select.Option>
                                        })
                                    }

                                </Select>
                            </Form.Item>
                            :
                            null
                    }

                    <Question data={this.state.tiaomu} isEdit={this.props.isEdit} form={this.modalRef}/>

                </Form>
            </Modal>
        );
    }
}

export default Index;