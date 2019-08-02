import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.getItem('DivisionManagerList')){
            let array=JSON.parse(localStorage.getItem('DivisionManagerList'))

            return array;
        }else{
            return []
        }

    }

    static add(obj){

        if(!obj.phone){
            alert("手机号不能为空！");
            return;
        }

        if(!obj.sex){
            alert("性别不能为空！");
            return;
        }

        if(!obj.email){
            alert("邮箱不能为空！");
            return;
        }

        if(!obj.birthday){
            alert("出生日期不能为空！");
            return;
        }

        obj.id=Util.uuid()

        let array=Model.getList()
        array.push(obj)

        localStorage.setItem("DivisionManagerList",JSON.stringify(array))

    }

    static delete(id){
        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===id){
                array.splice(i,1)
                break;
            }
        }
        localStorage.setItem("DivisionManagerList",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("DivisionManagerList",JSON.stringify(array))
    }



    


}


export {Model as DivisionManager}
