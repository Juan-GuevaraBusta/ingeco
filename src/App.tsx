import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  Divider,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  Calculate,
  TrendingUp,
  AccountBalance,
  Schedule
} from '@mui/icons-material';

// Crear tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

interface ConversionResult {
  value: number;
  formula: string;
  explanation: string;
}

function App() {
  const [tasa, setTasa] = useState<string>('');
  const [periodoOrigen, setPeriodoOrigen] = useState<string>('anual');
  const [periodoDestino, setPeriodoDestino] = useState<string>('anual');
  const [tipoConversion, setTipoConversion] = useState<string>('nominal-efectiva');
  const [modalidad, setModalidad] = useState<string>('vencida');
  const [resultado, setResultado] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  const periodos = [
    { value: 'hora', label: 'Hora', dias: 1/24 },
    { value: 'diario', label: 'Diario', dias: 1 },
    { value: 'semanal', label: 'Semanal', dias: 7 },
    { value: 'quincenal', label: 'Quincenal', dias: 15 },
    { value: 'mensual', label: 'Mensual', dias: 30 },
    { value: 'bimestral', label: 'Bimestral', dias: 60 },
    { value: 'trimestral', label: 'Trimestral', dias: 90 },
    { value: 'cuatrimestral', label: 'Cuatrimestral', dias: 120 },
    { value: 'semestral', label: 'Semestral', dias: 180 },
    { value: 'anual', label: 'Anual', dias: 365 },
  ];

  const conversiones = [
    { value: 'nominal-efectiva', label: 'Nominal a Efectiva' },
    { value: 'efectiva-nominal', label: 'Efectiva a Nominal' },
    { value: 'nominal-periodica', label: 'Nominal a Periódica' },
    { value: 'efectiva-periodica', label: 'Efectiva a Periódica' },
    { value: 'periodica-nominal', label: 'Periódica a Nominal' },
    { value: 'periodica-efectiva', label: 'Periódica a Efectiva' },
  ];

  const calcularConversion = () => {
    setError('');
    setResultado(null);

    if (!tasa || parseFloat(tasa) <= 0) {
      setError('Por favor ingresa una tasa válida mayor a 0');
      return;
    }

    const tasaNum = parseFloat(tasa) / 100; // Convertir a decimal
    const periodoOrigenData = periodos.find(p => p.value === periodoOrigen);
    const periodoDestinoData = periodos.find(p => p.value === periodoDestino);

    if (!periodoOrigenData || !periodoDestinoData) {
      setError('Error en la configuración de períodos');
      return;
    }

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

    let resultadoCalculo: number;
    let formula: string;
    let explanation: string;

    try {
      switch (tipoConversion) {
        case 'nominal-efectiva':
          if (modalidad === 'vencida') {
            // Tasa Efectiva = (1 + Tasa Nominal / m)^m - 1
            const m = calcularM(periodoOrigenData);
            resultadoCalculo = Math.pow(1 + tasaNum / m, m) - 1;
            formula = `Tasa Efectiva = (1 + ${tasaNum} / ${m})^${m} - 1`;
            explanation = `Convertimos la tasa nominal del ${periodoOrigenData.label} a tasa efectiva anual usando la fórmula de capitalización compuesta.`;
          } else {
            // Tasa Efectiva = 1 / (1 - Tasa Nominal / m)^m - 1
            const m = calcularM(periodoOrigenData);
            resultadoCalculo = 1 / Math.pow(1 - tasaNum / m, m) - 1;
            formula = `Tasa Efectiva = 1 / (1 - ${tasaNum} / ${m})^${m} - 1`;
            explanation = `Convertimos la tasa nominal anticipada del ${periodoOrigenData.label} a tasa efectiva anual.`;
          }
          break;

        case 'efectiva-nominal':
          if (modalidad === 'vencida') {
            // Tasa Nominal = m * ((1 + Tasa Efectiva)^(1/m) - 1)
            const m = calcularM(periodoDestinoData);
            resultadoCalculo = m * (Math.pow(1 + tasaNum, 1/m) - 1);
            formula = `Tasa Nominal = ${m} * ((1 + ${tasaNum})^(1/${m}) - 1)`;
            explanation = `Convertimos la tasa efectiva anual a tasa nominal del ${periodoDestinoData.label}.`;
          } else {
            // Tasa Nominal = m * (1 - (1 / (1 + Tasa Efectiva))^(1/m))
            const m = calcularM(periodoDestinoData);
            resultadoCalculo = m * (1 - Math.pow(1 / (1 + tasaNum), 1/m));
            formula = `Tasa Nominal = ${m} * (1 - (1 / (1 + ${tasaNum}))^(1/${m}))`;
            explanation = `Convertimos la tasa efectiva anual a tasa nominal anticipada del ${periodoDestinoData.label}.`;
          }
          break;

        case 'nominal-periodica':
          if (modalidad === 'vencida') {
            // Tasa Periódica = Tasa Nominal / m
            const m = calcularM(periodoDestinoData);
            resultadoCalculo = tasaNum / m;
            formula = `Tasa Periódica = ${tasaNum} / ${m}`;
            explanation = `Convertimos la tasa nominal anual a tasa periódica del ${periodoDestinoData.label}.`;
          } else {
            // Tasa Periódica = Tasa Nominal / m (CORREGIDO)
            const m = calcularM(periodoDestinoData);
            resultadoCalculo = tasaNum / m;
            formula = `Tasa Periódica = ${tasaNum} / ${m}`;
            explanation = `Convertimos la tasa nominal anual anticipada a tasa periódica del ${periodoDestinoData.label}.`;
          }
          break;

        case 'efectiva-periodica':
          if (modalidad === 'vencida') {
            // Tasa Periódica = (1 + Tasa Efectiva)^(1/m) - 1
            const m = calcularM(periodoDestinoData);
            resultadoCalculo = Math.pow(1 + tasaNum, 1/m) - 1;
            formula = `Tasa Periódica = (1 + ${tasaNum})^(1/${m}) - 1`;
            explanation = `Convertimos la tasa efectiva anual a tasa periódica del ${periodoDestinoData.label}.`;
          } else {
            // Tasa Periódica = 1 - (1 / (1 + Tasa Efectiva))^(1/m)
            const m = calcularM(periodoDestinoData);
            resultadoCalculo = 1 - Math.pow(1 / (1 + tasaNum), 1/m);
            formula = `Tasa Periódica = 1 - (1 / (1 + ${tasaNum}))^(1/${m})`;
            explanation = `Convertimos la tasa efectiva anual a tasa periódica anticipada del ${periodoDestinoData.label}.`;
          }
          break;

        case 'periodica-nominal':
          if (modalidad === 'vencida') {
            // Tasa Nominal = Tasa Periódica * m
            const m = calcularM(periodoOrigenData);
            resultadoCalculo = tasaNum * m;
            formula = `Tasa Nominal = ${tasaNum} * ${m}`;
            explanation = `Convertimos la tasa periódica del ${periodoOrigenData.label} a tasa nominal anual.`;
          } else {
            // Tasa Nominal = Tasa Periódica * m (CORREGIDO)
            const m = calcularM(periodoOrigenData);
            resultadoCalculo = tasaNum * m;
            formula = `Tasa Nominal = ${tasaNum} * ${m}`;
            explanation = `Convertimos la tasa periódica anticipada del ${periodoOrigenData.label} a tasa nominal anual.`;
          }
          break;

        case 'periodica-efectiva':
          if (modalidad === 'vencida') {
            // Tasa Efectiva = (1 + Tasa Periódica)^m - 1
            const m = calcularM(periodoOrigenData);
            resultadoCalculo = Math.pow(1 + tasaNum, m) - 1;
            formula = `Tasa Efectiva = (1 + ${tasaNum})^${m} - 1`;
            explanation = `Convertimos la tasa periódica del ${periodoOrigenData.label} a tasa efectiva anual.`;
          } else {
            // Tasa Efectiva = 1 / (1 - Tasa Periódica)^m - 1
            const m = calcularM(periodoOrigenData);
            resultadoCalculo = 1 / Math.pow(1 - tasaNum, m) - 1;
            formula = `Tasa Efectiva = 1 / (1 - ${tasaNum})^${m} - 1`;
            explanation = `Convertimos la tasa periódica anticipada del ${periodoOrigenData.label} a tasa efectiva anual.`;
          }
          break;

        default:
          throw new Error('Tipo de conversión no válido');
      }

      setResultado({
        value: resultadoCalculo * 100, // Convertir a porcentaje
        formula,
        explanation
      });

    } catch (error) {
      setError('Error en el cálculo. Verifica los datos ingresados.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              <Calculate sx={{ mr: 2, verticalAlign: 'middle' }} />
              Conversor de Tasas Financieras
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Calculador de Tasas realizado por Juan Bustamante
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Panel de entrada */}
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Datos de Entrada
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Tasa (%)"
                      type="number"
                      value={tasa}
                      onChange={(e) => setTasa(e.target.value)}
                      placeholder="Ej: 12.5"
                      sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Tipo de Conversión</InputLabel>
                      <Select
                        value={tipoConversion}
                        label="Tipo de Conversión"
                        onChange={(e) => setTipoConversion(e.target.value)}
                      >
                        {conversiones.map((conv) => (
                          <MenuItem key={conv.value} value={conv.value}>
                            {conv.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Modalidad</InputLabel>
                      <Select
                        value={modalidad}
                        label="Modalidad"
                        onChange={(e) => setModalidad(e.target.value)}
                      >
                        <MenuItem value="vencida">Vencida</MenuItem>
                        <MenuItem value="anticipada">Anticipada</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Período Origen</InputLabel>
                      <Select
                        value={periodoOrigen}
                        label="Período Origen"
                        onChange={(e) => setPeriodoOrigen(e.target.value)}
                      >
                        {periodos.map((periodo) => (
                          <MenuItem key={periodo.value} value={periodo.value}>
                            {periodo.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Período Destino</InputLabel>
                      <Select
                        value={periodoDestino}
                        label="Período Destino"
                        onChange={(e) => setPeriodoDestino(e.target.value)}
                      >
                        {periodos.map((periodo) => (
                          <MenuItem key={periodo.value} value={periodo.value}>
                            {periodo.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={calcularConversion}
                      startIcon={<Calculate />}
                    >
                      Calcular Conversión
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Panel de resultados */}
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Resultado
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  {resultado && (
                    <Box>
                      <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography variant="h3" color="primary" gutterBottom>
                          {resultado.value.toFixed(4)}%
                        </Typography>
                        <Chip 
                          label={`${modalidad.charAt(0).toUpperCase() + modalidad.slice(1)}`}
                          color="secondary"
                          variant="outlined"
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle2" gutterBottom color="text.secondary">
                        Fórmula Utilizada:
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="body2" fontFamily="monospace">
                          {resultado.formula}
                        </Typography>
                      </Paper>

                      <Typography variant="subtitle2" gutterBottom color="text.secondary">
                        Explicación:
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {resultado.explanation}
                      </Typography>
                    </Box>
                  )}

                  {!resultado && !error && (
                    <Box textAlign="center" sx={{ py: 4 }}>
                      <Schedule sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        Ingresa los datos y presiona "Calcular Conversión" para ver el resultado
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box textAlign="center" mt={4}>
            {/* Footer vacío - mensaje eliminado */}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
