export function toast(instance) {
  const internalInstace = instance
  const toasts = internalInstace.appContext.config.globalProperties.$message
  return toasts
}
