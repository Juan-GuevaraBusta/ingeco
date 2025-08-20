# 🚀 Guía de Despliegue - Conversor de Tasas Financieras

## 📋 Pasos para Subir a GitHub y Desplegar en Vercel

### Paso 1: Preparar el Repositorio Git

1. **Inicializar Git (si no está inicializado)**
   ```bash
   git init
   ```

2. **Agregar todos los archivos**
   ```bash
   git add .
   ```

3. **Hacer el primer commit**
   ```bash
   git commit -m "Initial commit: Conversor de Tasas Financieras"
   ```

### Paso 2: Crear Repositorio en GitHub

1. **Ve a GitHub.com** y crea una nueva cuenta si no tienes una
2. **Crea un nuevo repositorio**:
   - Nombre: `conversor-tasas-financieras`
   - Descripción: "Aplicación web para conversiones de tasas financieras"
   - **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
3. **Copia la URL del repositorio** (ej: `https://github.com/tu-usuario/conversor-tasas-financieras.git`)

### Paso 3: Subir a GitHub

1. **Conecta tu repositorio local con GitHub**
   ```bash
   git remote add origin https://github.com/tu-usuario/conversor-tasas-financieras.git
   ```

2. **Sube el código a GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Paso 4: Desplegar en Vercel

1. **Ve a [vercel.com](https://vercel.com)**
2. **Crea una cuenta** o inicia sesión con tu cuenta de GitHub
3. **Haz clic en "New Project"**
4. **Importa tu repositorio**:
   - Selecciona el repositorio `conversor-tasas-financieras`
   - Vercel detectará automáticamente que es una aplicación React
5. **Configuración del proyecto**:
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
6. **Haz clic en "Deploy"**

### Paso 5: Configuración Adicional (Opcional)

1. **Dominio personalizado** (si lo deseas):
   - En el dashboard de Vercel, ve a Settings > Domains
   - Agrega tu dominio personalizado

2. **Variables de entorno** (no necesarias para este proyecto):
   - No se requieren variables de entorno

## 🔧 Comandos Útiles

### Desarrollo Local
```bash
# Iniciar servidor de desarrollo
npm start
# o
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

### Git
```bash
# Ver estado del repositorio
git status

# Ver cambios
git diff

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push
```

### Vercel
```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Desplegar desde línea de comandos
vercel

# Desplegar a producción
vercel --prod
```

## 🌐 URLs Importantes

- **Desarrollo local**: `http://localhost:3000`
- **Vercel Preview**: `https://tu-proyecto.vercel.app`
- **GitHub**: `https://github.com/tu-usuario/conversor-tasas-financieras`

## 📱 Características de la Aplicación

✅ **Conversiones Soportadas**:
- Nominal a Efectiva (vencida y anticipada)
- Efectiva a Nominal (vencida y anticipada)
- Nominal a Periódica (vencida y anticipada)
- Efectiva a Periódica (vencida y anticipada)

✅ **Períodos Disponibles**:
- Diario, Semanal, Quincenal, Mensual
- Bimestral, Trimestral, Cuatrimestral
- Semestral, Anual

✅ **Características Técnicas**:
- React 18 con TypeScript
- Material-UI para interfaz moderna
- Diseño responsive
- Cálculos precisos con fórmulas matemáticas
- Explicaciones detalladas de cada conversión

## 🎯 Próximos Pasos

1. **Personalizar la aplicación**:
   - Cambiar colores en `src/App.tsx` (línea 25-35)
   - Modificar el título en `public/index.html`
   - Agregar tu información de contacto en `README.md`

2. **Mejorar la funcionalidad**:
   - Agregar más tipos de conversiones
   - Implementar historial de cálculos
   - Agregar gráficos de comparación

3. **Optimizar para SEO**:
   - Agregar meta tags en `public/index.html`
   - Implementar sitemap
   - Optimizar para motores de búsqueda

## 🆘 Solución de Problemas

### Error de Build
Si hay errores al construir:
```bash
# Limpiar cache
npm run build -- --reset-cache

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error de Despliegue en Vercel
- Verifica que el repositorio esté público o que Vercel tenga acceso
- Revisa los logs de build en el dashboard de Vercel
- Asegúrate de que `package.json` tenga los scripts correctos

### Problemas con Material-UI
Si hay errores de TypeScript:
```bash
# Actualizar dependencias
npm update @mui/material @emotion/react @emotion/styled
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de error
2. Consulta la documentación de React y Material-UI
3. Busca en Stack Overflow
4. Abre un issue en GitHub

---

¡Tu aplicación estará disponible para todo el mundo en Vercel! 🌍
