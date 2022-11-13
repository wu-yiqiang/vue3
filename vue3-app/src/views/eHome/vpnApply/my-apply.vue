<template>
  <section class="my-apply">
    <div class="userInfo-box">
      <div class="space-box">
        <label class="user-name info-box">王二小(555098813)</label>
        <label class="user-base info-box">珠海基地</label>
      </div>
      <div class="space-box">
        <label class="user-phone info-box">13117966595</label>
        <label class="user-dept info-box">系统二部</label>
      </div>
    </div>
    <div class="main-box">
      <div class="os-box">
        <FormItem title="本机操作系统">
          <van-radio-group v-model="checked" direction="horizontal">
            <radioGroup :lists="lists" @currentVal="getCurrentVal" />
          </van-radio-group>
        </FormItem>
      </div>
      <div class="reason-box">
        <FormItem title="申请原因">
          <van-field
            v-model="applyForm.message"
            rows="12"
            autosize
            type="textarea"
            maxlength="200"
            placeholder="仅允许受疫情影响远程办公申请，其他原因不允许申请"
            show-word-limit
          />
        </FormItem>
      </div>
      <div class="endData-box">
        <FormItem title="结束日期">
          <van-field
            v-model="applyForm.result"
            readonly
            name="calendar"
            placeholder="点击选择日期"
            right-icon="calendar-o"
            @click="showCalendar = true"
          />
          <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
        </FormItem>
      </div>
    </div>
    <div class="submit-box">
      <van-button hairline type="success">撤销申请</van-button>
      <van-button hairline type="success">延期申请</van-button>
      <van-button hairline type="success">新增提交</van-button>
    </div>
  </section>
</template>

<script setup lang="ts" name="vpnApply">
// import SvgIcon from '/@/components/SvgIcon.vue'
// import { useAppStore } from '/@/store'
// const store = useAppStore()
import { reactive, ref } from 'vue'
import { t } from '/@/plugins/i18n'
import radioGroup from '/@/views/components/radioGroup.vue'
// import { Dialog, Toast, RadioGroup, Radio, Field } from 'vant'
import FormItem from '/@/views/components/formItem.vue'
const applyForm = reactive({
  message: '',
  result: '',
  os: ''
})
const checked = ref<string>('')
const showCalendar = ref(false)
const lists = reactive<object>([
  { value: 'ubuntu', label: 'ubuntu' },
  { value: 'fedora', label: 'fedora' },
  { value: 'suse', label: 'suse' },
  { value: 'windows', label: 'windows' },
  { value: 'deeping', label: 'deeping' },
  { value: 'debain', label: 'debain' },
  { value: 'arch', label: 'arch' }
])
const list2 = reactive<object>(['1', '2', '3', '4'])
function onConfirm(date: any) {
  applyForm.result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  showCalendar.value = false
}
function getCurrentVal(val: string) {
  applyForm.os = val
}

function check() {}
</script>

<style lang="scss">
.my-apply {
  padding: 20px;
  .userInfo-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid black;
    border-radius: 4px;
    padding: 10px 5px;
    margin-bottom: 1vh;
    .space-box {
      display: flex;
      justify-content: space-between;
      .info-box {
        line-height: 100%;
      }
    }
  }
  .main-box {
    width: 100%;
    border: 1px solid black;
    padding: 5px 5px;
    border-radius: 4px;
    margin-bottom: 10px;
    .os-box {
      .radioGroup {
        padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
      }
    }
    .reason-box {
      .van-field {
        border: 1px solid black;
        border-radius: 4px;
      }
    }
  }
  .submit-box {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
}
</style>
