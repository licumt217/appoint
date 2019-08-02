import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.TherapistComplainList){
            return JSON.parse(localStorage.TherapistComplainList)
        }else{
            let array=[]

            array.push({
                id:Util.uuid(),
                userName:'张三',
                userPhone:'18601965856',
                therapistName:"咨询师1",
                therapistPhone:"18511456987",
                complainDate:"2019/07/22",
                complainContent:"言语辱骂",
                report:'',
                state:'0'
            })

            array.push({
                id:Util.uuid(),
                userName:'李四',
                userPhone:'18601965856',
                therapistName:"咨询师1",
                therapistPhone:"18511456987",
                complainDate:"2019/07/22",
                complainContent:"言语辱骂",
                report:'',
                state:'1'
            })

            array.push({
                id:Util.uuid(),
                userName:'王五',
                userPhone:'18601965856',
                therapistName:"咨询师1",
                therapistPhone:"18511456987",
                complainDate:"2019/07/22",
                complainContent:"言语辱骂",
                report:'',
                state:'2'
            })


            localStorage.TherapistComplainList=JSON.stringify(array)

            return array;
        }


    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("TherapistComplainList",JSON.stringify(array))
    }



}


export {Model as TherapistComplain}
