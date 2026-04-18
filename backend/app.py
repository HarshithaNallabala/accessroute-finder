from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Running!"

@app.route("/report-issue", methods=["POST"])
def report_issue():
    data = request.json

    location = data.get("location")
    issue = data.get("issue")

    print("\n🚨 New Issue Reported:")
    print("Location:", location)
    print("Issue:", issue)

    return jsonify({"message": "Issue received successfully"})

if __name__ == "__main__":
    app.run(debug=True)