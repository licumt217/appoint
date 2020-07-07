import React, {Component} from 'react';
import {getQuestionList, getMeasureById} from "../../../http/service";
import store from "../../../store";
import {Col, Row} from "antd";
import Header from '../components/Header'
import QuestionDetailModal from '../components/QuestionDetailModal'
import QuestionDisplay from '../components/QuestionDisplay'
import QuestionOperate from '../components/QuestionOperate'
import GivenAnswer from '../components/GivenAnswer'
import SetLieTeam from '../components/SetLieTeam'

class Index extends Component {


    constructor(props) {
        super(props);

        this.measureId = this.props.location.state.measureId,
            this.state = {
                questionList: [],
                originalQuestionList: [],
                lieObjIndex: {},
                measureId: this.props.location.state.measureId,
                user_id: this.props.location.state.user_id,
                formItem: {
                    title: '',
                    items: []
                },
                isShowQuestionDetailModal: false,
                isShowGivenAnswerModal: false,
                isShowLieTeamModal: false,
                givenAnswerItem: {},
                questionType: 0,
                isEdit: false,
                currentItem: {}
            }
    }


    componentDidMount() {
        this.init()
    }

    init = () => {
        this.getList()
        this.getMeasureById()
    }

    getList = () => {
        getQuestionList({
            measureId: this.measureId
        }).then(data => {

            //获取测谎对
            let lieObj = {}
            let questionList = data.data;
            for (let i = 0; i < questionList.length; i++) {

                if (questionList[i].type === '5') {
                    let uuid = questionList[i].lieDetect
                    if (uuid && lieObj[uuid]) {
                        let lieObjIndex = this.state.lieObjIndex
                        lieObjIndex[questionList[i].id] = lieObj[uuid]
                        lieObjIndex[lieObj[uuid]["id"]] = questionList[i]

                        this.setState({
                            lieObjIndex
                        })
                    } else {
                        lieObj[uuid] = questionList[i]
                    }
                }


                if (questionList[i].answer && questionList[i].type !== '3' && questionList[i].answer && questionList[i].type !== '4') {
                    questionList[i].answer = JSON.parse(questionList[i].answer)
                }

                if (questionList[i].type === '3' || questionList[i].type === '4') {
                    if (questionList[i].children.length > 0) {
                        questionList[i].answer = JSON.parse(questionList[i].children[0].answer)
                    }
                    if (questionList[i].type === '4') {

                        if (questionList[i].children && questionList[i].children.length > 0) {
                            for (let j = 0; j < questionList[i].children.length; j++) {

                                if (questionList[i].children[j]["answer"]) {
                                    questionList[i].children[j]["answer"] = JSON.parse(questionList[i].children[j]["answer"])
                                }
                            }
                        }
                    }
                    if (questionList[i].rule) {
                        questionList[i].rule = JSON.parse(questionList[i].rule)
                        questionList[i].ruleSwitch = true
                    } else {
                        questionList[i].rule = {}
                    }


                }
            }

            this.setState({
                questionList: questionList,
                originalQuestionList: data.data,
            })

            console.log(this.state.questionList.length)

        })
    }

    getMeasureById = () => {
        getMeasureById({
            id: this.measureId
        }).then(data => {

            this.setState({
                formItem: data.data[0]
            })

            this.ruleDataListOfNewParent = this.state.formItem.factor_relation ? JSON.parse(this.state.formItem.factor_relation) : []
            for (let i = 0; i < this.ruleDataListOfNewParent.length; i++) {
                this.ruleDataListOfNewParent[i].name = this.ruleDataListOfNewParent[i].fathor.factorName
            }

        })
    }

    editQuestion = (question) => {
        this.setState({
            isShowQuestionDetailModal: true,
            questionType: question.type,
            isEdit: true,
            currentItem: question
        })
    }

    showQuestionDetailModal = (type) => {

        this.setState({
            isShowQuestionDetailModal: true,
            questionType: type,
            isEdit: false,
            currentItem: null
        })

    }

    closeQuestionDetailModal = () => {
        this.setState({
            isShowQuestionDetailModal: false
        })
        this.init()
    }

    showSetGivenAnswerModal = (item) => {

        this.setState({
            isShowGivenAnswerModal: true,
            givenAnswerItem: item
        })

    }

    closeSetGivenAnswerModal = () => {
        this.setState({
            isShowGivenAnswerModal: false
        })
        this.init()
    }

    showSetLieTeamModal = (item) => {

        this.setState({
            isShowLieTeamModal: true,
            currentItem: item
        })

    }

    closeSetLineTeamModal = () => {
        this.setState({
            isShowLieTeamModal: false
        })
        this.init()
    }


    back = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                {
                    this.state.isShowQuestionDetailModal ?
                        <QuestionDetailModal
                            questionType={this.state.questionType}
                            questionList={this.state.questionList}
                            isEdit={this.state.isEdit}
                            data={this.state.currentItem}
                            onClose={this.closeQuestionDetailModal}
                            measureId={this.measureId}
                        />
                        :
                        null
                }

                {
                    this.state.isShowGivenAnswerModal ?
                        <GivenAnswer
                            item={this.state.givenAnswerItem}
                            onClose={this.closeSetGivenAnswerModal}
                            measureId={this.measureId}
                        />
                        :
                        null

                }

                {
                    this.state.isShowLieTeamModal ?
                        <SetLieTeam
                            isShow={this.state.isShowLieTeamModal}
                            item={this.state.currentItem}
                            questionList={this.state.questionList}
                            onClose={this.closeSetLineTeamModal}
                            measureId={this.measureId}
                        />
                        :
                        null

                }


                <Header
                    user_id={this.state.user_id}
                    onBack={this.back}
                    onShowQuestionDetailModal={this.showQuestionDetailModal}
                />
                <div>
                    <div style={{textAlign: 'center', margin: '1.2em auto'}}>
                        <h1>{this.state.formItem.name}</h1>
                    </div>

                    <div>
                        {
                            this.state.questionList.map((item, index) => {
                                return <Row key={index}>
                                    <Col span={13}>
                                        <QuestionDisplay
                                            key={item.id}
                                            lieObjIndex={this.state.lieObjIndex}
                                            item={item}
                                        />
                                    </Col>
                                    <Col span={11}>
                                        {
                                            this.state.user_id===store.getState().user_id ?
                                                <QuestionOperate
                                                    measureId={this.state.measureId}
                                                    questionList={this.state.questionList}
                                                    originalQuestionList={this.state.originalQuestionList}
                                                    item={item}
                                                    index={index}
                                                    editQuestion={this.editQuestion}
                                                    init={this.init}
                                                    showSetLieTeamModal={this.showSetLieTeamModal}
                                                    showSetGivenAnswerModal={this.showSetGivenAnswerModal}
                                                />
                                                : null
                                        }

                                    </Col>
                                </Row>
                            })
                        }


                    </div>
                </div>


            </div>
        );
    }
}

export default Index;
