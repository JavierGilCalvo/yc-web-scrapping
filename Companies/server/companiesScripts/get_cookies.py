from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import pickle
import time

# Configura las opciones de Chrome para cargar el perfil de usuario
chrome_options = Options()

# Reemplaza con la ruta que encontraste en chrome://version/
chrome_options.add_argument("user-data-dir=C:\Users\Usuario\AppData\Local\Google\Chrome\User Data\Default")

# Reemplaza con el nombre del perfil (por ejemplo, "Default" o "Profile 1")
chrome_options.add_argument("profile-directory=Default")

# Configura el path a tu ChromeDriver
chrome_driver_path = "../chromedriver-win64/chromedriver.exe"

# Inicializa el driver de Chrome
service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service)

# Abre la página de Crunchbase
driver.get("https://www.crunchbase.com/search/organization.companies/")

# Espera hasta que hayas iniciado sesión manualmente en Google
input("Inicia sesión manualmente a través de Google y luego presiona Enter para guardar las cookies...")

# Guardar las cookies en un archivo después de iniciar sesión
with open("cookies.pkl", "wb") as file:
    pickle.dump(driver.get_cookies(), file)

# Cierra el navegador
driver.quit()
