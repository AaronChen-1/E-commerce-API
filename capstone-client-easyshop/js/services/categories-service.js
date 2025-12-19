let categoryService;

class CategoryService {
    
    categories = [];
    
    getAllCategories(callback) {
        const url = `${config.baseUrl}/categories`;
        axios.get(url)
            .then(response => {
                this.categories = response.data;
                if (callback) {
                    callback(this.categories);
                }
            })
            .catch(error => {
                console.error("Error loading categories:", error);
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    categoryService = new CategoryService();
});
