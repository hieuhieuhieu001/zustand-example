import { ref } from "vue";

const fields = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "action",
    },
  ];

  let initUser = ref({
    name: "",
    age: 0,
    image: null,
  });

  return { columns, initUser };
};

export default fields;
