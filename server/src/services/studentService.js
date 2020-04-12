import db from "../models";

class StudentService {
  static async addStudent(newStudent) {
    try {
      return await db.Student.create(newStudent);
    } catch (error) {
      return error.message;
    }
  }
}

export default StudentService;
