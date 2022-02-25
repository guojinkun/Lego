import { useStore } from "vuex";
import { computed } from "vue";
export function exposeCompData() { 
    const store = useStore();
    const compDataArray = computed(() => {
        return store.state.compDataArray;
    });
    const activeComp = computed(() => {
        return store.state.activeComp;
    })
    const fontProps = computed(() => { 
        return store.state.activeComp.styles[0].data;
    })
    const backPros = computed(() => { 
        return store.state.activeComp.styles[1].data;
    })
    return {
        compDataArray,
        activeComp,
        fontProps,
        backPros
    }
}