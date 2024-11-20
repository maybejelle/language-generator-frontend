export const fetchDataFromApi = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calling proxy server:', error);
        throw new Error('API request failed');
    }
};
