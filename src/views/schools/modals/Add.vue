<template>
    <div>
        <h3 slot="header" class="modal-title">
            Modal title
        </h3>

        <div slot="footer">
            <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">
                Submit
            </button>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style>

</style>