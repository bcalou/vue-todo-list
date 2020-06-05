<template>
  <div class="home">
    <header>
      <h1 class="home__title">Todo list</h1>
    </header>

    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoList from '@/components/TodoList/TodoList.vue';

export default Vue.extend({
  name: 'home',
  components: {
    TodoList,
  },
});
</script>

<style lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.home__title {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
</style>