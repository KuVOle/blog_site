const fs = require('fs');
const path = require('path');

function saveNews(data) {
    fs.writeFileSync('/Users/macbook/Documents/JavaScipt/node/10.2_blog_site_with_upload/package-News.json', JSON.stringify(data));
}
function getData() {
    if (fs.existsSync('/Users/macbook/Documents/JavaScipt/node/10.2_blog_site_with_upload/package-News.json')) {
        try {
            return JSON.parse(fs.readFileSync('/Users/macbook/Documents/JavaScipt/node/10.2_blog_site_with_upload/package-News.json'));
        }
        catch (err) {
            return [];
        }
    }

    return [];
}
function prepareNamePicture(name) {

    if (findJpgPng(name)) {
        return `${Date.now()}${path.extname(name).toLowerCase()}`;
    }
    return null;

}

function findJpgPng(data) {
    if (data.toLowerCase().includes('.txt') || data.toLowerCase().includes('.jpg'))
        return true;
    return;
}

module.exports = { saveNews, getData, prepareNamePicture };