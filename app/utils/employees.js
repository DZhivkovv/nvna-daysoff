export async function getAuthenticatedEmployeeData() {
const response = await fetch('api/employees');
const data = await response.json();
const employeeData = data.body;

return employeeData;
}


export default async function signUp(employeeCredentials) {
const response = await fetch('/api/auth/signUp', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeCredentials),
});

const result = await response.json();

return result;
}
