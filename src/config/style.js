const commonStyle = [
    {
        label: '宽高',
        data: [
            {
                name: 'width',
                value: '100',
                type: 'InputNumber',
                desc:'宽度',
            },
            {
                name: 'height',
                value: '50',
                type: 'InputNumber',
                desc:'高度'
            },
        ]
    },
    {
        label: '位置',
        data: [
            {
                name: 'left',
                value: '30',
                type: 'InputNumber',
                desc:'横轴'
            },
            {
                name: 'top',
                value: '30',
                type: 'InputNumber',
                desc:'纵轴'
            },
            {
                name: 'zIndex',
                value: '',
                type: 'InputNumber',
                desc:'层级'
            }
        ]
    },
    {
        label: '字体',
        data: [
            {
                name: 'color',
                value: '#000000',
                type: 'InputColor',
                desc:'字体颜色'
            },
            {
                name: 'fontSize',
                value: '16',
                type: 'InputNumber',
                desc:'字体大小'
            },
            {
                name: 'fontStyle',
                value: 'normal',
                type: 'SelectItem',
                desc:'字体是否斜体'
            }
        ]
    },
    {
        label: '背景',
        data: [
            {
                name: 'backgroundColor',
                value: '#ffffff',
                type: 'InputColor',
                desc:'背景色'
            },
            {
                name: 'backgroundImage',
                value: 'aaa',
                type: 'UploadImage',
                desc:'背景图片'
            },
        ]
    }
]
export default commonStyle