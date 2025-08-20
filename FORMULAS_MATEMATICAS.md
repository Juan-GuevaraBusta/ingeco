# 🧮 Fórmulas Matemáticas - Conversor de Tasas Financieras

## 📊 Variables Utilizadas

- **i**: Tasa de interés (en decimal)
- **m**: Número de períodos de capitalización por año
- **n**: Número de períodos totales
- **TE**: Tasa Efectiva
- **TN**: Tasa Nominal
- **TP**: Tasa Periódica

## 🔄 Conversiones Implementadas

### 1. NOMINAL A EFECTIVA
### 2. EFECTIVA A NOMINAL
### 3. NOMINAL A PERIÓDICA
### 4. EFECTIVA A PERIÓDICA
### 5. PERIÓDICA A NOMINAL
### 6. PERIÓDICA A EFECTIVA

**Total: 6 tipos de conversiones × 2 modalidades = 12 fórmulas diferentes**

#### 1.1 Modalidad Vencida
```
Tasa Efectiva = (1 + Tasa Nominal / m)^m - 1
```

**Código implementado:**
```typescript
const m = 365 / periodoOrigenData.dias;
resultadoCalculo = Math.pow(1 + tasaNum / m, m) - 1;
```

**Ejemplo:**
- Tasa Nominal: 12% anual
- Período: Mensual (m = 12)
- Cálculo: TE = (1 + 0.12/12)^12 - 1 = 12.68%

#### 1.2 Modalidad Anticipada
```
Tasa Efectiva = 1 / (1 - Tasa Nominal / m)^m - 1
```

**Código implementado:**
```typescript
const m = 365 / periodoOrigenData.dias;
resultadoCalculo = 1 / Math.pow(1 - tasaNum / m, m) - 1;
```

**Ejemplo:**
- Tasa Nominal Anticipada: 12% anual
- Período: Mensual (m = 12)
- Cálculo: TE = 1/(1 - 0.12/12)^12 - 1 = 14.55%

---

### 2. EFECTIVA A NOMINAL

#### 2.1 Modalidad Vencida
```
Tasa Nominal = m * ((1 + Tasa Efectiva)^(1/m) - 1)
```

**Código implementado:**
```typescript
const m = 365 / periodoDestinoData.dias;
resultadoCalculo = m * (Math.pow(1 + tasaNum, 1/m) - 1);
```

**Ejemplo:**
- Tasa Efectiva: 12.68% anual
- Período: Mensual (m = 12)
- Cálculo: TN = 12 * ((1 + 0.1268)^(1/12) - 1) = 12%

#### 2.2 Modalidad Anticipada
```
Tasa Nominal = m * (1 - (1 / (1 + Tasa Efectiva))^(1/m))
```

**Código implementado:**
```typescript
const m = 365 / periodoDestinoData.dias;
resultadoCalculo = m * (1 - Math.pow(1 / (1 + tasaNum), 1/m));
```

**Ejemplo:**
- Tasa Efectiva: 14.55% anual
- Período: Mensual (m = 12)
- Cálculo: TN = 12 * (1 - (1/(1 + 0.1455))^(1/12)) = 12%

---

### 3. NOMINAL A PERIÓDICA

#### 3.1 Modalidad Vencida
```
Tasa Periódica = Tasa Nominal / m
```

**Código implementado:**
```typescript
const m = 365 / periodoDestinoData.dias;
resultadoCalculo = tasaNum / m;
```

**Ejemplo:**
- Tasa Nominal: 12% anual
- Período: Mensual (m = 12)
- Cálculo: TP = 0.12 / 12 = 1% mensual

#### 3.2 Modalidad Anticipada
```
Tasa Periódica = Tasa Nominal / m
```

**Código implementado:**
```typescript
const m = calcularM(periodoDestinoData);
resultadoCalculo = tasaNum / m;
```

**Ejemplo:**
- Tasa Nominal Anticipada: 12% anual
- Período: Mensual (m = 12)
- Cálculo: TP = 0.12 / 12 = 1% mensual

---

### 4. EFECTIVA A PERIÓDICA

#### 4.1 Modalidad Vencida
```
Tasa Periódica = (1 + Tasa Efectiva)^(1/m) - 1
```

**Código implementado:**
```typescript
const m = 365 / periodoDestinoData.dias;
resultadoCalculo = Math.pow(1 + tasaNum, 1/m) - 1;
```

**Ejemplo:**
- Tasa Efectiva: 12.68% anual
- Período: Mensual (m = 12)
- Cálculo: TP = (1 + 0.1268)^(1/12) - 1 = 1% mensual

#### 4.2 Modalidad Anticipada
```
Tasa Periódica = 1 - (1 / (1 + Tasa Efectiva))^(1/m)
```

**Código implementado:**
```typescript
const m = 365 / periodoDestinoData.dias;
resultadoCalculo = 1 - Math.pow(1 / (1 + tasaNum), 1/m);
```

**Ejemplo:**
- Tasa Efectiva: 14.55% anual
- Período: Mensual (m = 12)
- Cálculo: TP = 1 - (1/(1 + 0.1455))^(1/12) = 1.14% mensual

---

### 5. PERIÓDICA A NOMINAL

