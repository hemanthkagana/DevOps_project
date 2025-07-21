from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)
CORS(app)

# Database configuration
DB_HOST = os.getenv('DB_HOST', 'postgres-service')
DB_NAME = os.getenv('DB_NAME', 'todos')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        cursor_factory=RealDictCursor
    )
    return conn

@app.route('/todos', methods=['GET'])
def get_todos():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM todos;')
    todos = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    todo_data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO todos (text, completed) VALUES (%s, %s) RETURNING *;',
        (todo_data['text'], todo_data.get('completed', False))
    new_todo = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(new_todo), 201

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo_data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE todos SET text = %s, completed = %s WHERE id = %s RETURNING *;',
        (todo_data['text'], todo_data['completed'], todo_id))
    updated_todo = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(updated_todo)

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM todos WHERE id = %s;', (todo_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Todo deleted successfully'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
