// <script>
// export default {
//   name: 'FormItemDemo',
//   props: {
//     itemConfig: Object, // 接收配置，外部传入
//   },
//   render(createElement) {
//     return createElement(
//       'el-form-item',
//       {
//         props: {
//           label: this.itemConfig.label, // 表单项的label
//         },
//       },
//       [
//         // 表单组件
//         createElement(
//           this.itemConfig.type,
//           {
//             props: {
//               value: this.itemConfig.value, // 这里是自己实现一个 v-model
//             },
//             on: {
//               change: (nVal) => {
//                 // 这里是自己实现一个 v-model
//                 this.itemConfig.value = nVal;
//               },
//             },
//           },
//           this.itemConfig.optionData &&
//             this.itemConfig.optionData.map((option) => {
//               // 这里只是 本demo 处理 el-select 的 option 数据，实际大家根据具体业务来实现即可
//               return createElement('el-option', {
//                 props: { label: option.label, value: option.value },
//               });
//             })
//         ),
//       ]
//     );
//   },
// };
// </script>
