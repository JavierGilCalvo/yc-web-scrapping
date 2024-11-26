import pandas as pd

# Cargar el archivo CSV
file_path = "crunchbase_companies_processed.csv"
df = pd.read_csv(file_path)

# Asegurar que los valores no numéricos sean reemplazados por 0 en las columnas objetivo
df['Last Funding Amount'] = pd.to_numeric(df['Last Funding Amount'], errors='coerce').fillna(0).astype(int)
df['Total Funding Equity'] = pd.to_numeric(df['Total Funding Equity'], errors='coerce').fillna(0).astype(int)
df['Competitors'] = pd.to_numeric(df['Competitors'], errors='coerce').fillna(0).astype(int)

# Calcular el mínimo y el máximo para cada columna
min_last_funding = df['Last Funding Amount'].min()
max_last_funding = df['Last Funding Amount'].max()

min_total_equity = df['Total Funding Equity'].min()
max_total_equity = df['Total Funding Equity'].max()

min_competitors = df['Competitors'].min()
max_competitors = df['Competitors'].max()

# Imprimir resultados
print("Last Funding Amount:")
print(f"Min: {min_last_funding}")
print(f"Max: {max_last_funding}\n")

print("Total Funding Equity:")
print(f"Min: {min_total_equity}")
print(f"Max: {max_total_equity}\n")

print("Competitors:")
print(f"Min: {min_competitors}")
print(f"Max: {max_competitors}")
