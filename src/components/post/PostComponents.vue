<template>
            <v-card flat outlined max-width="500"
            class="mt-3"
            >
                <v-card-title>
                    <v-list-item class="pl-0">
                        <router-link :to="{name: 'mypage', params: 'userNum' }">
                            <v-list-item-avatar color="grey"
                            size="40"
                            >
                                <v-img :src="tweet.user.avatarUrl" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ tweet.user.userName }}
                                </v-list-item-title>
                                <v-spacer></v-spacer>
                            </v-list-item-content>
                        </router-link>
                    </v-list-item>
                </v-card-title>

               <v-row justify="center" align-content="center">
                <v-col cols="4">
                <v-card-text class="text--primary">
                    {{ tweet.postText }}
                </v-card-text>
                </v-col>
               
                   <v-col class="music" cols="4">
                    <ul>
                    <li><v-img :src="tweet.music.image" /></li>
                    <li>{{ tweet.music.artistName }}</li>
                    <li>{{ tweet.music.musicName }}</li>
                    </ul>
                    </v-col>
               </v-row>


                <v-card-actions>
                    <v-btn
                    v-for="button in buttons"
                    :key="button.icon"
                    :href="button.url"
                    :color="button.color"
                    icon
                    >
                        <v-icon>{{ button.icon }}</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <span class="body-2 font-weight-light">
                        {{ tweet.tweetedAt }}
                    </span>
                </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';
export default {
    data() {
        return {
            userNum: '',
            tweet: {
                tweetId: "00000",
                music: '',
                postText: '',
                tweetedAt: "2020-12-09 10:51",
                user: {
                    userName: '',
                    avatarUrl: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                },
                postId: '',
            },
        }
    },
    created: async function(){
        this.userNum = this.$store.state.userNum;
        this.tweet.postId = 49;
        const res = await axios.get('http://localhost:8080/getMusicInfo', {
                params: {
                    postId: this.tweet.postId,
                }
            })
            this.tweet.music=res.data
            console.log("music=" + this.tweet.music.image)

         const rev = await axios.get('http://localhost:8080/getReview', {
            params: {
                postId: this.tweet.postId,
            }
        })
        this.tweet.postText=rev.data
        console.log(this.tweet.postText)

        await this.refresh(this.$store.state.userNum);
        this.tweet.user.userName = this.$store.state.rForm.userName;

    },
    methods: {
    ...mapActions(["refresh"])
    },
    computed: {
        buttons() {
            return [
                { color: "gray", icon: "mdi-chat-outline" },
                { color: "green", icon: "mdi-twitter-retweet" },
                { color: "pink", icon: "mdi-heart-outline" }
            ]
        },
    },
}
</script>

<style>
.music{
    display: flex-end;
    flex-direction: column;
}

ul li{
    list-style: none;
}
</style>