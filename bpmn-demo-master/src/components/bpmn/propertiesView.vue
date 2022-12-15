<template>
  <div class="custom-properties-panel">
    <div class="empty" v-if="selectedElements.length<=0">请选择一个元素</div>
    <div class="empty" v-else-if="selectedElements.length>1">只能选择一个元素</div>
    <div v-else>
      <fieldset class="element-item">
        <label>id</label>
        <span>{{ element.id }}</span>
      </fieldset>
      <fieldset class="element-item">
        <label>name</label>
        <input :value="element.name" @change="(event) => changeField(event, 'name')" />
      </fieldset>
      <fieldset class="element-item">
        <label>customProps</label>
        <input :value="element.name" @change="(event) => changeField(event, 'customProps')" />
      </fieldset>
    </div>
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
      element: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { modeler } = this
      modeler.on('selection.changed', e => {
        this.selectedElements = e.newSelection
        this.element = e.newSelection[0]
      })
      modeler.on('element.changed', e => {
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
      const value = event.target.value
      let properties = {}
      properties[type] = value
      this.element[type] = value
      this.updateProperties(properties)
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

<style scoped>
/** 更多代码在git上有, git链接见底部后语 **/
.custom-properties-panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  background-color: #fff9f9;
  border-color: rgba(0, 0, 0, 0.09);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  padding: 20px;
}
</style>