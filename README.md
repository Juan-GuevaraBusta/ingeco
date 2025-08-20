# Conversor de Tasas Financieras

Una aplicación web moderna y intuitiva para realizar conversiones entre diferentes tipos de tasas financieras utilizadas en matemáticas financieras.

## 🚀 Características

- **Conversiones Completas**: Soporta todas las conversiones principales de tasas financieras
- **Múltiples Períodos**: Diario, semanal, quincenal, mensual, bimestral, trimestral, cuatrimestral, semestral y anual
- **Modalidades**: Tasas vencidas y anticipadas
- **Interfaz Moderna**: Diseño responsive y intuitivo con Material-UI
- **Cálculos Precisos**: Implementa las fórmulas matemáticas correctas para cada conversión
- **Explicaciones**: Muestra la fórmula utilizada y explica el proceso de conversión

## 📊 Tipos de Conversiones Soportadas

### 1. Nominal a Efectiva
- Convierte tasas nominales a tasas efectivas anuales
- Soporta modalidades vencidas y anticipadas

### 2. Efectiva a Nominal
- Convierte tasas efectivas anuales a tasas nominales
- Permite seleccionar el período de capitalización deseado

### 3. Nominal a Periódica
- Calcula la tasa periódica equivalente a partir de una tasa nominal
- Útil para cálculos de cuotas y pagos periódicos

### 4. Efectiva a Periódica
- Determina la tasa periódica correspondiente a una tasa efectiva anual
- Ideal para análisis de inversiones y préstamos

### 5. Periódica a Nominal
- Convierte tasas periódicas a tasas nominales anuales
- Útil para comparar diferentes períodos de capitalización

### 6. Periódica a Efectiva
- Convierte tasas periódicas a tasas efectivas anuales
- Permite estandarizar tasas de diferentes períodos

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Material-UI** - Componentes de interfaz moderna
- **Emotion** - Estilos CSS-in-JS
- **Vite** - Herramienta de construcción rápida

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/conversor-tasas-financieras.git
   cd conversor-tasas-financieras
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abre tu navegador**
   La aplicación estará disponible en `http://localhost:3000`

## 🚀 Despliegue

### Despliegue en Vercel

1. **Conecta tu repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio

2. **Configuración automática**
   - Vercel detectará automáticamente que es una aplicación React
   - El build se ejecutará automáticamente

3. **Variables de entorno (opcional)**
   - No se requieren variables de entorno para esta aplicación

### Despliegue Manual

1. **Construye la aplicación**
   ```bash
   npm run build
   ```

2. **Sube los archivos**
   - Sube la carpeta `build` a tu servidor web
   - Configura tu servidor para servir archivos estáticos

## 📱 Uso de la Aplicación

1. **Ingresa la tasa**: Escribe el valor de la tasa en porcentaje
2. **Selecciona el tipo de conversión**: Elige entre las 6 opciones disponibles
3. **Configura la modalidad**: Vencida o anticipada
4. **Define los períodos**: Origen y destino
5. **Calcula**: Presiona el botón "Calcular Conversión"
6. **Revisa el resultado**: Incluye la fórmula utilizada y explicación

## 🧮 Fórmulas Implementadas

### Nominal a Efectiva (Vencida)
```
Tasa Efectiva = (1 + Tasa Nominal / m)^m - 1
```

### Nominal a Efectiva (Anticipada)
```
Tasa Efectiva = 1 / (1 - Tasa Nominal / m)^m - 1
```

### Efectiva a Nominal (Vencida)
```
Tasa Nominal = m * ((1 + Tasa Efectiva)^(1/m) - 1)
```

### Efectiva a Nominal (Anticipada)
```
Tasa Nominal = m * (1 - (1 / (1 + Tasa Efectiva))^(1/m))
```

### Nominal a Periódica (Vencida)
```
Tasa Periódica = Tasa Nominal / m
```

### Nominal a Periódica (Anticipada)
```
Tasa Periódica = Tasa Nominal / (m + Tasa Nominal)
```

### Efectiva a Periódica (Vencida)
```
Tasa Periódica = (1 + Tasa Efectiva)^(1/m) - 1
```

### Efectiva a Periódica (Anticipada)
```
Tasa Periódica = 1 - (1 / (1 + Tasa Efectiva))^(1/m)
```

### Periódica a Nominal (Vencida)
```
Tasa Nominal = Tasa Periódica * m
```

### Periódica a Nominal (Anticipada)
```
Tasa Nominal = (Tasa Periódica * m) / (1 - Tasa Periódica)
```

### Periódica a Efectiva (Vencida)
```
Tasa Efectiva = (1 + Tasa Periódica)^m - 1
```

### Periódica a Efectiva (Anticipada)
```
Tasa Efectiva = 1 / (1 - Tasa Periódica)^m - 1
```

Donde `m` es el número de períodos de capitalización por año.

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Se adapta a diferentes tamaños de pantalla
- **Tema Moderno**: Utiliza Material Design con colores profesionales
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **Validación de Entrada**: Verifica que los datos sean válidos
- **Mensajes de Error**: Información clara sobre errores de entrada

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Juan Luis Guevara Bustamante**
- Estudiante de Ingeniería Electrónica
- Especialización en Matemáticas Financieras

## 🙏 Agradecimientos

- Material-UI por los componentes de interfaz
- React Team por el framework
- Comunidad de desarrolladores por las herramientas y recursos

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme:
- Email: [tu-email@ejemplo.com]
- GitHub: [@tu-usuario]

---

⭐ Si este proyecto te ha sido útil, ¡dale una estrella en GitHub!
