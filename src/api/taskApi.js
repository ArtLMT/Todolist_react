import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: BASE_API_URL // Mốt đổi thành biến môi trường
});

const USER_ID = "6901ac6ca70b742843a840a6";

export const fetchTasksApi = async () => {
    // Tương đương với actions.fetchTasks
    const res = await api.get('/tasks');
    return res.data;
};

export const createTaskApi = async (data) => {
    // Tương đương với actions.create
    const payload = { ...data, user_id: USER_ID };
    const res = await api.post('/tasks', payload);
    return res.data;
};

export const updateTaskApi = async (id, data) => {
    // Tương đương với actions.update
    const payload = { ...data, user_id: USER_ID };
    const res = await api.put(`/tasks/${id}`, payload);
    // Lưu ý: Tùy thuộc vào API của bạn, bạn cần lấy updatedTask từ res.data.data hoặc res.data
    return res.data.data;
};

export const deleteTaskApi = async (id) => {
    // Tương đương với actions.delete
    await api.delete(`/tasks/${id}`);
    return id; // Trả về id đã xóa
};