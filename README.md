# APP DEYA

Aplicación móvil desarrollada con React Native y Expo para descubrir pop-ups y eventos locales.

## Autenticación

La aplicación utiliza autenticación directa con la base de datos Supabase, sin usar Supabase Auth.

### Tabla Usuario

La autenticación se basa en la tabla `usuario` con las siguientes columnas:
- `iduser` (Primary Key)
- `nombreuser` (VARCHAR)
- `email` (VARCHAR, único)
- `contrasenia` (VARCHAR)

### Funcionalidades

#### Login (`LoginScreen.js`)
- Valida campos vacíos
- Consulta la tabla `usuario` con email y contraseña
- Navega a `Home` si la autenticación es exitosa
- Muestra alertas de error si las credenciales son incorrectas

#### Registro (`RegisterScreen.js`)
- Valida campos vacíos y longitud mínima de contraseña (6 caracteres)
- Verifica que el email no esté ya registrado
- Inserta nuevo usuario en la tabla `usuario`
- Navega a `Login` después del registro exitoso
- Muestra alertas de error si hay problemas

### Validaciones Implementadas

- **Campos vacíos**: Se valida que todos los campos requeridos estén completos
- **Email único**: Se verifica que el email no esté ya registrado
- **Longitud de contraseña**: Mínimo 6 caracteres
- **Manejo de errores**: Alertas informativas para el usuario
- **Estados de carga**: Indicadores visuales durante las operaciones

### Estructura de Archivos

```
APP_DEYA/
├── LoginScreen.js          # Pantalla de login (actualizada)
├── RegisterScreen.js       # Pantalla de registro (actualizada)
├── HomeScreen.js           # Pantalla principal
├── lib/
│   └── supabase.js        # Configuración de Supabase
└── assets/                # Imágenes y recursos
```

### Configuración

La conexión a Supabase se configura en `lib/supabase.js` con las credenciales necesarias para acceder a la base de datos.

## Instalación

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Ejecuta la aplicación: `expo start`

## Tecnologías

- React Native
- Expo
- Supabase (solo base de datos)
- React Navigation 
