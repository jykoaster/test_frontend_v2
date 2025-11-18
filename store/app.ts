export const useAppStore = defineStore('app', () => {
    const userName = ref('')
    const userAge= ref('')
    return { userName,userAge }
})
