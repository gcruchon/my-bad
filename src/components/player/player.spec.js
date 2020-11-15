import { saveAnswer } from './player';

describe('saveAnswer', () => {
  it('should add an answer', async () => {
    const answersRef = {
      add: jest.fn(),
    };
    saveAnswer(answersRef, 12, 'error');
    expect(answersRef.add).toHaveBeenCalledTimes(1);
    const call = answersRef.add.mock.calls[0][0];
    expect(call.questionId).toEqual(12);
    expect(call.value).toEqual('error');
  });
});
