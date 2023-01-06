<template>
  <div class="app-container">

    <!-- 流程设计器，负责绘制流程等 -->
    <my-process-designer v-if="xmlString !== undefined" :key="`designer-${reloadIndex}`" v-model="xmlString" v-bind="controlForm"
      keyboard ref="processDesigner" @init-finished="initModeler"
      @save="save"/>

    <!-- 流程属性器，负责编辑每个流程节点的属性 -->
    <my-properties-panel :key="`penal-${reloadIndex}`" :bpmn-modeler="modeler" :prefix="controlForm.prefix" class="process-panel"
      :model="model" />

  </div>
</template>

<script>
import translations from "@/components/bpmnProcessDesigner/src/translations";
// 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
import CustomContentPadProvider from "@/components/bpmnProcessDesigner/package/designer/plugins/content-pad";
// 自定义左侧菜单（修改 默认任务 为 用户任务）
import CustomPaletteProvider from "@/components/bpmnProcessDesigner/package/designer/plugins/palette";
// import xmlObj2json from "./utils/xml2json";
import MyProcessPalette from "@/components/bpmnProcessDesigner/package/palette/ProcessPalette";
import {createModel, getModel, updateModel} from "@/api/bpm/model";
// 自定义侧边栏
// import MyProcessPanel from "../package/process-panel/ProcessPanel";

export default {
  name: "App",
  components: { MyProcessPalette },
  data() {
    return {
      xmlString: undefined, // BPMN XML
      modeler: null,
      reloadIndex: 0,
      controlDrawerVisible: false,
      translationsSelf: translations,
      controlForm: {
        simulation: true,
        labelEditing: false,
        labelVisible: false,
        prefix: "flowable",
        headerButtonSize: "mini",
        additionalModel: [CustomContentPadProvider, CustomPaletteProvider]
      },
      addis: {
        CustomContentPadProvider,
        CustomPaletteProvider
      },
      // 流程模型的信息
      model: {},
    };
  },
  created() {
    // 如果 modelId 非空，说明是修改流程模型
    // const modelId = this.$route.query && this.$route.query.modelId
    // if (modelId) {
      const templateModel = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions 
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" 
  xmlns:camunda="http://camunda.org/schema/1.0/bpmn" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:activiti="http://activiti.org/bpmn" 
  id="m1577635100724" 
  name="" 
  targetNamespace="http://www.activiti.org/testm1577635100724"
>
  <process id="process" processType="None" isClosed="false" isExecutable="true">
    <extensionElements>
      <camunda:properties>
        <camunda:property name="a" value="1" />
      </camunda:properties>
    </extensionElements>
    <startEvent id="_2" name="start" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_leave">
    <bpmndi:BPMNPlane id="BPMNPlane_leave" bpmnElement="leave">
      <bpmndi:BPMNShape id="BPMNShape__2" bpmnElement="_2">
        <omgdc:Bounds x="144" y="368" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="149" y="400" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
      // getModel(templateModel).then(response => {
      //    = response.data.bpmnXml
        
      //   // this.controlForm.processId = response.data.key
      // })
      this.xmlString = templateModel
      // this.model = {
      //     templateModel,
      //     bpmnXml: undefined, // 清空 bpmnXml 属性
      //   }
    // }
  },
  methods: {
    initModeler(modeler) {
      setTimeout(() => {
        this.modeler = modeler;
        console.log(modeler);
      }, 10);
    },
    save(bpmnXml) {
      const data = {
        ...this.model,
        bpmnXml: bpmnXml, // this.bpmnXml 只是初始化流程图，后续修改无法通过它获得
      }

      // 修改的提交
      if (data.id) {
        updateModel(data).then(response => {
          this.$modal.msgSuccess("修改成功")
          // 跳转回去
          this.close()
        })
        return
      }
      // 添加的提交
      createModel(data).then(response => {
        this.$modal.msgSuccess("保存成功")
        // 跳转回去
        this.close()
      })
    },
    /** 关闭按钮 */
    close() {
      this.$tab.closeOpenPage({ path: "/bpm/manager/model" });
    },
  }
};
</script>

<style lang="scss">
//body {
//  overflow: hidden;
//  margin: 0;
//  box-sizing: border-box;
//}
//.app {
//  width: 100%;
//  height: 100%;
//  box-sizing: border-box;
//  display: inline-grid;
//  grid-template-columns: 100px auto max-content;
//}
.demo-control-bar {
  position: fixed;
  right: 8px;
  bottom: 8px;
  z-index: 1;
  .open-control-dialog {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 32px;
    background: rgba(64, 158, 255, 1);
    color: #ffffff;
    cursor: pointer;
  }
}

// TODO 芋艿：去掉多余的 faq
//.info-tip {
//  position: fixed;
//  top: 40px;
//  right: 500px;
//  z-index: 10;
//  color: #999999;
//}

.control-form {
  .el-radio {
    width: 100%;
    line-height: 32px;
  }
}
.element-overlays {
  box-sizing: border-box;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: #fafafa;
}

.my-process-designer {
  height: calc(100vh - 84px);
}
.process-panel__container {
  position: absolute;
  right: 0;
  top: 55px;
  height: calc(100vh - 84px);
}

</style>
