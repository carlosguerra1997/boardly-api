# Proximos pasos:
  ## Validaciones
    # Validar variables de entorno.

  ## Añadir Responses a los casos de uso

  ## Empezar a montar la autenticación.
    # Posibilidad de crear una cuenta (envio de emails con verificación).
    # Posibilidad de Loguearse con Google o Github.

    # Implementar registro.
    # Ver como almacenar en Redis los tokens (o por lo menos el refresh) para verificarlo cuando haya que regenerar el access o ambos.
    # Plantear posibilidad de añadir una blacklist cuando se cierre sesión o cosas por el estilo (dado que el token sigue siendo válido aunque se cierre sesión).
    # Cuando loguee, solo generar tokens nuevos si los antiguos han expirado.
  ## Elegir BBDD.
    # PostgreSQL: para almacenar datos.
    # Redis: para almacenar sesiones y cachear respuestas.
  ## Dockerizar todo.
  ## Montar un HttpExceptionFilter para devolver las excepciones de manera Custom.