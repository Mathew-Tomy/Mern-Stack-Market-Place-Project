const baseUrl = 'http://localhost:5000';

export async function getAll(page, category, query) {
    if (query !== "" && query !== undefined) {
        return (await fetch(`${baseUrl}/products?page=${page}&search=${query}`, { credentials: 'include' })).json();
    } else if (category && category !== 'all') {
        return (await fetch(`${baseUrl}/products/${category}?page=${page}`, { credentials: 'include' })).json();
    } else {
        return (await fetch(`${baseUrl}/products?page=${page}`, { credentials: 'include' })).json();
    }
}

export async function getProducts(query, limit = 5) {
    if (query !== "" && query !== undefined) {
        return (await fetch(`${baseUrl}/products/autocomplete?search=${query}&limit=${limit}`, { credentials: 'include' })).json();
    } else {
        return (await fetch(`${baseUrl}/products/autocomplete`, { credentials: 'include' })).json();
    }
}

// export async function getCity(query, limit = 5) {
//     if (query !== "" && query !== undefined) {
//         return (await fetch(`${baseUrl}/products/city?search=${query}&limit=${limit}`, { credentials: 'include' })).json();
//     } else {
//         return (await fetch(`${baseUrl}/products/city`, { credentials: 'include' })).json();
//     }
// }

export async function getSpecific(id) {
    return (await fetch(`${baseUrl}/products/specific/${id}`, { credentials: 'include' })).json();
}

// export async function getCategoryProduct(category) {
//     return (await fetch(`${baseUrl}/category/specific-category/${category}`, { credentials: 'include' })).json();
// }

export async function createProduct(product) {
    return (await fetch(`${baseUrl}/products/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}

export async function editProduct(id, product) {
    return (await fetch(`${baseUrl}/products/edit/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}


export async function activateSell(id) {
    return (await fetch(`/products/enable/${id}`)).json()
}

export async function archiveSell(id) {
    return (await fetch(`/products/archive/${id}`)).json()
}

export async function wishProduct(id) {
    return (await fetch(`${baseUrl}/products/wish/${id}`, { credentials: 'include' })).json();
}





