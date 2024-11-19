import pandas as pd
import re

# Leer el archivo CSV
df = pd.read_csv("crunchbase_companies.csv")

# Función para limpiar y convertir valores monetarios a números, manejando yenes, rupias y valores vacíos
def clean_currency(value):
    if isinstance(value, str):
        # Manejar valores faltantes o guiones
        if value.strip() == "—":
            return 0
        # Verificar y convertir yenes a dólares
        if value.startswith("¥"):
            value = float(re.sub(r"[^\d.]", "", value)) * 0.0065
        # Verificar y convertir rupias a dólares
        elif value.startswith("₹"):
            value = float(re.sub(r"[^\d.]", "", value)) * 0.012
        else:
            value = re.sub(r"[^\d.]", "", value)  # Eliminar caracteres no numéricos
        return int(float(value)) if value else 0  # Convertir a entero y manejar valores vacíos
    return 0

# Función para extraer símbolos, manejando valores faltantes
def extract_symbol(value):
    if isinstance(value, str) and value.strip() != "—":
        match = re.match(r"([^\d\s.,]+)", value)
        if match:
            return match.group(1)
    return "$"  # Asignar $ por defecto si no hay símbolo o el valor es "—"

# Crear columnas para los símbolos
df["Funding Amount Symbol"] = df["Last Funding Amount"].apply(extract_symbol)
df["Funding Equity Symbol"] = df["Total Funding Equity"].apply(extract_symbol)

# Limpiar y convertir las columnas monetarias
df["Last Funding Amount"] = df["Last Funding Amount"].apply(clean_currency)
df["Total Funding Equity"] = df["Total Funding Equity"].apply(clean_currency)

# Manejar valores faltantes en la columna Competitors
df["Competitors"] = pd.to_numeric(df["Competitors"].replace("—", 0), errors="coerce").fillna(0).astype(int)

# Guardar el resultado en un nuevo archivo CSV
df.to_csv("crunchbase_companies_cleaned.csv", index=False)

print("Archivo procesado y guardado como 'crunchbase_companies_cleaned.csv'")
