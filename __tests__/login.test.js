

const credenciales = {
    admin:   { usuario: 'admin',   password: 'admin123',   nombre: 'Administrador', rol: 'admin'   },
    cliente: { usuario: 'cliente', password: 'cliente123', nombre: 'Cliente Demo',  rol: 'cliente' }
};

function validarLogin(tipo, usuario, password) {
    const cred = credenciales[tipo];
    if (!cred) return { exito: false };
    if (usuario === cred.usuario && password === cred.password) {
        return { exito: true, nombre: cred.nombre, rol: cred.rol };
    }
    return { exito: false };
}

test('Login cliente con credenciales correctas', () => {
    const resultado = validarLogin('cliente', 'cliente', 'cliente123');
    expect(resultado.exito).toBe(true);
    expect(resultado.rol).toBe('cliente');
});

test('Login admin con credenciales correctas', () => {
    const resultado = validarLogin('admin', 'admin', 'admin123');
    expect(resultado.exito).toBe(true);
    expect(resultado.rol).toBe('admin');
});

test('Login falla con contraseña incorrecta', () => {
    const resultado = validarLogin('cliente', 'cliente', 'wrongpass');
    expect(resultado.exito).toBe(false);
});

test('Login falla con usuario incorrecto', () => {
    const resultado = validarLogin('admin', 'hacker', 'admin123');
    expect(resultado.exito).toBe(false);
});

test('Login admin retorna nombre correcto', () => {
    const resultado = validarLogin('admin', 'admin', 'admin123');
    expect(resultado.nombre).toBe('Administrador');
});

test('Login con tipo inexistente falla', () => {
    const resultado = validarLogin('supervisor', 'admin', 'admin123');
    expect(resultado.exito).toBe(false);
}); 