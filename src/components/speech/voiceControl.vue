<template>
  <div>
    <canvas class="visualizer" ref="visualizer" width="320" height="100"></canvas>
  </div>
</template>

<script>
import annyang from "annyang";
export default {

  props: {
  },
  methods: {
    voiceControl() {
      if (annyang) {
        console.log(annyang)
        var themeBlue = {
          "主题 (恢复) 默认": () => {
            // this.$store.commit("themeBlue", true);
            this.$store.commit("theme", 'defalut');
          },
          "主题 (切换) 蓝色": () => {
            // this.$store.commit("themeBlue", true);
            this.$store.commit("theme", 'blue');
          }
        }
        var themeRed = {
          "主题 (切换) 红色": () => {
            // this.$store.commit("themeRed", true);
            this.$store.commit("theme", 'red');
          }
        }
        var themeGreen = {
          "主题 (切换) 绿色": () => {
            // this.$store.commit("themeGreen", true);
            this.$store.commit("theme", 'green');
          }
        }
        //设置识别语音：
        annyang.setLanguage('zh-CN');
        // 添加命令
        annyang.addCommands(themeBlue);
        annyang.addCommands(themeRed);
        annyang.addCommands(themeGreen);
        annyang.start();

        // annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
        //   console.log(userSaid);
        //   console.log(commandText);
        //   console.log(phrases);
        // });

        // annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
        //   console.log(userSaid);
        //   console.log(commandText);
        //   console.log(phrases);
        // });

        annyang.addCallback('result', function (e) {
          console.log(e);
        });

      }
    },
    visualizer() {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      console.log(audioCtx)
      var source;
      var analyser = audioCtx.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      console.log(analyser)

      var distortion = audioCtx.createWaveShaper();
      var gainNode = audioCtx.createGain();
      var biquadFilter = audioCtx.createBiquadFilter();

      var canvas = document.querySelector('.visualizer');
      var canvasCtx = canvas.getContext("2d");
      console.log(canvasCtx)
      // var drawVisual;

      var constraints = { audio: true }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioCtx.destination);
        // visualize();

        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        analyser.fftSize = 512;
        var bufferLength = analyser.fftSize;
        var dataArray = new Uint8Array(bufferLength);
        console.log(dataArray)
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        // console.log(canvasCtx)
        var draw = function () {
          requestAnimationFrame(draw);
          analyser.getByteTimeDomainData(dataArray);
          canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx.lineWidth = 1;
          // console.log(1)
          var gradient = canvasCtx.createLinearGradient(0, 0, 320, 0);
          gradient.addColorStop("0", "red");
          gradient.addColorStop("0.5", "yellow");
          gradient.addColorStop("1.0", "red");

          canvasCtx.strokeStyle = gradient;
          canvasCtx.beginPath();

          var sliceWidth = WIDTH * 1.0 / bufferLength;
          var x = 0;
          for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
        };
        draw();
      })

      // function visualize() {
      //   WIDTH = canvas.width;
      //   HEIGHT = canvas.height;
      //   var visualSetting = 'sinewave';
      //   if (visualSetting === "sinewave") {
      //     analyser.fftSize = 2048;
      //     var bufferLength = analyser.fftSize;
      //     var dataArray = new Uint8Array(bufferLength);
      //     canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      //     var draw = function () {
      //       drawVisual = requestAnimationFrame(draw);
      //       analyser.getByteTimeDomainData(dataArray);
      //       canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      //       canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      //       canvasCtx.lineWidth = 2;
      //       canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      //       canvasCtx.beginPath();
      //       var sliceWidth = WIDTH * 1.0 / bufferLength;
      //       var x = 0;
      //       for (var i = 0; i < bufferLength; i++) {
      //         var v = dataArray[i] / 128.0;
      //         var y = v * HEIGHT / 2;
      //         if (i === 0) {
      //           canvasCtx.moveTo(x, y);
      //         } else {
      //           canvasCtx.lineTo(x, y);
      //         }
      //         x += sliceWidth;
      //       }
      //       canvasCtx.lineTo(canvas.width, canvas.height / 2);
      //       canvasCtx.stroke();
      //     };
      //     draw();
      //   } else if (visualSetting == "frequencybars") {
      //     analyser.fftSize = 256;
      //     var bufferLengthAlt = analyser.frequencyBinCount;
      //     console.log(bufferLengthAlt);
      //     var dataArrayAlt = new Uint8Array(bufferLengthAlt);
      //     canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      //     var drawAlt = function () {
      //       drawVisual = requestAnimationFrame(drawAlt);
      //       analyser.getByteFrequencyData(dataArrayAlt);
      //       canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      //       canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      //       var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
      //       var barHeight;
      //       var x = 0;
      //       for (var i = 0; i < bufferLengthAlt; i++) {
      //         barHeight = dataArrayAlt[i];
      //         canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',0,0)';
      //         canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
      //         x += barWidth + 1;
      //       }
      //     };
      //     drawAlt();
      //   } else if (visualSetting == "off") {
      //     canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      //     canvasCtx.fillStyle = "red";
      //     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      //   }
      // }
    },
    draw(canvas, analyser, canvasCtx, WIDTH, HEIGHT, dataArray, bufferLength) {
      requestAnimationFrame(this.draw(canvas, analyser, canvasCtx, WIDTH, HEIGHT, dataArray, bufferLength));
      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      canvasCtx.beginPath();
      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }
  },
  mounted() {
    this.voiceControl();
    this.visualizer();
  }
};
</script>
