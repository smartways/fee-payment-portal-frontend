<template>
    <div class="custom-actions">
        <b-button class="ui pink label" :pressed="true" @click="itemAction('edit-item', rowData, rowIndex)"><i class="fa fa-edit"></i> Edit</b-button>
    </div>
</template>

<script>
  import swal from 'sweetalert'
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    methods: {
      itemAction (action, data, index) {
        swal('Comming Soon!', 'Please Wait')
      }
    }
  }
</script>

<style>
    .custom-actions button.ui.button {
        padding: 8px 8px;
    }
    .custom-actions button.ui.button > i.icon {
        margin: auto !important;
    }
</style>