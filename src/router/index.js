import Home from '../views/home'

import Login from '../views/user/login'
import Register from '../views/user/register'
import User_Center from '../views/user/center'
import User_Modifypass from '../views/user/modifypass'


import Division_List from '../views/division/list'
import Division_operate from '../views/division/operate'
import Division_adminList from '../views/division/adminList'
import Division_adminOperate from '../views/division/adminOperate'


import EthicsNotice_List from '../views/ethicsNotice/list'
import EthicsNotice_Operate from '../views/ethicsNotice/operate'


import BlackList from '../views/blacklist/list'


import Complain_TherapistList from '../views/complain/therapistList'
import Complain_UserList from '../views/complain/userList'


import SchoolType from '../views/base/schoolType'
import QualificationType from '../views/base/qualificationType'
import ConsultType from '../views/base/consultType'
import LevelType from '../views/base/levelType'
import MannerType from '../views/base/mannerType'




import CaseManager_List from '../views/caseManager/list'
import CaseManager_Operate from '../views/caseManager/operate'

import PreCheck_List from '../views/preCheck/list'
import PreCheck_Operate from '../views/preCheck/operate'

import Station_List from '../views/station/list'
import Station_Operate from '../views/station/operate'
import Station_RelateTherapist from '../views/station/relateTherapist'

import Therapist_AppointSet from '../views/therapist/appointSet'
import Therapist_FeeSet from '../views/therapist/feeSet'
import Therapist_Revenue from '../views/therapist/revenue'
import Therapist_PeriodSet from '../views/therapist/periodSet'
import Therapist_Occupy from '../views/therapist/occupy'
import Therapist_complaint from '../views/therapist/complaint'
import Therapist_OrderList from '../views/therapist/orderList'

import Room_List from '../views/room/list'
import Room_Operate from '../views/room/operate'
import Room_PeriodSet from '../views/room/periodSet'
import Room_Occupy from '../views/room/occupy'









const routers = [
    {path: '/', component: Home},
    {path: '/user/register', component: Register},
    {path: '/user/login', component: Login},
    {path: '/user/center', component: User_Center},
    {path: '/user/modifypass', component: User_Modifypass},

    {path: '/division/list', component: Division_List},
    {path: '/division/operate', component: Division_operate},
    {path: '/division/adminList', component: Division_adminList},
    {path: '/division/adminOperate', component: Division_adminOperate},

    {path: '/ethicsNotice/list', component: EthicsNotice_List},
    {path: '/ethicsNotice/operate', component: EthicsNotice_Operate},


    {path: '/blacklist/list', component: BlackList},

    {path: '/complain/therapistList', component: Complain_TherapistList},
    {path: '/complain/userList', component: Complain_UserList},

    {path: '/base/schoolType', component: SchoolType},
    {path: '/base/qualificationType', component: QualificationType},
    {path: '/base/consultType', component: ConsultType},
    {path: '/base/levelType', component: LevelType},
    {path: '/base/mannerType', component: MannerType},



    {path: '/caseManager/list', component: CaseManager_List},
    {path: '/caseManager/operate', component: CaseManager_Operate},

    {path: '/preCheck/list', component: PreCheck_List},
    {path: '/preCheck/operate', component: PreCheck_Operate},

    {path: '/station/list', component: Station_List},
    {path: '/station/operate', component: Station_Operate},
    {path: '/station/relateTherapist', component: Station_RelateTherapist},

    {path: '/therapist/appointSet', component: Therapist_AppointSet},
    {path: '/therapist/feeSet', component: Therapist_FeeSet},
    {path: '/therapist/revenue', component: Therapist_Revenue},
    {path: '/therapist/periodSet', component: Therapist_PeriodSet},
    {path: '/therapist/occupy', component: Therapist_Occupy},
    {path: '/therapist/complaint', component: Therapist_complaint},
    {path: '/therapist/orderList', component: Therapist_OrderList},

    {path: '/room/list', component: Room_List},
    {path: '/room/operate', component: Room_Operate},
    {path: '/room/periodSet', component: Room_PeriodSet},
    {path: '/room/occupy', component: Room_Occupy},





]

export default routers;
