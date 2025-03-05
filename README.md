# Proximos pasos:
  ## Validaciones
    # Validar variables de entorno.

  # Devolver respuestas de los controladores pasando por la capa de presentación.
  # Endpoint refresh para renovar el refreshToken.

  ## Autenticación pendientes:
    # Middleware para validar rutas.
    # Devolver el refreshToker en una cookie:
      # httpOnly: para protegerla de ataques XSS.
      # SameSite=Strict | SameSite=Lax para evitar ataques CSRF.
    # Añadir blacklist de refresh tokens a redis (blacklistear el refreshToken si el usuario cierra sesión).
    # Posibilidad de Loguearse con Google o Github.