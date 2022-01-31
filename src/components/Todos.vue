<template>
    <div>
        <div v-if="getTodos != null">
            <v-container class="mt-10">
                <div class="row">
                    <Todo  v-for="item in  getTodos" :key="item.id"  :todos="item"></Todo>
                </div>
            </v-container>
        </div>
        <div v-else>
            <p>Aucune tâche</p>
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