import {Util} from '../js/Util'

class Model{


    static getList () {

        if(localStorage.getItem('EthicsNoticeList')){
            let array=JSON.parse(localStorage.getItem('EthicsNoticeList'))

            return array;
        }else{
            return []
        }

    }

    static add(obj){
        if(!obj.therapistId){
            alert("咨询师不能为空！");
            return;
        }

        if(!obj.content){
            alert("公告内容不能为空！");
            return;
        }

        if(!obj.showManner){
            alert("显示方式不能为空！");
            return;
        }

        if(obj.showManner==='2'){
            if(!obj.endDate){
                alert("截止日期不能为空！");
                return;
            }
        }

        obj.id=Util.uuid()

        obj.addDate=new Date()

        let array=Model.getList()
        array.push(obj)

        localStorage.setItem("EthicsNoticeList",JSON.stringify(array))

    }

    static delete(id){
        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===id){
                array.splice(i,1)
                break;
            }
        }
        localStorage.setItem("EthicsNoticeList",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("EthicsNoticeList",JSON.stringify(array))
    }



    


}


export {Model as EthicsNotice}
