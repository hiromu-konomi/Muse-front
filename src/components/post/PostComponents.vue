<template>
  <v-card flat outlined max-width="700" height="300" class="mt-3">
    <v-list>
    <v-card-title>
        <router-link :to="{ name: 'userpage', params: { user_id: userNum } }">
          <v-list-item-avatar color="grey" size="40">
            <v-img :src="tweet.user.avatarUrl" />
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <v-list-item-title class="userName">
            {{ tweet.user.userName }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item class="likeButton">
          <good-button :postId= "postId" :countNum= "countNum" :likeStatus= "likeStatus" ></good-button>
        <v-icon @click="deleteConfilm" class="deleteButton">mdi-delete</v-icon>
        <!-- 削除確認ダイアログを追加 -->
        <v-dialog v-model="deleteDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">削除確認</v-card-title>
            <v-card-text>削除してもよろしいですか？</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="deleteDialog = false">キャンセル</v-btn>
              <v-btn color="green darken-1" text @click="deleteItem">削除</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-list-item>
        <v-list-item class="checkButton">
          <check-button :postId= "postId" :countCheck= "checkCount" :checkStatus= "checkStatus"></check-button>
        </v-list-item>
    </v-card-title>
    </v-list>


    <table>
      <tr>
        <th rowspan="2">
          <v-img :src="tweet.musicImage" />
        </th>
        <td class="artistName">
          {{ tweet.artistName }}
        </td>
      </tr>
          <td class="musicName">{{ tweet.musicName }}</td>
    </table>
      <hr />

      <div class="postText">
        {{ tweet.postText }}
      </div>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
import GoodButton from './HeartButton'
import CheckButton from './CheckButton'
import axios from 'axios';
export default {
    components: {
    'good-button': GoodButton,
    'check-button': CheckButton,
    },
    data() {
        return {
            userNum: '',
            postId: '',
            countNum: this.info.likeCount,
            likeStatus: this.info.likeStatus,
            checkCount: this.info.checkCount,
            checkStatus: this.info.checkStatus,
            deleteDialog: false,
            tweet: {
                artistName: '',
                musicName: '',
                musicImage: '',
                postText: '',
                user: {
                    userName: '',
                    avatarUrl: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                },
            },
        }
    },
    props: ['info'],
    created: async function(){
        // this.$router.go({path: this.$router.currentRoute.path, force: true})
        this.userNum = this.info.userNum;
        await this.refresh(this.userNum);
        this.tweet.user.userName = this.info.userName;
        this.tweet.artistName = this.info.artistName;
        this.tweet.musicName = this.info.musicName;
        this.tweet.musicImage = this.info.musicImage;
        this.tweet.postText = this.info.postText;
        this.postId = this.info.postId;
    },
    methods: {
      //削除確認ダイアログ表示を追加
      deleteConfilm(){
        this.deleteDialog = true;
      },
      async deleteItem(){
        this.postId = Number(this.postId);
        await axios.get('http://localhost:8080/deleteInfo',{
          params:{
            postId: this.postId,
            userNum: this.$store.state.userNum,
          }
        })
        this.deleteDialog = false;
        await this.$emit('deleteInfo')
        // await this.$nextTick();
      },
    ...mapActions(["refresh"])
    },
}
</script>

<style>
.music {
  display: flex-end;
  flex-direction: column;
}

.artistName{
  text-align:left;
}

.musicName{
  text-align:left;
}

.likeButton{
  position: absolute;
  right: 170px;
  top: 27px;
  font-size: 120%; 
}

.deleteButton{
  position: absolute;
  left: 140px;
  top: -14px;
}

.checkButton{
  position: absolute;
  right: 100px;
  top: 27px;
  font-size: 120%; 
}

.postText{
  position: absolute;
  left: 0px;
  top: 185px;
  font-size: 120%; 
}

.userName{
    position: relative;
    right: 500px;
    font-size: 100%; 
}

ul li {
  list-style: none;
}
</style>
