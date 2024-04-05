import axios from "axios";

import { API_CATEGORY } from "./constant";


const http = axios.create({
  withCredentials: true
});

export default class CategoryService {
    insertCategory = async (category) => {
        try {
            const response = await http.post(API_CATEGORY, category);
            return response;
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    };
    getCategories = async () => {
        try {
            const response = await axios.get(API_CATEGORY);
            return response;
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }
    deleteCategory = async (id) => {
        try {
            const response = await axios.delete(API_CATEGORY + '/' + id);
            return response;
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }
}