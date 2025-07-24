from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app)

transactions = []

def load_data():
    global transactions
    with open('chuyen_khoan.csv', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        transactions = list(reader)

load_data()

@app.route('/query', methods=['GET'])
def query():
    name = request.args.get('name', '').lower()
    amount = request.args.get('amount', '')
    content = request.args.get('content', '').lower()

    results = []
    for row in transactions:
        # Tìm tên người gửi trong detail
        if name and name not in row.get('detail', '').lower():
            continue
        # Tìm số tiền trong credit hoặc debit
        if amount and (amount not in row.get('credit', '') and amount not in row.get('debit', '')):
            continue
        # Tìm nội dung trong detail
        if content and content not in row.get('detail', '').lower():
            continue
        results.append(row)
    return jsonify(results)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)