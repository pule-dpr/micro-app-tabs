export const isProd = process.env.NODE_ENV === 'production'
export { APP_ID, API_TIME_OUT, APP_NAME, CDN_CACHED_TIME, MicroAppDataType, PUBLIC_PATH } from './constant'
// 是否基座下运行
export const RUNING_IN_MICRO_APP = window.__MICRO_APP_ENVIRONMENT__
