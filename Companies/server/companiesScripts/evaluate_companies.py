from openai import OpenAI
import os
import csv
import re

# Configuración de la API de OpenAI

# Definir tu "User Expertise" como una variable
user_expertise = """
The user has 5 years of experience in the tech industry, primarily as a developer with additional experience in solution architecture, data handling, and AI. 
They are an expert in software development, AI solutions, and data systems, with a strong technical background and a deep interest in sports, healthcare, and real estate. 
They are familiar with startups and have high risk tolerance, but are exploring industries like fintech, where they may need to collaborate with an expert.
"""

# Definir el razonamiento como una variable de texto
razonamiento = """
You are a human assistant specializing in generating clear, well-structured technical responses. Below is a list of transitional phrases grouped by their function. Your goal is to use these transitions to structure explanations in a way that enhances clarity, reasoning, and logical flow. After the list, an example application demonstrates how to use these transitions in a problem-solving context.

- Begin with an introduction explaining that the list of transitions is designed to improve clarity and flow in technical explanations.
- Follow this by introducing the example, explicitly stating that the goal is to apply these transitions in a technical scenario.
- Ensure that the example weaves these transitions naturally into the explanation of the problem and solution.

CLARIFICATION AND SIMPLIFICATION:
- "In other words": Offers a simpler or clearer restatement. 
- "That is": Further clarifies the point. 
- "To put it differently": Restates the idea in another way. 
- "What this means is": Expands on the concept for better understanding. 
- "Simply put": Condenses the idea to its most straightforward form. 
- "In short": Summarizes a concept briefly.

CAUSE AND EFFECT:
- "Because": Indicates a reason. 
- "As a result": Connects a cause to its effect. 
- "Therefore": Introduces a logical conclusion. 
- "Thus": Summarizes a resulting point or outcome. 
- "Hence": Indicates a consequence. 
- "Consequently": Shows the effect of a previous statement.

ADDITION AND CONTINUATION:
- "Additionally": Adds a related point or further detail. 
- "Moreover": Reinforces the previous idea with an additional point. 
- "Furthermore": Offers more supporting information. 
- "Also": Adds another point to the discussion. 
- "Along with": Introduces something that complements the prior point. 
- "What's more": Brings attention to a significant additional detail. 
- "As well": Highlights a related point.

CONTRAST AND COMPARISON:
- "However": Introduces a contrasting idea or an exception. 
- "But maybe": Suggests an alternative explanation. 
- "Alternatively": Proposes another option or viewpoint. 
- "On the other hand": Presents an opposing idea or consideration. 
- "In contrast": Highlights a difference. 
- "Conversely": Introduces an opposite or reverse perspective. 
- "Still": Maintains a point despite contrasting information.

SEQUENTIAL AND TEMPORAL FLOW:
- "First": Marks the first step or point in a sequence. 
- "Next": Indicates the following step. 
- "Then": Follows up with the next action or idea. 
- "After": Refers to what happens later. 
- "Subsequently": Suggests a later step in the process. 
- "Finally": Introduces the last point or step. 
- "Before": Indicates a prerequisite action. 
- "Later": Refers to a future action or event. 
- "Meanwhile": Describes something happening concurrently.

TENTATIVE REASONING:
- "Maybe": Suggests a possible explanation or hypothesis. 
- "Possibly": Indicates a tentative but plausible idea. 
- "It could be that": Suggests a potential scenario. 
- "Perhaps": Introduces a suggestion without certainty. 
- "So I think": Expresses a tentative conclusion. 
- "It seems that": Offers a reasoned assumption.

CONCLUDING AND SUMMARIZING:
- "So": Summarizes the reasoning or draws a conclusion. 
- "In conclusion": Signals the final thought or summary. 
- "To summarize": Briefly reviews key points. 
- "In summary": Provides a concise restatement of the main ideas. 
- "To conclude": Marks the end of the discussion or reasoning. 
- "All in all": Wraps up the overall argument or thought process.

PROBLEM-SOLVING TRANSITIONS:
- "To fix this": Introduces a proposed solution. 
- "In order to": Explains the purpose of the action. 
- "The next step is": Suggests the next action to solve the problem. 
- "To address this": Signals an action aimed at resolving the issue. 
- "To prevent this": Recommends actions to avoid future problems. 
- "To avoid this": Suggests preventative steps.

EMPHASIZING IMPRTANT POINTS: 
- "Importantly": Highlights a crucial aspect of the reasoning. 
- "Notably": Draws attention to a significant detail. 
- "Crucially": Emphasizes a pivotal point. 
- "Significantly": Underscores something relevant or impactful. 
- "Key to this": Marks a central or essential factor. 
- "Most importantly": Calls attention to the primary or critical point.

REDIRECTING OR REEVALUATING THOUGHT:
- "Wait": Signals a pause to reconsider an earlier assumption. 
- "Hold on": Indicates a momentary shift in direction. 
- "On second thought": Introduces a revision or change in perspective. 
- "Let’s reconsider": Suggests revisiting an earlier idea for further analysis.
"""

