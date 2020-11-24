<template>
    <div>
        <AdminSide />
        <router-view />
    </div>
</template>

<script>
import AdminSide from '../components/side/AdminSide.vue'

export default {
    
    components: {
        AdminSide,
    }
}
</script>