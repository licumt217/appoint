import {Util} from '../js/Util'

class Model{


    static getList () {

        let array=[]

        array.push({
            id:Util.uuid(),
            userName:'张三',
            userPhone:'18601965856',
            therapistName:"咨询师1",
            therapistPhone:"18511456987",
            complainDate:"2019/07/22",
            complainContent:"言语辱骂"
        })

        array.push({
            id:Util.uuid(),
            userName:'李四',
            userPhone:'18601965856',
            therapistName:"咨询师1",
            therapistPhone:"18511456987",
            complainDate:"2019/07/22",
            complainContent:"言语辱骂"
        })

        array.push({
            id:Util.uuid(),
            userName:'王五',
            userPhone:'18601965856',
            therapistName:"咨询师1",
            therapistPhone:"18511456987",
            complainDate:"2019/07/22",
            complainContent:"言语辱骂"
        })


        return array;



    }





    


}


export {Model as UserComplain}
