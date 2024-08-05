const createResponse = (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify({...body, }),
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      }
    };
};

module.exports = createResponse;