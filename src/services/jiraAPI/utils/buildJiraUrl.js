function buildJiraUrl(baseUrl, endpoint, queryParams = {}) {
    const url = new URL(endpoint, baseUrl);
    url.search = new URLSearchParams(queryParams);
    return url.toString();
}

export default buildJiraUrl;
