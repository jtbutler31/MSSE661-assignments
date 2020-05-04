const bdomealsService = new BdomealsService();
const todo = new ToDo(bdomealsService);

describe('Todo App', () => {
  it('should initialize some HTML', () => {
    spyOn(todo, 'init');
    todo.init();

    expect(todo.init).toHaveBeenCalled();
  });

  it('should add a bdomeal', async () => {
    const newBdomeal = {
      bdomeal_id: 0,
      bdomeal_name: 'serendia',
      silver_value: '1000',
      created_date: '2020-04-14 22:50:32',
    };
    const addBdomealServiceSpy = spyOn(bdomealsService, 'addBdomeal');

    expect(todo.bdomeals.length).toBe(0);

    await todo.addBdomeal(newBdomeal);

    expect(addBdomealServiceSpy).toHaveBeenCalled();
    expect(todo.bdomeals.length).toBe(1);
  });

  it('should delete a bdomeal', async () => {
    const existingBdomeal = {
      bdomeal_id: 0,
      bdomeal_name: 'serendia',
      silver_value: '1000',
      created_date: '2020-04-14 22:50:32',
    };
    const deleteBdomealServiceSpy = spyOn(bdomealsService, 'deleteBdomeal');

    expect(todo.bdomeals.length).toBe(1);

    await todo.deleteBdomeal(existingBdomeal.bdomeal_id);

    expect(deleteBdomealServiceSpy).toHaveBeenCalled();
    expect(todo.bdomeals.length).toBe(0);
  });

  xit('should update an individual bdomeal', () => {
    // ..
  });
});