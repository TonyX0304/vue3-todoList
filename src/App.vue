<script setup lang="ts">
// import { ElButton } from 'element-plus'
const inputRef = ref<string>('')
const listRef = ref([])

const submit = () => {
  if (!inputRef.value) return
  listRef.value.push({
    id: Math.random(),
    content: inputRef.value,
    done: false,
  })
  inputRef.value = ''
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
          </div>
        </template>
        <div>
          <el-form ref="form" @submit.prevent="submit" label-position="top">
            <el-form-item>
              <div class="input-box">
                <el-input v-model="inputRef" size="large" placeholder="Add a new task..." />
                <el-button color="#6c5ce7" size="large" type="primary" :disabled="!inputRef" @click="submit">+</el-button>
                <!-- <el-button color="#6c5ce7" type="primary" :icon="Plus" /> -->
                <!-- <el-icon :size="20">
                  <Edit />
                </el-icon> -->
              </div>
            </el-form-item>
          </el-form>

          <ul class="list">
            <li v-for="item in listRef" :key="item.id" @click="item.done = !item.done">
              <el-checkbox size="large" v-model="item.done"></el-checkbox>
              <p :class="{done: item.done}">{{ item.content }}</p>
              <Edit />
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
  .list {
    max-height: 50vh;
    overflow: auto;
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      border-top: 1px solid #f5f5f5;
      padding: 5px 20px;
      cursor: pointer;
      &:hover {
        background: #f9f9f9;
      }
      .done {
        text-decoration: line-through;
        color: #aaa;
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
