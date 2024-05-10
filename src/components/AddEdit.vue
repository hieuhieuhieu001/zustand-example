<template>
  <div>
    <a-modal :open="visible" title="Basic Modal" @cancel="onCancel" @ok="handelAdd">
      <a-form>
        <a-form-item label="Name" name="name">
          <a-input class="!w-full block" v-model:value="formData.name" />
        </a-form-item>

        <a-form-item label="Age" name="age">
          <a-input class="!w-full" v-model:value="formData.age" />
        </a-form-item>

        <a-form-item label="Image" name="image">
          <a-upload name="image" v-model:file-list="fileList" list-type="picture">
            <a-button>
              <upload-outlined></upload-outlined>
              Click to Upload
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import useStore from "@/store";

import { UploadOutlined } from "@ant-design/icons-vue";

const { visible, onCancel, formData } = defineProps(["visible", "onCancel", "formData"]);

const fileList = ref([]);

console.log(fileList);

const handelAdd = () => {
  console.log("add", formData);
};
</script>
