<template>
  <a-button type="primary" @click="changeVisible">Add</a-button>
  <AddEdit :visible="visible" :onCancel="changeVisible" :formData="initUser"/>
  <a-table :row-key="(record) => record.xid" :dataSource="users" :columns="columns" bordered class="mt-4">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'image'">
        <a-image :src="record.image" :width="150" />
      </template>
      <template v-if="column.key === 'action'">
        <a-space>
          <a-button type="primary" @click="onUpdate(record)">
            <EditOutlined />
          </a-button>
          <a-button type="primary" danger @click="deleteUser(record._id)">
            <DeleteOutlined />
          </a-button>
        </a-space>
      </template>
    </template>
  </a-table>
  <!-- <a-button
    type="primary"
    @click="
      addUser(initUser).then(() => {
        initUser = { name: '', age: 0 };
      })
    "
    v-if="!isUpdate"
  >
    Add
  </a-button>
  <button type="button" @click="handleUpdate" v-else>Update</button> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import fields from "@/composibles/fields";
import useStore from "@/store";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import AddEdit from "@/components/AddEdit.vue";

const users = useStore((state) => state.user);
const getUser = useStore((state) => state.getUser);
const addUser = useStore((state) => state.addUser);
const deleteUser = useStore((state) => state.delUser);
const updateUser = useStore((state) => state.updateUser);

const { columns, initUser } = fields();

const visible = ref(false);

const changeVisible = () => {
  visible.value = !visible.value;
};

onMounted(() => {
  getUser();
});

const onFileChange = (e) => {
  console.log("choose file", e.target.files[0]);
  initUser.value.image = e.target.files[0];
};

const isUpdate = ref(false);
const onUpdate = (data) => {
  isUpdate.value = true;
  initUser.value = data;
};
const handleUpdate = () => {
  updateUser(initUser.value).then(() => {
    isUpdate.value = false;
    initUser.value = { name: "", age: 0 };
  });
};
</script>
