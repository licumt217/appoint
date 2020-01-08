import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.PreCheck){
            return JSON.parse(localStorage.PreCheck)
        }else{
            let array=[]



            localStorage.PreCheck=JSON.stringify(array)

            return array;
        }


    }

    static add(obj){
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
