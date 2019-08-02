import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.getItem('LevelList')){
            let array=JSON.parse(localStorage.getItem('LevelList'))

            return array;
        }else{
            return []
        }

    }

    static add(obj){

        if(!obj.name){
            alert("名称不能为空！");
            return;
        }

        if(!obj.divideRatio){
            alert("分成比例不能为空！");
            return;
        }


        obj.id=Util.uuid()

        let array=Model.getList()
        array.push(obj)

        localStorage.setItem("LevelList",JSON.stringify(array))

    }

    static delete(id){
        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===id){
                array.splice(i,1)
                break;
            }
        }
        localStorage.setItem("LevelList",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("LevelList",JSON.stringify(array))
    }



    


}


export {Model as Level}
