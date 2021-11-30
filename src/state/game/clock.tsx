export const clock = (timeout: number) => (
  new Promise((resolve) => setTimeout(resolve, timeout))
)