import { UsuarioController } from "../controllers/usuarios_controller.js";
import { Usuario } from "../models/usuario_model.js";

const {username, email, avatarUrl, createdAt} = await UsuarioController.listarUsuario()
const usuario = new Usuario(username, email, avatarUrl, createdAt, localStorage.token, localStorage.userId)
usuario.listarPostParginacao('page=1')
