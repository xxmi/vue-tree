import _ from 'lodash';

/**
 * 扩展属性
 * @param obj
 * @param property {new:old} 把 old 写入 new 中（新增属性）
 * @params extend 扩展属性 {async: true}
 * @returns {*}
 * @private
 */
const _extendProperty = function (obj, property = {}, extend = {}) {
  for (const key in property) {
    obj[key] = obj[property[key]];
  }
  for (const key in extend) {
    obj[key] = extend[key];
  }
  return obj;
};


/**
 * 扩展属性
 * @param data object|array[object]
 * @param property {new:old} 把 old 写入 new 中（新增属性）
 * @params extend 扩展属性 {async: true}
 * @returns {*}
 */
const extendProperty = function (data, property = {}, extend = {}) {
  if (_.isArray(data)) {
    for (let i = 0, l = data.length; i < l; i++) {
      data[i] = _extendProperty(data[i], property, extend);
    }
  } else {
    data = _extendProperty(data, property, extend);
  }
  return data;
};


/**
 * 解析 Tree
 * @param settings
 * @param nodes
 * @param property {new:old} 把 old 写入 new 中（新增属性）
 * @params extend 扩展属性 {async: true}
 * @returns {Promise<*>}
 */
const parseTree = function (settings = {
  key: 'id',
  parentKey: 'pid',
  childKey: 'children'
}, nodes = [], property = {}, extend = {}) {
  const {key, parentKey, childKey} = settings;
  if (!_.isArray(nodes)) {
    return [nodes];
  }
  const menuNodes = [];
  const tmpMap = {};
  for (let i = 0, l = nodes.length; i < l; i++) {
    nodes[i] = _extendProperty(nodes[i], property, extend);
    tmpMap[nodes[i][key]] = nodes[i];
  }
  for (let i = 0, len = nodes.length; i < len; i++) {
    if (tmpMap[nodes[i][parentKey]] && nodes[i][key] !== nodes[i][parentKey]) {
      if (!tmpMap[nodes[i][parentKey]][childKey]) {
        tmpMap[nodes[i][parentKey]][childKey] = [];
      }
      tmpMap[nodes[i][parentKey]][childKey].push(nodes[i]);
    } else {
      menuNodes.push(nodes[i]);
    }
  }
  return menuNodes;
};
export {extendProperty, parseTree};
export default {extendProperty, parseTree};
