import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.getItem('roomList')){
            let array=JSON.parse(localStorage.getItem('roomList'))

            return array;
        }else{
            return []
        }

    }

    static add(obj){
        if(!obj.name){
            alert("房间名称不能为空！");
            return;
        }
        if(!obj.position){
            alert("房间位置不能为空！");
            return;
        }


        obj.id=Util.uuid()

        let array=Model.getList()
        array.push(obj)

        localStorage.setItem("roomList",JSON.stringify(array))

    }

    static delete(id){
        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===id){
                array.splice(i,1)
                break;
            }
        }
        localStorage.setItem("roomList",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("roomList",JSON.stringify(array))
    }



    


}


export {Model as Room}
