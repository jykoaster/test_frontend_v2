<template>
  <div class="bg-dark w-full h-screen flex flex-col justify-center items-center gap-5">
    <div class="w-[310px] sm:w-[550px] border border-solid border-gray-400 rounded-3xl py-8">
      <div class="sm:w-[400px] mx-auto px-2">
        <p class="text-center text-white my-0 text-2xl sm:text-3xl font-bold">{{ $t('Action') }}</p>
        <ETextField v-model="appStore.userName" class="my-2" :label="$t('Name')" />
        <ETextField
          v-model="appStore.userAge"
          class="mt-2 mb-10"
          :label="$t('Age')"
          type="number"
        />
        <div class="flex justify-end gap-4 sm:gap-6">
          <EBtn
            class="px-4 py-1 text-sm sm:text-base"
            color="success"
            :text="$t('Modify')"
            @click="modifyUser"
          />
          <EBtn
            class="px-4 py-1 text-sm sm:text-base"
            color="warn"
            :text="$t('Add')"
            @click="addUser"
          />
        </div>
      </div>
    </div>
    <div class="w-[310px] sm:w-[550px] border border-solid border-gray-400 rounded-3xl mx-5 py-8">
      <div class="sm:w-[400px] mx-auto px-2">
        <div
          class="grid grid-cols-14 gap-4 py-4 text-white font-bold text-base sm:text-lg border-b border-gray-600"
        >
          <div class="text-center col-span-1">#</div>
          <div class="text-center col-span-4 sm:col-span-5">{{ $t('Name') }}</div>
          <div class="text-center col-span-3">{{ $t('Age') }}</div>
          <div class="text-center col-span-6 sm:col-span-5">{{ $t('Action') }}</div>
        </div>
        <div class="h-[300px] overflow-auto hide-scrollbar">
          <div
            v-for="user in users"
            :key="user.id"
            class="grid grid-cols-14 items-center gap-4 py-3 text-white text-base sm:text-lg border-b border-gray-700 last:border-b-0"
          >
            <div class="text-center col-span-1">{{ user.id }}</div>
            <input
              v-if="editId === user.id"
              v-model="appStore.tableUserName"
              class="col-span-4 sm:col-span-5 w-full box-border bg-transparent border border-solid border-gray-400 rounded text-sm sm:text-base text-white font-bold px-2 py-1"
              :label="$t('Name')"
            />
            <div v-if="editId !== user.id" class="text-center col-span-4 sm:col-span-5">
              {{ user.name }}
            </div>
            <input
              v-if="editId === user.id"
              v-model="appStore.tableUserAge"
              class="col-span-3 w-full box-border bg-transparent border border-solid border-gray-400 rounded text-sm sm:text-base text-white font-bold px-2 py-1"
              :label="$t('Age')"
              type="number"
            />
            <div v-if="editId !== user.id" class="text-center col-span-3">{{ user.age }}</div>
            <div class="flex justify-between gap-1 sm:gap-2 col-span-6 sm:col-span-5">
              <EBtn
                v-if="editId !== user.id"
                class="p-1 w-15 text-sm sm:text-base"
                color="success"
                :text="$t('Modify')"
                @click="selectUser(user.id)"
              />
              <EBtn
                v-if="editId === user.id"
                class="p-1 w-15 text-sm sm:text-base"
                color="success"
                :text="$t('Save')"
                @click="saveUser"
              />
              <EBtn
                v-if="editId !== user.id"
                class="p-1 w-15 text-sm sm:text-base"
                color="error"
                :text="$t('Delete')"
                @click="deleteUser(user)"
              />
              <EBtn
                v-if="editId === user.id"
                class="p-1 w-15 text-sm sm:text-base"
                color="error"
                :text="$t('Cancel')"
                @click="initSelectUser"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EDialog ref="dialogRef" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import EBtn from '@/components/EBtn.vue'
import ETextField from '@/components/ETextField.vue'
import EDialog from '@/components/EDialog.vue'
import { useI18n } from '#i18n'
import { userRepository } from '@/api/user'
const { t } = useI18n()
const appStore = useAppStore()

interface DialogExposed {
  show: (title: string, message: string, onConfirm?: () => void, onCancel?: () => void) => void
  close: () => void
}

interface User {
  id: number
  name: string
  age: number
}

const { data: users, refresh } = useAsyncData('ssr-axios-users', async () => {
  const res = await userRepository.getUsers()
  return res.data
})

const dialogRef = ref<DialogExposed | null>(null)

const validateUserInput = (): boolean => {
  let errorMessage = ''
  if (!appStore.userName) {
    errorMessage = `${t('Name')} ${t('Is required')}<br/>`
  }

  if (!appStore.userAge) {
    errorMessage += `${t('Age')} ${t('Is required')}<br/>`
  } else {
    const age = Number(appStore.userAge)
    if (isNaN(age) || age <= 0 || age >= 999) {
      errorMessage += `${t('Age')} ${t('Age must legal')}<br/>`
    }
  }
  if (errorMessage) {
    if (dialogRef.value) {
      dialogRef.value.show(t('Error'), errorMessage)
    }
    return false
  }
  return true
}

