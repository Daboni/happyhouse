<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success justify-content-md-center" >
      <!-- Card stats -->

    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';
import LightTable from "./Tables/RegularTables/LightTable";
// import DarkTable from "./Tables/RegularTables/DarkTable";
import Chat from "@/views/Chat";

export default {
  name:"PostList",

  components: {
    LightTable,
    // DarkTable,
    // [Dropdown.name]: Dropdown,
    // [DropdownItem.name]: DropdownItem,
    // [DropdownMenu.name]: DropdownMenu,
    // [Table.name]: Table,
    // [TableColumn.name]: TableColumn,
    BeautifulChat : Chat,
  },
  data() {
    return {
    };
  }
};
</script>
<style>
.el-table.table-dark{
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr{
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf{
  border-bottom: none;
}
</style>
