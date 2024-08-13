from flask import request, jsonify
from config import app, db
from models import Contact


# Home route
@app.route("/")
def home_route():
    return "<h2>Flask Server Landing Page!</h2>"

# Get Route
@app.route("/contacts", methods=["GET"])
def get_contacts():
    # Returns a list of all Contact objects from the db(Python object format)
    contacts = Contact.query.all()
    # maps through each contact, converts to json and saves to a new map object, 
    # which is converted to a list/array
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    # Converts Python dictionary into JSON format to be returned by the server
    return jsonify({"contacts": json_contacts}), 200

# Post Route
@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return jsonify({"message": "You must include a first name, last name, and email"}), 400
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
  
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User has been successfully created."}), 201 

# Patch Route
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "User has been successfully updated"}), 200

@app.route("/delete/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User has been successfully deleted"}), 200

if __name__ == "__main__":
    # Checks if db exists, creates if it does not
    with app.app_context():
        db.create_all()

    app.run(debug=True)

