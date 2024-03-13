//CategoryData.js
const baseUrl = 'http://localhost:5000';

export async function fetchCategories() {
  
    return (await fetch('http://localhost:5000/category/get')).json()
  };

 
  export async function  fetchProductsByCategory(query, limit = 5) {
    if (query !== "" && query !== undefined) {
        return (await fetch(`${baseUrl}/category/categoryfilter?search=${query}&limit=${limit}`, { credentials: 'include' })).json();
    } else {
        return (await fetch(`${baseUrl}/category/categoryfilter`, { credentials: 'include' })).json();
    }
}



// export async function getCategoryProduct(category) {
//     return (await fetch(`${baseUrl}/category/specific-category/${category}`, { credentials: 'include' })).json();
// }
