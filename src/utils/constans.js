export const Messages = {
    UNKNOWN_USER_PHONE: { code: 1000, message: 'El número telefónico no está registrado.' },
    UNKNOWN_USER: { code: 1001, message: 'Usuario no encontrado.' },
    UNACCESS_USER: { code: 1015, message: 'Usuario no posee permisos.' },


    MSG_SUCCESS: { code: 1002, message: 'Proceso realizado exitosamente.' },
    MSG_ERROR: { code: 10011, message: 'Error al procesar la solicitud.' },

    FIND_USER_NO_RECORDS: { code: 1003, message: 'Sin registros de usuario.' },
    UDPATE_USER_ERROR: { code: 1004, message: 'Error al actualizar el usuario.' },

    EXIST_USER: { code: 1005, message: 'Correo o número telefónico ya está registrado.' },
    ERROR_CREDENTIALS: { code: 1006, message: 'Credenciales incorrectas.' },
    
    UNKNOWN_TOKEN: { code: 1007, message: 'No se puede encontrar al usuario registrado en el token.' },
    
    REQUIRED_TOKEN: { code: 1008, message: 'Acceso no autorizado, la aplicación requiere un token.' },

    CONFIRMSMS_NOT_USER: { code: 1009, message: 'La cuenta no ha sido confirmada aún.' },

    TOKEN_INVALID: { code: 1010, message: 'Acceso no autorizado, la aplicación requiere un token válido' },

    TOKEN_EXPIRED: { code: 1011, message: 'Acceso no autorizado, el token ha expirado.' },

    ELEMENT_EXIST: { code: 1012, message: 'El elemento ya se encuentra registrado.' },

    MSG_ERROR_EXIST_PRODUCTS: { code: 10013, message: 'No se puede eliminar el negocio, posee productos relacionados, elimine todos los productos asociados al negocio e intente nuevamente' },

    MSG_NO_RECORDS: { code: 10014, message: 'No se encontraron registros' },

    ERROR_SERVER: { code: 3000, message: 'Proceso ejecutado con error.' },
    


    OTP_GENERATION_ERROR_SMS: { code:4000, message: 'Problemas al generar el OTP' },
    OTP_OK_SMS: { code:4001, message: 'OTP generado correctamente'},
    OTP_VERIFICATION_OK_SMS: { code:4003, message: 'Cuenta confirmada exitosamente.'},
    OTP_VERIFICATION_UNKNOWN_SMS: { code:4004, message: 'Código de confirmación incorrecto.'},
    OTP_VERIFICATION_ERROR_SMS: { code:4005, message: 'Problemas al verificar OTP.'},
    OTP_VERIFICATION_MULTI_CHECK: { code:4006, message: 'Se alcanzó el número máximo de intentos de verificación.'},
    OTP_VERIFICATION_FORMAT_CHECK: { code:4007, message: 'El formato es incorrecto (Código pais - Número telefonico - Código verificación).'},
    OTP_VERIFICATION_USER: { code:4008, message: 'Usuario no relacionado con el número telefónico.'},

    OTP_VERIFICATION_MULTI_SEND: { code:4009, message: 'Se alcanzó el número máximo de intentos de envío'},

}