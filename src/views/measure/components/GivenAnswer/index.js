import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Checkbox} from "antd";
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
        }


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




    addItem=(values)=>{
        let givenAnswer=values.givenAnswer;

        if (!Util.isValidNum(givenAnswer)) {
            Util.warning("请输入合法数字！")
            return;
        }

        let url = 'question/update'

        updateQuestion({
            id: this.state.item.id,
            givenAnswer,
            measureId:this.state.measureId
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
                title="设置特定答案"
                width={600}
                visible={true}
                onOk={this.check}
                onCancel={this.freshParent}
            >
                <Form ref={this.modalRef}
                      labelCol={{span: 6}}
                      onFinish={this.addItem}

                >
                    <Form.Item name="givenAnswer" label="特定答案" rules={[{required: true, message: '请输入特定答案'}]}>
                        <Input placeholder={"请输入特定答案值"}/>
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}

export default Index;