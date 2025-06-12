// test/taskController.test.js
const { expect } = require('chai');
const sinon = require('sinon'); // For mocking
const taskController = require('../controllers/taskController'); // Your controller functions

// We need to mock the Task model, as it's an external dependency (Mongoose model)
const Task = require('../models/Task'); // Path to your Task model file

describe('Task Controller Unit Tests', function() {
  let statusStub, jsonStub, sendStub, consoleErrorStub;

  // Before each test, set up stubs for res.status, res.json, res.send and console.error
  beforeEach(function() {
    statusStub = sinon.stub();
    jsonStub = sinon.stub();
    sendStub = sinon.stub();

    // Mock the response object
    // res.status().json() chain
    // res.status().send() chain (though not used much here, good practice)
    this.res = {
      status: statusStub.returns({ json: jsonStub, send: sendStub }),
      json: jsonStub, // Fallback if status isn't called
      send: sendStub
    };

    // Mock the request object (req)
    this.req = {};

    // Stub console.error to prevent it from logging errors during tests and to check if it's called
    consoleErrorStub = sinon.stub(console, 'error');
  });

  // After each test, restore the stubs to their original state
  afterEach(function() {
    sinon.restore(); // Restores all stubs created with sinon.stub()
  });

  describe('createTask', function() {
    it('should create a new task and return 201 status with the task', async function() {
      // Arrange
      const mockTaskData = {
        assignedTo: 'John Doe',
        status: 'Pending',
        dueDate: '2025-06-30',
        priority: 'High',
        description: 'Finish project report'
      };
      this.req.body = mockTaskData;

      // Mock the Task model's constructor and save method
      const mockSavedTask = { ...mockTaskData, _id: 'mockTaskId123' };
      // Stub the Task prototype's save method to resolve with the mock data
      const taskSaveStub = sinon.stub(Task.prototype, 'save').resolves(mockSavedTask);

      // Act
      await taskController.createTask(this.req, this.res);

      // Assert
      expect(taskSaveStub.calledOnce).to.be.true; // Ensure save was called
      expect(statusStub.calledWith(201)).to.be.true; // Check status code
      expect(jsonStub.calledWith(mockSavedTask)).to.be.true; // Check response JSON
      expect(consoleErrorStub.notCalled).to.be.true; // Ensure no console error
    });

    it('should return 400 if required fields are missing', async function() {
      // Arrange
      this.req.body = {
        assignedTo: 'Jane Doe',
        // status is missing
        priority: 'Low'
      };

      // Stub Task.prototype.save to ensure it's mocked, even if we expect it not to be called
      const taskSaveStub = sinon.stub(Task.prototype, 'save');

      // Act
      await taskController.createTask(this.req, this.res);

      // Assert
      expect(statusStub.calledWith(400)).to.be.true;
      expect(jsonStub.calledWith({ message: 'Please include all required fields: assignedTo, status, priority' })).to.be.true;
      expect(taskSaveStub.notCalled).to.be.true; // Assert that .save() was not called
      expect(consoleErrorStub.notCalled).to.be.true;
    });

    it('should return 500 if an error occurs during task creation (e.g., database error)', async function() {
      // Arrange
      this.req.body = {
        assignedTo: 'Alice',
        status: 'In Progress',
        priority: 'Medium'
      };
      const errorMessage = 'Database connection failed';

      // Stub the Task prototype's save method to reject with an error
      sinon.stub(Task.prototype, 'save').rejects(new Error(errorMessage));

      // Act
      await taskController.createTask(this.req, this.res);

      // Assert
      expect(statusStub.calledWith(500)).to.be.true;
      expect(jsonStub.calledWith({ message: 'Server error', error: errorMessage })).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true; // Ensure console.error was called
      expect(consoleErrorStub.calledWith('Error creating task:', sinon.match.instanceOf(Error))).to.be.true;
    });
  });

  describe('getTasks', function() {
    it('should return all tasks with 200 status', async function() {
      // Arrange
      const mockTasks = [
        { _id: '1', assignedTo: 'User1', status: 'Pending', priority: 'High' },
        { _id: '2', assignedTo: 'User2', status: 'Completed', priority: 'Low' },
      ];
      // Stub the static find method of the Task model
      sinon.stub(Task, 'find').resolves(mockTasks);

      // Act
      await taskController.getTasks(this.req, this.res);

      // Assert
      expect(Task.find.calledOnce).to.be.true; // Ensure Task.find was called
      expect(Task.find.calledWith({})).to.be.true; // Ensure it was called with empty filter
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(mockTasks)).to.be.true;
      expect(consoleErrorStub.notCalled).to.be.true;
    });

    it('should return an empty array if no tasks are found', async function() {
      // Arrange
      sinon.stub(Task, 'find').resolves([]); // Resolve with an empty array

      // Act
      await taskController.getTasks(this.req, this.res);

      // Assert
      expect(Task.find.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([])).to.be.true;
      expect(consoleErrorStub.notCalled).to.be.true;
    });

    it('should return 500 if an error occurs during fetching tasks', async function() {
      // Arrange
      const errorMessage = 'Network error during DB query';
      sinon.stub(Task, 'find').rejects(new Error(errorMessage)); // Reject with an error

      // Act
      await taskController.getTasks(this.req, this.res);

      // Assert
      expect(Task.find.calledOnce).to.be.true;
      expect(statusStub.calledWith(500)).to.be.true;
      expect(jsonStub.calledWith({ message: 'Server error', error: errorMessage })).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.calledWith('Error fetching tasks:', sinon.match.instanceOf(Error))).to.be.true;
    });
  });

  describe('deleteTask', function() {
    it('should delete a task and return 200 status', async function() {
      // Arrange
      const taskId = 'mockTaskIdToDelete';
      this.req.params = { id: taskId };
      const mockDeletedTask = { _id: taskId, description: 'Task to be deleted' };

      // Stub the static findByIdAndDelete method of the Task model
      sinon.stub(Task, 'findByIdAndDelete').resolves(mockDeletedTask);

      // Act
      await taskController.deleteTask(this.req, this.res);

      // Assert
      expect(Task.findByIdAndDelete.calledOnce).to.be.true;
      expect(Task.findByIdAndDelete.calledWith(taskId)).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith({ message: 'Task deleted successfully' })).to.be.true;
      expect(consoleErrorStub.notCalled).to.be.true;
    });

    it('should return 404 if task to delete is not found', async function() {
      // Arrange
      const taskId = 'nonExistentTaskId';
      this.req.params = { id: taskId };

      // Stub findByIdAndDelete to resolve with null (task not found)
      sinon.stub(Task, 'findByIdAndDelete').resolves(null);

      // Act
      await taskController.deleteTask(this.req, this.res);

      // Assert
      expect(Task.findByIdAndDelete.calledOnce).to.be.true;
      expect(Task.findByIdAndDelete.calledWith(taskId)).to.be.true;
      expect(statusStub.calledWith(404)).to.be.true;
      expect(jsonStub.calledWith({ message: 'Task not found' })).to.be.true;
      expect(consoleErrorStub.notCalled).to.be.true;
    });

   
  });

  describe('updateTask', function() {
    it('should update a task and return 200 status with the updated task', async function() {
      // Arrange
      const taskId = 'mockTaskIdToUpdate';
      const updateData = { status: 'Completed', description: 'Updated report' };
      const mockUpdatedTask = { _id: taskId, assignedTo: 'John Doe', ...updateData };

      this.req.params = { id: taskId };
      this.req.body = updateData;

      // Stub findByIdAndUpdate
      sinon.stub(Task, 'findByIdAndUpdate').resolves(mockUpdatedTask);

      // Act
      await taskController.updateTask(this.req, this.res);

      // Assert
      expect(Task.findByIdAndUpdate.calledOnce).to.be.true;
      expect(Task.findByIdAndUpdate.calledWith(taskId, updateData, { new: true })).to.be.true;
      expect(statusStub.notCalled).to.be.true; // No status(200) explicitly called in controller
      expect(jsonStub.calledWith(mockUpdatedTask)).to.be.true; // Controller directly calls res.json
      expect(consoleErrorStub.notCalled).to.be.true;
    });

  

    it('should return null (with 200) if task to update is not found (controller behavior)', async function() {
      // Arrange
      const taskId = 'nonExistentTaskId';
      const updateData = { status: 'Completed' };
      this.req.params = { id: taskId };
      this.req.body = updateData;

      // Stub findByIdAndUpdate to resolve with null (task not found)
      sinon.stub(Task, 'findByIdAndUpdate').resolves(null);

      // Act
      await taskController.updateTask(this.req, this.res);

      // Assert
      expect(Task.findByIdAndUpdate.calledOnce).to.be.true;
      expect(Task.findByIdAndUpdate.calledWith(taskId, updateData, { new: true })).to.be.true;
      expect(statusStub.notCalled).to.be.true; // Still expects no status(200) because it directly calls res.json(null)
      expect(jsonStub.calledWith(null)).to.be.true;
      expect(consoleErrorStub.notCalled).to.be.true;
    });
  });
});