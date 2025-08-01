<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useTodoList } from '@/stores/todoList'
const inputRef = ref<string>('')
const todoListStore = useTodoList()
// const todoList = todoListStore.list
// 直接解构获取并保持响应性
// const { list: todoList } = storeToRefs(useTodoList())

const submit = () => {
  if (!inputRef.value) return
  todoListStore.addItem(inputRef.value)
  inputRef.value = ''
}

let editItemValOld = ''
const editItem = (item) => {
  item.edit = true
  editItemValOld = item.content
}

const editItemDone = (item) => {
  item.edit = false
  if (!item.content) {
    item.content = editItemValOld
    ElMessageBox.alert('待办项不能为空')
  }
  editItemValOld = ''
}

const handleDelete = (i) => {
  const item = todoListStore.list[i]
  if (!item.done) {
    ElMessageBox.confirm('还未完成，确定删除么？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      todoListStore.deleteItem(i)

      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
  } else {
    todoListStore.deleteItem(i)

    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
}
</script>

<template>
  <el-row class="box">
    <el-col :span="24">
      <el-card style="max-width: 600px;margin:auto">
        <template #header>
          <div class="card-header">
            <h1>Todo List</h1>
            <span>
              今日事今日毕，勿将今事待明日!.☕
            </span>
          </div>
        </template>
        <div>
          <el-form @submit.prevent label-position="top">
            <el-form-item>
              <div class="input-box">
                <el-input v-model="inputRef" size="large" autofocus @keyup.enter="submit" placeholder="新怎待办事项..." />
                <el-button color="#6c5ce7" size="large" type="primary" :disabled="!inputRef" @click="submit">+</el-button>
                <!-- <el-button color="#6c5ce7" type="primary" :icon="Plus" /> -->
                <!-- <el-icon :size="20">
                  <Edit />
                </el-icon> -->
              </div>
            </el-form-item>
          </el-form>

          <ul class="list">
            <li v-for="(item, i) in todoListStore.list" class="flex" :key="item.id" @click="item.done = !item.done">
              <div class="flex flex-1">
                <el-checkbox size="large" v-model="item.done"></el-checkbox>
                <el-input v-model.trim="item.content" class="content" @click.stop @keyup.enter="editItemDone(item)" @blur="editItemDone(item)" placeholder="不能为空" v-if="item.edit"></el-input>
                <p :class="{done: item.done}" class="content" v-else>{{ item.content }}</p>
              </div>
              <div class="flex actions">
                <el-button type="primary" @click.stop="" @click="editItem(item)" :disabled="item.edit || item.done" :icon="Edit" circle />
                <el-button type="danger" @click.stop="" :icon="Delete" @click="handleDelete(i)" circle />
              </div>
            </li>
          </ul>
        </div>
        <template #footer>
          <div class="counts">
            <p>{{todoListStore.notCompleted.length ? `还剩 ${ todoListStore.notCompleted.length } 项没完成` : '完美收工'}}</p>
            <p class="pointer" @click="todoListStore.clearCompleted" v-show="todoListStore.list.length - todoListStore.notCompleted.length">清除已完成</p>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.box {
  margin-top: 20px;
}
.pointer {
  cursor: pointer;
  user-select: none !important;
}
:deep(.el-card__header) {
  background-color: #6c5ce7;
}
.card-header {
  text-align: center;
  color: #fff;
}

:deep(.el-card__body) {
  padding: 0;
  .el-form-item {
    margin: 0;
  }
  .input-box {
    display: flex;
    padding: 20px;
    width: 100%;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex-1 {
    flex: 1;
  }
  .list {
    max-height: 50vh;
    overflow: auto;
    li {
      gap: 20px;
      border-top: 1px solid #f5f5f5;
      padding: 5px 20px;
      cursor: pointer;
      justify-content: space-between;
      &:hover {
        background: #f9f9f9;
      }
      .done {
        text-decoration: line-through;
        color: #aaa;
      }
      .content {
        margin-left: 10px;
      }
    }
  }
}

:deep(.el-card__footer) {
  padding: 0;
  .counts {
    display: flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    color: #666;
    padding: 5px 20px;
  }
}
</style>
