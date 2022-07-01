import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`
api.defaults.headers.common['apikey'] = process.env.NEXT_PUBLIC_SUPABASE_KEY  
api.defaults.headers.common['Content-Type'] = "application/json"
api.defaults.headers.common['Prefer'] = "return=representation" 

export default api;