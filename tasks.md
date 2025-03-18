## Validaciones
  - Validar variables de entorno.

## Configurar Linter
## Configurar Husky.
## Añadir endpoint /healthcheck
## Estructurar bien los datos devueltos por la API. (Respuestas robustas y flexibles)

## Método setex de Redis está deprecated

## Autenticación pendientes:
  - Devolver el refreshToken en una cookie (IMPORTANTE). Actualmente se devuelve en 
    una respuesta JSON.
      - httpOnly: evitar posibles ataques XSS.
      - SameSite=Strict | SameSite=Lax evitar posibles ataques CSRF. (Secure).
  - Permitir X intentos de login y bloquear durante X segundos si falla varias 
    veces seguidas (evitar ataques de fuerza bruta).
  - Añadir blacklist de refresh tokens a redis (blacklistear el refreshToken si el usuario cierra sesión).
  - Login con Google o Github.

## Aplicar CQRS
## CI/CD
