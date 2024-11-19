import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
import json
import csv

# Inicializar ChromeDriver
chrome_driver_path = "../../../../chrome-win64/chromedriver-win64/chromedriver.exe"  # Ajusta esta ruta
service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service)

# Abre la página de Crunchbase (asegúrate de aplicar manualmente los filtros antes de ejecutar el script)
driver.get("https://www.crunchbase.com/search/organization.companies/")

# Cargar las cookies desde el archivo JSON
with open('cookies.json', 'r') as file:
    cookies = json.load(file)
    for cookie in cookies:
        # Agregar el valor de 'sameSite' si no está presente o es inválido
        if 'sameSite' not in cookie or cookie['sameSite'] not in ['Strict', 'Lax', 'None']:
            cookie['sameSite'] = 'Lax'  # Puedes cambiar 'Lax' a otro valor si es necesario

        # Agregar la cookie al navegador
        driver.add_cookie(cookie)

# Refrescar la página para aplicar las cookies
driver.refresh()

# Espera a que cargues manualmente los filtros
input('Presiona cualquier tecla para continuar después de haber metido los filtros...')

# Ruta del archivo CSV
csv_filename = 'crunchbase_companies.csv'

# Verificar si el archivo ya existe para decidir si escribir el encabezado
file_exists = os.path.isfile(csv_filename)

# Abre el archivo CSV para escribir los datos extraídos, en modo 'a' para agregar
with open(csv_filename, mode='a', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    
    # Solo escribe el encabezado si el archivo es nuevo
    if not file_exists:
        writer.writerow(['Nombre', 'Logo URL', 'Industries', 'Full Description', 'Description', 'Top 5 Investors', 
                         'Last Funding Type', 'Last Funding Amount', 'Total Funding Equity', 
                         'Number of Employees', 'Headquarters Location', 'Competitors', 'Founded Date'])

    while True:
        # Encuentra todas las filas con la clase "ng-star-inserted"
        grid_rows = driver.find_elements(By.CSS_SELECTOR, "grid-row.ng-star-inserted")

        # Extraer los datos de cada fila
        for row in grid_rows:
            try:
                nombre = row.find_element(By.CSS_SELECTOR, '[data-columnid="identifier"]').text
            except:
                nombre = 'N/A'

            try:
                # Encuentra todos los elementos <a> dentro de ese contenedor, en cualquier nivel
                logo_url= ''
                container = row.find_element(By.CSS_SELECTOR, '[data-columnid="identifier"]')
                imgs = container.find_elements(By.TAG_NAME, "img")

                if imgs:
                    # Para cada imagen encontrada, imprimimos el HTML completo
                    for i, img in enumerate(imgs):
                        driver.execute_script("arguments[0].scrollIntoView();", img)
                        WebDriverWait(driver, 10).until(lambda d: img.get_attribute("src"))
                        
                        # Guarda el src si existe, o 'N/A' si está vacío
                        logo_url = img.get_attribute("src") if img.get_attribute("src") else 'N/A'
                    else:
                        print("No se encontraron elementos <img> en el contenedor.")
                        logo_url = 'N/A'
                images_src = [img.get_attribute("src") for img in imgs]
                logo_url = images_src[0]
            except:
                logo_url = 'N/A'

            try:
                container_industries = row.find_element(By.CSS_SELECTOR, '[data-columnid="categories"]')
                industry_elements = container_industries.find_elements(By.TAG_NAME, "a")
                industries_list = [anchor.get_attribute("title") for anchor in industry_elements if anchor.get_attribute("title")]
                industries = ", ".join(industries_list)
            except:
                industries = 'N/A'

            try:
                full_description = row.find_element(By.CSS_SELECTOR, '[data-columnid="description"]').text
            except:
                full_description = 'N/A'

            try:
                description = row.find_element(By.CSS_SELECTOR, '[data-columnid="short_description"]').text
            except:
                description = 'N/A'

            try:
                container_investors = row.find_element(By.CSS_SELECTOR, '[data-columnid="investor_identifiers"]')
                investors_elements = container_investors.find_elements(By.TAG_NAME, "a")
                investors_list = [anchor.get_attribute("title") for anchor in investors_elements if anchor.get_attribute("title")]
                investors = ", ".join(investors_list)
            except:
                investors = 'N/A'

            try:
                funding_type = row.find_element(By.CSS_SELECTOR, '[data-columnid="last_funding_type"]').text
            except:
                funding_type = 'N/A'
            
            try:
                funding_amount = row.find_element(By.CSS_SELECTOR, '[data-columnid="last_funding_total"]').text
            except:
                funding_amount = 'N/A'

            try:
                total_equity_funding = row.find_element(By.CSS_SELECTOR, '[data-columnid="equity_funding_total"]').text
            except:
                total_equity_funding = 'N/A'

            try:
                employees = row.find_element(By.CSS_SELECTOR, '[data-columnid="num_employees_enum"]').text
            except:
                employees = 'N/A'

            try:
                location = row.find_element(By.CSS_SELECTOR, '[data-columnid="location_identifiers"]').text
            except:
                location = 'N/A'

            try:
                competitors = row.find_element(By.CSS_SELECTOR, '[data-columnid="num_org_similarities"]').text
            except:
                competitors = 'N/A'

            try:
                founded_date = row.find_element(By.CSS_SELECTOR, '[data-columnid="founded_on"]').text
            except:
                founded_date = 'N/A'

            # Escribir la fila en el CSV
            print(nombre + "," + industries + "," + investors + "," + funding_type + "," + funding_amount + "," + employees + "," + founded_date)
            writer.writerow([nombre, logo_url, industries, full_description, description, investors, funding_type, funding_amount, total_equity_funding, employees, location, competitors, founded_date])
            print("Fila añadida")
        
        # Verificar si el botón "Next" está deshabilitado para detener el bucle
        try:
            next_button = driver.find_element(By.CLASS_NAME, 'page-button-next')
            if 'disabled' in next_button.get_attribute('class') or next_button.get_attribute('disabled') == 'true':
                print("Última página alcanzada. Terminando el bucle.")
                break
            else:
                next_button.click()
                WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "grid-row.ng-star-inserted")))
        except:
            print("No se encontró el botón 'Next'. Terminando el bucle.")
            break

# Cerrar el navegador al finalizar
driver.quit()

print("Datos exportados exitosamente a crunchbase_companies.csv")
