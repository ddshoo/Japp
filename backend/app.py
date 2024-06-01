from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import requests
import os
from flask_cors import CORS
import time

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///characters.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    jap_name = db.Column(db.String(200), nullable=True)
    rom_name = db.Column(db.String(200), nullable=True)
    img_url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Character {self.name}>'

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# API routes
API_URL = "https://api.jikan.moe/v4/top/characters"

@app.route("/fetch_top_characters", methods=["GET"])
def fetch_top_characters():
    try:
        total_characters = 0
        limit_per_page = 25  # Default limit per page from the API
        page = 1

        while total_characters < 1000:
            response = requests.get(API_URL, params={'page': page, 'limit': limit_per_page})
            response.raise_for_status()
            data = response.json()
            print(f'API Data Page {page}:', data)  # Debug print

            characters_data = data['data']
            added_count = 0
            for item in characters_data:
                print('Adding character:', item['name'])  # Debug print
                character = Character(
                    name=item['name'],
                    jap_name=item.get('name_kanji', 'N/A'),
                    rom_name=item.get('name_english', 'N/A'),
                    img_url=item['images']['jpg']['image_url']
                )
                db.session.add(character)
                added_count += 1
            db.session.commit()

            total_characters += added_count
            print(f'Added {added_count} characters from page {page}')

            # Check if there are more pages
            if not data['pagination']['has_next_page']:
                break
            page += 1

            # Add a delay to avoid rate limiting
            time.sleep(2)  # Sleep for 2 seconds between requests

        print(f'Total characters added: {total_characters}')
        return jsonify({'message': 'Top characters added successfully!', 'total_characters': total_characters}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({'message': f'Error fetching characters data: {e}'}), 500
    except KeyError as e:
        return jsonify({'message': f'Key error: {e}'}), 500

@app.route("/search_characters", methods=["GET"])
def search_characters():
    character = request.args.get('character')
    print(f'Searching for character: {character}')  # Debug print
    all_characters = Character.query.all()
    for char in all_characters:
        print(f'Database character: {char.jap_name} ({char.name}, {char.rom_name})')  # Debug print

    results = Character.query.filter(
        (Character.name.contains(character)) |
        (Character.jap_name.contains(character)) |
        (Character.rom_name.contains(character))
    ).limit(5).all()

    character_list = [{
        'id': result.id,
        'name': result.name,
        'jap_name': result.jap_name,
        'rom_name': result.rom_name,
        'img_url': result.img_url
    } for result in results]
    print('Search results:', character_list)  # Debug print
    return jsonify(character_list), 200

@app.route("/list_all_characters", methods=["GET"])
def list_all_characters():
    try:
        characters = Character.query.all()
        character_list = [{
            'id': character.id,
            'name': character.name,
            'jap_name': character.jap_name,
            'rom_name': character.rom_name,
            'img_url': character.img_url
        } for character in characters]
        return jsonify(character_list), 200
    except Exception as e:
        return jsonify({'message': f'Error listing characters: {e}'}), 500

@app.route('/clear_database')
def clear_database():
    db.drop_all()
    db.create_all()
    return jsonify({'message': 'Database cleared and reinitialized.'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
