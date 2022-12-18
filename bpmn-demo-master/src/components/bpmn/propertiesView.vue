<template>
  <div class="custom-properties-panel">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="常规">
        <div class="empty" v-if="selectedElements.length <= 0">请选择一个元素</div>
        <div class="empty" v-else-if="selectedElements.length > 1">只能选择一个元素</div>
        <div v-else class="item-box">
          <fieldset class="element-item">
            <div>ID</div>
            <el-input v-model="element.id" placeholder="请输入ID" />
          </fieldset>
          <fieldset class="element-item">
            <div>名字</div>
            <el-input v-model="element.name" placeholder="请输入名字" @blur="(event) => changeField(event, 'name')" />
          </fieldset>
          <!-- <fieldset class="element-item">
        <div>自定义内容</div>
        <el-input v-model="element.name" placeholder="请输入自定义内容" @blur="(event) => changeField(event, 'customProps')" />
      </fieldset> -->
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
          <fieldset class="element-item">
            <div>节点颜色</div>
            <el-input type="color" v-model="element.color" placeholder="请选择颜色值" @blur="(event) => changeField(event, 'color')" />
          </fieldset>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限">权限</el-tab-pane>
      <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'PropertiesView',
  props: {
    modeler: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedElements: [],
      element: null,
      tabPosition: '常规'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { modeler } = this
      modeler.on('selection.changed', (e) => {
        this.selectedElements = e.newSelection
        this.element = e.newSelection[0]
      })
      modeler.on('element.changed', (e) => {
        const { element } = e
        const { element: currentElement } = this
        if (!currentElement) {
          return
        }
        // update panel, if currently selected element changed
        if (element.id === currentElement.id) {
          this.element = element
        }
      })
    },
    /**
     * 改变控件触发的事件
     * @param { Object } input的Event
     * @param { String } 要修改的属性的名称
     */
    changeField(event, type) {
      const value = event?.target?.value
      let properties = {}
      properties[type] = value
      // 若是color属性
      if (type === 'color') this.onChangeColor(value)
      this.element[type] = value
      this.updateProperties(properties)
    },
    /* 修改颜色 */
    onChangeColor(color) {
      const { element } = this
      const modeling = this.modeler.get('modeling')
      modeling.setColor(element, {
        fill: color,
        stroke: null
      })
      // console.log('asd', modeling)
    },
    updateName(name) {
      const { modeler, element } = this
      const modeling = modeler.get('modeling')
      // modeling.updateLabel(element, name)
      modeling.updateProperties(element, {
        name
      })
    },
    /**
     * 更新元素属性
     * @param { Object } 要更新的属性, 例如 { name: '' }
     */
    updateProperties(properties) {
      const { modeler, element } = this
      const modeling = modeler.get('modeling')
      modeling.updateProperties(element, properties)
    }
  }
}
</script>

<style lang="scss">
.custom-properties-panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  background-color: #ededf0;
  border-color: rgba(0, 0, 0, 0.09);
  border-radius: 5px 0 0 5px;
  .el-tabs {
    height: 100%;
    .el-tabs__header {
      height: 5%;
    }
    .el-tabs__content {
      height: 95%;
      overflow-y: scroll;
      .el-tab-pane {
        // width: 100%;
        // height: 100%;

        .item-box {
          // @include box-center();
          // height: 100%;
          
          .element-item {
            margin: 10px 0;
            padding: 5px;
            border-radius: 5px;
            div {
              margin: 5px 0;
            }
          }
        }
      }
    }
  }
}
</style>
