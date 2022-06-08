export function confirm(instance) {
  const internalInstace = instance
  const confirms = internalInstace.appContext.config.globalProperties.$confirm
  return confirms
}
