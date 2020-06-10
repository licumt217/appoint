/**
 * 咨询师投诉用户的投诉状态
 * @type {{UN_PAY: number, PAYED: number, UNFUNDED: number, CANCELED: number, EXPIRED: number}}
 */
let Complaint_STATE = {
    UNHANDLED: 0,      //未处理
    REJECTED: 1,      //已驳回
    ADD_BLACKLIST: 2,      //已添加黑名单
};



export default Complaint_STATE