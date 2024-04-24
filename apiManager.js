// 函数用于发送请求到后端
const baseURL= "https://claude3.edu.cn.ucas.life";

const route = "/api/v1/api_key";
const apiKeyUrl = baseURL + route;
async function sendRequest(url, method, queryParams = null, body = null) {
    // 如果存在查询参数，将其附加到 URL
    url = apiKeyUrl + url;
    if (queryParams) {
        url += '?' + new URLSearchParams(queryParams).toString();
    }
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(data) {
    document.getElementById('results').textContent = JSON.stringify(data, null, 2);
}

// 创建API密钥
async function createAPIKey() {
    const expirationSeconds = document.getElementById('expirationSeconds').value;
    if (!expirationSeconds) {
        displayResults('Please enter a value for expiration seconds.');
        return;
    }
    // 以查询参数的形式发送 expiration_seconds
    const queryParams = { expiration_seconds: parseInt(expirationSeconds, 10) };
    const result = await sendRequest('/create_key', 'POST', queryParams);
    displayResults(JSON.stringify(result));
}

// 验证API密钥
async function validateAPIKey() {
    const apiKey = document.getElementById('apiKeyToValidate').value;
    const result = await sendRequest(`/validate_key/${apiKey}`, 'GET');
    displayResults(JSON.stringify(result));
}

// 增加使用次数
async function incrementUsage() {
    const apiKey = document.getElementById('apiKeyToIncrement').value;
    const result = await sendRequest(`/increment_usage/${apiKey}`, 'POST');
    displayResults(JSON.stringify(result));
}

// 获取使用次数
async function getUsage() {
    const apiKey = document.getElementById('apiKeyToGetUsage').value;
    const result = await sendRequest(`/get_usage/${apiKey}`, 'GET');
    displayResults(JSON.stringify(result));
}

// 删除API密钥
async function deleteAPIKey() {
    const apiKey = document.getElementById('apiKeyToDelete').value;
    const result = await sendRequest(`/delete_key/${apiKey}`, 'DELETE');
    displayResults('API Key deleted');
}

// 列出所有API密钥
async function listAPIKeys() {
    const result = await sendRequest('/list_keys', 'GET');
    displayResults(JSON.stringify(result));
}
