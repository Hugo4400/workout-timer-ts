import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

interface State {
  timers: number[];
  timerFunction: boolean | number;
  active: number | void;
  focus: number | void;
  done: boolean;
  reps: number;
}

const state: State = {
  timers: [],
  timerFunction: false,
  active: undefined,
  focus: undefined,
  done: false,
  reps: 0,
};

export default new Vuex.Store({
  state,
  mutations: {
    load(state, timers: number[]) {
      state.timers = timers;
    },
    increment(state, id: number) {
      state.timers.push(id);
    },
    decrement(state, id: number) {
      state.timers = state.timers.filter((t) => t !== id);
    },
    startTimer(state, interval: number) {
      state.timerFunction = interval;
    },
    stopTimer(state, interval: number) {
      clearInterval(interval);
      state.timerFunction = false;
    },
    setActive(state, id: number) {
      if (state.timers.includes(id)) {
        state.active = id;
        state.done = false;
      }
    },
    deactivate(state) {
      state.active = undefined;
    },
    setFocus(state, id: number) {
      if (state.timers.includes(id)) {
        state.focus = id;
      }
    },
    blur(state) {
      state.focus = undefined;
    },
    timerDone(state, id: number) {
      let next: number | void = state.timers[state.timers.indexOf(id) + 1];
      if (typeof next === 'undefined') {
        if (state.reps > 0) {
          state.reps -= 1;
          next = state.timers.find((x) => x !== undefined);
        } else {
          state.done = true;
        }
      }
      state.active = next;
      state.focus = next;
    },
    setReps(state, reps: number) {
      state.reps = reps;
      localStorage.setItem('reps', reps.toString());
    },
    addRep(state) {
      state.reps += 1;
      localStorage.setItem('reps', state.reps.toString());
    },
    removeRep(state) {
      state.reps -= 1;
      localStorage.setItem('reps', state.reps.toString());
    },
  },
});
