# Proximos pasos:
  ## Validaciones
    # Validar variables de entorno.

  # Instalar Linter
  # Instalar Husky

  # Permitir X intentos de login y bloquear X segundos (evitar fuerza bruta).
  # Devolver respuestas de los controladores pasando por la capa de presentación.

  ## Autenticación pendientes:
    # Endpoint /refresh para renovar el refreshToken.
    # Devolver el refreshToken en una cookie:
      # httpOnly: evitar posibles ataques XSS.
      # SameSite=Strict | SameSite=Lax evitar posibles ataques CSRF. (Secure).
    # Añadir blacklist de refresh tokens a redis (blacklistear el refreshToken si el usuario cierra sesión).
    # Login con Google o Github.