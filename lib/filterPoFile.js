module.exports = function (content, extensions) {
    const separator = '\n\n';
    const extensionRegexes = extensions.map(function (ext) {
        // Should match stuff like
        // #: d3/templates/main/block_post_comments.tmpl:203
        // or
        // #: d3/templates/rss/post.tmpl:74 d3/docroot/views/post.html:13
        return new RegExp("^#:.*"+ext+":\\d+", 'm');
    });

    function shouldIncludeBlock(block) {
        for (var i in extensionRegexes) {
            var regex = extensionRegexes[i];
            if (regex.test(block)) {
                return true;
            }
        }
        return false;
    }

    var result = content.split(separator).filter(function (item, pos) {
        const isHeader = Boolean(pos == 0);
        return Boolean(isHeader || shouldIncludeBlock(item));
    });

    return result.join(separator)
}
