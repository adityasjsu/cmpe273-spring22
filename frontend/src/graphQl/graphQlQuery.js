const qlQuery = async (query, variables = {}) => {
    const resp = await fetch("http://localhost:4001", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    return (await resp.json()).data;
};

export default qlQuery;