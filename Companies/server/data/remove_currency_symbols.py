import pandas as pd
import re

# Leer el archivo CSV
input_file = "crunchbase_companies.csv"
output_file = "crunchbase_companies_cleaned.csv"

# Función para separar el símbolo monetario y convertir el valor a un número
def extract_symbol_and_value(value):
    if isinstance(value, str):
        match = re.match(r"([^\d.]+)?([\d,.]+)", value)  # Captura símbolo y valor
        if match:
            symbol = match.group(1) or ""  # Captura el símbolo
            number = re.sub(r"[^\d.]", "", match.group(2))  # Captura el número
            return symbol.strip(), float(number) if number else None
    return "", None

# Leer el CSV en un DataFrame
df = pd.read_csv(input_file)

# Crear columnas para almacenar los símbolos
df["Funding Amount Symbol"], df["Last Funding Amount"] = zip(
    *df["Last Funding Amount"].apply(extract_symbol_and_value)
)
df["Funding Equity Symbol"], df["Total Funding Equity"] = zip(
    *df["Total Funding Equity"].apply(extract_symbol_and_value)
)

# Guardar el nuevo CSV
df.to_csv(output_file, index=False)

print(f"Proceso completado. Archivo guardado como {output_file}")
