<template>
    <div>
        <SideNav />
        <router-view />
        <SideSearch />
    </div>
</template>

<script>
import SideNav from '../components/side/SideNav.vue'
import SideSearch from '../components/side/SideSearch.vue'

export default {
    
    components: {
        SideNav,
        SideSearch,
    }
}
</script>