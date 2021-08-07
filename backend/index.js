const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');


const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: 3600000
        }
    })
)
app.post('/logout', (req, res) => {
    req.session.destroy();
    x = null;
    return res.redirect('http://localhost:3000');

});


// add item to cart
app.post('/product/:id', (req, res) => {
    const id = req.params.id;
    db('cart')
        .insert({
            useremail: x,
            itemid: id,
        })
        .then(() => {
            //console.log('User registered successfully');
            return res.redirect(`http://localhost:3000/product/` + id);
        })
        .catch((err) => {
            // res.send('<script>alert("User Already Exists"); window.location.href = "http://localhost:3000/register"; </script>');
        });
});

// get total price of items in cart
app.get('/cartsum', (req, res) => {
    db('cart').sum('price_after_sale')
        .from('product')
        .join('cart', 'itemid', 'id')
        .where('useremail', '=', x)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// get number of items in cart
app.get('/countcartitems', (req, res) => {
    db('cart').count('id')
        .from('product')
        .join('cart', 'itemid', 'id')
        .where('useremail', '=', x)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// show items that are in cart
app.get('/cart', (req, res) => {
    db.select('*')
        .from('product')
        .join('cart', 'itemid', 'id')
        .where('useremail', '=', x)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// remove item from cart
app.post('/removefromcart/:id', (req, res) => {
    const id = req.params.id;
    db.delete('*')
        .from('cart')
        .where('orderid', '=', id)
        .then((data) => {
            return res.redirect("http://localhost:3000/cart")
        })
        .catch((err) => {
            console.log(err);
        });
});


app.post('/addtohistory', (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy

    db('history')
        .insert(
            db('cart')
            .select('orderid', 'useremail', 'itemid')
            .from('cart')
            .join('product', 'itemid', 'id')
            .where('useremail', '=', x)
        )

    .then(() => {
        db.delete('*')
            .from('cart')
            .where('useremail', '=', x)
            .then((data) => {
                return res.redirect("http://localhost:3000/cart")
            })
            .catch((err) => {
                console.log(err);
            });
    })
});

app.get('/history', (req, res) => {
    db.select('*')
        .from('history')
        .join('product', 'itemid', 'id')
        .where('useremail', '=', x)
        .then((data) => {
            console.log(data, 'color:red');
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch categories from the database
app.get('/test', (req, res) => {
    db.select('*')
        .from('category')
        .orderBy('name')
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});
// get categories for footer
app.get('/footer', (req, res) => {
    db.select('*')
        .from('category')
        .orderBy('name')
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});
// get data for slider
app.get('/slider', (req, res) => {
    db.select('*')
        .from('Slider')
        .orderBy('id')
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});
// get cat name
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    // //console.log(id);
    // var origin = req.get('origin');
    db.select('*')
        .from('product')
        .where('catid', '=', id)
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});

// items on sale
app.get('/sale/', (req, res) => {
    // //console.log(id);
    // var origin = req.get('origin');
    db.select('*')
        .from('product')
        .where('discounted', '=', '1')
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});

//search
app.get('/search/', (req, res) => {
    keyword = ('%' + req.query.result + '%');
    console.log(keyword);
    // //console.log(id);
    // var origin = req.get('origin');
    db.select('*')
        .from('product')
        .where('name', 'LIKE', keyword)
        .orWhere('description', 'LIKE', keyword)
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});



app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    // //console.log(id);
    // var origin = req.get('origin');
    db.select('*')
        .from('category')
        .where('id', '=', id)
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});

app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    // //console.log(id);
    // var origin = req.get('origin');
    db.select('*')
        .from('product')
        .where('id', '=', id)
        .then((data) => {
            //console.log(data);
            res.json(data);
        })
        .catch((err) => {
            //console.log(err);
        });
});


//register
app.post('/register', (req, res) => {

    const { first_name, last_name, email, region, password, cpassword } = req.body;

    console.log("Password = ", password);
    console.log("CPassword = ", cpassword);

    if (password == cpassword) {
        db('user')
            .insert({
                first_name: first_name,
                last_name: last_name,
                email: email,
                region: region,
                password: password
            })
            .then(() => {
                //console.log('User registered successfully');
                return res.redirect('http://localhost:3000');
            })
            .catch((err) => {
                res.send('<script>alert("User Already Exists"); window.location.href = "http://localhost:3000/register"; </script>');
            });
    } else {
        //console.log('User did not register');
        res.send('<script>alert("Passwords do not match"); window.location.href = "http://localhost:3000/register"; </script>');
    }
});

//login
app.post('/header', (req, res) => {
    let { email, password } = req.body;
    x = email;

    db.select('*')
        .from('user')
        .where('email', '=', x)
        .andWhere('password', '=', password)
        .then((data) => {
            //  req.session.userEmail = email;
            //  x = req.session.userEmail;
            if (data.length == 0) {
                res.send('<script>alert("Login Failed"); window.location.href = "http://localhost:3000";</script>');
            } else {
                // console.log(x);
                app.get('/random', (req, res) => {
                    console.log(x);
                    db.select('*')
                        .from('user')
                        .where('email', '=', x)
                        .then((data) => {
                            req.session.userEmail = email;

                            res.json(data);
                        })
                        .catch((err) => {
                            //console.log(err);
                        });
                });
                //console.log('User logged in successfully');
                // console.log(data);

                return res.redirect('http://localhost:3000');
            }
        })
        .catch((err) => {
            //console.log(err);
            // res.send('<script>alert("Login Failed"); window.location.href = "http://localhost:3000";</script>');
            // return res.redirect('http://localhost:3000');
        });
});
// update user data
app.post('/updateuser', (req, res) => {
    const { fname, lname, email, region, password } = req.body;
    db('user')
        .where('email', '=', x)
        .update({ first_name: fname })
        .update({ last_name: lname })
        .update({ email: email })
        .update({ region: region })
        .then(() => {
            console.log('User Updated');
            return res.redirect('http://localhost:3000/profile');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/numlikes/:id', (req, res) => {
    const id = req.params.id;
    const numlikes = req.body;
    console.log(numlikes);
    var stringify = JSON.stringify(numlikes);
    var string = stringify.valueOf(numlikes);
    string = string.replace(/\D/g, '');
    // var numb = string.slice(13);
    console.log(string);
    var int = parseInt(string, 10);
    console.log(int);
    console.log(numlikes);
    db('product')
        .where('id', '=', id)
        .update({ numlikes: int + 1 })
        .then(() => {
            console.log('Product Updated');
            return res.redirect(`http://localhost:3000/product/${id}`);
        })
        .catch((err) => {
            console.log(err);
        });

});


///////////////////////////////////////////////////////////////////////////////////// FOR ADMIN USE ONLY /////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/admin', (req, res) => {
    let { username, password } = req.body;

    db.select('*')
        .from('admin')
        .where('username', '=', username)
        .andWhere('password', '=', password)
        .then((data) => {
            if (data.length == 0) {
                res.send('<script>alert("Login Failed"); window.location.href = "http://localhost:3000/login";</script>');
            } else {
                return res.redirect('http://localhost:3001/home');
            }
        });
});

app.post('/addcategory', (req, res) => {

    const { name } = req.body;

    db('category')
        .insert({
            name: name
        })
        .then(() => {
            //console.log('User registered successfully');
            return res.redirect('http://localhost:3001/categories');
        })
        .catch((err) => {
            res.send('<script>alert("Category Already Exists"); window.location.href = "http://localhost:3001/categories"; </script>');
        });

});


app.post('/addproduct/:catid', (req, res) => {

    const { name, brand, price, description, discount } = req.body;
    const catid = req.params.catid;

    if (discount > 0) {
        db('product')
            .insert({
                name: name,
                Brand: brand,
                price: price,
                description: description,
                discounted: 1,
                discount: discount,
                catid: catid,
            })
            .then(() => {
                //console.log('User registered successfully');
                return res.redirect('http://localhost:3001/categories');
            })
            .catch((err) => {
                console.log(err);
                res.send('<script>alert("Error in if"); window.location.href = "http://localhost:3001/categories"; </script>');
            });
    } else {
        db('product')
            .insert({
                name: name,
                Brand: brand,
                price: price,
                description: description,
                discount: 0,
                discounted: 0,
                catid: catid,
            })
            .then(() => {
                //console.log('User registered successfully');
                return res.redirect('http://localhost:3001/categories');
            })
            .catch((err) => {
                // console.log(catid);
                console.log(err);
                res.send('<script>alert("Error in else"); window.location.href = "http://localhost:3001/categories"; </script>');
            });
    }

});

app.post('/removeproduct/:id', (req, res) => {
    const id = req.params.id;
    db.delete('*')
        .from('product')
        .where('id', '=', id)
        .then((data) => {
            return res.redirect(`http://localhost:3001/categories`)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/updateproduct/:id', (req, res) => {
    const { name, brand, description, price, discount } = req.body;
    const id = req.params.id;
    console.log(name);
    db('product')
        .where('id', '=', id)
        .update({ name: name })
        .update({ Brand: brand })
        .update({ description: description })
        .update({ price: price })
        .update({ discount: discount })
        .then(() => {
            console.log('User Updated');
            return res.redirect(`http://localhost:3001/categories`);
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));