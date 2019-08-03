import {Util} from '../js/Util'


let a=[{
    roomId:'1',
    year:'2019',
    month:'6',
    day:'1',
    period:1
}]
class Model{


    static getList () {

        if(localStorage.getItem('RoomCanNotUseState')){
            let array=JSON.parse(localStorage.getItem('RoomCanNotUseState'))

            return array;
        }else{
            return []
        }

    }

    static getListByYearAndMonth (roomId,year,month) {

        if(localStorage.getItem('RoomCanNotUseState')){
            let array=JSON.parse(localStorage.getItem('RoomCanNotUseState'))

            let returnArray=[]

            array.forEach(item=>{
                if(item.roomId===roomId && item.year===year && item.month===month){
                    returnArray.push(item)
                }
            })

            return returnArray;
        }else{
            return []
        }

    }

    static add(obj){

        if(!obj.roomId){
            alert("房间不能为空！");
            return;
        }
        if(!obj.year){
            alert("年份不能为空！");
            return;
        }

        if(!obj.month){
            alert("月份不能为空！");
            return;
        }

        if(!obj.day){
            alert("天不能为空！");
            return;
        }

        if(!obj.period){
            alert("时间段不能为空！");
            return;
        }



        obj.id=Util.uuid()

        let array=Model.getList()
        array.push(obj)

        localStorage.setItem("RoomCanNotUseState",JSON.stringify(array))

    }

    static delete(id){
        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===id){
                array.splice(i,1)
                break;
            }
        }
        localStorage.setItem("RoomCanNotUseState",JSON.stringify(array))

    }

    static deleteByRoomIdYearMonthDayPeriod(obj){
        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].roomId===obj.roomId && array[i].year===obj.year && array[i].month===obj.month && array[i].day===obj.day &&array[i].period===obj.period ){
                array.splice(i,1)
                break;
            }
        }
        localStorage.setItem("RoomCanNotUseState",JSON.stringify(array))

    }

    static update(obj){

        let array=Model.getList()

        for(let i=0;i<array.length;i++){
            if(array[i].id===obj.id){
                array.splice(i,1,obj)
                break;
            }
        }

        localStorage.setItem("caseManagerList",JSON.stringify(array))
    }



    


}


export {Model as RoomCanNotUseState}
