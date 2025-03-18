import axios from "axios";

class ExpenseService {
  static BASE_URL = "http://localhost:8080/expenses";

  static async addExpense(expenseDTO, token) {
    return axios.post(`${this.BASE_URL}/add-expense`, expenseDTO, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async editExpense(expenseId, expenseDTO, token) {
    return axios.put(`${this.BASE_URL}/edit-expense/${expenseId}`, expenseDTO, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async deleteExpense(expenseId, token) {
    return axios.delete(`${this.BASE_URL}/delete-expense/${expenseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async getExpenses(token) {
    const response = await axios.get(`${this.BASE_URL}/expense-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
}

export default ExpenseService;
