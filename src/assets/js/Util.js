const QRCode = require('qrcode')
class Util{


    /**
     * 判断给定字符是否是中文
     * @param temp
     * @returns {Boolean}
     */
    static isChinese (s) {
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
    static isEnglish (value) {
        var str = /^[A-Za-z]*$/
        var flag = false
        if (str.test(value)) {
            flag = true
        }
        return flag
    }

    static isValidNum(value){

        var str = /^(-|\+)?\d+$/
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
    static isAllNum (p) {
        var re = /^\d*$/
        return re.test(p)
    }
    /**
     * 验证手机号
     */
    static isValidPhone (p) {
        var re = /^1\d{10}$/
        return re.test(p)
    }
    /**
     * 验证身份证号
     */
    static isValidID (p) {
        p = String(p).toUpperCase()
        var re = /(^\d{15}$)|(^\d{17}([0-9]|X$))/
        return re.test(p)
    }
    /**
     * 验证邮箱地址合法性
     * @param temp
     * @returns {Boolean}
     */
    static isValidEmail (s){
        var re=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return re.test(s);
    }

    /**
     * 下载图片
     * @param content 图片的base64编码
     * @param filename
     */
    static downloadImgByBase64(content, fileName) {
        var base64ToBlob = function (code) {
            let parts = code.split(';base64,');
            let contentType = parts[0].split(':')[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], {
                type: contentType
            });
        };
        let aLink = document.createElement('a');
        let blob = base64ToBlob(content); //new Blob([content]);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    }

    /**
     * 将给定链接生成二维码同时下载
     * @param link
     * @param fileName
     */
    static downloadQrCodeWithLink(link, fileName) {
        let dom = document.createElement('canvas')

        QRCode.toCanvas(dom, link, (error, data) => {

            if (error) {
                console.error(error, '下载二维码图片异常')
            } else {
                Util.downloadImgByBase64(data.toDataURL(), fileName)
            }

        })
    }

    static downloadExcel(res,fileName){
        let blob = res.data
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = (e) => {
            let a = document.createElement('a')
            a.download = fileName
            a.href = e.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }

    static clone(obj){
        return JSON.parse(JSON.stringify(obj))
    }

    /**
     * 用户组二维码地址
     * @param id
     * @returns {string}
     */
    static generateQrcodeUrlWithGroupId(id){
        let url=`${window.location.protocol}//${window.location.host}/questionmobile/#/user/login?userGroupId=${id}`
        return url;
    }

    static uuid(){
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

    /**
     * 数组转对象
     * @param array
     * @param key
     */
    static array2Object(array,key='id'){
        let obj={}

        array.forEach(item=>{
            obj[item[key]]=item;
        })

        return obj;
    }





}

Util.pageSize=2;

Util.questionScoreArray=[0,1,2,3,4,5,6,7]

export {Util}
