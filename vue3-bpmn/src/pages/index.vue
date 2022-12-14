<template>
    <div class="container">
        <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
        <div ref="canvas" class="bpmn-canvas"></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import BpmnModeler from 'bpmn-js/lib/Modeler';
    const bpmnModeler = reactive<Object>(BpmnModeler);
    const canvas = ref('');
    const template = ref('');
    function init() {
        // 获取画布 element
        // 创建Bpmn对象
        bpmnModeler: Promise = new BpmnModeler({
            // 设置bpmn的绘图容器为上门获取的画布 element
            container: canvas.value
        });

        // 初始化建模器内容
        initDiagram(template.value);
    }
    async function initDiagram(bpmn: BpmnModeler) {
        // 将xml导入Bpmn-js建模器
        console.log('asd', bpmnModeler);
        await bpmnModeler.importXML(bpmn, (err: any) => {
            if (err) {
                // this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
            }
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
