const employee = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
    //Recorre todo los empleados , pero hay un tiempo de respuesta por el database
    // Por eso se usara async await
    const Employees = await employee.find();
    res.json(Employees);
};


employeeCtrl.createEmployee = async (req, res) => {
    const Employee = new employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    await Employee.save();
    res.json({
        'status': "Employee Saved"
    });
};

employeeCtrl.getEmployeeById = async (req, res) => {
    const Employee = await employee.findById(req.params.id);
    res.json(Employee);
};

employeeCtrl.editEmployee = async (req, res) => {
    const { id } = req.params;
    const Employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    await employee.findByIdAndUpdate(id, { $set: Employee }, { new: true });
    res.json({ 'status': 'Employee edit' });
};

employeeCtrl.deleteEmployeeById = async (req, res) => {
    const { id } = req.params;
    await employee.findByIdAndRemove(id);
    res.json({ 'status': 'Eliminado' })
};

module.exports = employeeCtrl;