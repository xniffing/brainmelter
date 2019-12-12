<template>
<div id="app">
    <div class="mx-auto max-w-sm overflow-hidden shadow-lg">
      <img src="@/assets/background.jpeg" class="w-full">
      <div class="px-6 py-4">
        <div class="shadow-lg absolute font-bold text-gray-200 text-xl top-0 pt-5">BRAINMELTER</div>
        <div class="shadow-lg mb-5 absolute text-gray-200 top-0 pt-10"><small>Protect yourself with headphones!</small>
        </div>
        <p class="text-gray-700 text-base">
          <form class="controller-form">
            <h3 class="mt-3 text-center w-full py-2 px-3 leading-tight bg-red-800 text-gray-200">Wave shape</h3>
            <div class=" shadow-md wave rounded border px-5 py-2 text-sm">
              <div class="radio-group">
                <div v-for="wave in waveForms" v-bind:key="wave">
                <input type="radio" v-model="form.waveForm" :value="wave" :id="wave" name="selector"><label
                  :for="wave">{{wave}}</label>
                </div>
              </div>
            </div>
            <div class=" shadow-md border frequency my-8">
              <h3 class=" text-center w-full py-2 px-3 leading-tight bg-indigo-800 text-gray-200">Frequency Hz</h3>
              <input class="w-11/12 m-3 text-gray-700 leading-tight focus:outline-none" type="range" min="0" max="20000"
                step="any" v-model="form.freq">
            </div>
          </form>
      </div>
      <div class="px-6 py-4 text-center">
        <button @click="start"
          class="mr-5 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded">
          Melt Brain
        </button>
        <button @click="stop"
          class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded">
         Save the world 
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
        ctx: new(window.AudioContext || window.webkitAudioContext)(),
        osc: null,
        roundHz: null,
        form: {
          waveForm: 'sine',
          freq: 440
        },
        waveForms: ['sine', 'square', 'sawtooth', 'triangle']
      }
    },
    filters: {
      roundHz: function (value) {
        if (!value) return ''
        return Math.Round(value)
      }
    },
    updated() {
      if (this.osc) {
        this.osc.frequency.value = this.form.freq;
        this.osc.type = this.form.waveForm;
      }
    },
    methods: {
      start() {
        this.osc = this.ctx.createOscillator();
        this.osc.connect(this.ctx.destination);
        this.osc.frequency.value = this.form.freq;
        this.osc.type = this.form.waveForm;
        this.osc.start();
      },
      stop() {
        this.osc.stop();
      }
    }
}
</script>

<style scoped>


</style>