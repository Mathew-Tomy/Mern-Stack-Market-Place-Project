const baseUrl = 'http://localhost:5000';
// export async function CreateCity(city) {
//     try {
//       const response = await fetch(`${baseUrl}/city/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(city),
//       });
  
//       if (!response.ok) {
//         throw new Error(`City creation failed with status: ${response.status}`);
//       }
  
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating city:', error);
//       // Handle error gracefully, e.g., display an error message to the user
//       throw error; // Re-throw the error to allow upper layers to handle it
//     }
//   }
export async function CreateCity(city) {
  return (await fetch(`${baseUrl}/city/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(city)
  })).json();
}