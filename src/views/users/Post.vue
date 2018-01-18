<template>
    <div class="animated fadeIn">

        <b-row>
            <b-col sm="12">
                <b-card :header="defs.caption">
                    <div class="vuetable-pagination ui basic segment grid">

                        <div>
                            <label>Show:</label>
                            <select class="ui simple dropdown" v-model="page_data.per_page">
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
                    <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th v-for="column in columns">{{column}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,key) in items.data">
                            <td>{{item.attributes.name}}</td>
                            <td>{{item.attributes.type}}</td>
                            <td>{{item.attributes.county}}</td>
                            <td>{{item.attributes['postal-address']}}</td>
                            <td>
                                <button class="btn btn-primary">Edit</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <b-row>

                        <!--<span>Showing: {{items.per_page}} Records Out Of {{items.total}} Records</span>-->
                        <span class="pull-right">
                            <pagination :total="items.meta['total-count']" :page-size="items.meta['page-size']" :callback="pageChanged"
                                        :options="paginationOptions" nav-class="padding-10" ul-class="bg-color-red"
                                        li-class="txt-color-blue">
  </pagination>
                            <!--<b-pagination align="center" :total-rows="items.total" :callback="pageChanged" v-model="page_data.page" :per-page="page_data.per_page">-->
                            <!--</b-pagination>-->
                        </span>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
  import Vue from 'vue'
  import pagination from 'vue-pagination-bootstrap'
  export default{
    components: {
      pagination: pagination
    },
    data () {
      return {
        items: {},
        defs: {
          caption: 'School Data',
          api_source: 'http://127.0.0.1:8000/api/schools'
        },
        page_data: {
          page: 1,
          per_page: 10
        },
        paginationOptions: {
          offset: 2,
          previousText: 'Prev',
          nextText: 'Next',
          alwaysShowPrevNext: true
        },
        columns: [
          'Name', 'Type', 'County', 'Postal Address', 'Action'
        ]
      }
    },
    watch: {
      'page_data.per_page': function (val, oldVal) {
        Vue.nextTick(() => {
          this.fetchIndexData()
        })
      }
    },
    created () {
      this.fetchIndexData()
    },
    methods: {
      fetchIndexData () {
        this.$http.get(`${this.defs.api_source}?page=${this.page_data.page}&page-size=${this.page_data.per_page}`)
          .then((response) => {
            console.log(response.data.meta)
            this.items = response.data
            // this.columns = response.data.columns
            // this.json_data = this.model.data
          })
      },
      pageChanged (page) {
        this.page_data.page = page
        this.fetchIndexData()
      }
    }
  }
</script>
<style>
</style>