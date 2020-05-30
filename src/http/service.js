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

//order getOrderListByTherapistId

export function getOrderListByTherapistId(params = {}) {

    return axios.post('order/getOrderListByTherapistId', params)


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
export function updateUseablePeriodSet(params = {}) {

    return axios.post('therapist/updateUseablePeriodSet', params)


}

/**
 * 获取咨询师可用时段设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getUseablePeriodSet(params = {}) {

    return axios.post('therapist/getUseablePeriodSet', params)


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

/**
 * 获取给定房间某月份中各个时段占用列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRoomOccupyList(params = {}) {

    return axios.post('roomoccupy/list', params)


}

/**
 * 设置房间某天某个时段可用和不可用状态
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addRoomOccupy(params = {}) {

    return axios.post('roomoccupy/add', params)


}

/**
 * 设置房间某天某个时段状态由不可用改为可用状态
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteRoomOccupy(params = {}) {

    return axios.post('roomoccupy/delete', params)


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
 * 查询咨询师投诉用户列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getTherapistComplaints(params = {}) {

    return axios.post('complaint/getTherapistComplaints', params)


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










