export const useAppStore = defineStore('app', () => {
  const userName = ref('')
  const userAge = ref('')
  const tableUserName = ref('')
  const tableUserAge = ref('')
  return { userName, userAge, tableUserName, tableUserAge }
})
