<template>
  <div>
  </div>
</template>

<script>
import annyang from "annyang";
export default {

  props: {
  },
  methods: {
    init() {
      if (annyang) {
        console.log(annyang)
        var themeBlue = {
          "主题 (恢复) 默认": () => {
            this.$store.commit("themeBlue", true);
            this.$store.commit("theme", 'defalut');
          },
          "主题 (切换) 蓝色": () => {
            this.$store.commit("themeBlue", true);
            this.$store.commit("theme", 'blue');
          }
        }
        var themeRed = {
          "主题 (切换) 红色": () => {
            this.$store.commit("themeRed", true);
            this.$store.commit("theme", 'red');
          }
        }
        var themeGreen = {
          "主题 (切换) 绿色": () => {
            this.$store.commit("themeGreen", true);
            this.$store.commit("theme", 'green');
          }
        }
        //设置识别语音：
        annyang.setLanguage('zh-CN');
        // 添加命令
        annyang.addCommands(themeBlue);
        annyang.addCommands(themeRed);
        annyang.addCommands(themeGreen);
        // annyang.newState = true;
        annyang.start();

        annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
          console.log(userSaid); // sample output: 'hello'
          console.log(commandText); // sample output: 'hello (there)'
          console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
        });

        annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
          console.log(userSaid); // sample output: 'hello'
          console.log(commandText); // sample output: 'hello (there)'
          console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
        });

        annyang.addCallback('result', function (e) {
          console.log(e);
        });

      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