client = OpenAI(
    # This is the default and can be omitted
    api_key = "",
)

# Función para realizar la evaluación con GPT-4
def evaluar_empresa(descripcion_empresa, number_of_employees, top_5_investors, last_funding_type, last_funding_amount, founding_date):

    razonamiento_evaluacion = """
    Evaluate the startup description using the following criteria. For each criterion, provide the "Score:" on a new line, followed by the "Explanation:" on a new line. Use this format exactly:

    1. Size of the Market:
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    2. Level of Innovation:
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    3. Market Competition:
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    4. Possibility of Adding Value Based on User's Expertise:
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    5. Relevance of the Industry:
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    6. Team Size and Traction:
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    7. Funding Rounds and Investor Validation:
    - Take into account the year founded and last funding amount. Higher scores indicate more investor confidence relative to company age and amount raised.
    Score: [Numerical Score]
    Explanation: [Detailed explanation]

    Each criterion should be evaluated on a scale from 1 to 5, based on the following guidelines:
    
    - **Size of the Market**:
       - 1: Very small, declining market. Limited growth opportunities.
       - 2: Small but stable market. Moderate growth possible.
       - 3: Medium-sized market with some growth potential.
       - 4: Large market with good growth potential, though some saturation.
       - 5: Very large, rapidly expanding market with substantial growth opportunities.

    - **Level of Innovation**:
       - 1: Very similar to existing products, no clear innovation.
       - 2: Incremental innovation, small improvements over existing solutions.
       - 3: Significant innovation in a mature industry.
       - 4: Disruptive innovation addressing unmet needs.
       - 5: Highly innovative and disruptive, exploring new technological frontiers.

    - **Market Competition**:
       - 1: Extremely competitive market with many established players.
       - 2: High competition with several large, well-positioned companies.
       - 3: Moderate competition with room for new entrants.
       - 4: Low competition, few players, several opportunities.
       - 5: Minimal competition, new market with monopoly potential.

    - **Possibility of Adding Value Based on User's Expertise**:
       - 1: Little or no relevant experience to contribute significantly.
       - 2: Some experience, but limited contribution in this specific area.
       - 3: Can add value in certain aspects but needs support in others.
       - 4: Strong skills, can significantly contribute to startup success.
       - 5: Highly relevant experience, can be a key asset for growth.

    - **Relevance of the Industry**:
       - 1: The industry has little or no relevance to the global market, with limited growth and low overall interest.
       - 2: The industry has low relevance, exhibiting slow growth and limited potential for global impact.
       - 3: The industry is moderately relevant, showing growth in certain markets but not considered booming.
       - 4: The industry is highly relevant, experiencing significant growth and widespread interest across multiple markets.
       - 5: The industry is extremely relevant, showing exponential growth and anticipated to have a major impact on the global market in the near future.

    - **Team Size and Traction**:
       - 1: Small team (less than 10), founded more than 3 years ago, indicating limited traction and slow growth, still in the initial phase.
       - 2: Small team (less than 10), founded within the last 3 years, showing early traction but still validating the product.
       - 3: Medium-sized team (10-50), founded more than 3 years ago, with some market traction and steady growth.
       - 4: Medium to large team (50+), founded within the last 3 years, showing good traction and rapid growth, with an established customer base.
       - 5: Large team (100+), founded more than 3 years ago, indicating significant traction, strong market validation, and consistent growth.

    - **Funding Rounds and Investor Validation**:
       - 1: No significant funding rounds, minimal investor validation; older company with seed funding indicates slow growth.
       - 2: Early rounds (Seed, Pre-seed), limited validation; moderate age and low funding.
       - 3: Series A; growing validation and investor confidence, reasonable for the age and amount raised.
       - 4: Series B/C; high validation, substantial funding indicating expansion, particularly impressive for younger companies.
       - 5: Advanced rounds (D+); strong investor validation, high levels of funding relative to company age, indicating rapid growth.

    Here is the startup description:
    {descripcion_empresa}

    Team and Funding Details:
    - Number of Employees: {number_of_employees}
    - Year Founded: {founding_date}
    - Top 5 Investors: {top_5_investors}
    - Last Funding Amount: {last_funding_amount}
    - Last Funding Type: {last_funding_type}

    User's expertise aligns with AI, solution architecture, data, and tech strategy.
    """.format(
        descripcion_empresa=descripcion_empresa,
        number_of_employees=number_of_employees,
        founding_date=founding_date,
        top_5_investors=top_5_investors,
        last_funding_amount=last_funding_amount,
        last_funding_type=last_funding_type
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": razonamiento},
            {"role": "user", "content": razonamiento_evaluacion}
        ]
    )
    
    return response.choices[0].message.content


