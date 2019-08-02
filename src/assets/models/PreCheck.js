import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.PreCheck){
            return JSON.parse(localStorage.PreCheck)
        }else{
            let array=[]

            array.push({
                id:Util.uuid(),
                userId:'张三',
                userPhone:'18601965856',
                answerDate:"2019/07/22",
                state:'0',//0：未回答；1：已回答
            })

            array.push({
                id:Util.uuid(),
                userId:'李四',
                userPhone:'18601965856',
                answerDate:"2019/07/22",
                state:'1',//0：未回答；1：已回答
            })

            array.push({
                id:Util.uuid(),
                userId:'王五',
                userPhone:'18601965856',
                answerDate:"2019/07/22",
                state:'0',//0：未回答；1：已回答
            })


            localStorage.PreCheck=JSON.stringify(array)

            return array;
        }


    }

    static add(obj){
        if(!obj.userId){
            alert("用户姓名不能为空！");
            return;
        }
        if(!obj.userPhone){
            alert("用户手机号不能为空！");
            return;
        }



        obj.id=Util.uuid()

        obj.addDate=new Date()

        obj.state='0'

        let array=Model.getList()
        array.push(obj)

        localStorage.setItem("PreCheck",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("PreCheck",JSON.stringify(array))
    }



}


export {Model as PreCheck}
