<template>
    <div>
        <SideNav />
        <SideSearch />
        <v-main>
            <router-view />
        </v-main>
    </div>
</template>

<script>
import SideNav from '../components/side/SideNav.vue'
import SideSearch from '../components/side/SideSearch.vue'

export default {
    name: "Main",
    
    components: {
        SideNav,
        SideSearch,
    }
}
</script>