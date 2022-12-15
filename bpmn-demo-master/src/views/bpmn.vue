<template>
  <div id="app">
    <div class="container">
      
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-container">
        <div class="bpmn-canvas" ref="canvas"></div>
        <!-- <div class="bpmn-js-properties-panel" id="js-properties-panel"></div> -->
        <properties-view v-if="bpmnModeler" :modeler="bpmnModeler"></properties-view>
      </div>
      <!-- 把操作按钮写在这里面 -->
      <div class="action">
        <el-upload action class="upload-demo" :before-upload="openBpmn">
          <el-button icon="el-icon-folder-opened"></el-button>
        </el-upload>
        <el-button class="new" icon="el-icon-circle-plus" @click="newDiagram"></el-button>
        <el-button icon="el-icon-download" @click="downloadBpmn"></el-button>
        <el-button icon="el-icon-picture" @click="downloadSvg"></el-button>
        <!-- <el-button icon="el-icon-remove" @click="downloadSvg"></el-button>
        <el-button icon="el-icon-circle-plus" @click="downloadSvg"></el-button> -->
        <a hidden ref="downloadLink"></a>
      </div>
      
    </div>
  </div>
</template>

<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
// 工具栏相关
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from '../components/properties-panel/provider/activiti';
import activitiModdleDescriptor from '../components/activiti.json';
import customControlsModule from '../components/customControls';
// 汉化
import customTranslate from "../components/bpmn/customTranslate";
import { initBpmnTemplate } from './utils'
import PropertiesView from '@/components/bpmn/propertiesView'
export default {
  components: {PropertiesView},
  data() {
    return {
      bpmnModeler: null,
      canvas: null,
      bpmnTemplate: '',
    };
  },
  methods: {
    newDiagram() {
      this.createNewDiagram(this.bpmnTemplate);
    },

    downloadBpmn() {
      
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.bpmn`;
          // 将文件名以及数据交给下载方法
          // const xml2 = this.formXML(xml)
          this.download({ name: name, data: xml });
        }
      });
      
    },
    downloadSvg() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.svg`;

          // 从建模器画布中提取svg图形标签
          let context = "";
          const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
          for (let item of djsGroupAll) {
            context += item.innerHTML;
          }
          // 获取svg的基本数据，长宽高
          const viewport = this.$refs.canvas
            .querySelector(".viewport")
            .getBBox();

          // 将标签和数据拼接成一个完整正常的svg图形
          const svg = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="${viewport.width}"
              height="${viewport.height}"
              viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
              version="1.1"
              >
              ${context}
            </svg>
          `;
          // 将文件名以及数据交给下载方法
          this.download({ name: name, data: svg });
        }
      });
    },

    openBpmn(file) {
      const reader = new FileReader();
      // 读取File对象中的文本信息，编码格式为UTF-8
      reader.readAsText(file, "utf-8");
      reader.onload = () => {
        //读取完毕后将文本信息导入到Bpmn建模器
        this.createNewDiagram(reader.result);
      };
      return false;
    },

    getFilename(xml) {
      let start = xml.indexOf("process");
      let filename = xml.substr(start, xml.indexOf(">"));
      filename = filename.substr(filename.indexOf("id") + 4);
      filename = filename.substr(0, filename.indexOf('"'));
      return filename;
    },

    download({ name = "diagram.bpmn", data }) {
      // 这里就获取到了之前设置的隐藏链接
      const downloadLink = this.$refs.downloadLink;
      // 把数据转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);

      if (data) {
        // 将数据给到链接
        downloadLink.href =
          "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        // 设置文件名
        downloadLink.download = name;
        // 触发点击事件开始下载
        downloadLink.click();
      }
    },

    async init() {
      // 获取画布 element
      this.canvas = this.$refs.canvas;
      // this.bpmnTemplate = this.reformXML(this.bpmnTemplate)
      // 将汉化包装成一个模块
      const customTranslateModule = {
        translate: ["value", customTranslate]
      };
      // 创建Bpmn对象
      this.bpmnModeler = new BpmnModeler({
        // 设置bpmn的绘图容器为上门获取的画布 element
        container: this.canvas,
        propertiesPanel: {
        // parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customControlsModule,
        customTranslateModule
      ],
      moddleExtensions: {
        activiti:activitiModdleDescriptor
      }
      });
      this.bpmnTemplate= initBpmnTemplate('asd', 'sad')
      await this.createNewDiagram(this.bpmnTemplate);
    },
    async createNewDiagram(bpmn) {
      // 将字符串转换成图显示出来;
      // const bpmn2 = this.reformXML(bpmn)
      this.bpmnModeler.importXML(bpmn, err => {
        if (err) {
          this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        }
      });
    },
  },
  mounted() {
    
    this.init();
  }
};
</script>

<style>
.action {
  position: fixed;
  bottom: 10px;
  left: 10px;
  display: flex;
}
.upload-demo {
  margin-right: 10px;
}
.bpmn-container {
  width: 100%;
  height: 100vh;
  display: flex;
}
.bpmn-canvas {
  width: calc(100% - 300px);
  height: 100vh;
}

.bpmn-js-properties-panel {
  width: 320px;
  height: inherit;
  overflow-y: auto;
}


</style>