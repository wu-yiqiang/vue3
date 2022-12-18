<template>
    <div class="container">
        <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
        <div ref="canvas" class="bpmn-canvas"></div>
        <div id="js-properties-panel" class="bpmn-js-properties-panel"></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import BpmnModeler from 'bpmn-js/lib/Modeler';
    // 工具栏相关
    import propertiesPanelModule from 'bpmn-js-properties-panel';
    // import propertiesProviderModule from '@/components/properties-panel/provider/activiti';
    import activitiModdleDescriptor from '@/components/properties-panel/activiti.json';
    // import customControlsModule from '../customControls';
    // 汉化
    // import customTranslate from './customTranslate';
    import { bpmnTemplate } from './utils';
    import { ElMessage } from 'element-plus';
    let bpmnModeler = reactive(null);
    const canvas = ref('');
    const template = ref(bpmnTemplate);
    function init() {
        // 获取画布 element
        // 创建Bpmn对象
        bpmnModeler = new BpmnModeler({
            // 设置bpmn的绘图容器为上门获取的画布 element
            container: canvas.value,
            propertiesPanel: {
                parent: '#js-properties-panel'
            },

            additionalModules: [
                propertiesPanelModule
                // propertiesProviderModule
                // customControlsModule
                // customTranslateModule
            ],
            moddleExtensions: {
                activiti: activitiModdleDescriptor
            }
        });

        // 初始化建模器内容
        initDiagram(template.value);
    }
    function initDiagram(bpmn: BpmnModeler) {
        // 将xml导入Bpmn-js建模器
        bpmnModeler.importXML(bpmn, (err: any) => {
            if (err) ElMessage.error('打开模型出错,请确认该模型符合Bpmn2.0规范');
        });
    }
    onMounted(() => {
        init();
    });
</script>
<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
        .bpmn-canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
