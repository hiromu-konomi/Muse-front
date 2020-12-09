<template>
    <v-container>
        <v-row>
            <v-col>
                <!-- <div class="flex"> -->
                    <GroupMemberManager />
                    <GroupMemberUser />
                    <GroupMemberInvited />
                <!-- </div> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import GroupMemberUser from "./GroupMemberUser.vue";
import GroupMemberManager from "./GroupMemberManager.vue";
import GroupMemberInvited from "./GroupMemberInvited.vue";

export default {
    name: 'GroupMember',
    components: {
        GroupMemberUser,
        GroupMemberManager,
        GroupMemberInvited,
    }
}
</script>

<style>
/* .flex{
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
} */
</style>