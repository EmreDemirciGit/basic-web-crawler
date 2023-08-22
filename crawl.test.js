const {normalizeURL, getURLsFromHTML} = require('./crawl.js')



test('normalizeURL strips http protocol', () => {
    const input = 'http://google.com/path'
    const normalized = normalizeURL(input)
    expect(normalized).toEqual('google.com/path');
})

test('normalizeURL strips https protocol', () => {
    const input = 'https://google.com/path'
    const normalized = normalizeURL(input)
    expect(normalized).toEqual('google.com/path');
})

test('normalizeURL strips trailing slashes', () => {
    const input = 'https://google.com/path/'
    const normalized = normalizeURL(input)
    expect(normalized).toEqual('google.com/path')
})

test('getURLsFromHTML returns a url', () => {
    const html = `
        <html>
            <body>
                <div>
                <a href="https://google.com/">google</a>
                </div>
            </body>
        </html>
    `
    const urls = getURLsFromHTML(html, 'https://google.com')
    expect(urls).toEqual(['https://google.com/'])
})

test('getURLsFromHTML detects relative urls', () => {
    const html = `
        <html>
            <body>
                <div>
                <a href="/party">google</a>
                </div>
            </body>
        </html>
    `
    const urls = getURLsFromHTML(html, 'https://google.com')
    expect(urls).toEqual(['https://google.com/party'])
})

test('getURLsFromHTML handles invalid url', () => {
    const html = `
        <html>
            <body>
                <div>
                <a href="notaurl">google</a>
                </div>
            </body>
        </html>
    `
    const urls = getURLsFromHTML(html, 'https://google.com')
    expect(urls).toEqual([])
})
