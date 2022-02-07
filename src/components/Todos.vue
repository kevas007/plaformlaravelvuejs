<template>
    <div>
        <div v-if="getTodos.length >0">
            <v-container class="mt-10">
                <div class="row">
                    <Todo  v-for="item in  getTodos" :key="item.id"  :todos="item"></Todo>
                </div>
            </v-container>
        </div>
        <div v-else>
            <p class="mt-10 text-center accent-2 mdi-leaf-circle">Aucune tâche</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Todo from './Todo.vue'

export default {
    mounted() {
        this.$store.dispatch("getTodos");
    },
    computed: {
        ...mapGetters([
            "getTodos"
        ])
    },
    components: { Todo }
}
</script>