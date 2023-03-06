<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>大猫聊天室</h1>
      </div>
      <div class="online-person">
        <span class="onlin-text">聊天列表</span>
        <div class="person-cards-wrapper">
          <div
            v-for="personInfo in personList"
            :key="personInfo.id"
            class="personList"
            @click="clickPerson(personInfo)"
          >
            <PersonCard
              :person-info="personInfo"
              :pc-current="pcCurrent"
            ></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow
          :frined-info="chatWindowInfo"
          @person-card-sort="personCardSort"
        ></ChatWindow>
      </div>
      <div v-else class="showIcon">
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
  import { ref, reactive, onMounted } from 'vue';
  // import { getFriend } from '@/api/getData';
  import PersonCard from '@/components/PersonCard.vue';
  import ChatWindow from './chatwindow.vue';

  const pcCurrent = ref('');
  let personList = reactive([]);
  const showChatWindow = ref(false);
  let chatWindowInfo = reactive({});

  function clickPerson(info) {
    showChatWindow.value = true;
    chatWindowInfo = info;
    personInfo = info;
    pcCurrent.value = info.id;
  }
  function personCardSort(id) {
    if (id !== personList[0].id) {
      let nowPersonInfo;
      // for (const key in personList) {
      //   if (key in personList) {
      //     const element = personList[key];
      //     if (element.id === id) {
      //       nowPersonInfo = element;
      //       personList.splice(key, 1);
      //       break;
      //     }
      //   }
      // }
      for (let i = 0; i < personList.length; i = i + 1) {
        if (personList[i].id === id) {
          nowPersonInfo = personList[i];
          personList.splice(i, 1);
          break;
        }
      }
      personList.unshift(nowPersonInfo);
    }
  }
  onMounted(() => {
    personList = [
      {
        detail: '我是大毛',
        headImg: 'img/head_portrait1.84f92874.jpg',
        id: '1002',
        img: '',
        lastMsg: 'to do',
        name: '大毛',
      },
      {
        detail: '我是大毛',
        headImg: 'img/head_portrait1.84f92874.jpg',
        id: '1002',
        img: '',
        lastMsg: 'to do',
        name: '大毛',
      },
      {
        detail: '我是大毛',
        headImg: 'img/head_portrait1.84f92874.jpg',
        id: '1002',
        img: '',
        lastMsg: 'to do',
        name: '大毛',
      },
    ];
    // getFriend().then((res) => {
    // });
  });
</script>

<style lang="less" scoped>
  .chatHome {
    // margin-top: 20px;
    display: flex;

    .chatLeft {
      width: 280px;

      .title {
        color: #fff;
        padding-left: 10px;
      }

      .online-person {
        margin-top: 100px;

        .onlin-text {
          padding-left: 10px;
          color: rgb(176, 178, 189);
        }

        .person-cards-wrapper {
          padding-left: 10px;
          height: 65vh;
          margin-top: 20px;
          overflow: hidden;
          overflow-y: scroll;
          box-sizing: border-box;

          &::-webkit-scrollbar {
            width: 0;
            /* Safari,Chrome 隐藏滚动条 */
            height: 0;
            /* Safari,Chrome 隐藏滚动条 */
            display: none;
            /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
          }
        }
      }
    }

    .chatRight {
      flex: 1;
      padding-right: 30px;

      .showIcon {
        position: absolute;
        top: calc(50% - 150px);
        /*垂直居中 */
        left: calc(50% - 50px);

        /*水平居中 */
        .icon-snapchat {
          width: 300px;
          height: 300px;
          font-size: 300px;
          // color: rgb(28, 30, 44);
        }
      }
    }
  }
</style>
