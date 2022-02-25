import textIcon from '../imgs/text-icon.png';
import imgIcon from '../imgs/img-icon.png';
import commonStyle from './style';
import { deepClone } from '../utils/index.js';

const commonComps = [
    {
        name: 'legoText',
        path: 'legoText',
        icon: textIcon,
        desc: '文字组件',
        styles:deepClone(commonStyle)
    },
    {
        name: 'imgComponent',
        path: 'imgComponent',
        icon: imgIcon,
        desc: '图片组件',
        styles:deepClone(commonStyle)
     
    },
   
]

export default [
    {
        theme: '常用组件',
        comps:commonComps,
    },
    {
        theme: '表单',
        comps:[]
    },
    {
        theme: '按钮',
        comps:[]
    },
    {
        theme: '容器',
        comps:[]
    }
    
]