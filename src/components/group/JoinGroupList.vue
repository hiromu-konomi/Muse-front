<template>
    <v-list>
        <template v-for="(item, index) in items">
            <v-list-item
                :key="item.groupName"
                :to="item.link"
            >
                <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title >
                        <h1>{{ item.groupName }}</h1>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        管理者：{{ item.ownerName }}
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn class="pink accent-2 " icon>
                        <v-icon color="white">mdi-close</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-divider :key="index"></v-divider>
        </template>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                    groupName: "ロック",
                    subtitle: "許斐 大夢",
                    link: {name: "GroupInfo"},
                },
                {
                    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    groupName: "アニソン",
                    subtitle: "亜樹さん",
                    link: {name: "GroupInfo"},
                },
            ],
        }
    }
}
</script>