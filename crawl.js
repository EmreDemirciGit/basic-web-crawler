const { JSDOM } = require("jsdom");


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody).window.document;

    const aTags = dom.querySelectorAll('a');

    for (const tag of aTags) {
        const href = tag.href
        let url
        if (href.includes(baseURL)) {
            url = href
        } else if(href.slice(0,1) === '/') {
            url =`${baseURL}${href}`
        }
        try {
            new URL(url)
            urls.push(url);
        } catch (err) {
            console.log(`error with url '${href}': ${err.message}`)
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const url = new URL(urlString)
    const protocolStripped = `${url.hostname}${url.pathname}`
    if (hasTrailingSlash(protocolStripped)) {
        return protocolStripped.slice(0, -1)
    } else {
        return protocolStripped
    }
}

function hasTrailingSlash(url) {
 return url.length !== 0 && url.slice(-1) === '/'
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
