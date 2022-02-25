import { createStore } from 'vuex';
const store = createStore({
    state() {
        return {
            compDataArray: [],
            activeComp: {}
        }
    },
    mutations: {
        addComp(state, comp) {
            state.compDataArray.push(comp);
        },
        setActiveComp(state, comp) {
            state.activeComp = comp;
        },
        updateCompStyle(state, obj) {
            const activeComp = state.activeComp;
            const compStyles = activeComp.styles;
            const { label, name, val } = obj; //label对应样式的大类如‘字体’，‘背景’等，name对应字体中的某一个，例如name为fontSize
            for (let j = 0; j < compStyles.length; j++) { 
                if (compStyles[j].label === label) { 
                    const detailStyle = compStyles[j].data;
                    for (let i = 0; i < detailStyle.length; i++) { 
                        if (detailStyle[i].name === name) { 
                            detailStyle[i].value = val;
                            break;
                        }
                    }
                    break;
                }  
            }
          

        }  
    }
})
export default store;