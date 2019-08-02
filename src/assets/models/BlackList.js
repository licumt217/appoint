import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.BlackList){
            return JSON.parse(localStorage.BlackList)
        }else{
            let array=[]

            array.push({
                id:Util.uuid(),
                userName:'张三',
                userPhone:'18601965856',
                addDate:"2019/07/22",
                removeDate:"",
                state:'0'
            })

            array.push({
                id:Util.uuid(),
                userName:'李四',
                userPhone:'18601965856',
                addDate:"2019/07/22",
                removeDate:"",
                state:'0'
            })

            array.push({
                id:Util.uuid(),
                userName:'王五',
                userPhone:'18601965856',
                addDate:"2019/07/22",
                removeDate:"",
                state:'1'
            })


            localStorage.BlackList=JSON.stringify(array)

            return array;
        }


    }

    static add(obj){
        if(!obj.userName){
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

        localStorage.setItem("BlackList",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("BlackList",JSON.stringify(array))
    }



}


export {Model as BlackList}
