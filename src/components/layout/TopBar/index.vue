<template>
  <div :class="$style.topbar">
    <div class="mr-md-4 mr-auto">
      <air-search />
    </div>
    <div class="mr-4 d-none d-sm-block ml-auto">
      <div style="text-align: center; margin-right: 2em; display: ">
        <div class="font-weight-bold text-dark">{{ date }}</div>
        <div class="text-dark">{{ time }}</div>
      </div>
    </div>
    <div class="mr-md-2">
      <air-user-menu />
    </div>
    <!-- <div class="mr-md-4 mr-auto">
      <air-search />
    </div>
    <div class="mr-auto d-none d-md-block">
      <air-issues-history />
    </div>
    <div class="mb-0 mr-4 d-xl-block d-none">
      <air-status />
    </div>
    <div class="mr-4 d-none d-sm-block">
      <air-language-switcher />
    </div>
    <div class="mr-4 d-none d-sm-block">
      <air-actions />
    </div>
    <div class>
      <air-user-menu />
    </div> -->
  </div>
</template>

<script>
import AirSearch from '@/components/layout/TopBar/Search'
// import AirIssuesHistory from '@/components/layout/TopBar/IssuesHistory'
// import AirStatus from '@/components/layout/TopBar/Status'
// import AirLanguageSwitcher from '@/components/layout/TopBar/LanguageSwitcher'
// import AirActions from '@/components/layout/TopBar/Actions'
import AirUserMenu from '@/components/layout/TopBar/UserMenu'

export default {
  data() {
    return {
      time: '',
      date: '',
      week: ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SAB']
    }
  },

  components: {
    AirSearch,
    // AirIssuesHistory,
    // AirStatus,
    // AirLanguageSwitcher,
    // AirActions,
    AirUserMenu,
  },

  mounted() {
    let timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
  },

  methods: {
    updateTime() {
      let cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date =  this.zeroPadding(cd.getDate(), 2) + '/' + this.zeroPadding(cd.getMonth()+1, 2) + '/' + this.zeroPadding(cd.getFullYear(), 4) + ' ' + this.week[cd.getDay()];
    },

    zeroPadding(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
    },
  }
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
