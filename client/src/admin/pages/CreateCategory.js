const baseUrl = 'http://localhost:5000';
export async function createCategory(category) {
    return (await fetch(`${baseUrl}/category/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(category)
    })).json();
}