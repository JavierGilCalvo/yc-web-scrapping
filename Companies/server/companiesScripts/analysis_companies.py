import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import re


# Función para preprocesar la fecha según los casos detectados
def preprocess_date(date_str):
    # Caso 1: Solo año (por ejemplo, "2020")
    if re.match(r"^\d{4}$", date_str):
        return f"{date_str}-06-01"  # Usar 1 de junio como día y mes por defecto
    
    # Caso 2: Mes y año (por ejemplo, "Sep 2020")
    elif re.match(r"^[A-Za-z]{3} \d{4}$", date_str):
        # Convertir a un formato como "2020-09-01"
        try:
            return pd.to_datetime(f"01 {date_str}", format='%d %b %Y').strftime('%Y-%m-%d')
        except:
            return pd.NaT  # Si no se puede interpretar, devolver NaT
    
    # Caso 3: Día, mes y año ya especificados (por ejemplo, "Jul 9, 2020")
    # Convertir directamente usando pd.to_datetime para asegurar el formato yyyy-mm-dd
    else:
        try:
            return pd.to_datetime(date_str, errors='coerce').strftime('%Y-%m-%d')
        except:
            return pd.NaT  # Si no se puede interpretar, devolver NaT

# Cargar los archivos necesarios
# Archivo de Crunchbase con 'Founded Date' y 'Industries'
crunchbase_df = pd.read_csv('crunchbase_companies.csv')
# Archivo de puntuaciones con 'Total Score'
scores_df = pd.read_csv('output_puntuaciones.csv')

# Ajustar los nombres de las columnas para que coincidan y fusionar los DataFrames usando 'Name'
crunchbase_df = crunchbase_df.rename(columns={'Name': 'Company', 'Industries': 'Industries'})
scores_df = scores_df.rename(columns={'Name': 'Company', 'Total Score': 'Total Score'})
merged_df = pd.merge(scores_df, crunchbase_df[['Company', 'Founded Date', 'Industries']], on='Company')

## TRATAMIENTO DE FECHAS!!
# Aplicar la normalización a la columna 'Founded Date'
# Aplicar la función de preprocesamiento a la columna 'Founded Date'
merged_df['Preprocessed Founded Date'] = merged_df['Founded Date'].apply(preprocess_date)

# Convertir la columna preprocesada a tipo datetime y renombrar como 'Founded Date'
merged_df['Founded Date'] = pd.to_datetime(merged_df['Preprocessed Founded Date'], errors='coerce')

# Eliminar la columna temporal 'Preprocessed Founded Date' ahora que ya no es necesaria
merged_df = merged_df.drop(columns=['Preprocessed Founded Date'])

# Revisar si hay fechas que no se pudieron convertir
invalid_dates = merged_df[merged_df['Founded Date'].isna()]
if not invalid_dates.empty:
    print("Fechas no convertibles después del preprocesamiento:")
    print(invalid_dates[['Company', 'Founded Date']])
## FIN TRATAMIENTO DE FECHAS!!

# Convertir 'Total Score' a float para cálculos y filtrar las columnas numéricas necesarias
merged_df['Total Score'] = merged_df['Total Score'].astype(float)
numeric_columns = ['Market Size', 'Innovation Level', 'Market Competition', 
                   'User Fit', 'Industry Relevance', 'Team Size and Traction', 
                   'Funding and Validation', 'Total Score']

# 1. Análisis Comparativo por Criterio Específico
mean_values_updated = merged_df[numeric_columns].mean()

# 2. Análisis de Correlación entre Criterios
correlation_matrix_updated = merged_df[numeric_columns].corr()

# 3. Análisis de Tendencias por 'Founded Date'
# Convertir 'Founded Date' a año
merged_df['Founded Year'] = pd.to_datetime(merged_df['Founded Date'], errors='coerce').dt.year
year_trends_updated = merged_df.groupby('Founded Year')[numeric_columns].mean()

# 4. Evaluación del Riesgo por Industria
# Expansión de la columna 'Industries' para contar múltiples industrias por empresa
industries_expanded = merged_df['Industries'].str.get_dummies(sep=', ')
industry_risk_updated = pd.concat([merged_df[['Company']], industries_expanded], axis=1)

