<template>
  <div class="bg-dark w-full h-screen flex flex-col justify-center items-center gap-5">
    <div class="w-[310px] sm:w-[550px] border border-solid border-gray-400 rounded-3xl py-8">
      <div class="sm:w-[400px] mx-auto px-2">
        <p class="text-center text-white my-0 text-3xl font-bold">{{ $t('Action') }}</p>
        <ETextField v-model="appStore.userName" class="my-2" :label="$t('Name')" />
        <ETextField
          v-model="appStore.userAge"
          class="mt-2 mb-10"
          :label="$t('Age')"
          type="number"
        />
        <div class="flex justify-end gap-8">
          <EBtn class="px-3 py-2" color="success" :text="$t('Modify')" @click="modifyUser" />
          <EBtn class="px-3 py-2" color="warn" :text="$t('Add')" @click="addUser" />
        </div>
      </div>
    </div>
    <div class="w-[310px] sm:w-[550px] border border-solid border-gray-400 rounded-3xl mx-5 py-8">
      <div class="sm:w-[400px] mx-auto px-2">
        <div
          class="grid grid-cols-[0.5fr_2fr_1fr_3fr] sm:grid-cols-[0.5fr_2fr_1fr_3fr] gap-4 p-4 text-white font-bold text-lg border-b border-gray-600"
        >
          <div class="text-center">#</div>
          <div>{{ $t('Name') }}</div>
          <div class="text-center">{{ $t('Age') }}</div>
          <div class="text-center">{{ $t('Action') }}</div>
        </div>
        <div class="h-[300px] overflow-auto hide-scrollbar">
          <div
            v-for="user in users"
            :key="user.id"
            class="grid grid-cols-[0.5fr_2fr_1fr_3fr] sm:grid-cols-[0.5fr_2fr_1fr_3fr] gap-4 py-3 px-4 text-white border-b border-gray-700 last:border-b-0"
          >
            <div class="text-center">{{ user.id }}</div>
            <div>{{ user.name }}</div>
            <div class="text-center">{{ user.age }}</div>
            <div class="flex justify-center sm:justify-center gap-4">
              <EBtn
                class="p-1 text-sm sm:text-base"
                color="success"
                :text="$t('Modify')"
                @click="modifyUser(user)"
              />
              <EBtn
                class="p-1 text-sm sm:text-base"
                color="error"
                :text="$t('Delete')"
                @click="deleteUser(user)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import EBtn from '@/components/EBtn.vue'
import ETextField from '@/components/ETextField.vue'
const appStore = useAppStore()
const baseUrl = ''

const addUser = () => {
  console.log('新增使用者', appStore.userName, appStore.userAge)
}

const modifyUser = (user?: { id: number; name: string; age: number }) => {
  console.log('修改使用者', user)
}

const deleteUser = (user: { id: number; name: string; age: number }) => {
  console.log('刪除使用者', user)
}

const users = ref([
  { id: 1, name: '林建智', age: 16 },
  { id: 2, name: '吳政員', age: 19 },
  { id: 3, name: '楊怡宏', age: 18 },
  { id: 4, name: '李建宇', age: 20 },
  { id: 5, name: '蘇名正', age: 15 },
  { id: 6, name: '張志豪', age: 22 },
  { id: 7, name: '陳冠宇', age: 21 },
  { id: 8, name: '黃子軒', age: 17 },
])
</script>

<style scoped lang="scss">
.hide-scrollbar {
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  overflow: auto;
}
</style>
