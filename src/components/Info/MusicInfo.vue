 <template>
  <div class="clearfix" :class="{ linkable }" @click="onclick">
    <div class="image">
      <img :src="music.image" />
    </div>
    <div class="details">
      <ul>
        <li> {{ music.artistName }}</li>
        <li> {{ music.musicName }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { UPDATE_CURRENT } from "@/mutation-types";

export default {
  name: "music-info",

  props: {
    music: { type: Object },
    linkable: { type: Boolean, default: false }, //defaulは値がしてされなかった場合の既定値。(そのほかには、required(プロパティが必要かどうか)やvalidator(カスタムの検証関数)がある)
  },

  methods: {
    ...mapActions([UPDATE_CURRENT]),

    onclick() {
      if (this.linkable) {
        this[UPDATE_CURRENT](this.music);
        this.$router.push({ name: "Postform" });
      }
    },
  },
};
</script>

<style scoped>
.linkable:hover {
  cursor: pointer;
  background-color: #ff9;
}

ul li {
  list-style: none;
}
</style>