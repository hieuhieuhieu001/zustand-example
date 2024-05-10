<script setup>
import { ref } from "vue";
import useStore from "@/store";
import { onMounted } from "vue";

const user = useStore((state) => state.user);
const getUser = useStore((state) => state.getUser);
const addUser = useStore((state) => state.addUser);
const deleteUser = useStore((state) => state.delUser);
const updateUser = useStore((state) => state.updateUser);

const initUser = ref({
  name: "",
  age: 0,
  image: null,
});

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

<template>
  <div>
    <form>
      <input type="text" placeholder="Name" v-model="initUser.name" />
      <input type="text" placeholder="Age" v-model="initUser.age" />
      <input type="file" @change="onFileChange" />
    </form>
  </div>
  <table cellpadding="5" cellspacing="0">
    <tr>
      <td>Name</td>
      <td>Age</td>
      <td>Image</td>
      <td>Action</td>
    </tr>
    <tr v-for="u in user" :key="u._id">
      <td>{{ u.name }}</td>
      <td>{{ u.age }}</td>
      <td><img :src="u.image" width="200px"/></td>
      <td>
        <button @click="deleteUser(u._id)">Delete</button>
        <button @click="onUpdate(u)">Update</button>
      </td>
    </tr>
  </table>
  <button
    type="button"
    @click="
      addUser(initUser).then(() => {
        initUser = { name: '', age: 0 };
      })
    "
    v-if="!isUpdate"
  >
    Add
  </button>
  <button type="button" @click="handleUpdate" v-else>Update</button>
</template>

<style scoped>
.user {
  color: white;
}
table {
  min-width: 500px;
  border: 1px solid #fff;
  border-collapse: collapse;
}
.show {
  display: inline-block;
}
.hide {
  display: none;
}
</style>
