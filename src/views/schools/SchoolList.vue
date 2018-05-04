<template>
    <div class="animated fadeIn">

        <b-row>
            <b-col sm="12">
                <b-card>
                    <b-button size="lg" class="ui primary button" @click="createSchool">Create New School</b-button>
                    <br>
                    <hr>
                    <div class="vuetable-pagination ui basic segment grid">
                        <b-row>

                            <b-col sm="2">
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
                            </b-col>
                            <b-col sm="4.5">

                                <div class="ui icon input">
                                    <input type="text" placeholder="Search..." v-model="query.search_input"
                                           @change="fetchIndexData()" size="70">
                                    <i class="search icon"></i>
                                </div>

                            </b-col>
                            <b-col sm="1">
                                <b-button type="submit" class="ui primary button" size="sm" @click="fetchIndexData()">
                                    Search
                                </b-button>

                            </b-col>
                            <b-col sm="">
                                <b-button type="submit" class="ui secondary button" size="sm" @click="resetTableData()">
                                    Reset
                                </b-button>

                            </b-col>
                            <b-col sm="">
                                <b-col sm="2">
                                    <!--<download-excel-->
                                    <!--class="btn btn-primary ui primary button"-->
                                    <!--:data="json_data"-->
                                    <!--:fields="json_fields"-->
                                    <!--type="csv"-->
                                    <!--name="schools.xls">-->

                                    <!--Download Excel-->

                                    <!--</download-excel>-->

                                </b-col>

                            </b-col>
                        </b-row>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col" v-for="column in columns" @click="toggleOrder(column.name)">
                                    <span>{{column.label}}</span>
                                    <span class="dv-table-column" v-if="column.name === query.column">
                                <span v-if="query.direction ==='desc'">&darr;</span>
                                <span v-else>&darr;</span>
                            </span>
                                </th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,key) in items.data">
                                <td>{{item.attributes.name}}</td>
                                <td>{{item.attributes.email}}</td>
                                <td>{{item.attributes.type}}</td>
                                <td>{{item.attributes.county}}</td>
                                <td>{{item.attributes['postal-address']}}</td>
                                <td>{{item.attributes['postal-code']}}</td>
                                <td>{{item.attributes['first-contact-name']}}</td>
                                <td>{{item.attributes['created-at']}}</td>
                                <td>
                                    <b-button class="ui pink label" :pressed="true" @click="editSchool(item.id)"><i
                                            class="fa fa-edit"></i> Edit
                                    </b-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <b-row>

                        <!--<span>Showing: {{items.per_page}} Records Out Of {{items.total}} Records</span>-->
                        <span class="pull-right">
                            <pagination :total="page_data.total_count" :page-size="page_data.page_size"
                                        :callback="pageChanged"
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

        <addschool v-if="showModal">
            <div slot="header" class="m-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New School</h5>
                <button type="button" class="close pull-right" @click="closeModal" aria-label="Close">&times;
                </button>
            </div>

            <div slot="body" class="m-body">
                <form action="">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="form-group">
                        <label for="type">Type:</label>
                        <input type="text" class="form-control" id="type">
                    </div>
                    <div class="form-group">
                        <label for="county">County:</label>
                        <input type="text" class="form-control" id="county">
                    </div>
                    <div class="form-group">
                        <label for="county">Postal Address:</label>
                        <input type="text" class="form-control" id="postal_address">
                    </div>
                    <div class="form-group">
                        <label for="county">Postal Code:</label>
                        <input type="text" class="form-control" id="postal_code">
                    </div>
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" class="form-control" id="email">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="number" class="form-control" id="phone">
                    </div>
                    <div class="form-group">
                        <label for="contact_name">Contact Name:</label>
                        <input type="text" class="form-control input-lg" id="contact_name">
                    </div>
                </form>
            </div>
            <div slot="footer">
                <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">
                    Submit
                </button>
            </div>
        </addschool>
    </div>
</template>
<script>
  import Vue from 'vue'
  import pagination from 'vue-pagination-bootstrap'
  // import swal from 'sweetalert'
  import Addschool from './modals/AddSchool.vue'
  export default{
    components: {
      pagination: pagination,
      addschool: Addschool
    },
    data () {
      return {
        items: {},
        defs: {
          caption: 'School Data',
          api_source: 'http://test.fee-payment-api.netcengroup.com/api/schools'
        },
        page_data: {
          page: 1,
          per_page: 10,
          total_count: 0,
          page_size: 0
        },
        paginationOptions: {
          offset: 2,
          previousText: 'Prev',
          nextText: 'Next',
          alwaysShowPrevNext: true
        },
        columns: [
          {
            label: 'Name',
            name: 'name'
          },
          {
            label: 'Email',
            name: 'email'
          },
          {
            label: 'Type',
            name: 'type'
          },
          {
            label: 'County',
            name: 'county'
          },
          {
            label: 'Postal Address',
            name: 'postal-address'
          },
          {
            label: 'Postal Code',
            name: 'postal-code'
          },
          {
            label: 'First Contact Name',
            name: 'first-contact-name'
          },
          {
            label: 'Created At',
            name: 'created-at'
          }],
        query: {
          'column': 'name',
          'direction': 'desc',
          'search_column': 'id',
          'search_input': ''
        },
        json_data: {},
        json_fields: {
          'attributes.name': 'string',
          'email': 'String',
          'type': 'String',
          'county': 'String',
          'phone': 'String',
          'postal-address': 'String',
          'postal-code': 'String',
          'first-contact-name': 'String',
          'created-at': 'String'
        },
        json_meta: [
          [{
            'key': 'charset',
            'value': 'utf-8'
          }]
        ],
        showModal: false
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
        this.$http.get(`${this.defs.api_source}?column=${this.query.column}&page=${this.page_data.page}&page-size=${this.page_data.per_page}&direction=${this.query.direction}&search_input=${this.query.search_input}`)
          .then((response) => {
            this.items = response.data
            this.page_data.total_count = response.data.meta['total-count']
            this.page_data.page_size = response.data.meta['page-size']
            console.log(response.data.data)
          })
      },
      pageChanged (page) {
        this.page_data.page = page
        this.fetchIndexData()
      },
      resetTableData () {
        this.query.search_input = ''
        this.fetchIndexData()
      },
      toggleOrder (column) {
        console.log(column)
        if (column === this.query.column) {
          // only change direction
          if (this.query.direction === 'desc') {
            this.query.direction = 'asc'
          } else {
            this.query.direction = 'desc'
          }
        } else {
          this.query.column = column
          this.query.direction = 'asc'
        }
        this.fetchIndexData()
      },
      editSchool (itemId) {
        alert(itemId)
      },
      createSchool () {
        // swal('Comming Soon', 'Please Wait')
        this.openModal()
      },
      openModal () {
        this.showModal = true
      },
      closeModal () {
        this.showModal = false
      },
      submitAndClose () {
      }
    }
  }
</script>
<style>
    .m-header{
        width: 100%;
    }
    .m-body{
        width: 100%;
    }

</style>