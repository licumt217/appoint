

let SEX={
    male:"男",
    female:"女"
}



/**
 * 伦理公告显示类型
 * @type {{"0": string, "1": string, "2": string}}
 */
let NOTICE_SHOW_TYPE={
    0:'不显示',
    1:'永久显示',
    2:'一段时间显示'
}

/**
 * 咨询师收费方式列表
 * @type {{"0": string, "1": string, "2": string}}
 */
let FEE_TYPE_LIST=[
    {
        key:0,
        desc:'咨询前每单单次收费',
    },
    {
        key:1,
        desc:'咨询后每单单次收费',
    },
    {
        key:2,
        desc:'咨询后按月收费',
    },

]

export {SEX,NOTICE_SHOW_TYPE,FEE_TYPE_LIST}