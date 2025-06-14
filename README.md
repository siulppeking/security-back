# 🔐 Servicio de Seguridad - Node.js + Express + MongoDB

Este microservicio gestiona el sistema de seguridad de una aplicación, incluyendo autenticación, usuarios, empresas, perfiles y un sistema jerárquico de menús de hasta 5 niveles.

---

## 📦 Tecnologías

- Node.js (CommonJS)
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Swagger (Documentación API)
- Express Validator
- Postman (para pruebas)

---

## 🧩 Módulos Implementados

| Módulo       | Descripción                                 |
|--------------|---------------------------------------------|
| Auth         | Registro, Login, Validación de Token        |
| Usuario      | Gestión de usuarios                         |
| Perfil       | CRUD de perfiles de usuario                 |
| Empresa      | CRUD de empresas                            |
| Menú         | CRUD jerárquico de menús (Sistema → Formulario) |

---

## 🚀 Instalación

```bash
git clone https://github.com/siulppeking/security-back.git
cd security-back
npm install
npm run dev
