import HeaderName from './HeaderName'
/*
 * 4.0添加键盘
 */
const myComponents = {
    'HeaderName': HeaderName,
}

const install = function (Vue, opts = {}) {
    Object
        .keys(myComponents)
        .forEach((key, a, b) => {
            Vue.component(key, myComponents[key]);
        });

};

module.exports = Object.assign(myComponents, {install});
