import { Task, TaskStatus } from './task.entity';

describe('Task Entity', () => {
  let task: Task;

  beforeEach(() => {
    task = new Task('1', 'Test Task', 'Description', TaskStatus.OPEN);
  });

  describe('setStatus', () => {
    it('should allow valid transition from OPEN to IN_PROGRESS', () => {
      task.setStatus(TaskStatus.IN_PROGRESS);
      expect(task.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('should throw error for invalid transition from OPEN to DONE', () => {
      expect(() => task.setStatus(TaskStatus.DONE)).toThrow(
        'Invalid status transition from OPEN to DONE',
      );
    });

    it('should allow valid transition from IN_PROGRESS to DONE', () => {
      task.setStatus(TaskStatus.IN_PROGRESS);
      task.setStatus(TaskStatus.DONE);
      expect(task.status).toBe(TaskStatus.DONE);
    });

    it('should allow valid transition from IN_PROGRESS to OPEN', () => {
      task.setStatus(TaskStatus.IN_PROGRESS);
      task.setStatus(TaskStatus.OPEN);
      expect(task.status).toBe(TaskStatus.OPEN);
    });

    it('should allow valid transition from DONE to OPEN', () => {
      task.setStatus(TaskStatus.IN_PROGRESS);
      task.setStatus(TaskStatus.DONE);
      task.setStatus(TaskStatus.OPEN);
      expect(task.status).toBe(TaskStatus.OPEN);
    });

    it('should do nothing if status is the same', () => {
      const updatedAt = task.updatedAt;
      task.setStatus(TaskStatus.OPEN);
      expect(task.status).toBe(TaskStatus.OPEN);
      expect(task.updatedAt).toEqual(updatedAt);
    });
  });
});
