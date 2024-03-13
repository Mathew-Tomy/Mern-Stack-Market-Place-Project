//CityData.js
const baseUrl = 'http://localhost:5000';
export async function  fetchProductsByCity(query, limit = 5) {
    if (query !== "" && query !== undefined) {
        return (await fetch(`${baseUrl}/city/fetchproducts?search=${query}&limit=${limit}`, { credentials: 'include' })).json();
    } else {
        return (await fetch(`${baseUrl}/city/fetchproducts`, { credentials: 'include' })).json();
    }
  }
  export async function fetchCity() {
  
    return (await fetch('http://localhost:5000/city/get')).json()
  };
