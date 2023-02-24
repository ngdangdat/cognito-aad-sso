from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse

from pydantic import BaseModel, Field


DATABASE_URI: str = "sqlite:///demo.sqlite3" 

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config['SECRET_KEY'] = "random+string"
db = SQLAlchemy(app)
api = Api(app)


parser = reqparse.RequestParser()

parser.add_argument("slug", type=str)
parser.add_argument("user_pool_id", type=str)


class OrganizationSchema(BaseModel):
    slug: str = Field(None)
    user_pool_id: str = Field(None)


class OrganizationInDbSchema(OrganizationSchema):
    class Config:
        orm_mode = True


class Organization(db.Model):
    id = db.Column('organization_id', db.Integer, primary_key=True)
    slug = db.Column(db.String(20), unique=True)
    user_pool_id = db.Column(db.String(50))

    @property
    def serialized(self):
        return {
            "id": self.id,
            "slug": self.slug,
            "user_pool_id": self.user_pool_id
        }

    def __init__(self, slug: str, user_pool_id: str):
        self.slug = slug
        self.user_pool_id = user_pool_id


class AppRoute(Resource):
    def get(self):
        orgs = db.session.query(Organization).all()
        return jsonify([org.serialized for org in orgs])

    def post(self):
        args = parser.parse_args()
        slug = args["slug"]
        user_pool_id = args["user_pool_id"]
        db.session.add(Organization(slug=slug, user_pool_id=user_pool_id))
        db.session.commit()


class OrganizationLoginRoute(Resource):
    def get(self, slug: str):
        return {"slug": slug}


api.add_resource(AppRoute, "/")
api.add_resource(OrganizationLoginRoute, "/<string:slug>")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.run(debug=True)
