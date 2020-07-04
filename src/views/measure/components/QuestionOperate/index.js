import React, {Component} from 'react';
import Util from "../../../../assets/js/Util";
import {Input, Row, Col, Radio, Button, Space} from "antd";
import {
    PlusOutlined,
    DeleteFilled,
    UpCircleFilled,
    DownCircleFilled,
    StepBackwardFilled,
    StepForwardFilled
} from "@ant-design/icons";
import './index.less'
import {deleteQuestion, updateBatchQuestion, addQuestion, updateQuestion} from "../../../../http/service";

class Index extends Component {

    constructor(props) {
        super(props);

        this.sortArray = ['2', '3', '4', '5']
        this.state = {
            item: this.props.item || {},
            index: this.props.index || 0,
            measureId: this.props.measureId,
            questionList: this.props.questionList || [],
            originalQuestionList: this.props.originalQuestionList || [],
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.questionList) !== JSON.stringify(prevProps.questionList)) {
            this.setState({
                questionList: this.props.questionList
            })
        }

        if (JSON.stringify(this.props.originalQuestionList) !== JSON.stringify(prevProps.originalQuestionList)) {
            this.setState({
                originalQuestionList: this.props.originalQuestionList
            })
        }

        if (this.props.index !== prevProps.index) {
            this.setState({
                index: this.props.index
            })
        }

