import { Router } from "express";
import { createHash, authToken, generateToken ,generateLink} from "../utils/utils.js";
import passport from "passport";
import CONFIG from '../config/config.js'
import { UsersRepository } from "../repositories/Users.repository.js";
import { LinksRepository } from "../repositories/Links.repository.js";
import MailingService from '../services/mailing.js';

const router = Router();
const usersRepository =new UsersRepository()
const linksRepository =new LinksRepository()

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  let exist = await usersRepository.getUserById({ email: email });
  if (exist)
    return res
      .status(400)
      .send({ status: "error", error: "Ya esta registrado este correo" });

  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };

  if (email == CONFIG.EMAIL_ADMIN && password == CONFIG.PASSWORD_ADMIN)
    user.role = "admin";

  let resr = await usersRepository.saveUser(user);
  return res
    .status(200)
    .send({ status: "success", msj: "Te registraste correctamente" });
});
/*
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .send({
        status: "error",
        error_description: "Todos los campos son obligatoios",
      });

  const user = await userModel.findOne(
    { email: email },
    { email: 1, first_name: 1, last_name: 1, password: 1 }
  );
  if (!user)
    return res.status(400).send({ status: "error", error: "User not found" });

  if (!isValidatePassword(user, password))
    return res
      .status(403)
      .send({ status: "error", error: "Incorrect credentials" });
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    rol: user.rol,
  };
  res.send({
    status: "success",
    payload: req.session.user,
    message: "Nuestro primer logueo",
  });
});*/

router.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "api/sessions/failedLogin",
    failureMessage: true,
  }),
  (req, res) => {
    const serialUser = {
      id: req.user._id,
      name: `${req.user.first_name}`,
      role: req.user.role,
      email: req.user.email,
    };
    req.session.user = serialUser;
    const access_token = generateToken(serialUser);
    res
      .cookie("access_token", access_token, { maxAge: 36000000 })
      .send({ status: "success", payload: serialUser , token : access_token });
  }
);

router.get("/failedLogin", (req, res) => {
    //console.log(req.message);
    console.log('failed login')
    res.send({status:'error', message: 'failed login'})
});

/**Logueo con github */

router.post(
  "/registerGit",
  passport.authenticate("registerGithub", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "success", message: "User Register" });
  }
);

router.get("/failregister", async (req, res) => {
  res.send({ error: "failed" });
});

router.post(
  "/loginGit",
  passport.authenticate("loginGithub", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    console.log("Probando el ingreso a la estrategia");

    const { email, password } = req.body;

    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect Password" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.send({ status: "success", payload: req.user});
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;

    res.redirect("/api/products");
  }
);

router.post("/logout", async (req, res) => {
  if (req.session.user) req.session.destroy();
  res.redirect("/login");
});

/**
 * router.post('/register',async(req,res)=>{
    const { first_name,last_name,email, age, password}=req.body;
    const exist =await userModel.findOne({email});

    if(exist) return res.status(400).send({status:"error",error:"Users already exists"})

    const user={
        first_name,
        last_name,
        email,
        age,
        password
    }
    let result = await userModel.create(user)
    res.send({status:"success",message:"User registered"})
})


router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user = await userModel.findOne({email,password});

    if(!user) return res.status(400).send({status:"error",error:"Incorrect credentials"})

    req.session.user={
        name: `${user.first_name} ${user.last_name}`,
        email:user.email,
        age: user.age
    }
    res.send({status:"success",payload:req.session.user, message:"Nuestro primer logueo"})
})
 */

router.post("/reset", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(404)
      .send({
        status: "error",
        error_description: "Todos los campos son obligatoios",
      });

  const user = await usersRepository.getUserById({ email: email });

  if (!user)
    return res.status(400).send({ status: "error", error: "User not found" });

  user.password = password;
  user.save();

  res.send({
    status: "success",
    message: "Contraseña reseteada correctamente",
  });
});

router.post("/resetbyemail", async (req, res) => {
  const { email} = req.body;

  if (!email)
    return res
      .status(404)
      .send({
        status: "error",
        error_description: "Todos los campos son obligatoios",
      });

  const user = await usersRepository.getUserById({ email: email });

  if (!user)
    return res.status(400).send({ status: "error", error: "User not found" });

    let link = await generateLink(user);
    console.log(link);
    let linkComp = req.url+'/'+link.codelink;
    const mailer = new MailingService();
    const result = await mailer.sendSimpleMail({
        from:'Ecommerce',
        to: user.email,
        subject:"Reseteo de contraseña",
        html:`<div><h1>Hola ${user.first_name}!</h1>
        <p> En el siguiente link podras resetear tu contraseña:</p>
        <form method="GET" action="${linkComp}">
        <input type="hidden" value="${link.codelink}" name="code">
        <button type="submit">Resetear contraseña</button>
        </form>
        <p>El link expirará en 1 hora.</p>
        </div>`
    })
    console.log(result);

  res.send({
    status: "success",
    message: "Se envio un correo para reestablecer su contraseña.",
  });
});



router.get('current',authToken,(req,res)=>{
    res.send({status:"success", token: token})
})

export default router;
