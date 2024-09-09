import json
import time
import csv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

# Cargar los filtros desde el archivo JSON
with open('filters.json', 'r') as f:
    filters = json.load(f)

# Inicializar ChromeDriver
chrome_driver_path = "../chromedriver-win64/chromedriver.exe"  # Ajusta esta ruta
service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service)

input('Presiona cualquier tecla para continuar...')

# 1. Entrar al directorio de YC
driver.get('https://www.ycombinator.com/companies')

# 2. Aplicar los filtros manualmente
input('Aplicamos los filtros que queramos manualmente...')

# 3. Hacer scroll hasta que se cargue todo el contenido
last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# 4. Extraer los datos de las startups con BeautifulSoup
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Cerrar el navegador después de obtener el contenido
driver.quit()

# 5. Guardar los datos en un archivo CSV
with open('startups_yc.csv', mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Nombre', 'Descripción', 'Industria', 'Tamaño', 'Ubicación', 'Sitio Web'])

    # Encontrar todas las startups
    startups = soup.find_all('div', class_='_company_86jzd_338')  # Selector para cada empresa

    for startup in startups:
        # Obtener el nombre
        nombre = startup.find('span', class_='_coName_86jzd_453').text if startup.find('span', class_='_coName_86jzd_453') else 'N/A'
        
        # Obtener la descripción
        descripcion = startup.find('span', class_='_coDescription_86jzd_478').text if startup.find('span', class_='_coDescription_86jzd_478') else 'N/A'
        
        # Obtener las industrias del href (pueden ser varias)
        industrias = []
        for industry_link in startup.find_all('a', href=lambda href: href and 'industry=' in href):
            href = industry_link['href']
            # Extraer lo que está después de 'industry='
            industry_value = href.split('industry=')[1]
            industrias.append(industry_value)

        # Obtener el batch del href (debería ser solo uno)
        batch = None
        batch_link = startup.find('a', href=lambda href: href and 'batch=' in href)
        if batch_link:
            href = batch_link['href']
            # Extraer lo que está después de 'batch='
            batch = href.split('batch=')[1]
        tamano = startup.find('span', class_='startup-size').text if startup.find('span', class_='startup-size') else 'N/A'
        ubicacion = startup.find('span', class_='_coLocation_86jzd_469').text if startup.find('span', class_='_coLocation_86jzd_469') else 'N/A'
        # FALTA COGER EL TAMAÑO DEL EQUIPO Y ALGO DE INFO DE LOS FUNDADORES
        # sitio_web = startup.find('a', class_='startup-website')['href'] if startup.find('a', class_='startup-website') else 'N/A'

        # Escribir los datos en el archivo CSV
        writer.writerow([nombre, descripcion, batch, industrias, tamano, ubicacion])

print("Scraping completado. Datos guardados en 'startups_yc.csv'.")
