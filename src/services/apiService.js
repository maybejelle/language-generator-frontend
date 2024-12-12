export const fetchDataFromApi = async (url, body) => {
    try {
        console.log(JSON.stringify(url));
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error calling proxy server:', error);
        throw new Error('API request failed');
    }
};
