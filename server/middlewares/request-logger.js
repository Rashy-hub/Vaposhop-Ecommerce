function logRequest(req, res, next) {
    const method = req.method
    const url = req.url
    const body = req.body
    const startTime = Date.now()
    console.log(req.url)

    res.on('finish', () => {
        const statusCode = res.statusCode
        const elapsedTime = Date.now() - startTime
        console.log(
            `${method} ${url} - ${statusCode} - ${elapsedTime}ms - body: ${JSON.stringify(
                body
            )}`
        )
    })

    next()
}

module.exports = logRequest
