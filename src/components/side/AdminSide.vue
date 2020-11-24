<template>
    <v-navigation-drawer permanent absolute>
        <v-list dense nav>            
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.link"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>            
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { title: 'Inquiry', icon: 'mdi-email', link: {name:"Inquiry"}},
                { title: 'Report', icon: 'mdi-card-account-details', link: {name:"Report"}}
            ]
        }
    }
}
</script>
