import axios from './axios'
import Util from '../assets/js/Util'


// 用户
export function login(params = {}) {

    return axios.post('login/login', params)


}


export function forgetPassword(params = {}) {

    return axios.post('login/forgetPassword', params)


}

export function register(params = {}) {

    return axios.post('login/register', params)


}

export function updateUser(params = {}) {

    return axios.post('user/update', params)


}

export function getUserById(params = {}) {

    return axios.post('user/getById', params)


}

export function getUserList(params = {}) {

    return axios.post('user/list', params)


}

export function deleteUser(params = {}) {

    return axios.post('user/delete', params)


}

export function addUser(params = {}) {

    return axios.post('user/add', params)


}

export function updatePassword(params = {}) {

    return axios.post('user/updatePassword', params)


}

// 分部

export function getDivisionList(params = {}) {

    return axios.post('division/list', params)


}

export function addDivision(params = {}) {

    return axios.post('division/add', params)


}

export function updateDivision(params = {}) {

    return axios.post('division/update', params)


}

export function deleteDivision(params = {}) {

    return axios.post('division/delete', params)


}

// 分部管理员
export function getDivisionAdminList(params = {}) {

    return axios.post('divisionAdmin/list', params)


}
export function deleteDivisionAdmin(params = {}) {

    return axios.post('divisionAdmin/delete', params)


}

export function addDivisionAdmin(params = {}) {

    return axios.post('divisionAdmin/add', params)


}

export function updateDivisionAdmin(params = {}) {

    return axios.post('user/update', params)


}


// 流派
export function getSchoolTypeList(params = {}) {

    return axios.post('schooltype/list', params)


}

export function addSchoolType(params = {}) {

    return axios.post('schooltype/add', params)


}

export function updateSchoolType(params = {}) {

    return axios.post('schooltype/update', params)


}

export function deleteSchoolType(params = {}) {

    return axios.post('schooltype/delete', params)


}

// 资历
export function getQualificationTypeList(params = {}) {

    return axios.post('qualificationtype/list', params)


}

export function addQualificationType(params = {}) {

    return axios.post('qualificationtype/add', params)


}

export function updateQualificationType(params = {}) {

    return axios.post('qualificationtype/update', params)


}

export function deleteQualificationType(params = {}) {

    return axios.post('qualificationtype/delete', params)


}

// 等级
export function getLevelTypeList(params = {}) {

    return axios.post('leveltype/list', params)


}

export function addLevelType(params = {}) {

    return axios.post('leveltype/add', params)


}

export function updateLevelType(params = {}) {

    return axios.post('leveltype/update', params)


}

export function deleteLevelType(params = {}) {

    return axios.post('leveltype/delete', params)


}


// 预约类型
export function getConsultTypeList(params = {}) {

    return axios.post('consulttype/list', params)


}

export function addConsultType(params = {}) {

    return axios.post('consulttype/add', params)


}

export function updateConsultType(params = {}) {

    return axios.post('consulttype/update', params)


}

export function deleteConsultType(params = {}) {

    return axios.post('consulttype/delete', params)


}

// 咨询方式
export function getMannerTypeList(params = {}) {

    return axios.post('mannertype/list', params)


}

export function addMannerType(params = {}) {

    return axios.post('mannertype/add', params)


}

export function updateMannerType(params = {}) {

    return axios.post('mannertype/update', params)


}

export function deleteMannerType(params = {}) {

    return axios.post('mannertype/delete', params)


}


export function getOrderListByTherapistId(params = {}) {

    return axios.post('order/getOrderListByTherapistId', params)


}

export function getOrderListByDivisionAdminId(params = {}) {

    return axios.post('order/getOrderListByDivisionAdminId', params)


}

