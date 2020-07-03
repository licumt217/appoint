import React, {Component} from 'react';
import {getQuestionList, getMeasureById} from "../../../http/service";
import store from "../../../store";
import {Button, Col, Row, Space} from "antd";
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
                isOperator: false,
                questionList: [],
                originalQuestionList: [],
                lieObjIndex: {},
                measureId: this.props.location.state.measureId,
                // isQuery:(this.props.location.state && this.props.location.state.isQuery==='true')?true:false,
                isQuery: true,
                formItem: {
                    title: '',
                    items: []
                },
                role: '',
                isShowQuestionDetailModal: false,
                isShowGivenAnswerModal: false,
                isShowLieTeamModal: false,
                givenAnswerItem:{},
                questionType: 0,
                isEdit: false,
                currentItem:{}
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
            if (store.getState().role === data.role) {
                this.setState({
                    isOperator: true
                })
            }


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
                role: data.role
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

    showQuestionDetailModal = (type) => {

        // this.$emit('showQuestionDetailModal', type)
        this.setState({
            isShowQuestionDetailModal: true,
            questionType: type,
            isEdit: false
        })

    }

    closeQuestionDetailModal=()=>{
        this.setState({
            isShowQuestionDetailModal:false
        })
        this.init()
    }

    showSetGivenAnswerModal = (item) => {

        this.setState({
            isShowGivenAnswerModal: true,
            givenAnswerItem:item
        })

    }

    closeSetGivenAnswerModal=()=>{
        this.setState({
            isShowGivenAnswerModal:false
        })
        this.init()
    }

    showSetLieTeamModal = (item) => {

        this.setState({
            isShowLieTeamModal: true,
            currentItem:item
        })

    }

    closeSetLineTeamModal=()=>{
        this.setState({
            isShowLieTeamModal:false
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
                    this.state.isShowQuestionDetailModal?
                        <QuestionDetailModal
                            questionType={this.state.questionType}
                            questionList={this.state.questionList}
                            isEdit={this.state.isEdit}
                            onClose={this.closeQuestionDetailModal}
                            measureId={this.measureId}
                        />
                        :
                        null
                }

                {
                    this.state.isShowGivenAnswerModal?
                        <GivenAnswer
                            item={this.state.givenAnswerItem}
                            onClose={this.closeSetGivenAnswerModal}
                            measureId={this.measureId}
                        />
                        :
                        null

                }

                {
                    this.state.isShowLieTeamModal?
                        <SetLieTeam
                            item={this.state.currentItem}
                            questionList={this.state.questionList}
                            onClose={this.closeSetLineTeamModal}
                            measureId={this.measureId}
                        />
                        :
                        null

                }


                <Header
                    role={this.state.role}
                    status={this.state.formItem.status}
                    measureId={this.state.measureId}
                    isQuery={this.state.isQuery}
                    onCommit={this.commit}
                    onShowQuestionDetailModal={this.showQuestionDetailModal}
                />
                <div>
                    <div style={{textAlign: 'center'}}>
                        <h1>{this.state.formItem.name}</h1>
                    </div>

                    <div>
                        {
                            this.state.questionList.map((item, index) => {
                                return <Row key={index}>
                                    <Col span={15}>
                                        <QuestionDisplay key={item.id} lieObjIndex={this.state.lieObjIndex} item={item}/>
                                    </Col>
                                    <Col span={9}>
                                        {
                                            this.state.isOperator?
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
                                                :null
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