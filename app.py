import google.generativeai as genai
import fitz  # PyMuPDF
import os
from flask import Flask, render_template, request

app = Flask(__name__)

# Chemin vers le répertoire d'uploads
UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Définir le répertoire d'uploads dans l'application Flask
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Définir la clé API
os.environ["GOOGLE_API_KEY"] = "AIzaSyBH2VLJnmJYXjGDMapF2X9f1VhaH-pSjVw"

# Fonction pour extraire le texte d'un fichier PDF
def extract_text_from_pdf(pdf_file_path):
    text = ""
    with fitz.open(pdf_file_path) as pdf_document:
        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            text += page.get_text()
    return text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        # Vérifier si le fichier a été téléchargé
        if 'pdf' not in request.files:
            return render_template('index.html', error='Aucun fichier téléchargé')
        
        pdf_file = request.files['pdf']

        # Vérifier si aucun fichier n'a été sélectionné
        if pdf_file.filename == '':
            return render_template('index.html', error='Aucun fichier sélectionné')

        # Sauvegarder le fichier téléchargé dans le répertoire uploads
        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], pdf_file.filename)
        pdf_file.save(pdf_path)

        # Extraire le texte du PDF
        pdf_text = extract_text_from_pdf(pdf_path)

        # Appeler l'API d'IA pour obtenir la réponse
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(["Donne ton Feedback de ce compte rendu en environ 300 mots, structurés de manière claire et concise, puis attribue-lui une note sur 20. Fais ressortir cette note en donner la grie d'évaluation que t'a choisis et en l'annonçant distinctement tout en bas de ton feedback. S'il te plaît, ajoute une ligne de séparation avant d'écrire la note pour qu'elle soit bien mise en valeur.", pdf_text])

        # Supprimer le fichier PDF soumis après analyse
        os.remove(pdf_path)

        # Renvoyer la réponse vers le template HTML
        return render_template('submit.html', response=response.text)
    else:
        return render_template('submit.html')

@app.route('/index1')
def index1():
    return render_template('index1.html')

@app.route('/index2')
def index2():
    return render_template('index2.html')

@app.route('/indexx')
def indexx():
    return render_template('indexx.html')

@app.route('/profile')  
def profile():
    return render_template('profile.html')

@app.route('/team')
def team():
    return render_template('TEAM.html')

if __name__ == '__main__':
    app.run(debug=True)
