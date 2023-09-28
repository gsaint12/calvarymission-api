const express = require('express');  // here we import our express framework
const app = express();
const memberApiRoutes = require('./apiRoutes/memberApi/members');
const userApiRoutes = require('./apiRoutes/userApi/users');
const postApiRoutes = require('./apiRoutes/postApi/posts');
const authApiRoutes = require('./apiRoutes/authApi/auth');
const protectedApiRoutes = require('./apiRoutes/protectedRoutes/protected');


app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    '/api/auth', authApiRoutes
);

app.use(
    '/admin', protectedApiRoutes
);

app.use(
  '/api/users', userApiRoutes
);
app.use(
    '/api/members', memberApiRoutes
);
app.use(
    '/api/posts', postApiRoutes
);


app.get('/', (req, res)=>{
    res.json({message: "it's working"})
});

module.exports = app;