def parse_evaluacion(evaluacion):
    # Diccionario de etiquetas basado en el pedido exacto al modelo
    criterios = {
        'Market Size': "Size of the Market",
        'Innovation Level': "Level of Innovation",
        'Market Competition': "Market Competition",
        'User Fit': "Possibility of Adding Value Based on User's Expertise",
        'Industry Relevance': "Relevance of the Industry",
        'Team Size and Traction': "Team Size and Traction",
        'Funding and Validation': "Funding Rounds and Investor Validation"
    }
    
    # Diccionarios para almacenar puntuaciones y explicaciones
    puntuaciones = {}
    explicaciones = {}
    
    # Iterar sobre cada criterio y extraer Score y Explanation basados en el nombre exacto del criterio
    for label, search_label in criterios.items():
        # Ajustar la búsqueda para cada criterio por su etiqueta textual
        pattern = rf"{search_label}.*?[-\*]*\s*[-\*]*Score\s*[-\*]*[:：]?\s*(\d)\s*[-\*]*\s*[-\*]*Explanation\s*[-\*]*[:：]?\s*(.*?)(?=\n\n|\Z)"
        match = re.search(pattern, evaluacion, re.DOTALL)
        
        if match:
            puntuacion = int(match.group(1).strip())
            explicacion = match.group(2).strip()
            
            puntuaciones[label] = puntuacion
            explicaciones[label] = explicacion
        else:
            print(f"Advertencia: No se encontró una estructura adecuada para el criterio '{label}'.")
            puntuaciones[label] = 0
            explicaciones[label] = evaluacion
    
    # Calcular el total de puntuaciones
    puntuaciones['Total Score'] = sum(puntuaciones[label] for label in criterios.keys())

    return puntuaciones, explicaciones

# Ponderar la puntuación total
def calcular_puntuacion_ponderada(puntuaciones, factor=2.0):
    # Ponderaciones definidas para cada criterio
    ponderaciones = {
        'Market Size': 0.25,
        'Innovation Level': 0.20,
        'Market Competition': 0.10,
        'User Fit': 0.10,
        'Industry Relevance': 0.20,
        'Team Size and Traction': 0.05,
        'Funding and Validation': 0.10
    }
    
    # Calcular la puntuación ponderada total
    puntuacion_ponderada_total = sum(puntuaciones[criterio] * ponderaciones[criterio] for criterio in puntuaciones if criterio in ponderaciones)
    puntuaciones['Total Score'] = puntuacion_ponderada_total * factor

