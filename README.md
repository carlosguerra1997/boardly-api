# Proximos pasos:
  ## Validaciones
    # Validar variables de entorno.

  # Instalar Linter
  # Instalar Husky

  ## Autenticación pendientes:
    # Devolver el refreshToken en una cookie (IMPORTANTE). Actualmente se devuelve en 
      una respuesta JSON.
      # httpOnly: evitar posibles ataques XSS.
      # SameSite=Strict | SameSite=Lax evitar posibles ataques CSRF. (Secure).
    # Permitir X intentos de login y bloquear durante X segundos si falla varias 
      veces seguidas (evitar ataques de fuerza bruta).
    # Añadir blacklist de refresh tokens a redis (blacklistear el refreshToken si el usuario cierra sesión).
    # Login con Google o Github.