import pandas as pd
import re

# Leer el archivo CSV
df = pd.read_csv("crunchbase_companies.csv")

# Función para limpiar y convertir valores monetarios a números
def clean_currency(value, symbol_column, index):
    if isinstance(value, str):
        # Quitar comas que separan miles
        value = value.replace(",", "")
        
        if "¥" in value:
            value = value.replace("¥", "").strip()
            df.at[index, symbol_column] = "$"  # Convertimos yenes a dólares
            return int(float(value) * 0.0065)
        elif "₹" in value:
            value = value.replace("₹", "").strip()
            df.at[index, symbol_column] = "$"  # Convertimos rupias a dólares
            return int(float(value) * 0.012)
        else:
            # Extraer el símbolo si existe
            symbol_match = re.match(r"([^\d\s.,]+)", value)
            if symbol_match:
                df.at[index, symbol_column] = symbol_match.group(0)
            else:
                df.at[index, symbol_column] = "$"  # Valor predeterminado

            value = re.sub(r"[^\d.]", "", value)  # Eliminar caracteres no numéricos
            return int(float(value)) if value else 0
    return 0  # Valor predeterminado si está vacío o nulo

# Iterar sobre cada fila y procesar las columnas monetarias
for index, row in df.iterrows():
    df.at[index, "Last Funding Amount"] = clean_currency(
        row["Last Funding Amount"], "Last Funding Amount Symbol", index
    )
    df.at[index, "Total Funding Equity"] = clean_currency(
        row["Total Funding Equity"], "Total Funding Equity Symbol", index
    )

# Procesar Competitors (reemplazar valores faltantes por 0)
df["Competitors"] = pd.to_numeric(df["Competitors"], errors="coerce").fillna(0).astype(int)

# Guardar el archivo procesado en un nuevo CSV
df.to_csv("crunchbase_companies_processed.csv", index=False)
