<template>
    <div>
        <SideAddGroup />
        <v-main>
            <v-container>
                <v-layout justify-center>
                    <v-flex xs9 mt-5>
                        <v-card>
                            <v-card-text>
                                グループ名
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>              
            </v-container>
        </v-main>
    </div>
</template>

<script>
import SideAddGroup from "../components/side/SideAddGroup.vue"

export default {
    components: {
        SideAddGroup,
    }
}
</script>