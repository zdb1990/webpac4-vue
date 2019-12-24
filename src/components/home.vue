<template>
    <div class="home-tpl">
        <router-link to="/power">{{title}}</router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
            title:'我是首页'
        }
    },
    methods:{
    },
    mounted(){
    }
}
</script>
<style scoped>
</style>