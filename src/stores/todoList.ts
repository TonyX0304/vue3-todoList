import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


interface TodoItem {
  id: string
  content: string
  done: boolean
  edit: boolean
  createdAt: number
}

export const useTodoList = defineStore('todoList', () => {
  const list = ref<TodoItem[]>([])

  const notCompleted = computed(() => {
    return list.value.filter(item => !item.done)
  })

  const addItem = (content: string) => {
    list.value.unshift({
      id: generateId(),
      content,
      done: false,
      edit: false,
      createdAt: Date.now()
    })
  }

  /**
   * 删除某一项函数
   * @param {number} i - 删除项下标
   */
  const deleteItem = (i: number) => {
    list.value.splice(i, 1)
  }

  const clearCompleted = () => {
    list.value = notCompleted.value
  }

  return { list, notCompleted, addItem, deleteItem, clearCompleted }
}, {
  // 开启持久化 (第二个配置参数)
  persist: true
})


function generateId(): string {
  return Date.now() + Math.random().toString(36).slice(2)
}