/**
 * 咨询师收益列表（已完结订单）
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRevenueList(params = {}) {

    return axios.post('order/getRevenueList', params)


}

/**
 * 查询咨询师收益汇总
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRevenueSum(params = {}) {

    return axios.post('order/getRevenueSum', params)


}

/**
 * 订单退款
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function refund(params = {}) {

    return axios.post('order/refund', params)


}




// station
export function getStationList(params = {}) {

    return axios.post('station/list', params)


}

export function addStation(params = {}) {

    return axios.post('station/add', params)


}

export function updateStation(params = {}) {

    return axios.post('station/update', params)


}

export function deleteStation(params = {}) {

    return axios.post('station/delete', params)


}


// 案例管理员
export function getCasemanagerList(params = {}) {

    return axios.post('stationCasemanagerRelation/list', params)


}

export function addCasemanager(params = {}) {

    return axios.post('stationCasemanagerRelation/add', params)


}

export function deleteCasemanager(params = {}) {

    return axios.post('stationCasemanagerRelation/delete', params)


}

// 咨询师

/**
 * 获取工作室所关联的咨询师列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRelateTherapistList(params = {}) {

    return axios.post('stationTherapistRelation/list', params)


}

/**
 * 获取工作室没有关联的咨询师列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getNotRelatedTherapist(params = {}) {

    return axios.post('stationTherapistRelation/getNotRelatedTherapist', params)


}



/**
 * 工作室和咨询师建立关联
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addRelateTherapist(params = {}) {

    return axios.post('stationTherapistRelation/add', params)


}

/**
 * 移除工作室和咨询师关联
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteRelateTherapist(params = {}) {

    return axios.post('stationTherapistRelation/delete', params)


}


/**
 * 获取预约设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointSet(params = {}) {

    return axios.post('therapistAttachRelation/getByTherapistId', params)


}

/**
 * 添加预约设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addAppointSet(params = {}) {

    return axios.post('therapistAttachRelation/add', params)


}

/**
 * 修改预约设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateAppointSet(params = {}) {

    return axios.post('therapistAttachRelation/update', params)


}

/**
 * 获取咨询师收费配置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getFeeSet(params = {}) {

    return axios.post('therapistFeeSet/getByTherapistId', params)


}

/**
 * 新增咨询师收费配置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addFeeSet(params = {}) {

    return axios.post('therapistFeeSet/add', params)


}

/**
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateFeeSet(params = {}) {

    return axios.post('therapistFeeSet/update', params)


}

/**
 * 修改咨询师可用时段设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateTherapistPeriodSet(params = {}) {

    return axios.post('therapistPeriodSet/updateByTherapistId', params)


}

/**
 * 获取咨询师可用时段设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getTherapistPeriodSet(params = {}) {

    return axios.post('therapistPeriodSet/getByTherapistId', params)


}


/**
 * 获取给定工作室下的房间列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRoomList(params = {}) {

    return axios.post('room/list', params)


}

/**
 * 删除房间
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteRoom(params = {}) {

    return axios.post('room/delete', params)


}

/**
 * 新增房间
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addRoom(params = {}) {

    return axios.post('room/add', params)


}

/**
 * 修改房间
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateRoom(params = {}) {

    return axios.post('room/update', params)


}

/**
 * 启用停用房间
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function onOffRoom(params = {}) {

    return axios.post('room/onOff', params)


}

/**
 * 更新给定工作室的房间的可用时段设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateRoomPeriodSet(params = {}) {

    return axios.post('room/updateUseablePeriodSet', params)


}

/**
 * 获取给定工作室的房间的可用时段设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRoomPeriodSet(params = {}) {

    return axios.post('room/getUseablePeriodSet', params)


}



// 伦理公告
/**
 * 新增伦理公告
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addEthicsnotice(params = {}) {

    return axios.post('ethicsnotice/add', params)


}

/**
 * 删除伦理公告
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteEthicsnotice(params = {}) {

    return axios.post('ethicsnotice/delete', params)


}

/**
 * 修改伦理公告
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateEthicsnotice(params = {}) {

    return axios.post('ethicsnotice/update', params)


}

/**
 * 启用停用伦理公告
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function onOffEthicsnotice(params = {}) {

    return axios.post('ethicsnotice/onOff', params)


}

/**
 * 查询伦理公告列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getEthicsnoticeList(params = {}) {

    return axios.post('ethicsnotice/list', params)


}

/**
 * 查询用户投诉咨询师列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getUserComplaints(params = {}) {

    return axios.post('complaint/getUserComplaints', params)


}

/**
 * 添加一条投诉（咨询师投诉客户）
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addComplaint(params = {}) {

    return axios.post('complaint/add', params)


}

/**
 * 查询咨询师投诉用户列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getTherapistComplaints(params = {}) {

    return axios.post('complaint/getTherapistComplaints', params)


}

/**
 * 根据咨询师ID查询咨询师投诉用户列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getTherapistComplaintsByTId(params = {}) {

    return axios.post('complaint/getTherapistComplaintsByTId', params)


}

/**
 * 查询咨询师投诉用户列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function saveResearchReport(params = {}) {

    return axios.post('complaint/saveResearchReport', params)


}

/**
 * 驳回咨询师的投诉
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function rejectComplaint(params = {}) {

    return axios.post('complaint/reject', params)


}

/**
 * 添加黑名单
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addBlacklist(params = {}) {

    return axios.post('complaint/addBlacklist', params)


}

/**
 * 移除黑名单
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteBlacklist(params = {}) {

    return axios.post('blacklist/delete', params)


}

/**
 * 黑名单列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getBlackList(params = {}) {

    return axios.post('blacklist/getList', params)


}

/**
 * 根据房间ID获取生效中的预约列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentsOfUsingByRoomId(params = {}) {

    return axios.post('appointment/getListOfUsingByRoomId', params)


}

/**
 * 根据咨询师ID获取生效中的预约列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentsOfUsingByTherapistId(params = {}) {

    return axios.post('appointment/getListOfUsingByTherapistId', params)


}




// 预检表量表

export function getMeasureList(params = {}) {

    return axios.post('measure/list', params)


}

export function addMeasure(params = {}) {

    return axios.post('measure/add', params)


}

export function deleteMeasure(params = {}) {

    return axios.post('measure/delete', params)


}

export function updateMeasure(params = {}) {

    return axios.post('measure/update', params)


}


export function getMeasureById(params = {}) {

    return axios.post('measure/getById', params)


}

export function getQuestionList(params = {}) {

    return axios.post('question/list', params)


}

export function addQuestion(params = {}) {

    return axios.post('question/add', params)


}

export function updateQuestion(params = {}) {

    return axios.post('question/update', params)


}

export function updateBatchQuestion(params = {}) {

    return axios.post('question/updateBatch', params)


}

export function addBatchQuestion(params = {}) {

    return axios.post('question/addBatch', params)


}

export function upLoadFile(params = {}) {

    return axios.post('question/upLoadFile', params)


}

export function deleteQuestion(params = {}) {

    return axios.post('question/delete', params)


}


/**
 * 获取用户协议列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAgreementList(params = {}) {

    return axios.post('agreement/getList', params)


}

/**
 * 新增用户协议
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addAgreement(params = {}) {

    return axios.post('agreement/add', params)


}

/**
 * 删除用户协议
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteAgreement(params = {}) {

    return axios.post('agreement/delete', params)


}

/**
 * 修改用户协议
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateAgreement(params = {}) {

    return axios.post('agreement/update', params)


}

/**
 * 获取继续教育设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getContinueEduSetting(params = {}) {

    return axios.post('continueEduSetting/get', params)


}

/**
 * 超管初始化配置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function initContinueEduSetting(params = {}) {

    return axios.post('continueEduSetting/init', params)


}

/**
 * 更新继续教育设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateContinueEduSetting(params = {}) {

    return axios.post('continueEduSetting/update', params)


}


/**
 * 获取用户继续教育列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getContinueEduList(params = {}) {

    return axios.post('continueEdu/list', params)


}

/**
 * 根据咨询师ID和年份获取继续教育详情
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getContinueEduByUserIdAndYear(params = {}) {

    return axios.post('continueEdu/getByUserIdAndYear', params)


}

/**
 * 上传继续教育附件信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function uploadContinueEduFile(params = {}) {

    return axios.post('continueEdu/upload', params)


}

/**
 * 咨询师新增继续教育
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addContinueEdu(params = {}) {

    return axios.post('continueEdu/add', params)


}

/**
 * 咨询师修改继续教育
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateContinueEdu(params = {}) {

    return axios.post('continueEdu/update', params)


}

/**
 * 获取继续教育分页列表
 * 分部管理员和咨询师查看
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getContinueEduPageList(params = {}) {

    return axios.post('continueEdu/queryList', params)


}

/**
 * 获取某咨询师某年度的继续教育条目
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getContinueEduItemList(params = {}) {

    return axios.post('continueEduItem/list', params)


}


/**
 * 获取咨询师简历
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getCvByTherapistId(params = {}) {

    return axios.post('cv/getByTherapistId', params)


}

/**
 * 新增咨询师简历
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addCv(params = {}) {

    return axios.post('cv/add', params)


}

/**
 * 删除咨询师简历
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteCv(params = {}) {

    return axios.post('cv/delete', params)


}

/**
 * 修改咨询师简历
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateCv(params = {}) {

    return axios.post('cv/update', params)


}







