// serve.js
const express = require('express')
const path = require('path')
const compression = require('compression')

var app = express()
    // must be first!
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'Client')));

// import some new stuff
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/serve'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './Client/components/routes'

// send all requests to index.html so browserHistory in React Router works
app.get('*', function(req, res) {
            match({ routes: routes, location: req.url }, (err, redirect, props) => {
                    // `RouterContext` is what the `Router` renders. `Router` keeps these
                    // `props` in its state as it listens to `browserHistory`. But on the
                    // server our app is stateless, so we need to use `match` to
                    // get these props before rendering.
                    const appHtml = renderToString( < RouterContext {...props }
                        />)
                        // dump the HTML into a template, lots of ways to do this, but none are
                        // really influenced by React Router, so we're just using a little
                        // function, `renderPage`
                        res.send(renderPage(appHtml))
                    })
                // res.sendFile(path.join(__dirname, 'Client', 'index.html'))
            });

        var PORT = process.env.PORT || 8081
        app.listen(PORT, function() {
            console.log('Production Express server running at localhost:' + PORT)
        });