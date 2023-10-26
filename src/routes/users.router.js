import { Router } from "express";
import { UsersRepository } from "../repositories/Users.repository.js";

const router = Router();
const usersRepository =new UsersRepository()

router.post("/premium/:uid", async (req, res) => {
    const uid = req.params.uid;
    let {role} = req.body.role;

    if (! uid || !role)
      return res
        .status(404)
        .send({
          status: "error",
          error_description: "EL ID de usuario y el rol es requerido.",
        });
    
    if (role !='owner' || role != 'user')
      return res
        .status(404)
        .send({
          status: "error",
          error_description: "EL rol del usuario debe ser: owner o user unicamente.",
        });
  
    const user = await usersRepository.getUserById({ _id: uid });
  
    if (!user)
      return res.status(400).send({ status: "error", error: "User not found" });
  
    if (user.role == 'admin')
      return res.status(400).send({ status: "error", error: "Este usuario no puede ser modificado." });
  
    user.role = role;
    user.save();
  
    res.send({
      status: "success",
      message: "Rol actualizado correctamente",
    });
});

export default router;
