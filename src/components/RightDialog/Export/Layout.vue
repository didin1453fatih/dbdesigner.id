<template>
  <a-drawer
    placement="right"
    :width="480"
    :closable="false"
    @close="setVisible(false)"
    :visible="visible"
  >
    <div
      style="width: -webkit-fill-available;
         height: -webkit-fill-available;margin:-24px"
    >
      <table style="width: -webkit-fill-available;
         height: -webkit-fill-available;">
        <tr>
          <td style="background-color:#2B569A;width: 100px;vertical-align:top">
            <div style="padding-top:10px;height:-webkit-fill-available;;">
              <div
                style="width:100%; padding-left:13px;padding-top:3px; padding-bottom:3px; "
                @click="closeFilePanel"
              >
                <img src="../../../assets/icons8-go-back-50.png" width="35px">
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="setPanelName('sql')"
              >
                <label style="color:white">Sql</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('image')"
              >
                <label style="color:white">Image</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('pdf')"
              >
                <label style="color:white">Pdf</label>
              </div>              
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:15px"
                @click="setPanelName('laravel')"
              >
                <label style="color:white">Laravel</label>
              </div>                            
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="setPanelName('django')"
              >
                <label style="color:white">Django</label>
              </div>                                          
            </div>
          </td>
          <td style="background-color:#F1F1F1;vertical-align:top">
            <div
              v-if="panelName==='sql'"
              style="padding-top:20px; padding-left:25px; width:100%;height:-webkit-fill-available;"
              class="fg-black"
            >
              <sql/>
            </div>
            <div
              v-else-if="panelName==='image'"
              style="padding-top:20px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <image-export/>
            </div>            
            <div
              v-else-if="panelName==='share'"
              style="padding-top:20px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <Share/>
            </div>
            <div
              v-else-if="panelName==='pdf'"
              style="padding-top:20px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <Pdf/>
            </div>            
            <div
              v-else-if="panelName==='laravel'"
              style="padding-top:20px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <Laravel/>
            </div>          
            <div
              v-else-if="panelName==='django'"
              style="padding-top:20px; padding-left:25px; width:100%"
              class="fg-black"
            >
              <Django/>
            </div>                                    
          </td>
        </tr>
      </table>
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Sql from "./Component/Sql";
import Share from "./Component/Share";
import ImageExport from "./Component/Image"
import Pdf from "./Component/Pdf"
import Laravel from "./Component/Laravel"
import Django from "./Component/Django"
export default {
  methods: {
    ...mapMutations("RightDialog/Export/Layout", {
      setVisible: "setVisible",
      setPanelName:"setPanelName"
    }),    
    closeFilePanel() {
      this.setVisible(false)
    }
  },
  components: {
    Sql,
    Share,
    ImageExport,
    Pdf,
    Laravel,
    Django
  },
  computed: {
    ...mapState("RightDialog/Export/Layout", {
      visible: state => state.visible,
      panelName:state => state.panelName
    })    
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>
