import {Modal, message} from 'antd';
import {deleteDivision} from "../../http/service";
import moment from "moment";


class Util {

    constructor() {

    }

    static error(str, duration=3) {
        message.error(str,duration)
    }

    static success(str, duration=3) {
        message.success(str,duration)
    }

    static warning(str, duration=3) {
        message.warning(str,duration)
    }

    static info(str, duration=3) {
        message.info(str,duration)
    }

    static confirm(obj) {
        Modal.confirm({
            title:obj.title||'',
            content:obj.content||'',
            onOk:obj.onOk?obj.onOk:null,
            onCancel:obj.onCancel?obj.onCancel:null,
        })
    }




    /**
     * 判断给定字符是否是中文
     * @param temp
     * @returns {Boolean}
     */
    static isChinese(s) {
        var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
        var flag = true
        if (!patrn.exec(s)) {
            flag = false
        }
        return flag
    }

    /**
     * 验证给定字符是否是A-Za-z之间的英文字母
     */
    static isEnglish(value) {
        var str = /^[A-Za-z]*$/
        var flag = false
        if (str.test(value)) {
            flag = true
        }
        return flag
    }


    /**
     * 是否全是数字
     * @param p
     * @returns
     */
    static isAllNum(p) {
        var re = /^\d*$/
        return re.test(p)
    }

    /**
     * 验证手机号
     */
    static isValidPhone(p) {
        var re = /^1\d{10}$/
        return re.test(p)
    }

    /**
     * 验证身份证号
     */
    static isValidID(p) {
        p = String(p).toUpperCase()
        var re = /(^\d{15}$)|(^\d{17}([0-9]|X$))/
        return re.test(p)
    }

    static isValidNum(value) {

        var str = /^(-|\+)?\d+$/
        var flag = false
        if (str.test(value)) {
            flag = true
        }
        return flag


    }

    /**
     * 验证邮箱地址合法性
     * @param temp
     * @returns {Boolean}
     */
    static isValidEmail(s) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return re.test(s);
    }

    /**
     * 取得url后边的参数
     * @param name
     * @returns
     */
    static getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r !== null) return unescape(r[2])
        return null
    }

    static uuid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }

    /**
     * 数组转对象
     * @param array
     * @param key
     */
    static array2Object(array, key = 'id') {
        let obj = {}

        array.forEach(item => {
            obj[item[key]] = item;
        })

        return obj;
    }

    /**
     * 获取某年某月有多少天
     * @param year
     * @param month 0-11
     * @returns {number}
     */
    static getDaysOfMonth(year, month) {
        month += 1;
        let d = new Date(year, month, 0);
        return d.getDate();
    }

    static fixZero(val) {
        if (val < 10) {
            return '0' + val;
        } else {
            return val;
        }
    }

    static getAppointmentPeriodStr(period) {

        let str = '';
        if(!period){
            return str;
        }
        period.split(',').forEach(item => {
            str += (`${Util.fixZero(item)}:00-${Util.fixZero(item)}:50 `)
        })


        return str;
    }

    /**
     * 将下拉选择后台数据转为下拉列表需要的数组格式
     * @param dataArray
     * @param valueKey
     * @param nameKey
     * @returns {[]}
     */
    static getPopupPickerOptions(dataArray, valueKey, nameKey) {
        let array = [];
        dataArray.forEach(item => {
            array.push({
                value: item[valueKey],
                label: item[nameKey],
            })
        })
        return array;
    }


    static back(){
        window.history.back();
    }

    static getDateFromMoment(dateStr){
        return moment(dateStr).format('yyyy-MM-DD');
    }

    static getRealDateFromMoment(dateStr){
        return new Date(moment(dateStr));
    }

    static getDateTimeFromMoment(dateStr){
        return moment(dateStr).format('yyyy-MM-DD HH:MM:SS');
    }

    static clone(obj) {

        if(!obj){
            return obj;
        }else if (typeof obj === 'object') {
            let returnObj = null
            if (Array.isArray(obj)) {
                returnObj = []
                for (let i = 0; i < obj.length; i++) returnObj.push(obj[i])
            }else if(obj instanceof Date){
                returnObj=new Date(obj.getTime())
            }else {
                returnObj = {}
                for (let key in obj) {
                    returnObj[key] = Util.clone(obj[key])
                }
            }
            return returnObj
        }
        return obj
    }







}
Util.questionScoreArray = [0, 1, 2, 3, 4, 5, 6, 7]

Util.suffixArrayOfMusic = ["mp3", "wave"]

Util.suffixArrayOfPicture = ["jpg", "jpeg", "png"]

Util.backendUrl = location.href.indexOf("localhost") > -1 ? 'http://www.zhuancaiqian.com' : 'http://' + location.hostname


Util.genderOptions = [
    {
        label: '男',
        value: 'male',
    },
    {
        label: '女',
        value: 'female',
    },
];

Util.pageSize = 10;
export default Util