#### 5.1 Modalidad Vencida
```
Tasa Nominal = Tasa Periódica * m
```

**Código implementado:**
```typescript
const m = 365 / periodoOrigenData.dias;
resultadoCalculo = tasaNum * m;
```

**Ejemplo:**
- Tasa Periódica: 1% mensual
- Período: Mensual (m = 12.17)
- Cálculo: TN = 0.01 * 12.17 = 12.17% anual

#### 5.2 Modalidad Anticipada
```
Tasa Nominal = Tasa Periódica * m
```

**Código implementado:**
```typescript
const m = calcularM(periodoOrigenData);
resultadoCalculo = tasaNum * m;
```

**Ejemplo:**
- Tasa Periódica Anticipada: 1% mensual
- Período: Mensual (m = 12)
- Cálculo: TN = 0.01 * 12 = 12% anual

---

### 6. PERIÓDICA A EFECTIVA

#### 6.1 Modalidad Vencida
```
Tasa Efectiva = (1 + Tasa Periódica)^m - 1
```

**Código implementado:**
```typescript
const m = 365 / periodoOrigenData.dias;
resultadoCalculo = Math.pow(1 + tasaNum, m) - 1;
```

**Ejemplo:**
- Tasa Periódica: 1% mensual
- Período: Mensual (m = 12.17)
- Cálculo: TE = (1 + 0.01)^12.17 - 1 = 12.68% anual

#### 6.2 Modalidad Anticipada
```
Tasa Efectiva = 1 / (1 - Tasa Periódica)^m - 1
```

**Código implementado:**
```typescript
const m = 365 / periodoOrigenData.dias;
resultadoCalculo = 1 / Math.pow(1 - tasaNum, m) - 1;
```

**Ejemplo:**
- Tasa Periódica Anticipada: 1% mensual
- Período: Mensual (m = 12.17)
- Cálculo: TE = 1/(1 - 0.01)^12.17 - 1 = 14.55% anual

---

## 📅 Cálculo de Períodos (m)

La aplicación utiliza valores enteros para `m`:

```typescript
// Función para calcular m con valores enteros
const calcularM = (periodo: any) => {
  switch (periodo.value) {
    case 'hora': return 8760;      // 365 * 24
    case 'diario': return 365;     // 365
    case 'semanal': return 52;     // 365 / 7
    case 'quincenal': return 24;   // 365 / 15
    case 'mensual': return 12;     // 365 / 30
    case 'bimestral': return 6;    // 365 / 60
    case 'trimestral': return 4;   // 365 / 90
    case 'cuatrimestral': return 3; // 365 / 120
    case 'semestral': return 2;    // 365 / 180
    case 'anual': return 1;        // 365 / 365
    default: return 365 / periodo.dias;
  }
};
```

**Ejemplos de m (valores enteros):**
- **Hora**: m = 8760
- **Diario**: m = 365
- **Semanal**: m = 52
- **Quincenal**: m = 24
- **Mensual**: m = 12
- **Bimestral**: m = 6
- **Trimestral**: m = 4
- **Cuatrimestral**: m = 3
- **Semestral**: m = 2
- **Anual**: m = 1

---

## ⚠️ Consideraciones Importantes

### 1. Precisión de Cálculos
- Se utilizan 4 decimales para mostrar resultados
- Los cálculos internos mantienen precisión completa
- Se redondea solo al mostrar el resultado final

### 2. Validaciones
- Tasa debe ser mayor a 0
- Se valida que los períodos existan
- Se manejan errores de cálculo

### 3. Conversiones de Unidades
- Entrada: Porcentaje (ej: 12.5)
- Procesamiento: Decimal (0.125)
- Salida: Porcentaje (12.5000%)

---

## 🔍 Verificación de Fórmulas

### Caso de Prueba: Tasa Nominal 12% Anual a Efectiva Mensual

1. **Datos:**
   - TN = 12% = 0.12
   - Período: Mensual
   - m = 12 (valor entero)

2. **Cálculo Vencido:**
   - TE = (1 + 0.12/12)^12 - 1
   - TE = (1 + 0.01)^12 - 1
   - TE = 1.1268 - 1 = 0.1268 = 12.68%

3. **Cálculo Anticipado:**
   - TE = 1/(1 - 0.12/12)^12 - 1
   - TE = 1/(1 - 0.01)^12 - 1
   - TE = 1/0.8864 - 1 = 1.1282 - 1 = 0.1282 = 12.82%

---

## 📚 Referencias Matemáticas

Estas fórmulas están basadas en:
- **Matemáticas Financieras** - Conceptos de capitalización compuesta
- **Tasas Equivalentes** - Relación entre tasas nominales y efectivas
- **Interés Simple y Compuesto** - Diferencia entre modalidades vencidas y anticipadas

---

## 🛠️ Posibles Mejoras

1. **Agregar más períodos**: Diario exacto (365 días), semanal exacto (52 semanas)
2. **Incluir años bisiestos**: 366 días para años bisiestos
3. **Agregar validaciones**: Límites máximos de tasas
4. **Historial de cálculos**: Guardar conversiones anteriores
5. **Gráficos comparativos**: Visualizar diferencias entre modalidades

---

**¿Necesitas que revise o corrija alguna fórmula específica?** 🤔
