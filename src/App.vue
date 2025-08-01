<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
const inputRef = ref<string>('')
const listRef = ref([])
const counterStore = useCounterStore()

const submit = () => {
  if (!inputRef.value) return
  listRef.value.push({
    id: Math.random(),
    content: inputRef.value,
    done: false,
    edit: false,
  })
  inputRef.value = ''
}

const handleDelete = (i) => {
  const item = listRef.value[i]
  if (!item.done) {
    ElMessageBox.confirm('还未完成，确定删除么？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      listRef.value.splice(i, 1)

      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
  } else {
    listRef.value.splice(i, 1)

    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
}

const clearCompleted = () => {
  listRef.value = listRef.value.filter((item) => !item.done)
}
</script>

<template>
  <el-row class="box">
    <el-col :span="24">
      <el-card style="max-width: 600px;margin:auto">
        <template #header>
          <div class="card-header">
            <h1>Todo List</h1>
            <span>Get things done, one item at a time</span>

            <h2>{{counterStore.count}}</h2>
          </div>
        </template>
        <div>
          <el-form @submit.prevent label-position="top">
            <el-form-item>
              <div class="input-box">
                <el-input v-model="inputRef" size="large" autofocus @keyup.enter="submit" placeholder="Add a new task..." />
                <el-button color="#6c5ce7" size="large" type="primary" :disabled="!inputRef" @click="submit">+</el-button>
                <!-- <el-button color="#6c5ce7" type="primary" :icon="Plus" /> -->
                <!-- <el-icon :size="20">
                  <Edit />
                </el-icon> -->
              </div>
            </el-form-item>
          </el-form>

          <ul class="list">
            <li v-for="(item, i) in listRef" class="flex" :key="item.id" @click="item.done = !item.done">
              <div class="flex flex-1">
                <el-checkbox size="large" v-model="item.done"></el-checkbox>
                <el-input v-model="item.content" class="content" @click.stop @keyup.enter="item.edit = false" @blur="item.edit = false" placeholder="不能为空" v-if="item.edit"></el-input>
                <p :class="{done: item.done}" class="content" v-else>{{ item.content }}</p>
              </div>
              <div class="flex actions">
                <el-button type="primary" @click.stop="" @click="item.edit = true" :disabled="item.edit || item.done" :icon="Edit" circle />
                <el-button type="danger" @click.stop="" :icon="Delete" @click="handleDelete(i)" circle />
              </div>
            </li>
          </ul>
        </div>
        <template #footer>
          <div class="counts">
            <p>{{ listRef.length }} items left</p>
            <p class="pointer" @click="clearCompleted">Clear completed</p>
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
