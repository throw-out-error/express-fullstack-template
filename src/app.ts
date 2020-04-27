import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

/*
Initializes the .env file into process.env
*/
try {
    dotenv.config()
} catch (err) {
    console.error(err)
}

var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.render('index')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'public'))

app.use('*', (req, res, next) => {
    /*
    Since this file is built with typescript, we need to navigate 
    up a directory and into the public folder.
    */
    var file = path.join(__dirname, '..', 'public', req.originalUrl)
    if (file != null && file != '') {
        if (
            req.originalUrl.startsWith('/css') ||
            req.originalUrl.startsWith('/js') ||
            req.originalUrl.startsWith('/assets') ||
            req.originalUrl.startsWith('/favicon')
        ) {
            res.sendFile(file)
        } else {
            if (req.query.error && req.query.error != null) {
                res.render(file, { error: req.query.error }, (err, html) => {
                    if (err) {
                        if (err.message.startsWith('Failed to lookup view'))
                            handle404(req, res, html)
                    } else {
                        res.send(html)
                    }
                })
            } else {
                res.render(file, {}, (err, html) => {
                    if (err) {
                        if (err.message.startsWith('Failed to lookup view')) {
                            handle404(req, res, html)
                            console.error(err.message)
                        }
                    } else {
                        res.send(html)
                    }
                })
            }
        }
    } else {
        next()
    }
})

// Error handling
const handle404 = (req, res, html) => {
    res.status(404).send('<h1>404</h1><h2>Requested Resource Not Found</h2>')
}

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Express server listening on 0.0.0.0:${port}`)
})
