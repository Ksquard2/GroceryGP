from flask import Flask, jsonify
from flask_cors import CORS
from azure.cosmos import CosmosClient, exceptions

app = Flask(__name__)
CORS(app) 

endpoint = "https://ahmedkk2.documents.azure.com:443/"
key = "tUnavcUg7DXEQWN4z6bAjC27i6w4kLtTl8kTkzPy30ngrIIuu9UD08gS1RXzrAtxdR1i51JdXwRQACDb7jI2SQ=="
database_id = "cosmicworks"
container_id = "Inventory"

client = CosmosClient(endpoint, credential=key)
database = client.get_database_client(database_id)
container = database.get_container_client(container_id)

@app.route('/data', methods=['GET'])
def get_data():
    try:
        items = list(container.read_all_items())
        return jsonify(items)
    except exceptions.CosmosHttpResponseError as e:
        print(f"An error occurred: {e}")
        return "Error fetching data", 500

if __name__ == '__main__':
    app.run(debug=True)