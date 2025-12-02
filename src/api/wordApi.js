import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: BASE_API_URL // Mốt đổi thành biến môi trường
});

const USER_ID = "6901ac6ca70b742843a840a6";

export const fetchWordsApi = async () => {
    // Tương đương với actions.fetchWords
    const res = await api.get('/words');
    return res.data;
};

export const createWordApi = async (data) => {
    // Tương đương với actions.create
    const payload = { ...data, user_id: USER_ID };
    const res = await api.post('/words', payload);
    return res.data;
};

export const updateWordApi = async (id, data) => {
    // Tương đương với actions.update
    const payload = { ...data, user_id: USER_ID };
    const res = await api.put(`/words/${id}`, payload);
    // Lưu ý: Tùy thuộc vào API của bạn, bạn cần lấy updatedWord từ res.data.data hoặc res.data
    return res.data.data;
};

export const deleteWordApi = async (id) => {
    // Tương đương với actions.delete
    await api.delete(`/words/${id}`);
    return id; // Trả về id đã xóa
};