# Filtrar empresas con Total Score > 8
high_score_df = merged_df[merged_df['Total Score'] > 8]

# 5. Clustering de Startups y Benchmarking
from sklearn.cluster import KMeans

# Agrupación en tres clusters (para simplificar)
kmeans_updated = KMeans(n_clusters=3, random_state=0)
merged_df['Cluster'] = kmeans_updated.fit_predict(merged_df[numeric_columns[:-1]])  # Excluyendo 'Total Score'

# Top Startups basadas en el ranking por 'Total Score'
top_startups_updated = merged_df.sort_values(by='Total Score', ascending=False).head(10)

# Devolver el resultado en un DataFrame para su visualización
print(merged_df)


# Visualizar los clusters con respecto a 'Total Score' y 'Founded Year'
"""plt.figure(figsize=(10, 6))
sns.scatterplot(data=merged_df, x='Founded Year', y='Total Score', hue='Cluster', palette='viridis', s=100)
plt.title('Clusters de Startups según Año de Fundación y Puntuación Total')
plt.xlabel('Año de Fundación')
plt.ylabel('Puntuación Total')
plt.legend(title='Cluster')
plt.show()

# Visualización de correlación actualizada y ranking de las Top Startups
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix_updated, annot=True, cmap='coolwarm', fmt='.2f', linewidths=.5)
plt.title('Correlation Matrix of Evaluation Criteria (Updated)')
plt.show()

plt.figure(figsize=(12, 6))
sns.barplot(data=top_startups_updated, x='Total Score', y='Company', palette='viridis')
plt.title('Top 5 Startups by Total Score')
plt.xlabel('Total Score')
plt.ylabel('Company')
plt.show()"""

# High score companies
plt.figure(figsize=(12, 6))
sns.barplot(data=high_score_df, x='Total Score', y='Company', palette='viridis')
plt.title('Top Startups by Total Score')
plt.xlabel('Total Score')
plt.ylabel('Company')
plt.show()

# Año fundación distribución
plt.figure(figsize=(10, 6))
sns.histplot(high_score_df['Founded Year'], bins=10, kde=True)
plt.title('Distribución del Año de Fundación de Startups con Total Score > 8')
plt.xlabel('Año de Fundación')
plt.ylabel('Frecuencia')
plt.show()

# --- Distribución de Industrias ---
# Asumimos que 'Industries' contiene industrias separadas por comas
industry_count = high_score_df['Industries'].str.split(',').explode().value_counts()
plt.figure(figsize=(12, 6))
sns.barplot(x=industry_count.values, y=industry_count.index, palette='viridis')
plt.title('Distribución de Industrias en Startups con Total Score > 8')
plt.xlabel('Frecuencia')
plt.ylabel('Industria')
plt.show()

# --- Promedio de Puntuación por Criterio ---
criteria_cols = ['Market Size', 'Innovation Level', 'Market Competition', 
                 'User Fit', 'Industry Relevance', 'Team Size and Traction', 
                 'Funding and Validation']
criteria_avg = high_score_df[criteria_cols].mean()

plt.figure(figsize=(12, 6))
sns.barplot(x=criteria_avg.values, y=criteria_avg.index, palette='viridis')
plt.title('Promedio de Puntuación por Criterio para Startups con Total Score > 8')
plt.xlabel('Puntuación Promedio')
plt.ylabel('Criterio')
plt.show()


# --- Clustering de Empresas con Puntuación > 8 (opcional) ---
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Escalar los datos antes de aplicar KMeans
scaler = StandardScaler()
scaled_data = scaler.fit_transform(high_score_df[criteria_cols])

# Determinar el número de clusters usando KMeans (por ejemplo, 3 clusters)
kmeans = KMeans(n_clusters=3, random_state=42)
high_score_df['Cluster'] = kmeans.fit_predict(scaled_data)

# Visualizar los clusters respecto al 'Total Score' y 'Founded Year'
plt.figure(figsize=(10, 6))
sns.scatterplot(data=high_score_df, x='Founded Year', y='Total Score', hue='Cluster', palette='viridis', s=100)
plt.title('Clusters de Startups con Total Score > 8 según Año de Fundación y Puntuación Total')
plt.xlabel('Año de Fundación')
plt.ylabel('Puntuación Total')
plt.legend(title='Cluster')
plt.show()