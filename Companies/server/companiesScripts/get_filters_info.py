import pandas as pd
import re

# Leer el archivo CSV
df = pd.read_csv("crunchbase_companies.csv")

# Función para limpiar y convertir valores monetarios a números, manejando yenes y rupias
def clean_currency(value):
    if isinstance(value, str):
        # Si el valor tiene símbolo de yen, convertirlo a dólares
        if "¥" in value:
            value = re.sub(r"[^\d.]", "", value)  # Elimina caracteres no numéricos
            return float(value) * 0.0065 if value else None
        # Si el valor tiene símbolo de rupia, convertirlo a dólares
        elif "₹" in value:
            value = re.sub(r"[^\d.]", "", value)  # Elimina caracteres no numéricos
            return float(value) * 0.012 if value else None
        # Limpiar otros valores monetarios
        else:
            value = re.sub(r"[^\d.]", "", value)  # Elimina caracteres no numéricos
            return float(value) if value else None
    return value

# Convertir las columnas monetarias
df["Last Funding Amount"] = df["Last Funding Amount"].apply(clean_currency)
df["Total Funding Equity"] = df["Total Funding Equity"].apply(clean_currency)

# Convertir Competitors a numérico (ya debería serlo, pero por si acaso)
df["Competitors"] = pd.to_numeric(df["Competitors"], errors="coerce")

# Obtener máximo y mínimo de Last Funding Amount
max_funding = df["Last Funding Amount"].max()
min_funding = df["Last Funding Amount"].min()

# Obtener máximo y mínimo de Competitors
max_competitors = df["Competitors"].max()
min_competitors = df["Competitors"].min()

# Obtener máximo y mínimo de Total Funding Equity
max_equity = df["Total Funding Equity"].max()
min_equity = df["Total Funding Equity"].min()

# Mostrar resultados
print("Last Funding Amount:")
print(f"Max: {max_funding}")
print(f"Min: {min_funding}")

print("\nCompetitors:")
print(f"Max: {max_competitors}")
print(f"Min: {min_competitors}")

print("\nTotal Funding Equity:")
print(f"Max: {max_equity}")
print(f"Min: {min_equity}")
