import needPxProps from '../config/needPxProps';

//递归克隆
function deepClone(origin) {
    if (typeof origin !== 'object') return origin; //注typeof Function RegExp null {} Array 
    let target;
    let temp;
    if (Array.isArray(origin)) {
        target = [];
        for (let i = 0; i < origin.length; i++) {
            temp = deepClone(origin[i]);
            target.push(temp);
        }
    }
    else if (origin === null) {
        target = null;
    } else if (origin.constructor === RegExp) {
        target = origin;
    } else {
        target = {};
        let keys = Object.keys(origin);
        for (let i = 0; i < keys.length; i++) { 
            temp = deepClone(origin[keys[i]]);
            target[keys[i]] = temp;
        }
    }
    return target;
}

//格式化样式
function formatStyles(styles) {
    const styleData = deepClone(styles);
    let data, res='';
    for (let i = 0; i < styleData.length; i++) {
        data = styleData[i].data;
        for (let j = 0; j < data.length; j++) {
            let val = data[j].value;
            if(needPxProps.includes(data[j].name)){
                val=`${val}px`;
            }
            res += `${data[j].name}:${val};`;
        }
    }
    return res;
}

export { deepClone,formatStyles }
