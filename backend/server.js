require('dotenv').config();
const   express     = require('express'),
        cors        = require('cors'),
        mongoose    = require('mongoose'),
        jwt         = require('jsonwebtoken'),
        bcrypt      = require('bcrypt'),
        User        = require("./models/user"),
        app         = express(),
        PORT        = process.env.PORT || 5000

mongoose.connect('mongodb+srv://utkrishtpathak:d1AFZmUXZqbYX4Yq@cluster0.eihdsfi.mongodb.net/?retryWrites=true&w=majority');
    
const db=mongoose.connection;
    db.on("error",console.error.bind(console, "Database connection error: "));
    db.once("open", () => {
        console.log("Database connected");
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.post('/register', async (req,res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({ status: 'OK' });
    } catch(err) {
        res.json({ status: 'error', error: err.message });
    }
})


app.post('/login', async (req,res) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user) return { status: 'error', error: 'Invalid Login'}
    const isPasswrodValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswrodValid)
    {
        const token = jwt.sign(
            {
                name: user.name,
                email:user.email
            },
            'secret123'
        )
        return res.json({ status: "OK", user: token})
    }
    else
    {
        return res.json({ status: "error", user: false});
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})