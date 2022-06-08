export function http(instance) {
  const internalInstace = instance
  const https = internalInstace.appContext.config.globalProperties.$http
  return https
}