const initUserInput = () => {
  appStore.userName = ''
  appStore.userAge = ''
}

const addUser = () => {
  if (!validateUserInput()) {
    return
  }
  const tar = users.value && users.value.find((user) => user.name === appStore.userName)
  if (tar) {
    dialogRef.value!.show(t('Error'), `${t('User already exists')}`)
    return
  }
  dialogRef.value!.show(
    t('ConfirmTitle', { active: t('Add').toLocaleLowerCase() }),
    `${t('ConfirmMessage')}<br/>${t('Name')}：${appStore.userName}<br/>${t('Age')}：${appStore.userAge}`,
    async () => {
      try {
        await userRepository.addUser({
          name: appStore.userName,
          age: Number(appStore.userAge),
        })
        await refresh()
        initUserInput()
        dialogRef.value!.show(
          t('Success'),
          `${t('Action successfully', { active: t('Add').toLocaleLowerCase() })}`
        )
      } catch (e) {
        dialogRef.value!.show(
          t('Error'),
          `${t('Action Failed', { active: t('Add').toLocaleLowerCase() })}`
        )
      }
    }
  )
}

const modifyUser = async () => {
  if (!validateUserInput()) {
    return
  }
  const tar = users.value && users.value.find((user) => user.name === appStore.userName)
  if (!tar) {
    dialogRef.value!.show(t('Error'), `${t('User not found')}`)
    return
  }
  dialogRef.value!.show(
    t('ConfirmTitle', { active: t('Modify').toLocaleLowerCase() }),
    `${t('ConfirmMessage')}<br/>${t('Name')}：${appStore.userName}<br/>${t('Age')}：${appStore.userAge}`,
    async () => {
      try {
        await userRepository.updateUser({
          id: tar ? tar.id : 0,
          name: appStore.userName,
          age: Number(appStore.userAge),
        })
        await refresh()
        initUserInput()
        dialogRef.value!.show(
          t('Success'),
          `${t('Action successfully', { active: t('Modify').toLocaleLowerCase() })}`
        )
      } catch (e) {
        dialogRef.value!.show(
          t('Error'),
          `${t('Action Failed', { active: t('Modify').toLocaleLowerCase() })}`
        )
      }
    }
  )
}

const deleteUser = (user: User) => {
  dialogRef.value!.show(t('ConfirmDeleteTitle', { name: user.name }), '', async () => {
    try {
      await userRepository.deleteUser(user.id)
      await refresh()
      initSelectUser()
      dialogRef.value!.show(
        t('Success'),
        `${t('Action successfully', { active: t('Delete').toLocaleLowerCase() })}`
      )
    } catch (e) {
      dialogRef.value!.show(
        t('Error'),
        `${t('Action Failed', { active: t('Delete').toLocaleLowerCase() })}`
      )
    }
  })
}

const editId = ref<number | null>(null)

const selectUser = (id: number) => {
  editId.value = id
  const tar = users.value && users.value.find((user) => user.id === id)
  appStore.tableUserName = tar ? tar.name : ''
  appStore.tableUserAge = tar ? String(tar.age) : ''
}

const initSelectUser = () => {
  editId.value = null
  appStore.tableUserName = ''
  appStore.tableUserAge = ''
}

const validateTableUserInput = (): boolean => {
  let errorMessage = ''
  if (!appStore.tableUserName) {
    errorMessage = `${t('Name')} ${t('Is required')}<br/>`
  }

  if (!appStore.tableUserAge) {
    errorMessage += `${t('Age')} ${t('Is required')}<br/>`
  } else {
    const age = Number(appStore.tableUserAge)
    if (isNaN(age) || age <= 0 || age >= 999) {
      errorMessage += `${t('Age')} ${t('Age must legal')}<br/>`
    }
  }
  if (errorMessage) {
    dialogRef.value!.show(t('Error'), errorMessage)

    return false
  }
  return true
}

const saveUser = () => {
  if (!validateTableUserInput()) {
    return
  }

  dialogRef.value!.show(
    t('ConfirmTitle', { active: t('Modify').toLocaleLowerCase() }),
    `${t('ConfirmMessage')}<br/>${t('Name')}：${appStore.tableUserName}<br/>${t('Age')}：${appStore.tableUserAge}`,
    async () => {
      const tar = users.value && users.value.find((user) => user.id === editId.value)
      try {
        await userRepository.updateUser({
          id: tar!.id,
          name: appStore.tableUserName,
          age: Number(appStore.tableUserAge),
        })
        await refresh()
        initSelectUser()
        dialogRef.value!.show(
          t('Success'),
          `${t('Action successfully', { active: t('Modify').toLocaleLowerCase() })}`
        )
      } catch (e) {
        dialogRef.value!.show(
          t('Error'),
          `${t('Action Failed', { active: t('Modify').toLocaleLowerCase() })}`
        )
      }
    }
  )
}
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
// 隱藏 number input 的上下箭頭
input[type='number'] {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
