import pandas as pd

# Cargar el archivo CSV en un DataFrame
df = pd.read_csv('crunchbase_companies.csv')

# Modificar la columna 'Logo URL' eliminando la parte "h_25,w_25,"
df['Logo URL'] = df['Logo URL'].str.replace(r'h_25,w_25,', '', regex=True)

# Guardar el DataFrame modificado en un nuevo archivo CSV o sobrescribir el existente
df.to_csv('crunchbase_companies_updated.csv', index=False)

print("Archivo modificado y guardado con éxito.")
