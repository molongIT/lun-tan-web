<!-- 活动tab页面 -->
<template>
  <div class="activity" v-if="this.clubs.length>0">
    <div class="layout-top">
      <div class="top-svg">活动</div>
      <div class="join-text" @click="isShowContact = !isShowContact">
        按个爪印加入我们社团吧
      </div>
      <div v-show="isShowContact" class="contact">Tel:{{clubs[curClubIndex].clubPrincipalPhone}}</div>
    </div>
    <div class="layout-center">
      <div class="layout-center-category-block">
        <div
          :class="['layout-center-category', { leftTabFixed: isLeftTabFixed }]"
        >
          <div class="layout-center-category-logo">
            <img src="../../assets/dog-font.png" alt="" />
            <div class="layout-center-category-title">社团分类</div>
          </div>

          <!-- 左侧分类 -->
          <div class="category">
            <i
              v-for="(club, index) in clubs"
              :class="[
                'category-item',
                { 'category-item-ative': curClubIndex == index },
              ]"
              @click="changeClub(index)"
              v-bind:key="club.id"
            >
              {{ club.clubName }}
            </i>
          </div>
        </div>
      </div>
      <!-- 中间社团介绍区域 -->
      <div class="layout-center-content-block">
        <div class="layout-center-content">
          <div class="top">
            <el-avatar
              class="club-avatar"
              :src="clubs[curClubIndex].clubLogo"
              alt=""
            ></el-avatar>
            <div class="club-name">{{ clubs[curClubIndex].clubName }}</div>
            <div class="club-principal">
              <span>社长:</span
              ><span>{{ clubs[curClubIndex].clubPrincipal }}</span>
            </div>

            <div class="club-content">
              <MyMarkdown
                class="box-content-word"
                :content="this.clubs[curClubIndex].clubDescription"
              ></MyMarkdown>
            </div>

            <div class="activity-info" v-if="activities.length > 0">
              <div class="activity-title">活动介绍</div>
              <div class="split-line"></div>
              <div class="activity-name activity-info-item-block">
                <span class="activity-label-name">活动名称:</span>
                <span>{{activities[curActivityIndexInClub].activityName}}</span>
              </div>
               <div class="activity-date activity-info-item-block">
                <span class="activity-label-name">活动时间:</span>
                <span>{{activities[curActivityIndexInClub].activitiestartTime}} - {{activities[curActivityIndexInClub].activityEndTime}}</span>
              </div>
              <div class="activity-username activity-info-item-block">
                <span class="activity-label-name">联系人:</span>
                <span>{{activities[curActivityIndexInClub].username}}</span>
              </div>
              <div class="activity-info-item-block">
                <span class="activity-label-name">联系方式:</span>
                <span>{{activities[curActivityIndexInClub].userPhone}}</span>
              </div>
              <div class="activity-content-block activity-info-item-block">
                <span class="activity-content-label">活动内容:</span>
                <span class="activity-content">{{activities[curActivityIndexInClub].activityContent}}</span>
              </div>
            </div>


          </div>
        </div>
      </div>
      <div class="layout-center-activityList-block">
        <div class="layout-center-activityList">
          <div class="activity-title">活动列表</div>
          <div class="activity-timeLine">
            <el-timeline>
              <el-timeline-item
                v-for="(timeItem,index) in clubs[curClubIndex].clubActivities"
                :key="timeItem.activityId"
                class="activity-item-time"
                :timestamp="timeItem.activityCreateTime"
                placement="top"
                :color="index===curActivityIndexInClub?'black':''"
              >
                <div class="activity-item-name" @click="curActivityIndexInClub = index;">
                  {{ timeItem.activityName }}
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyMarkdown from "../../components/MyMarkdown";
export default {
  components: {
    MyMarkdown,
  },
  name: "activity",
  created(){
    this.clubs = []
    // 初始化所有社团
    this.getClubs()
    // 获取第一个社团的所有活动信息
    // 待修改bug
    this.getActivitiesByClubId('10001')
  },
  data() {
    return {
      isLeftTabFixed: false,
      isShowContact: false,
      curClubIndex: 0,
      curActivityIndexInClub: 0,
      curCategory: "手工社",
      category: ["手工社", "街舞社", "文字社", "篮球社", "茶艺社", "吉他社"],
      clubs: [
        {
          id: "111",
          clubName: "手工社",
          clubLogo:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F14%2F20200414210224_dnzpo.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999",
          clubDescription:
            "社团致力于和大学生群体一起领略围棋——中国传统的高雅艺术,以达修身养性,陶冶情操。",
          clubPrincipal: "逄晓龙",
          clubPrincipalPhone: 17766222733,
          clubActivities: [
            {
              activityId: "222",
              activityName: "迎新活动",
              activityCreateTime: "2018/4/3",
            },
            {
              activityId: "333",
              activityName: "迎新活动2",
              activityCreateTime: "2018/4/2",
            },
            {
              activityId: "444",
              activityName: "迎新活动3",
              activityCreateTime: "2018/4/1",
            },
          ],
        },
        {
          id: "222",
          clubName: "街舞团",
          clubLogo:
            "http://luntan-1304511484.cos.ap-nanjing.myqcloud.com/avatar/QQ%E6%88%AA%E5%9B%BE20211108184633.png",
          clubDescription:
            "国画社团在于培养学生对国画的兴趣、爱好，并增加学生的课外知识，提高一定的技能，丰富学生的课余文化生活，给爱好国画的同学一个良好的学习环境。",
          clubPrincipal: "张婧妍",
          clubPrincipalPhone: 18866222733,
          clubActivities: [
            {
              activityId: "222",
              activityName: "迎新活动",
              activityCreateTime: "2018/4/3",
            },
            {
              activityId: "333",
              activityName: "迎新活动2",
              activityCreateTime: "2018/4/2",
            },
            {
              activityId: "444",
              activityName: "迎新活动3",
              activityCreateTime: "2018/4/1",
            },
          ],
        },
        {
          id: "11331",
          clubName: "文字社",
          clubLogo: "",
          clubDescription:
            "dasdasdasd多久啊是多久啊快睡觉打卡结束,dasdasdasd多久啊是多久啊快睡觉打卡结束,dasdasdasd多久啊是多久啊快睡觉打卡结束,dasdasdasd多久啊是多久啊快睡觉打卡结束dasdasdasd多久啊是多久啊快睡觉打卡结束",
          clubPrincipal: "李悦",
          clubPrincipalPhone: 12266222733,
          clubActivities: [
            {
              activityId: "222",
              activityName: "迎新活动",
              activityCreateTime: "2018/4/3",
            },
            {
              activityId: "333",
              activityName: "迎新活动2",
              activityCreateTime: "2018/4/2",
            },
            {
              activityId: "444",
              activityName: "迎新活动3",
              activityCreateTime: "2018/4/1",
            },
          ],
        },
        {
          id: "4",
          clubName: "篮球社",
          clubLogo: "",
          clubDescription:
            "dasdasdasd多久啊是多久啊快睡觉打卡结束,dasdasdasd多久啊是多久啊快睡觉打卡结束,dasdasdasd多久啊是多久啊快睡觉打卡结束,dasdasdasd多久啊是多久啊快睡觉打卡结束dasdasdasd多久啊是多久啊快睡觉打卡结束",
          clubPrincipal: "罗富明",
          clubPrincipalPhone: 18866222733,
          clubActivities: [
            {
              activityId: "222",
              activityName: "迎新活动",
              activityCreateTime: "2018/4/3",
            },
            {
              activityId: "333",
              activityName: "迎新活动2",
              activityCreateTime: "2018/4/2",
            },
            {
              activityId: "444",
              activityName: "迎新活动3",
              activityCreateTime: "2018/4/1",
            },
          ],
        },
      ],
      activities:[
        {
          activityId: "222",
          activityName: "迎新活动",
          acitivityAddress: '东一 —— 东九',
          activityContent: '速度回家啊点喝酒啊是处女座吗换句话说的哈，dasd has的哈。',
          activitiestartTime:'2021/11/8',
          activityEndTime:'2021/11/9',
          activityCreateTime: "2018/4/3",
          userId:'1232',
          username:'三三学长',
          userPhone:'18823748787'
        },
        {
          activityId: "23242",
          activityName: "迎新活动2",
          acitivityAddress: '东一 —— 东九',
          activityContent: '速度回家啊点喝酒啊是处女座吗换句话说的哈，dasd has的哈。',
          activitiestartTime:'2021/11/8',
          activityEndTime:'2021/11/9',
          activityCreateTime: "2018/4/3",
          userId:'1232',
          username:'三三学长',
          userPhone:'18823748787'
        },
        {
          activityId: "23242",
          activityName: "建东社区趣味中国节",
          acitivityAddress: '东一 —— 东九',
          activityContent: '速度回家啊点喝酒啊，都撒开多久啊是空间大数据，大手大脚卡是多久。大三大四的，是处女座吗换句话说的哈，dasd has的哈。',
          activitiestartTime:'2021/11/8',
          activityEndTime:'2021/11/9',
          activityCreateTime: "2018/4/3",
          userId:'1232',
          username:'三三学长',
          userPhone:'18823748787'
        },
      ],
    };
  },
  methods: {
    //,{clubId:this.clubs[this.curClubIndex].id}
    getClubs(){
      // const firstIndexClubId = '222'
      let _this = this
      this.$http.get('/club')
      .then(res=>{
        _this.clubs = res.data.data
      })
    },
    getActivitiesByClubId(clubId){
      let _this = this
      this.$http.get('/club/activities',{clubId:clubId})
      .then(res=>{
        console.log(res.data.data);
        _this.activities = res.data.data
      })
        
    },
    showActivityInfo(activityIndex){
      // 对当前活动介绍号码赋新值
      this.curActivityIndexInClub = activityIndex;
      // 获取对应的活动id
      //var activityId = this.clubs[this.curClubIndex].clubActivities[this.curActivityIndexInClub].activityId
      // 重新获取信息
      // 赋新数据
    },
    changeClub(index){
      // 清空articities
      this.activities = []
      // 记录当前club
      this.curClubIndex = index
      // 获取该club的所有活动info,并赋新数据
      this.getActivitiesByClubId(this.clubs[index].id)
      // 当前活动index恢复0
      this.curActivityIndexInClub = 0
    }
  },
};
</script>

