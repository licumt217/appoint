import {Util} from '../js/Util'

class Model{


    static getList () {

        let array=[]

        array.push({
            id:Util.uuid(),
            name:'咨询师1',
            date:'2019/01/01',
            revenue:600
        })

        array.push({
            id:Util.uuid(),
            name:'咨询师1',
            date:'2019/05/22',
            revenue:450
        })

        array.push({
            id:Util.uuid(),
            name:'咨询师1',
            date:'2019/07/04',
            revenue:900
        })

        return array;



    }





    


}


export {Model as TherapistRevenue}
