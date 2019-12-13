<template>
  <div id="app">
    <div class="mx-auto max-w-sm overflow-hidden shadow-lg">
      <div class="appBg h-56"></div>
      <div class="px-6 py-6 bg-gray-900">
        <div class="shadow-lg absolute font-bold text-gray-200 text-xl top-0 pt-5">BRAINMELTER</div>
        <div class="shadow-lg mb-5 absolute text-gray-200 top-0 pt-10"><small>Protect yourself with headphones!</small>
        </div>
        <p class="text-gray-700 text-base">
          <form style="box-shadow: inset 0 1px 14px 0px rgba(0, 0, 0, 1), 0 -4px 4px -1px rgba(0, 0, 0, 1)"
            class="controller-form border bg-gray-100 pb-4 pt-1 rounded-lg">
            <h3 v-bind:class="{ turnedOn: app.started}" class="text-center w-full py-2 px-3 leading-tight text-gray-500">OSCILLATOR</h3>
            <div class="flex rounded px-5 py-2 text-sm">
              <div class="flex m-auto">
                <knob-control class="mr-10" primary-color="#f70bb1" text-color="#f70bb1" :size="120" :min="0" :max="3"
                  :stroke-width="8" :value-display-function="toWord" v-model="app.form.waveForm">
                </knob-control>
                <knob-control :size="120" :min="0" primary-color="#0e4788" text-color="#0e4788" :max="20000"
                  :value-display-function="toHz" :stroke-width="8" v-model="app.form.freq">
                </knob-control>
              </div>
            </div>

          </form>
      </div>
      <div class="px-6 py-4 text-center bg-gray-100">
        <button v-show="!app.started" @click="start"
          class="shadow-md bg-purple-100 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded">
          Melt Brain
        </button>
        <button v-show="app.started" @click="stop"
          class="shadow-md bg-red-200 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded">
          Save the world
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import KnobControl from 'vue-knob-control'

  import {
    ref,
    onUpdated,
  } from '@vue/composition-api'

  export default {
    name: 'app',
    components: {
      KnobControl
    },
    setup() {
      let app = ref({
        started: false,
        ctx: new(window.AudioContext || window.webkitAudioContext)(),
        osc: '',
        form: {
          waveForm: 0,
          freq: 440,
        }
      });

      const toWord = (val) => {
        const map = {
          0: 'sine',
          1: 'square',
          2: 'sawtooth',
          3: 'triangle',
        }
        return map[val];
      }

      const toHz = (val) => {
        return val + ' Hz';
      }

      const start = () => {
        app.value.osc = app.value.ctx.createOscillator();
        app.value.osc.connect(app.value.ctx.destination);
        app.value.osc.frequency.value = app.value.form.freq;
        app.value.osc.type = toWord(app.value.form.waveForm);
        app.value.osc.start();
        app.value.started = true;
      }

      const stop = () => {
        app.value.osc.stop();
        app.value.started = false;
      }

      onUpdated(() => {
        if (app.value.osc) {
          app.value.osc.frequency.value = app.value.form.freq;
          app.value.osc.type = toWord(app.value.form.waveForm);
        }
      })

      return {
        app,
        toWord,
        toHz,
        start,
        stop,
      };
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');

html, body {
  font-family: 'Poppins', sans-serif;
}

  .knob-control__text-display {
    font-size: 14px;
  }
  .turnedOn {
    color:red !important;
    text-shadow: 0px 0px 10px red;
  }

  .appBg {
    background-image: url("./assets/background.jpeg");
    background-size: 384px 230px;
    background-repeat: no-repeat;
    background-blend-mode: lighten;
    background-color: #1a202c;
  }
</style>