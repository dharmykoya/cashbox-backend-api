import model, { Sequelize } from "../models";

const { People, Attribute } = model;
const Op = Sequelize.Op;

/**
 * @class PeopleService
 * @description handles the request coming from the people controller.
 * @exports PeopleService
 */
class PeopleService {
  static async CreatePeople(personDetails) {
    const { firstName, surname, dateOfBirth } = personDetails;

    const personYear = new Date(dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();

    const age = parseInt(currentYear) - parseInt(personYear);
    const newPerson = await People.create({
      firstName,
      surnName: surname,
      age,
      dateOfBirth
    });

    return newPerson;
  }

  static async AllPeople() {
    const allpeople = await People.findAll({
      include: [
        {
          model: Attribute,
          as: "attribute"
        }
      ]
    });

    return allpeople;
  }

  static async CreateAttribute(details, peopleId) {
    const { height, hairColor, weight, job } = details;

    const person = await People.findOne({ where: { id: parseInt(peopleId) } });

    if (!person) {
      return "Please person does not exist";
    }

    const checkPersonAttribute = await Attribute.findOne({
      where: { peopleId: parseInt(peopleId) }
    });

    if (checkPersonAttribute) {
      return "You have an attribute please edit it";
    }
    const personAttribute = await Attribute.create({
      height,
      hairColor,
      job,
      weight,
      peopleId
    });

    const result = {
      ...person.dataValues,
      attribute: personAttribute
    };
    return result;
  }

  static async EditPeople(details, peopleId) {
    const person = await People.findOne({ where: { id: parseInt(peopleId) } });

    if (!person) {
      return "Please person does not exist";
    }

    let age = person.age;

    const { dateOfBirth } = details;

    if (dateOfBirth) {
      const personYear = new Date(dateOfBirth).getFullYear();
      const currentYear = new Date().getFullYear();

      age = parseInt(currentYear) - parseInt(personYear);
    }

    const updatePerson = await person.update({
      firstName: details.firstName,
      surnName: details.lastName,
      dateOfBirth: details.dateOfBirth,
      age
    });

    const updatedPerson = {
      firstName: updatePerson.firstName,
      surnName: updatePerson.lastName,
      dateOfBirth: updatePerson.dateOfBirth,
      age
    };

    return updatedPerson;
  }

  static async EditAttribute(details, peopleId) {
    const attribute = await Attribute.findOne({
      where: { peopleId: parseInt(peopleId) }
    });

    if (!attribute) {
      return "Please you don't have an existing attribute create one";
    }

    const updateAttribute = await attribute.update({
      height: details.height,
      hairColor: details.hairColor,
      weight: details.weight,
      job: details.job
    });

    const updatedAttribute = {
      height: updateAttribute.height,
      hairColor: updateAttribute.hairColor,
      weight: updateAttribute.weight,
      job: updateAttribute.job
    };

    return updatedAttribute;
  }

  static async SearchByName(name) {
    const firstNames = await People.findAll({
      where: {
        firstName: { [Op.like]: "%" + name + "%" }
      }
    });

    const surnNames = await People.findAll({
      where: {
        surnName: { [Op.like]: "%" + name + "%" }
      }
    });

    const peopleFound = [...firstNames, ...surnNames];

    const people = peopleFound.filter((person, index, self) => {
      return index === self.findIndex(per => per.id === person.id);
    });

    return people;
  }
}

export default PeopleService;
