import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mongoose } from 'mongoose';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
/* import http from 'http'; 
import { Server } from 'socket.io' */

dotenv.config();
const app = express();

import apiRoutes from './src/Routes/ApiRoutes.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//cors 
app.use(
    cors({
        origin: ['https://nufso.onrender.com', 'http://localhost:5173' ],
        credentials: true
}));

app.use(helmet({
    hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true, // Apply HSTS to subdomains
        preload: true,
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], 
            scriptSrc: ["'self'", "'sha256-JgpphxtupW+atTkR3NtSLqsE7EdOykRMk5Dv+tMhcpY='", "https://cdnjs.cloudflare.com",],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "https://res.cloudinary.com/duochblgz/", "blob:", "data:"],
            connectSrc: ["'self'"], 
            scriptSrcAttr: ["'self'", "'unsafe-inline'"],
            frameSrc: ["'self'","https://res.cloudinary.com/duochblgz/", "data:"]
        }
    },
    frameguard: {
        action: 'Deny'
    },
}))

app.use((req, res, next) => {
    res.set('X-XSS-Protection', '1; mode=block');
    next();
});

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'no-referrer'); 
    next();
});

app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(self), camera=(), microphone=()'); 
    next();
});

/* app.use((req, res, next) => {
    if (req.url.endsWith('.html')) {
        res.set('Cache-Control', 'no-store'); // Do not cache HTML pages
    } else {
        res.set('Cache-Control', 'public, max-age=31536000'); // Cache static assets for 1 year
    }
    next();
});*/

// middleware 
app.use(compression());
app.use(express.json({ limit : "50mb" }));
app.use(cookieParser());
app.use('/requirements', express.static(path.join(__dirname, 'requirements')));
app.use(express.urlencoded({ extended: true }));

// router 
app.use('/', apiRoutes);

app.use(express.static(path.join(__dirname, '../Client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

// database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err));

// port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening on port: ", port));