# Iterar por las empresas y realizar la evaluación
def procesar_empresas(input_csv, output_csv_puntuaciones, output_csv_explicaciones):
    with open(input_csv, 'r', encoding='utf-8') as infile, \
         open(output_csv_puntuaciones, 'w', newline='', encoding='utf-8') as outfile_puntuaciones, \
         open(output_csv_explicaciones, 'w', newline='', encoding='utf-8') as outfile_explicaciones:
        
        reader = csv.DictReader(infile)
        
        # Definición de campos para puntuaciones
        fieldnames_puntuaciones = ['Name', 'Market Size', 'Innovation Level', 
                                   'Market Competition', 'User Fit', 
                                   'Industry Relevance', 'Team Size and Traction', 
                                   'Funding and Validation', 'Total Score']
        writer_puntuaciones = csv.DictWriter(outfile_puntuaciones, fieldnames=fieldnames_puntuaciones)
        writer_puntuaciones.writeheader()
        
        # Definición de campos para explicaciones
        fieldnames_explicaciones = ['Name', 'Market Size', 'Innovation Level', 
                                    'Market Competition', 'User Fit', 
                                    'Industry Relevance', 'Team Size and Traction', 
                                    'Funding and Validation']
        writer_explicaciones = csv.DictWriter(outfile_explicaciones, fieldnames=fieldnames_explicaciones)
        writer_explicaciones.writeheader()
        
        print('EMPIEZA LA EVALUACIÓN!')
        count = 1
        for row in reader:
            print(count,'.-' + row['Name'] + ': ', end = '')
            # Evaluar la empresa usando la descripción y los detalles adicionales
            evaluacion = evaluar_empresa(
                row['Description'], 
                row['Number of Employees'], 
                row['Top 5 Investors'], 
                row['Last Funding Amount'], 
                row['Last Funding Type'], 
                row['Founded Date']
            )
            
            # Parsear y guardar las puntuaciones y explicaciones
            puntuaciones, explicaciones = parse_evaluacion(evaluacion)
            
            print('OK')
            calcular_puntuacion_ponderada(puntuaciones)
            
            # Ajustar nombres para coincidir con fieldnames del CSV
            puntuaciones_ajustadas = {
                'Name': row['Name'],
                'Market Size': puntuaciones.get('Market Size', ''),
                'Innovation Level': puntuaciones.get('Innovation Level', ''),
                'Market Competition': puntuaciones.get('Market Competition', ''),
                'User Fit': puntuaciones.get('User Fit', ''),
                'Industry Relevance': puntuaciones.get('Industry Relevance', ''),
                'Team Size and Traction': puntuaciones.get('Team Size and Traction', ''),
                'Funding and Validation': puntuaciones.get('Funding and Validation', ''),
                'Total Score': puntuaciones.get('Total Score', '')
            }

            explicaciones_ajustadas = {
                'Name': row['Name'],
                'Market Size': explicaciones.get('Market Size', ''),
                'Innovation Level': explicaciones.get('Innovation Level', ''),
                'Market Competition': explicaciones.get('Market Competition', ''),
                'User Fit': explicaciones.get('User Fit', ''),
                'Industry Relevance': explicaciones.get('Industry Relevance', ''),
                'Team Size and Traction': explicaciones.get('Team Size and Traction', ''),
                'Funding and Validation': explicaciones.get('Funding and Validation', '')
            }

            # Guardar en los CSV correspondientes
            writer_puntuaciones.writerow(puntuaciones_ajustadas)
            writer_explicaciones.writerow(explicaciones_ajustadas)

            count += 1


# Procesar todas las empresas y generar los dos CSVs
procesar_empresas('alternativos_crunchbase.csv', 'output_puntuaciones_alternativos.csv', 'output_explicaciones_alternativos.csv')