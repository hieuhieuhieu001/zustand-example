import { create } from "zustand-vue";
import axios from "axios";

const baseURL = "http://127.0.0.1:3000/first";

const useStore = create((set, get) => ({
  count: 0,
  user: [],
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  getUser: async () => {
    try {
      const res = await axios.get(`${baseURL}/all`);
      set({ user: res.data.data });
    } catch (err) {
      console.log("Lỗi nòi!!!", err);
    }
  },
  addUser: async (data) => {
    try {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("image", data.image);
      const res = await axios.post(`${baseURL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        get().getUser();
      }
    } catch (error) {
      console.log("Lỗi nòi!!!", error);
    }
  },
  delUser: async (id) => {
    try {
      const res = await axios.delete(`${baseURL}/${id}`);
      if (res.status === 200) {
        get().getUser();
      }
    } catch (error) {
      console.log("Lỗi nòi!!!", error);
    }
  },
  updateUser: async (data) => {
    try {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("image", data.image);
      const res = await axios.patch(`${baseURL}/${data._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        get().getUser();
      }
    } catch (error) {
      console.log("Lỗi nòi!!!", error);
    }
  },
}));

export default useStore;