        if (JSON.stringify(this.props.item) !== JSON.stringify(prevProps.item)) {
            this.setState({
                item: this.props.item
            })
        }
    }

    /**
     * 编辑条目（各种类型的条目）
     * @param item
     */
    editQuestion = (item) => {
        if (item.lieDetect) {
            Util.warning("测谎题无法修改！如需修改请删除后重新添加！")
            return;
        }

        this.props.editQuestion(item);


    }
    getNextQuestionIndex = () => {
        let maxIndex = 0;
        for (let i = 0; i < this.state.questionList.length; i++) {
            let q = this.state.questionList[i];
            if (q.questionIndex) {
                maxIndex++;
            }
        }

        return maxIndex + 1;
    }
    /**
     * 复制条目。矩阵类型的只复制父，不复制子。
     * @param item
     * @param index
     */
    cloneQuestion = (item) => {

        if (item.type === '5') {
            Util.warning("测谎选择题无法复制！")
            return;
        }

        Util.confirm({
            title: '您确认复制吗？',
            content: '',
            onOk: () => {
                item = JSON.parse(JSON.stringify(item))

                delete item.id;
                delete item.createtime;
                delete item.indexSort;

                item.name += '复制';

                if (item.questionIndex !== null) {
                    item.questionIndex = this.getNextQuestionIndex()
                }

                if (item.rule) {
                    item.rule = JSON.stringify(item.rule)
                }

                if (item.children && item.children.length > 0) {
                    for (let i = 0; i < item.children.length; i++) {
                        delete item.children[i].id;
                        delete item.children[i].parentId;
                        delete item.children[i].createtime;
                        if (item.children[i].answer && (typeof item.children[i].answer) === 'object') {
                            item.children[i].answer = JSON.stringify(item.children[i].answer)
                        }

                    }
                }

                if (item.children && item.children.length > 0) {
                    item.children = JSON.stringify(item.children)
                }


                if (item.answer && item.type === '2') {
                    item.answer = JSON.stringify(item.answer)
                }

                addQuestion(item).then((data) => {
                    Util.success("复制成功！")
                    this.freshParent()


                }).catch(error => {
                    Util.error(error)
                })

            },
            onCancel: () => {
            }
        });

    }
    setMust = (item) => {
        if (item.must === '0') {
            item.must = '1'
        } else {
            item.must = '0'
        }

        updateQuestion({
            id: item.id,
            must: item.must,
            measureId: this.state.measureId
        }).then(data => {
            Util.success("修改成功")
            this.freshParent()
        }).catch(err => {
            Util.error(err)
        })
    }
    freshParent = (data) => {
        this.props.init();
    }
    showSetLieTeamModal = (item) => {
        this.props.showSetLieTeamModal(item);
    }
    showSetGivenAnswerModal = (item) => {
        this.props.showSetGivenAnswerModal(item);
    }
    deleteQuestion = (question) => {
        let tip = "您确认删除吗？"
        if (question.type === '5') {
            tip = "该测谎题对应的关联题目也会一并删除，您确认吗？"
        }

        Util.confirm({
            title: tip,
            content: '',
            onOk: () => {
                Util.warning("删除中，请稍等！")
                this.realDelete(question)

                if (question.type === '5') {
                    this.realDelete(this.getQuestionByLieDetect(question))
                }
            },
            onCancel: () => {
            }
        });


    }
    getQuestionByLieDetect = (question) => {
        let obj = {}
        let lieDetect = question.lieDetect
        for (let i = 0; i < this.state.questionList.length; i++) {
            let item = this.state.questionList[i]
            if (item.id !== question.id && item.lieDetect === lieDetect) {
                obj = item;
                break;
            }

        }
        return obj;
    }
    realDelete = (question) => {
        deleteQuestion({
            id: question.id,
            measureId: this.state.measureId
        }).then(() => {
            //如果删除的是2、3，则后续的questionIndex都减少1

            if (question.type === '2' || question.type === '3' || question.type === '4' || question.type === '5') {
                let list = [];

                let questionList = this.state.questionList;
                for (let i = 0; i < questionList.length; i++) {
                    if ((questionList[i].type === '2' || questionList[i].type === '3' || questionList[i].type === '4' || questionList[i].type === '5') && questionList[i].questionIndex > question.questionIndex) {
                        list.push({
                            id: questionList[i].id,
                            questionIndex: --questionList[i].questionIndex

                        })
                    }
                }

                if (list.length > 0) {
                    updateBatchQuestion({
                        values: JSON.stringify(list),
                    }).then(() => {
                        Util.success("删除成功！")
                        this.freshParent()
                    }).catch(error => {
                        Util.error(error)
                    })
                } else {
                    Util.success("删除成功！")
                    this.freshParent()
                }
            } else {
                Util.success("删除成功！")
                this.freshParent()
            }

        }).catch(error => {
            Util.error(error)
        })
    }
    upOrDown = (item, index, opType) => {
        let otherIndex = opType === 'up' ? (index - 1) : (index + 1);
        // 上下货下上两个的order互换下。
        //注意questionIndex的序号也要根据条件来换。除非当前条目和它上边问题的类型都是2、3才需要换

        let originalQuestionList = JSON.parse(JSON.stringify(this.state.originalQuestionList))

        let prev_type = originalQuestionList[otherIndex].type
        let type = originalQuestionList[index].type

        if (this.sortArray.includes(prev_type) && this.sortArray.includes(type)) {
            let sideIndex = originalQuestionList[otherIndex].questionIndex

            originalQuestionList[otherIndex].questionIndex = originalQuestionList[index].questionIndex

            originalQuestionList[index].questionIndex = sideIndex
        }

        let sideIndex = originalQuestionList[otherIndex].indexSort

        originalQuestionList[otherIndex].indexSort = originalQuestionList[index].indexSort

        originalQuestionList[index].indexSort = sideIndex


        Promise.all([updateQuestion({
            id: originalQuestionList[index].id,
            measureId: this.state.measureId,
            indexSort: originalQuestionList[index].indexSort,
            questionIndex: originalQuestionList[index].questionIndex
        }), updateQuestion({
            id: originalQuestionList[otherIndex].id,
            measureId: this.state.measureId,
            indexSort: originalQuestionList[otherIndex].indexSort,
            questionIndex: originalQuestionList[otherIndex].questionIndex
        })]).then(() => {
            Util.success('操作成功')
            this.freshParent()
        }).catch(error => {
            Util.error(error)
        });

    }

    hasQuestionIndexBeforeIndex = (index) => {
        let flag = false;
        for (let i = 0; i < index; i++) {
            let type = this.state.questionList[i].type
            if (this.sortArray.includes(type)) {
                flag = true;
                break
            }
        }
        return flag
    }
    top = (item, index) => {

        let questionList = this.state.questionList

        Util.warning("操作中，请稍等。。")
        //首先indexSort，index之前都变为他们后边的，缓存第一个。将第一个赋值给当前要移动的。

        let topIndexsort = Util.clone(questionList[0]).indexSort

        for (let i = 0; i < index; i++) {
            questionList[i].indexSort = Util.clone(questionList[i + 1]).indexSort
        }

        questionList[index].indexSort = topIndexsort;

        //当前是2、3且当前上边有2、3时才需要操作questionIndex
        let type = questionList[index].type
        if (this.hasQuestionIndexBeforeIndex(index) && this.sortArray.includes(type)) {
            let newList = []

            for (let i = 0; i <= index; i++) {
                let type = questionList[i].type
                if (this.sortArray.includes(type)) {
                    newList.push(questionList[i])
                }
            }

            let topQuestionIndex = Util.clone(newList[0]).questionIndex

            for (let i = 0; i < (newList.length - 1); i++) {
                newList[i].questionIndex = Util.clone(newList[i + 1]).questionIndex
            }

            newList[newList.length - 1].questionIndex = topQuestionIndex;


            for (let i = 0; i < newList.length; i++) {
                for (let j = 0; j <= index; j++) {
                    if (questionList[j].id === newList[i].id) {
                        questionList[j] = newList[i];
                        break;
                    }
                }
            }
        }

        let list = [];

        for (let i = 0; i <= index; i++) {
            let temp = {
                id: questionList[i].id,
                indexSort: questionList[i].indexSort,
                questionIndex: questionList[i].questionIndex
            }
            list.push(temp);
        }

        updateBatchQuestion({
            values: JSON.stringify(list),
        }).then(() => {
            Util.success("操作成功！")
            this.freshParent()
        }).catch(error => {
            Util.error(error)
        })

    }

    hasQuestionIndexAfterIndex = (index) => {
        let flag = false;
        for (let i = (index + 1); i < this.state.questionList.length; i++) {
            let type = this.state.questionList[i].type
            if (this.sortArray.includes(type)) {
                flag = true;
                break
            }
        }
        return flag
    }


    bottom = (item, index) => {

        let questionList = this.state.questionList

        Util.warning("操作中，请稍等。。")
        //首先indexSort，index之前都变为他们后边的，缓存第一个。将第一个赋值给当前要移动的。

        let bottomIndexsort = Util.clone(questionList[questionList.length - 1]).indexSort

        for (let i = (questionList.length - 1); i > index; i--) {
            questionList[i].indexSort = Util.clone(questionList[i - 1]).indexSort
        }

        questionList[index].indexSort = bottomIndexsort;

        //当前是2、3且当前上边有2、3时才需要操作questionIndex
        let type = questionList[index].type
        if (this.hasQuestionIndexAfterIndex(index) && this.sortArray.includes(type)) {
            let newList = []

            for (let i = (questionList.length - 1); i >= index; i--) {
                let type = questionList[i].type
                if (this.sortArray.includes(type)) {
                    newList.push(questionList[i])
                }
            }
            let bottomQuestionIndex = Util.clone(newList[0]).questionIndex

            for (let i = 0; i < (newList.length - 1); i++) {
                newList[i].questionIndex = Util.clone(newList[i + 1]).questionIndex
            }

            newList[newList.length - 1].questionIndex = bottomQuestionIndex;

        }

        let list = [];

        for (let i = index; i < (questionList.length); i++) {
            let temp = {
                id: questionList[i].id,
                indexSort: questionList[i].indexSort,
                questionIndex: questionList[i].questionIndex
            }
            list.push(temp);
        }

        updateBatchQuestion({
            values: JSON.stringify(list),
        }).then(() => {
            Util.success("操作成功！")
            this.freshParent()
        }).catch(error => {
            Util.error(error)
        })

    }


    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div>

                <Space size="middle">
                    <Button size={"small"} type={"primary"}
                            onClick={this.editQuestion.bind(this, this.state.item)}>修改</Button>
                    <Button size={"small"} type={"primary"} style={{marginRight: '1em'}}
                            onClick={this.cloneQuestion.bind(this, this.state.item)}>复制</Button>
                </Space>

                <div style={{display:'inline-block',width:'7em'}}>
                    {
                        this.state.item.type !== '1' ?
                            <Button style={{marginRight: '1em'}} size={"small"} type={"primary"} onClick={this.setMust.bind(this, this.state.item)}>
                                {
                                    this.state.item.must === '0' ? '设为非必填' : '设为必填'
                                }
                            </Button>
                            : null
                    }
                </div>
                <div style={{display:'inline-block',width:'8em'}}>
                {
                    (this.state.item.type === '2' || this.state.item.type === '3' || this.state.item.type === '4') ?
                        <Button style={{marginRight: '1em'}} size={"small"} type={"primary"}
                                onClick={this.showSetGivenAnswerModal.bind(this, this.state.item)}>
                            设置特定答案
                        </Button>
                        : null
                }
                </div>
                    <div style={{display:'inline-block',width:'7em'}}>
                {
                    (this.state.item.type === '2') ?
                        <Button style={{marginRight: '1em'}} size={"small"} type={"primary"}
                                onClick={this.showSetLieTeamModal.bind(this, this.state.item)}>
                            设置测谎对
                        </Button>
                        : null
                }
                    </div>

                <div className='icon-wrapper'>
                    {
                        (this.state.index > 0) ?
                            <UpCircleFilled
                                onClick={this.upOrDown.bind(this, this.state.item, this.state.index, 'up')}/> : null
                    }

                </div>
                <div className='icon-wrapper'>
                    {
                        (this.state.index < (this.state.questionList.length - 1)) ?
                            <DownCircleFilled
                                onClick={this.upOrDown.bind(this, this.state.item, this.state.index)}/> : null
                    }
                </div>
                <div className='icon-wrapper'>
                    {
                        (this.state.index > 0 && this.state.questionList.length > 2) ?
                            <StepBackwardFilled rotate={90}
                                                onClick={this.top.bind(this, this.state.item, this.state.index)}/> : null
                    }
                </div>
                <div className='icon-wrapper'>
                    {
                        (this.state.index < (this.state.questionList.length - 1) && this.state.questionList.length > 2) ?
                            <StepForwardFilled rotate={90}
                                               onClick={this.bottom.bind(this, this.state.item, this.state.index)}/> : null
                    }
                </div>

                <div className='icon-wrapper'>
                    <DeleteFilled className='icon-common' onClick={this.deleteQuestion.bind(this, this.state.item)}/>
                </div>


            </div>
        );
    }
}

export default Index;
