// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  interface GlobalComponents {
    VChart: typeof import('vue-echarts').default
  }
}

export { }
