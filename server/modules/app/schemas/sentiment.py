# ACCOUNT SCHEMA
# Similar to Spring validation form java, we can create schemas for each controller type and its validations

from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

# JSON SCHEMA DOCUMENTATION

sentiment_schema = {
    "type": "object",
    "properties": {
        "Since": {
            "type": "string",
        },
        "Until": {
            "type": "string",
            "format": "email"
        },
        "Search": {
            "type": "string",
            "minLength": 3
        }
    },
    "required": ["Since", "Until", "Search"],
    "additionalProperties": False
}
# "additionalProperties": False => validates for additional variables

def validate_sentiment(request_data):
    try:
        validate(request_data, sentiment_schema)
    except ValidationError as e:
        return {'status': False, 'message': e}
    except SchemaError as e:
        return {'status': False, 'message': e}
    return {'status': True, 'data': request_data}