<style lang="scss" scoped>
.activity {
  display: inline-block;
  background-color: rgb(247, 245, 245);
  height: 1000px;
  width: 100%;
  .layout-top {
    display: inline-block;
    width: 100%;
    height: 70px;
    background-color: #e9f1f8;

    .top-svg {
      display: inline-block;
      font-size: 36px;
      color: rgb(86, 107, 171);
      position: relative;
      left: 6%;
      line-height: 70px;
      font-weight: bolder;
      letter-spacing: 15px;
    }

    .join-text {
      display: inline-block;
      position: relative;
      left: 10%;
      color: black;
      font-weight: bolder;
      cursor: pointer;
    }

    .contact {
      display: inline-block;
      position: relative;
      left: 12%;
    }
  }

  .layout-center {
    display: inline-block;
    width: 100%;
    height: 100%;
    // background-color: yellow;

    .layout-center-category-block {
      overflow: hidden; // 防溢出
      display: inline-block;
      width: 16%;
      height: 100%;
      // background-color: rgb(210, 238, 66);

      .layout-center-category {
        display: inline-block;
        width: 75%;
        height: 600px;
        background-color: #e9f1f8;
        margin-left: 20%;
        border-radius: 32px 0px 0px 32px;
        margin-top: 10px;

        .layout-center-category-logo {
          height: 80px;
          width: 100%;
          img {
            width: 50%;
            margin-left: 35px;
          }
          div {
            font-size: 25px;
            font-weight: bolder;
            text-align: center;
            margin-top: 10px;
          }
        }

        .category {
          display: inline-block;
          margin-top: 70px;
          width: 100%;
          .category-item {
            display: block;
            width: 80%;
            font-family: "Arial Black", "Arial Normal", "Arial", sans-serif;
            font-style: normal;
            font-size: 20px;
            height: 61px;
            text-align: center;
            font-weight: 1000px;
            margin: 0 auto;
            cursor: pointer;
          }
          .category-item-ative {
            font-weight: bolder;
          }
        }
      }
    }

    .layout-center-content-block {
      overflow: hidden; // 防溢出
      display: inline-block;
      width: 60%;
      height: 100%;
      // border-radius: 30px;
      .layout-center-content {
        width: 98%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-radius: 30px;
        margin: 0 auto;
        margin-top: 10px;

        .top {
          height: 80px;
          width: 100%;
          border-bottom: rgb(230, 230, 230) 1px solid;
          .club-avatar {
            display: inline-block;
            position: relative;
            left: 34%;
            top: 25%;
          }
          .club-name {
            display: inline-block;
            position: relative;
            left: 36%;
            top: 15%;
            font-size: 30px;
            font-weight: bolder;
            letter-spacing: 10px;
          }
          .club-principal {
            position: relative;
            font-size: 17px;
            left: 80%;
            top: -10%;
            font-weight: bolder;
            letter-spacing: 3px;
          }
          .club-content {
            margin-top: 30px;
          }
        }

        .activity-info {

          .activity-info-item-block{
            padding: 10px 0px;
          }

          .activity-title {
            position: relative;
            left: 30px;
            font-size: 33px;
            color: rgb(86, 107, 171);
            font-weight: bolder;
          }
          /* 蓝色分割线 */
          .split-line {
            border-width: 0px;
            width: 22%;
            height: 2px;
            background: inherit;
            background-color: rgb(236, 238, 245);
            border: none;
            border-radius: 0px;
            box-shadow: none;
            margin-bottom: 10px;
          }

          .activity-label-name{
            font-size: 18px;
            font-weight: bold;
            margin-left: 34px;
            margin-right: 5px;

          }
          .activity-content-block{
             margin-left: 34px;
            .activity-content-label{
              font-weight: bolder;
              margin-right: 10px;
            }
         }
         
        }
      }
    }

    .layout-center-activityList-block {
      overflow: hidden;
      display: inline-block;
      width: 24%;
      height: 100%;
      .layout-center-activityList {
        width: 95%;
        height: 100%;
        background-color: white;
        margin: 0 auto;
        .activity-title {
          font-size: 32px;
          padding-top: 30px;
          font-weight: bolder;
          text-align: center;
          color: rgb(140, 155, 202);
          margin-bottom: 30px;
        }
        .el-timeline {
          .activity-item-name {
            font-size: 15px;
            cursor: pointer;
          }
        }
      }
    }
  }
}


</style>