import PeopleService from "../services/people.service";

const {
  CreatePeople,
  AllPeople,
  CreateAttribute,
  EditPeople,
  EditAttribute,
  SearchByName
} = PeopleService;

/**
 * @class PeopleController
 * @description handles all the request regarding people
 * @exports PeopleController
 */
class PeopleController {
  static async Allpeople(request, response) {
    const allPeople = await AllPeople();
    try {
      return response.status(200).json({
        status: "success",
        data: allPeople
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "something went wrong"
      });
    }
  }

  static async CreatePeople(request, response) {
    try {
      const details = request.body;
      const newPerson = await CreatePeople(details);

      return response.status(200).json({
        status: "success",
        data: newPerson
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "something went wrong"
      });
    }
  }

  static async CreateAttribute(request, response) {
    try {
      const details = request.body;
      const { peopleId } = request.params;
      const newPerson = await CreateAttribute(details, peopleId);

      if (newPerson === "Please person does not exist") {
        return response.status(400).json({
          status: "error",
          data: newPerson
        });
      }

      if (newPerson === "you have an attribute please edit it") {
        return response.status(400).json({
          status: "error",
          data: newPerson
        });
      }

      return response.status(200).json({
        status: "success",
        data: newPerson
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "something went wrong"
      });
    }
  }

  static async EditPeople(request, response) {
    try {
      const details = request.body;
      const { peopleId } = request.params;
      const person = await EditPeople(details, peopleId);
      if (person === "Please person does not exist") {
        return response.status(400).json({
          status: "error",
          data: person
        });
      }
      return response.status(200).json({
        status: "success",
        data: person
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "something went wrong"
      });
    }
  }

  static async EditAttribute(request, response) {
    try {
      const details = request.body;
      const { peopleId } = request.params;
      const person = await EditAttribute(details, peopleId);
      if (person === "Please you don't have an existing attribute create one") {
        return response.status(400).json({
          status: "error",
          data: person
        });
      }
      return response.status(200).json({
        status: "success",
        data: person
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "something went wrong"
      });
    }
  }

  static async searchByName(request, response) {
    try {
      const name = request.query.name
      const people = await SearchByName(name);
      return response.status(200).json({
        status: "success",
        data: people
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "something went wrong"
      });
    }
  }
}

export default PeopleController;
