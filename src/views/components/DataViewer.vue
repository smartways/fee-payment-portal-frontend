<template>
    <!--<div class="dv">-->
    <!--<div class="dv-header">-->
    <!--<div class="dv-header-title">-->
    <!--{{title}}-->

    <!--</div>-->

    <b-row>
        <b-col lg="12">
            <b-card>
                <div slot="header">
                    <i class="fa fa-edit"></i> {{title}}
                </div>

                <b-row>
                    <b-col sm="2">
                        <b-form-fieldset label="">
                            <select class="" v-model="query.search_column">
                                <option v-for="column in columns" :value="column">{{column}}</option>

                            </select>
                        </b-form-fieldset>
                    </b-col><!--/.col-->
                    <b-col sm="2">
                        <b-form-fieldset label="">
                            <select class="selectpicker" v-model="query.search_operator">
                                <option v-for="(value,key) in operators" :value="key">{{value}}</option>
                            </select>
                        </b-form-fieldset>
                    </b-col><!--/.col-->
                    <b-col sm="2">
                        <!--<b-form-fieldset label="">-->
                        <!--<b-form-input type="text" placeholder="Search" v-model="query.search_input"-->
                        <!--@keyup.enter="fetchIndexData()"></b-form-input>-->
                        <!--</b-form-fieldset>-->
                        <input type="text" v-model="query.search_input"
                               @keyup.enter="fetchIndexData()">
                    </b-col><!--/.col-->
                    <b-col sm="2">

                        <b-button type="submit" size="sm" variant="success" @click="fetchIndexData()">Filter</b-button>

                    </b-col>
                    <b-col sm="2">
                        <download-excel
                                class   = "btn btn-primary"
                                :data   = "json_data"
                                :fields = "json_fields"
                                name    = "filename.xls">

                            Download Excel

                        </download-excel>

                    </b-col>
                    <b-col sm="2">
                        <download-excel
                                class   = "btn btn-primary"
                                :data   = "json_data"
                                :fields = "json_fields"
                                type = "csv"
                                name    = "users.csv">

                            Download CSV

                        </download-excel>

                    </b-col>

                    <br>
                    <table class="table table-striped" width="100px">
                        <thead>
                        <tr>
                            <th scope="col" v-for="column in columns" @click="toggleOrder(column)">
                                <span>{{column}}</span>
                                <span class="dv-table-column" v-if="column === query.column">
                                <span v-if="query.direction ==='desc'">&darr;</span>
                                <span v-else>&darr;</span>
                            </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,key) in model.data">
                            <td>{{ item.id }}</td>
                            <td>{{ item.company }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.created_at }}</td>
                            <td> <b-nav-item-dropdown right no-caret>
                                <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
                                <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
                                <b-dropdown-item ><i class="fa fa-lock"></i> Logout</b-dropdown-item>
                            </b-nav-item-dropdown></td>
                            <td><b-button variant="outline-primary" :pressed="true"><i class="fa fa-edit"></i>Warning</b-button></td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <nav>
                            <!--<b-pagination>Displaying</b-pagination>-->
                            <span>Displaying {{model.from}}-{{model.to}} of {{model.total}} rows</span>
                            <span>Rows Per Page</span>
                            <input type="text" style="width:50px" v-model="query.per_page" @keyup.enter="fetchIndexData()">
                        </nav>
                    </div>
                    <div>
                        <button @click="prev()">&laquo;</button>
                        <span>    </span>
                        <input type="text" style="width:30px" v-model="query.page" @keyup.enter="fetchIndexData()">
                        <span> </span>

                        <button @click="next()">&raquo;</button>
                    </div>

                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'data-viewer',
    props: {
      'source': '',
      'title': ''
    },
    data () {
      return {
        model: {},
        columns: {},
        query: {
          'page': 1,
          'column': 'id',
          'direction': 'desc',
          'per_page': 10,
          'search_column': 'id',
          'search_operator': 'equal',
          'search_input': ''
        },
        operators: {
          equal: '=',
          not_equal: '<>',
          less_than: '<',
          greater_than: '>',
          less_than_or_equal_to: '<=',
          greater_than_or_equal_to: '>='
        },
        json_fields: {
          'id': 'Number',
          'company': 'String',
          'email': 'String',
          'name': 'String',
          'phone': 'String',
          'address': 'String',
          'created_at': 'String'
        },
        json_data: [],
        json_meta: [
          [{
            'key': 'charset',
            'value': 'utf-8'
          }]
        ]
      }
    },
    created () {
      this.fetchIndexData()
    },
    methods: {
      fetchIndexData () {
        this.$http.get(`${this.source}?column=${this.query.column}&direction=${this.query.direction}&page=${this.query.page}&per_page=${this.query.per_page}&search_column=${this.query.search_column}&search_operator=${this.query.search_operator}&search_input=${this.query.search_input}`)
          .then((response) => {
            this.model = response.data.model
            this.columns = response.data.columns
            this.json_data = this.model.data
          })
      },
      toggleOrder (column) {
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
      next () {
        if (this.model.next_page_url) {
          this.query.page++
          this.fetchIndexData()
        }
      },
      prev () {
        if (this.model.prev_page_url) {
          this.query.page--
          this.fetchIndexData()
        }
      }
    }
  }
</script>

<style>

</style>