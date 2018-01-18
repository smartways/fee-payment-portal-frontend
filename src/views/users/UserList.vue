<template>
    <div class="animated fadeIn">
        <b-card>
            <div class="ui container">
                <!--<download-excel-->
                <!--class   = "btn btn-primary"-->
                <!--:data   = "rowData"-->
                <!--:fields = "fields"-->
                <!--type = "csv"-->
                <!--name    = "users.csv">-->

                <!--Download CSV-->

                <!--</download-excel>-->

                <b-button size="lg" class="ui primary button" @click="createUser">Create New User</b-button>
                <br>
                <hr>

                <filter-bar></filter-bar>
                <b-button class="ui primary button pull-right" size="lg" @click="downloadUsersList">Download To Excel</b-button>

                <div class="vuetable-pagination ui basic segment grid">

                    <div>
                        <label>Show:</label>
                        <select class="ui simple dropdown" v-model="perPage">
                            <option value=10>10</option>
                            <option value=15>15</option>
                            <option value=20>20</option>
                            <option value=25>25</option>
                            <option value=50>50</option>
                            <option value=100>100</option>
                            <option value=250>250</option>
                        </select>
                    </div>
                </div>
                <vuetable ref="vuetable"
                          api-url="https://vuetable.ratiw.net/api/users"
                          :fields="fields"
                          pagination-path=""
                          :per-page="perPage"
                          :sort-order="sortOrder"
                          :append-params="moreParams"
                          @vuetable:pagination-data="onPaginationData"
                ></vuetable>
                <div class="vuetable-pagination ui basic segment grid">
                    <vuetable-pagination-info ref="paginationInfo"
                    ></vuetable-pagination-info>

                    <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"
                    ></vuetable-pagination>
                </div>

            </div>
        </b-card>
    </div>

</template>
<script>
  import accounting from 'accounting'
  import CustomActions from '../../components/CustomActions.vue'
  import FilterBar from '../../components/FilterBar'
  import moment from 'moment'
  import Vue from 'vue'
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
  import swal from 'sweetalert'

  Vue.component('custom-actions', CustomActions)
  Vue.component('filter-bar', FilterBar)

  export default {
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo
    },
    data () {
      return {
        fields: [
          {
            name: 'name',
            sortField: 'name'

          },
          {
            name: 'email',
            sortField: 'email'

          },
          {
            name: 'birthdate',
            sortField: 'birthdate',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
            callback: 'formatDate|DD-MM-YYYY'
          },
          {
            name: 'nickname',
            callback: 'allcap'
          },
          {
            name: 'gender',
            sortField: 'gender',
            titleClass: 'center aligned',
            dataClass: 'center aligned'
            // callback: 'genderLabel'
          },
          {
            name: 'salary',
            titleClass: 'center aligned',
            dataClass: 'right aligned',
            callback: 'formatNumber'
            // visible: false
          },
          {
            name: '__component:custom-actions',
            title: 'Actions',
            titleClass: 'center aligned',
            dataClass: 'center aligned'
          }
        ],
        perPage: 10,
        sortOrder: [
          {
            field: 'email',
            sortField: 'email',
            direction: 'asc'
          }
        ],
        moreParams: {}
      }
    },
    watch: {
      'perPage': function (val, oldVal) {
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      }
    },
    mounted () {
      this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
      this.$events.$on('filter-reset', e => this.onFilterReset())
    },
    methods: {
      allcap (value) {
        return value.toUpperCase()
      }, /* genderLabel (value) {
         return value === 'M'
         ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
         : '<ui pink labelspan class=""><i class="large woman icon"></i>Female</span>'
         },
         */
      formatNumber (value) {
        return accounting.formatNumber(value, 2)
      },
      formatDate (value, fmt = 'D MMM YYYY') {
        return (value == null)
          ? ''
          : moment(value, 'YYYY-MM-DD').format(fmt)
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      onFilterSet (filterText) {
        this.moreParams = {
          'filter': filterText
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onFilterReset () {
        this.moreParams = {}
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      createUser () {
        swal('Comming Soon', 'Please Wait')
      },
      downloadUsersList () {
        swal('Comming Soon', 'Please Wait')
      }
    }
  }
</script>

<style>
    .select-record-number {
        width: 50px;
    }
</style>